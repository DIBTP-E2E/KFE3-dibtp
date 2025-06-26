/**
 * TODO: 사용하지 않는 레거시 디자인 시스템의 스토리. 수정 예정
 */

import type { Meta, StoryObj } from '@storybook/nextjs';
import { typography, typographyUtils } from './typography';

const meta: Meta = {
  title: 'Design System/Design Tokens/Typography',
  parameters: {
    docs: {
      description: {
        component: '디자인 시스템에서 사용하는 모든 타이포그래피 토큰들을 확인할 수 있습니다.',
      },
    },
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

// 폰트 웨이트 컴포넌트
const FontWeightShowcase = () => (
  <div style={{ marginBottom: '2rem' }}>
    <h3
      style={{
        fontSize: '1.125rem',
        fontWeight: 600,
        marginBottom: '1rem',
        color: '#1f1f1f',
      }}
    >
      Font Weights
    </h3>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {Object.entries(typography.weight).map(([key, value]) => (
        <div
          key={key}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '0.75rem',
            backgroundColor: '#f4f4f7',
            borderRadius: '8px',
            border: '1px solid #e8e8e8',
          }}
        >
          <div
            style={{
              minWidth: '80px',
              fontSize: '0.875rem',
              color: '#656565',
              fontFamily: 'monospace',
            }}
          >
            {value}
          </div>
          <div
            style={{
              fontSize: '1.25rem',
              fontWeight: value,
              fontFamily: 'var(--font-family-primary)',
              flex: 1,
            }}
          >
            {key.charAt(0).toUpperCase() + key.slice(1)} - 가나다라마바사아자차카타파하
          </div>
          <code
            style={{
              fontSize: '0.75rem',
              backgroundColor: '#ffffff',
              padding: '0.25rem 0.5rem',
              borderRadius: '4px',
              color: '#656565',
            }}
          >
            {typographyUtils.weightClass[key as keyof typeof typographyUtils.weightClass]}
          </code>
        </div>
      ))}
    </div>
  </div>
);

// 폰트 크기 컴포넌트
const FontSizeShowcase = () => (
  <div style={{ marginBottom: '2rem' }}>
    <h3
      style={{
        fontSize: '1.125rem',
        fontWeight: 600,
        marginBottom: '1rem',
        color: '#1f1f1f',
      }}
    >
      Font Sizes
    </h3>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {Object.entries(typography.size).map(([key, value]) => (
        <div
          key={key}
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '1rem',
            padding: '0.75rem',
            backgroundColor: '#f4f4f7',
            borderRadius: '8px',
            border: '1px solid #e8e8e8',
          }}
        >
          <div
            style={{
              minWidth: '80px',
              fontSize: '0.875rem',
              color: '#656565',
              fontFamily: 'monospace',
            }}
          >
            {value}
          </div>
          <div
            style={{
              fontSize: value,
              fontFamily: 'var(--font-family-primary)',
              flex: 1,
              lineHeight: 1.2,
            }}
          >
            {key.toUpperCase()} - 가나다라마바사아자차카타파하
          </div>
          <code
            style={{
              fontSize: '0.75rem',
              backgroundColor: '#ffffff',
              padding: '0.25rem 0.5rem',
              borderRadius: '4px',
              color: '#656565',
            }}
          >
            text-{key}
          </code>
        </div>
      ))}
    </div>
  </div>
);

// 라인 높이 컴포넌트
const LineHeightShowcase = () => (
  <div style={{ marginBottom: '2rem' }}>
    <h3
      style={{
        fontSize: '1.125rem',
        fontWeight: 600,
        marginBottom: '1rem',
        color: '#1f1f1f',
      }}
    >
      Line Heights
    </h3>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {Object.entries(typography.lineHeight).map(([key, value]) => (
        <div
          key={key}
          style={{
            padding: '1rem',
            backgroundColor: '#f4f4f7',
            borderRadius: '8px',
            border: '1px solid #e8e8e8',
            borderLeft: '4px solid #7251f8',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '0.75rem',
            }}
          >
            <span
              style={{
                fontWeight: 500,
                color: '#1f1f1f',
              }}
            >
              {key}
            </span>
            <span
              style={{
                fontSize: '0.875rem',
                color: '#656565',
              }}
            >
              ({value})
            </span>
            <code
              style={{
                fontSize: '0.75rem',
                backgroundColor: '#ffffff',
                padding: '0.25rem 0.5rem',
                borderRadius: '4px',
                color: '#656565',
              }}
            >
              leading-{key}
            </code>
          </div>
          <div
            style={{
              fontSize: '1rem',
              lineHeight: value,
              maxWidth: '600px',
              color: '#1f1f1f',
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 한글 텍스트도 함께
            확인해보세요. 가나다라마바사아자차카타파하 1234567890.
          </div>
        </div>
      ))}
    </div>
  </div>
);

// 시멘틱 타이포그래피 컴포넌트
const SemanticTypographyShowcase = () => (
  <div style={{ marginBottom: '2rem' }}>
    <h3
      style={{
        fontSize: '1.125rem',
        fontWeight: 600,
        marginBottom: '1rem',
        color: '#1f1f1f',
      }}
    >
      Semantic Typography
    </h3>

    {/* 제목 스타일들 */}
    <div style={{ marginBottom: '2rem' }}>
      <h4
        style={{
          fontWeight: 500,
          marginBottom: '1rem',
          color: '#1f1f1f',
          fontSize: '1rem',
        }}
      >
        📝 Headings
      </h4>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          padding: '1.5rem',
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          border: '1px solid #e8e8e8',
        }}
      >
        {(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const).map((heading) => {
          const style = typographyUtils.semantic[heading];
          return (
            <div
              key={heading}
              style={{
                borderBottom: '1px solid #f4f4f7',
                paddingBottom: '1rem',
              }}
            >
              <div
                style={{
                  fontSize: style.fontSize,
                  fontWeight: style.fontWeight,
                  lineHeight: style.lineHeight,
                  fontFamily: 'var(--font-family-primary)',
                  color: '#1f1f1f',
                  marginBottom: '0.5rem',
                }}
              >
                {heading.toUpperCase()} Heading - 제목 스타일 예시
              </div>
              <div
                style={{
                  fontSize: '0.75rem',
                  color: '#656565',
                  fontFamily: 'monospace',
                }}
              >
                {style.fontSize} / {style.fontWeight} / {style.lineHeight}
              </div>
            </div>
          );
        })}
      </div>
    </div>

    {/* 본문 스타일들 */}
    <div style={{ marginBottom: '2rem' }}>
      <h4
        style={{
          fontWeight: 500,
          marginBottom: '1rem',
          color: '#1f1f1f',
          fontSize: '1rem',
        }}
      >
        📄 Body Text
      </h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {(['bodyLarge', 'body', 'bodySmall'] as const).map((bodyType) => {
          const style = typographyUtils.semantic[bodyType];
          return (
            <div
              key={bodyType}
              style={{
                padding: '1rem',
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                border: '1px solid #e8e8e8',
                borderLeft: '4px solid #8e74f9',
              }}
            >
              <div
                style={{
                  fontWeight: 500,
                  marginBottom: '0.5rem',
                  color: '#1f1f1f',
                  fontSize: '0.875rem',
                }}
              >
                {bodyType}
              </div>
              <div
                style={{
                  fontSize: style.fontSize,
                  fontWeight: style.fontWeight,
                  lineHeight: style.lineHeight,
                  fontFamily: 'var(--font-family-primary)',
                  maxWidth: '600px',
                  color: '#1f1f1f',
                  marginBottom: '0.5rem',
                }}
              >
                이것은 {bodyType} 스타일의 본문 텍스트입니다. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. 한글과 영문이 모두 자연스럽게 표시되는지 확인해보세요.
              </div>
              <div
                style={{
                  fontSize: '0.75rem',
                  color: '#656565',
                  fontFamily: 'monospace',
                }}
              >
                {style.fontSize} / {style.fontWeight} / {style.lineHeight}
              </div>
            </div>
          );
        })}
      </div>
    </div>

    {/* 라벨 & 캡션 */}
    <div style={{ marginBottom: '2rem' }}>
      <h4
        style={{
          fontWeight: 500,
          marginBottom: '1rem',
          color: '#1f1f1f',
          fontSize: '1rem',
        }}
      >
        🏷️ Labels & Captions
      </h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {(['label', 'caption'] as const).map((type) => {
          const style = typographyUtils.semantic[type];
          return (
            <div
              key={type}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '0.75rem',
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                border: '1px solid #e8e8e8',
              }}
            >
              <div
                style={{
                  minWidth: '80px',
                  fontSize: '0.875rem',
                  color: '#656565',
                }}
              >
                {type}
              </div>
              <div
                style={{
                  fontSize: style.fontSize,
                  fontWeight: style.fontWeight,
                  lineHeight: style.lineHeight,
                  fontFamily: 'var(--font-family-primary)',
                  color: '#1f1f1f',
                }}
              >
                {type === 'label' ? '라벨 텍스트 / Label Text' : '캡션 텍스트 / Caption Text'}
              </div>
              <div
                style={{
                  fontSize: '0.75rem',
                  color: '#656565',
                  fontFamily: 'monospace',
                }}
              >
                {style.fontSize} / {style.fontWeight}
              </div>
            </div>
          );
        })}
      </div>
    </div>

    {/* 버튼 텍스트 */}
    <div>
      <h4
        style={{
          fontWeight: 500,
          marginBottom: '1rem',
          color: '#1f1f1f',
          fontSize: '1rem',
        }}
      >
        🔘 Button Text
      </h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {(['buttonLarge', 'button', 'buttonSmall'] as const).map((buttonType) => {
          const style = typographyUtils.semantic[buttonType];
          return (
            <div
              key={buttonType}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '0.75rem',
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                border: '1px solid #e8e8e8',
              }}
            >
              <div
                style={{
                  minWidth: '120px',
                  fontSize: '0.875rem',
                  color: '#656565',
                }}
              >
                {buttonType}
              </div>
              <button
                style={{
                  padding:
                    buttonType === 'buttonLarge'
                      ? '0.75rem 1.5rem'
                      : buttonType === 'button'
                        ? '0.5rem 1rem'
                        : '0.375rem 0.75rem',
                  backgroundColor: '#7251f8',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: style.fontSize,
                  fontWeight: style.fontWeight,
                  lineHeight: style.lineHeight,
                  fontFamily: 'var(--font-family-primary)',
                }}
              >
                버튼 텍스트 / Button
              </button>
              <div
                style={{
                  fontSize: '0.75rem',
                  color: '#656565',
                  fontFamily: 'monospace',
                }}
              >
                {style.fontSize} / {style.fontWeight}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

// 폰트 패밀리 컴포넌트
const FontFamilyShowcase = () => (
  <div style={{ marginBottom: '2rem' }}>
    <h3
      style={{
        fontSize: '1.125rem',
        fontWeight: 600,
        marginBottom: '1rem',
        color: '#1f1f1f',
      }}
    >
      Font Family
    </h3>
    <div
      style={{
        padding: '1.5rem',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        border: '1px solid #e8e8e8',
      }}
    >
      <div
        style={{
          fontSize: '1.5rem',
          fontFamily: typographyUtils.getFamily(),
          marginBottom: '1rem',
          color: '#1f1f1f',
        }}
      >
        Noto Sans KR 폰트 패밀리 예시
      </div>
      <div
        style={{
          fontSize: '0.875rem',
          color: '#656565',
          marginBottom: '1rem',
        }}
      >
        Primary Font:{' '}
        <code
          style={{
            backgroundColor: '#f4f4f7',
            padding: '0.25rem 0.5rem',
            borderRadius: '4px',
            fontFamily: 'monospace',
          }}
        >
          {typography.family.primary}
        </code>
      </div>
      <div
        style={{
          fontSize: '1rem',
          fontFamily: typographyUtils.getFamily(),
          maxWidth: '600px',
          lineHeight: 1.6,
          color: '#1f1f1f',
        }}
      >
        가나다라마바사아자차카타파하 ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz
        1234567890
        <br />
        한글과 영문, 숫자가 모두 조화롭게 표시되는 것을 확인할 수 있습니다.
      </div>
    </div>
  </div>
);

export const AllTypography: Story = {
  render: () => (
    <div style={{ padding: '1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1
        style={{
          fontSize: '2rem',
          fontWeight: 700,
          marginBottom: '1.5rem',
          color: '#1f1f1f',
          fontFamily: 'var(--font-family-primary)',
        }}
      >
        ✍️ Typography Tokens
      </h1>

      <FontFamilyShowcase />
      <FontWeightShowcase />
      <FontSizeShowcase />
      <LineHeightShowcase />
      <SemanticTypographyShowcase />

      {/* 사용법 가이드 */}
      <div
        style={{
          marginTop: '2rem',
          padding: '1rem',
          backgroundColor: '#f4f4f7',
          borderRadius: '8px',
          border: '1px solid #e8e8e8',
        }}
      >
        <h4
          style={{
            fontWeight: 500,
            marginBottom: '0.5rem',
            color: '#1f1f1f',
          }}
        >
          💡 사용 방법
        </h4>
        <div style={{ fontSize: '0.875rem', color: '#656565' }}>
          <div style={{ marginBottom: '0.5rem' }}>
            <code
              style={{
                backgroundColor: '#ffffff',
                padding: '0.25rem 0.5rem',
                borderRadius: '4px',
                fontFamily: 'monospace',
              }}
            >
              typography.weight.medium
            </code>{' '}
            - 폰트 웨이트 값 (500)
          </div>
          <div style={{ marginBottom: '0.5rem' }}>
            <code
              style={{
                backgroundColor: '#ffffff',
                padding: '0.25rem 0.5rem',
                borderRadius: '4px',
                fontFamily: 'monospace',
              }}
            >
              typographyUtils.getWeight(&apos;medium&apos;)
            </code>{' '}
            - 유틸리티 함수 사용
          </div>
          <div style={{ marginBottom: '0.5rem' }}>
            <code
              style={{
                backgroundColor: '#ffffff',
                padding: '0.25rem 0.5rem',
                borderRadius: '4px',
                fontFamily: 'monospace',
              }}
            >
              typographyUtils.semantic.h1
            </code>{' '}
            - 시멘틱 타이포그래피 사용
          </div>
          <div>
            <code
              style={{
                backgroundColor: '#ffffff',
                padding: '0.25rem 0.5rem',
                borderRadius: '4px',
                fontFamily: 'monospace',
              }}
            >
              typographyUtils.weightClass.medium
            </code>{' '}
            - Tailwind 클래스명 (&apos;font-medium&apos;)
          </div>
        </div>
      </div>
    </div>
  ),
};

export const FontWeights: Story = {
  render: () => (
    <div style={{ padding: '1.5rem' }}>
      <FontWeightShowcase />
    </div>
  ),
};

export const FontSizes: Story = {
  render: () => (
    <div style={{ padding: '1.5rem' }}>
      <FontSizeShowcase />
    </div>
  ),
};

export const LineHeights: Story = {
  render: () => (
    <div style={{ padding: '1.5rem' }}>
      <LineHeightShowcase />
    </div>
  ),
};

export const SemanticTypography: Story = {
  render: () => (
    <div style={{ padding: '1.5rem' }}>
      <SemanticTypographyShowcase />
    </div>
  ),
};

export const FontFamily: Story = {
  render: () => (
    <div style={{ padding: '1.5rem' }}>
      <FontFamilyShowcase />
    </div>
  ),
};
