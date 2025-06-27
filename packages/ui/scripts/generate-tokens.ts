#!/usr/bin/env tsx

import fs from 'fs';
import path from 'path';
// CommonJS에서 __dirname 사용
const __dirname = path.dirname(__filename);

// CSS 파일 경로
const TAILWIND_CONFIG_PATH = path.join(__dirname, '../../tailwind-config');
const OUTPUT_PATH = path.join(__dirname, '../src/design-system/design-tokens/generated-tokens.ts');

interface Variables {
  [key: string]: string;
}

interface ColorGroup {
  [key: string]: string;
}

interface TokenStructure {
  primitive: { [colorName: string]: ColorGroup };
  scale: { [colorName: string]: ColorGroup };
  utility: { [type: string]: ColorGroup };
}

// CSS 변수를 파싱하는 함수
function parseCSSVariables(cssContent: string): Variables {
  const variables: Variables = {};

  // :root { ... } 블록에서 CSS 변수 추출
  const rootMatch = cssContent.match(/:root\s*\{([^}]+)\}/gs);

  if (rootMatch) {
    rootMatch.forEach((block) => {
      // CSS 변수 패턴 매칭: --variable-name: value;
      const variableMatches = block.match(/--([^:]+):\s*([^;]+);/g);

      if (variableMatches) {
        variableMatches.forEach((match) => {
          const matchResult = match.match(/--([^:]+):\s*([^;]+);/);
          if (matchResult) {
            const [, name, value] = matchResult;
            if (name && value) {
              variables[name.trim()] = value.trim();
            }
          }
        });
      }
    });
  }

  return variables;
}

// CSS 변수를 그룹별로 구조화하는 함수
function structureTokens(variables: Variables): TokenStructure {
  const tokens: TokenStructure = {
    primitive: {},
    scale: {},
    utility: {},
  };

  Object.entries(variables).forEach(([name, value]) => {
    // Primitive colors (orange, green, pink, blue, gray, red)
    if (name.match(/^color-(orange|green|pink|blue|gray|red)-/)) {
      const match = name.match(/^color-([^-]+)-(.+)$/);
      if (match) {
        const [, colorName, shade] = match;
        if (colorName && shade) {
          if (!tokens.primitive[colorName]) tokens.primitive[colorName] = {};
          tokens.primitive[colorName][shade] = value;
        }
      }
    }
    // Scale colors (primary, secondary, success, danger, neutral, error)
    else if (name.match(/^color-(primary|secondary|success|danger|neutral|error)-/)) {
      const match = name.match(/^color-([^-]+)-(.+)$/);
      if (match) {
        const [, colorName, shade] = match;
        if (colorName && shade) {
          if (!tokens.scale[colorName]) tokens.scale[colorName] = {};
          tokens.scale[colorName][shade] = value;
        }
      }
    }
    // Utility colors (text-, bg-, border-)
    else if (name.match(/^color-(text|bg|border)-/)) {
      const match = name.match(/^color-([^-]+)-(.+)$/);
      if (match) {
        const [, type, purpose] = match;
        if (type && purpose) {
          if (!tokens.utility[type]) tokens.utility[type] = {};
          tokens.utility[type][purpose] = value;
        }
      }
    }
  });

  return tokens;
}

// TypeScript 코드 생성 함수
function generateTypeScriptCode(tokens: TokenStructure): string {
  const generateObjectCode = (
    obj: { [key: string]: string | { [key: string]: string } },
    indent = 0
  ): string => {
    const spaces = '  '.repeat(indent);
    const entries = Object.entries(obj).map(([key, value]) => {
      if (typeof value === 'object') {
        return `${spaces}  ${key}: {\n${generateObjectCode(value, indent + 2)}\n${spaces}  }`;
      }
      return `${spaces}  ${key}: '${value}'`;
    });
    return entries.join(',\n');
  };

  return `// 이 파일은 자동 생성됩니다. 수정하지 마세요.
// generate-tokens.ts 스크립트에 의해 생성됨

export const utilityColors = {
${generateObjectCode(tokens.utility, 0)}
};

export const scaleColors = {
${generateObjectCode(tokens.scale, 0)}
};

export const primitiveColors = {
${generateObjectCode(tokens.primitive, 0)}
};

// Utility color의 CSS 값
export const utilityColorCSSValue = {
  text: {
${Object.entries(tokens.utility.text || {})
  .map(([key]) => `    ${key}: 'var(--color-text-${key})'`)
  .join(',\n')}
  },
  background: {
${Object.entries(tokens.utility.bg || {})
  .map(([key]) => `    ${key}: 'var(--color-bg-${key})'`)
  .join(',\n')}
  },
  border: {
${Object.entries(tokens.utility.border || {})
  .map(([key]) => `    ${key}: 'var(--color-border-${key})'`)
  .join(',\n')}
  }
};

// 스토리북용 색상 데이터 구조 (Scale color 기준)
export const colorTokens = {
  primary: {
${Object.entries(tokens.scale.primary || {})
  .map(([key]) => `    ${key}: 'var(--color-primary-${key})'`)
  .join(',\n')}
  },
  secondary: {
${Object.entries(tokens.scale.secondary || {})
  .map(([key]) => `    ${key}: 'var(--color-secondary-${key})'`)
  .join(',\n')}
  },
  neutral: {
${Object.entries(tokens.scale.neutral || {})
  .map(([key]) => `    ${key}: 'var(--color-neutral-${key})'`)
  .join(',\n')}
  },
  success: {
${Object.entries(tokens.scale.success || {})
  .map(([key]) => `    ${key}: 'var(--color-success-${key})'`)
  .join(',\n')}
  },
  danger: {
${Object.entries(tokens.scale.danger || {})
  .map(([key]) => `    ${key}: 'var(--color-danger-${key})'`)
  .join(',\n')}
  },
  error: {
${Object.entries(tokens.scale.error || {})
  .map(([key]) => `    ${key}: 'var(--color-error-${key})'`)
  .join(',\n')}
  }
};

// Scale color의 CSS 값: Primitive colors
export const scaleColorCSSValues: { [key: string]: string } = {
${Object.entries(tokens.scale)
  .flatMap(([groupName, colors]) =>
    Object.entries(colors).map(
      ([shade, value]) => `  'var(--color-${groupName}-${shade})': '${value}'`
    )
  )
  .concat(
    Object.entries(tokens.utility).flatMap(([type, colors]) =>
      Object.entries(colors)
        .filter(([purpose, value]) => !value.includes(`--color-${type}-${purpose}`)) // 순환 참조 제거
        .map(([purpose, value]) => `  'var(--color-${type}-${purpose})': '${value}'`)
    )
  )
  .join(',\n')}
};
`;
}

// 메인 실행 함수
async function generateTokens(): Promise<void> {
  try {
    console.log('🎨 디자인 토큰 생성 시작...');

    // CSS 파일들 읽기
    const primitiveColorsPath = path.join(
      TAILWIND_CONFIG_PATH,
      'design-tokens/color-tokens/primitive-colors.css'
    );
    const scaleColorsPath = path.join(
      TAILWIND_CONFIG_PATH,
      'design-tokens/color-tokens/scale-colors.css'
    );
    const utilityColorsPath = path.join(
      TAILWIND_CONFIG_PATH,
      'design-tokens/color-tokens/utility-colors.css'
    );

    const primitiveCSS = fs.readFileSync(primitiveColorsPath, 'utf8');
    const scaleCSS = fs.readFileSync(scaleColorsPath, 'utf8');
    const utilityCSS = fs.readFileSync(utilityColorsPath, 'utf8');

    // CSS 변수 파싱
    const primitiveVars = parseCSSVariables(primitiveCSS);
    const scaleVars = parseCSSVariables(scaleCSS);
    const utilityVars = parseCSSVariables(utilityCSS);

    // 모든 변수 병합
    const allVariables = { ...primitiveVars, ...scaleVars, ...utilityVars };

    // 토큰 구조화
    const tokens = structureTokens(allVariables);

    // TypeScript 코드 생성
    const tsCode = generateTypeScriptCode(tokens);

    // 출력 디렉토리 생성
    const outputDir = path.dirname(OUTPUT_PATH);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // 파일 쓰기
    fs.writeFileSync(OUTPUT_PATH, tsCode, 'utf8');

    console.log('✅ 디자인 토큰 생성 완료!');
    console.log(`📁 출력 경로: ${OUTPUT_PATH}`);
    console.log(`🔢 생성된 토큰 수: ${Object.keys(allVariables).length}개`);
  } catch (error) {
    console.error('❌ 토큰 생성 실패:', error);
    process.exit(1);
  }
}

// 스크립트 직접 실행 시
if (require.main === module) {
  generateTokens();
}

export { generateTokens };
