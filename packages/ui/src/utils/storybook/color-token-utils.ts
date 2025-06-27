import {
  primitiveColors,
  semanticColorCSSValues,
} from '../../design-system/design-tokens/generated-tokens';

// 색상 타입별 매핑
const COLOR_TYPE_MAPPING = {
  primary: 'orange',
  secondary: 'blue',
  success: 'green',
  danger: 'pink',
  neutral: 'gray',
  error: 'red',
} as const;

// Utility 타입별 유틸리티 클래스 매핑
const UTILITY_CLASS_MAP = {
  text: (purpose: string) => `text-text-${purpose}`,
  bg: (purpose: string) => `bg-bg-${purpose}`,
  border: (purpose: string) => `border-border-${purpose}`,
} as const;

export interface ColorTokenInfo {
  key: string;
  cssVariable: string;
  primitiveValue: string;
  hexValue: string | null;
  utilityClasses: {
    background: string;
    text: string;
    border: string;
  };
}

export const createColorTokenInfo = (
  key: string,
  cssVariable: string,
  primitiveValue: string,
  colorType: string
): ColorTokenInfo => {
  return {
    key,
    cssVariable,
    primitiveValue,
    hexValue: getPrimitiveValue(cssVariable),
    utilityClasses: {
      background: `bg-${colorType}-${key}`,
      text: `text-${colorType}-${key}`,
      border: `border-${colorType}-${key}`,
    },
  };
};

// 생성된 토큰에서 실제 색상 값을 가져오는 함수
export const getSemanticColorValue = (cssVar: string): string => {
  return semanticColorCSSValues[cssVar as keyof typeof semanticColorCSSValues] || cssVar;
};

// 스토리북 타이틀에서 색상 타입을 추출하는 함수
export const extractColorTypeFromTitle = (title: string): string => {
  const lowerTitle = title.toLowerCase();
  return Object.keys(COLOR_TYPE_MAPPING).find((type) => lowerTitle.includes(type)) || 'neutral';
};

// Utility CSS 변수에서 유틸리티 클래스만 반환하는 함수
export const getUtilityClass = (cssVariable: string): string | null => {
  const match = cssVariable.match(/var\(--color-(\w+)-(\w+)\)/);
  if (!match) return null;

  const [, type, purpose] = match;
  if (!type || !purpose) return null;

  const classGenerator = UTILITY_CLASS_MAP[type as keyof typeof UTILITY_CLASS_MAP];
  return classGenerator ? classGenerator(purpose) : null;
};

// CSS 변수에서 primitive 변수를 반환하는 함수
export const getPrimitiveValue = (cssVariable: string): string | null => {
  const match = cssVariable.match(/var\(--color-(\w+)-(\w+)\)/);
  if (!match) return null;

  const [, colorType, shade] = match;
  const primitiveColorName = COLOR_TYPE_MAPPING[colorType as keyof typeof COLOR_TYPE_MAPPING];

  if (primitiveColorName && primitiveColors[primitiveColorName] && shade) {
    return (
      primitiveColors[primitiveColorName][
        shade as keyof (typeof primitiveColors)[typeof primitiveColorName]
      ] || null
    );
  }

  return null;
};

// Colors CSS 변수의 hex 값을 반환하는 함수
export const getHexValue = (cssVariable: string): string | null => {
  const resolveChain = (current: string, visited = new Set<string>()): string | null => {
    if (visited.has(current)) return null;

    // 먼저 primitive에서 직접 찾기
    const directHex = getPrimitiveValue(current);
    if (directHex?.startsWith('#')) return directHex;

    // semanticColorCSSValues에서 다음 변수 찾기
    const nextVar = semanticColorCSSValues[current];
    if (!nextVar) return null;

    return resolveChain(nextVar, new Set([...visited, current]));
  };

  return resolveChain(cssVariable);
};
