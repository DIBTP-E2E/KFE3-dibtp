import js from '@eslint/js';
import pluginNext from '@next/eslint-plugin-next';
import eslintConfigPrettier from 'eslint-config-prettier';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { config as baseConfig } from './base.js';

// 새로 추가된 플러그인들
import typescriptParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';

/**
 * A custom ESLint configuration for libraries that use Next.js.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const nextJsConfig = [
  ...baseConfig,
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    ...pluginReact.configs.flat.recommended,
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
      },
    },
  },
  {
    plugins: {
      '@next/next': pluginNext,
    },
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs['core-web-vitals'].rules,
    },
  },
  {
    plugins: {
      'react-hooks': pluginReactHooks,
    },
    settings: { react: { version: 'detect' } },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
    },
  },

  // 🎨 여기에 팀 컨벤션 규칙 추가
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 'latest',
        sourceType: 'module',
        projectService: true,
      },
    },
    plugins: {
      import: importPlugin,
    },
    rules: {
      // 팀 컨벤션 규칙들
      'no-console': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],

      // 이벤트 핸들러 네이밍
      'react/jsx-handler-names': [
        'error',
        {
          eventHandlerPrefix: 'handle',
          eventHandlerPropPrefix: 'on',
        },
      ],

      // 인터페이스 네이밍 (React 컴포넌트 고려)
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'interface',
          format: ['PascalCase'],
        },
        {
          selector: 'typeAlias',
          format: ['PascalCase'],
        },
        // 변수명은 여러 형태 허용 (React 컴포넌트, 상수, 일반 변수 모두 고려)
        {
          selector: 'variable',
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        },
      ],

      // 컴포넌트 정의 방식
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],

      // Import 순서
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
            {
              pattern: 'next',
              group: 'external',
              position: 'before',
            },
            // 1. 기본값과 설정 (가장 안정적, 다른 모든 것이 의존)
            {
              pattern: '@/constants/**',
              group: 'internal',
              position: 'before',
            },
            // 2. 타입 정의 (컴파일 타임에만 존재, 런타임 의존성 없음)
            {
              pattern: '@/types/**',
              group: 'internal',
              position: 'before',
            },
            // 3. 유틸리티와 라이브러리 (순수 함수, 재사용성 높음)
            {
              pattern: '@/lib/**',
              group: 'internal',
              position: 'before',
            },
            // 4. 서버 액션 (비즈니스 로직, API 호출)
            {
              pattern: '@/server-actions/**',
              group: 'internal',
              position: 'before',
            },
            // 5. 서비스 (외부 API, 데이터 처리)
            {
              pattern: '@/services/**',
              group: 'internal',
              position: 'before',
            },
            // 6. 컴포넌트 (UI 렌더링, 위의 모든 것들을 조합)
            {
              pattern: '@/components/**',
              group: 'internal',
              position: 'before',
            },
            // 7. 스타일 (렌더링에 영향, 컴포넌트와 밀접)
            {
              pattern: '@/styles/**',
              group: 'internal',
              position: 'after',
            },
            // 8. 정적 자산들 (맨 마지막, 사이드 이펙트 가능성)
            {
              pattern: '@/public/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '@/assets/**',
              group: 'internal',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['react'],
          'newlines-between': 'always-and-inside-groups',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
      },
    },
  },
];
