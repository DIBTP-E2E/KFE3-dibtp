/**
 * TODO: 사용하지 않는 레거시 디자인 시스템. 수정 예정
 */

// 폰트 토큰 (global.css의 폰트 관련)
export const typography = {
  family: {
    primary: 'var(--font-family-primary)', // 'Noto Sans KR', system fonts
  },
  weight: {
    light: 300, // .font-light
    regular: 400, // .font-regular
    medium: 500, // .font-medium
    semibold: 600, // .font-semibold
    bold: 700, // .font-bold
    extrabold: 800, // .font-extrabold
  },
  size: {
    // 기본 텍스트 크기들 (필요에 따라 확장 가능)
    xs: '0.75rem', // 12px
    sm: '0.875rem', // 14px
    base: '1rem', // 16px
    lg: '1.125rem', // 18px
    xl: '1.25rem', // 20px
    '2xl': '1.5rem', // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem', // 48px
  },
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
} as const;

// 타이포그래피 타입 정의
export type TypographyToken = typeof typography;
export type FontWeight = keyof typeof typography.weight;
export type FontSize = keyof typeof typography.size;
export type LineHeight = keyof typeof typography.lineHeight;

// 폰트 유틸리티 함수들
export const typographyUtils = {
  /**
   * 폰트 패밀리 가져오기
   * @example typographyUtils.getFamily() → 'var(--font-family-primary)'
   */
  getFamily: () => typography.family.primary,

  /**
   * 폰트 웨이트 가져오기
   * @example typographyUtils.getWeight('medium') → 500
   */
  getWeight: (weight: FontWeight) => typography.weight[weight],

  /**
   * 폰트 크기 가져오기
   * @example typographyUtils.getSize('lg') → '1.125rem'
   */
  getSize: (size: FontSize) => typography.size[size],

  /**
   * 라인 높이 가져오기
   * @example typographyUtils.getLineHeight('normal') → 1.5
   */
  getLineHeight: (lineHeight: LineHeight) => typography.lineHeight[lineHeight],

  /**
   * Tailwind 클래스명으로 폰트 웨이트 적용
   */
  weightClass: {
    light: 'font-light',
    regular: 'font-regular',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
    extrabold: 'font-extrabold',
  },

  /**
   * 컴포넌트에서 자주 사용하는 타이포그래피 조합
   */
  semantic: {
    // 제목 스타일들
    h1: {
      fontSize: typography.size['4xl'],
      fontWeight: typography.weight.bold,
      lineHeight: typography.lineHeight.tight,
    },
    h2: {
      fontSize: typography.size['3xl'],
      fontWeight: typography.weight.bold,
      lineHeight: typography.lineHeight.tight,
    },
    h3: {
      fontSize: typography.size['2xl'],
      fontWeight: typography.weight.semibold,
      lineHeight: typography.lineHeight.tight,
    },
    h4: {
      fontSize: typography.size.xl,
      fontWeight: typography.weight.semibold,
      lineHeight: typography.lineHeight.normal,
    },
    h5: {
      fontSize: typography.size.lg,
      fontWeight: typography.weight.medium,
      lineHeight: typography.lineHeight.normal,
    },
    h6: {
      fontSize: typography.size.base,
      fontWeight: typography.weight.medium,
      lineHeight: typography.lineHeight.normal,
    },

    // 본문 스타일들
    bodyLarge: {
      fontSize: typography.size.lg,
      fontWeight: typography.weight.regular,
      lineHeight: typography.lineHeight.relaxed,
    },
    body: {
      fontSize: typography.size.base,
      fontWeight: typography.weight.regular,
      lineHeight: typography.lineHeight.normal,
    },
    bodySmall: {
      fontSize: typography.size.sm,
      fontWeight: typography.weight.regular,
      lineHeight: typography.lineHeight.normal,
    },

    // 캡션 및 라벨
    caption: {
      fontSize: typography.size.xs,
      fontWeight: typography.weight.regular,
      lineHeight: typography.lineHeight.normal,
    },
    label: {
      fontSize: typography.size.sm,
      fontWeight: typography.weight.medium,
      lineHeight: typography.lineHeight.normal,
    },

    // 버튼 텍스트
    buttonLarge: {
      fontSize: typography.size.base,
      fontWeight: typography.weight.semibold,
      lineHeight: typography.lineHeight.tight,
    },
    button: {
      fontSize: typography.size.sm,
      fontWeight: typography.weight.medium,
      lineHeight: typography.lineHeight.tight,
    },
    buttonSmall: {
      fontSize: typography.size.xs,
      fontWeight: typography.weight.medium,
      lineHeight: typography.lineHeight.tight,
    },
  },
} as const;
