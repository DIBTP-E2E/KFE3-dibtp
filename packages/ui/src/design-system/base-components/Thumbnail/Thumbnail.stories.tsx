import type { Meta, StoryObj } from '@storybook/nextjs';
import { default as Thumbnail } from './Thumbnail';

const meta = {
  title: 'Design System/Base Components/Thumbnail',
  component: Thumbnail,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
이미지 썸네일을 표시하는 컴포넌트입니다.

## 주요 기능
- 정사각형(1:1) 및 원본 비율 지원
- 다양한 모서리 둥글기 옵션 (none, sm, xl, full)
- 픽셀 기반 크기 조절
- 반응형 디자인 (w-full 기본값)

## 사용 가이드
- **aspectRatio="square"**: 1:1 정사각형 비율로 표시 (기본값)
- **aspectRatio="auto"**: 이미지 원본 비율 유지
- **width**: 픽셀값 지정 (CLS 방지용)
- **height**: 픽셀값 지정 (aspectRatio가 "auto"일 때만 적용)
- **rounded**: 모서리 둥글기 조절 ( none < sm < xl < full )
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    imgUrl: {
      control: 'text',
      description: '썸네일 이미지 URL',
    },
    rounded: {
      control: 'select',
      options: ['none', 'sm', 'xl', 'full'],
      description:
        '이미지 모서리 둥글기 - none(직각), sm(작은 둥글기), xl(큰 둥글기), full(완전 둥근 모서리)',
      table: {
        type: { summary: 'none | sm | xl | full' },
        defaultValue: { summary: 'xl' },
      },
    },
    aspectRatio: {
      control: 'select',
      options: ['square', 'auto'],
      description: '이미지 비율 - square(1:1 정사각형) 또는 auto(원본 비율)',
      table: {
        type: { summary: 'square | auto' },
        defaultValue: { summary: 'square' },
      },
    },
    width: {
      control: 'number',
      description: '이미지 너비',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '400' },
      },
    },
    height: {
      control: 'number',
      description: '이미지 높이',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '400' },
      },
    },
    containerWidth: {
      control: 'text',
      description: '컨테이너 너비 (Tailwind 클래스)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'w-full' },
      },
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
    },
  },
} satisfies Meta<typeof Thumbnail>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리 (square 비율), w-full 동작 명시적 표시
export const Default: Story = {
  args: {
    imgUrl:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&crop=center',
  },
  render: (args) => (
    <div className="w-96 rounded border border-gray-300 p-4">
      <p className="mb-2 text-sm text-gray-600">부모 컨테이너 (w-96)</p>
      <Thumbnail {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '기본 상태 width prop이 없을 때의 실제 동작 - aspectRatio="square"가 기본값이고, width가 없으면 w-full이 적용되어 부모 컨테이너의 전체 너비를 차지합니다.',
      },
    },
  },
};

// 모서리 둥글기 비교
export const RoundedComparison: Story = {
  args: {
    imgUrl:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&crop=center',
  },
  render: () => (
    <div className="flex flex-wrap items-end gap-4">
      <div className="text-center">
        <Thumbnail
          imgUrl="https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&crop=center"
          containerWidth="w-32"
          width={128}
          rounded="none"
        />
        <p className="mt-2 text-sm text-gray-600">none</p>
      </div>
      <div className="text-center">
        <Thumbnail
          imgUrl="https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&crop=center"
          containerWidth="w-32"
          width={128}
          rounded="sm"
        />
        <p className="mt-2 text-sm text-gray-600">sm</p>
      </div>
      <div className="text-center">
        <Thumbnail
          imgUrl="https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&crop=center"
          containerWidth="w-32"
          width={128}
          rounded="xl"
        />
        <p className="mt-2 text-sm text-gray-600">xl</p>
      </div>
      <div className="text-center">
        <Thumbnail
          imgUrl="https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&crop=center"
          containerWidth="w-32"
          width={128}
          rounded="full"
        />
        <p className="mt-2 text-sm text-gray-600">full</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 Tailwind rounded 클래스 크기 비교',
      },
    },
  },
};

// Tailwind width 클래스 사용
export const WithTailwindWidth: Story = {
  args: {
    imgUrl:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&crop=center',
    containerWidth: 'w-64',
    width: 256,
  },
  parameters: {
    docs: {
      description: {
        story: '숫자값(256px)을 사용한 너비 지정',
      },
    },
  },
};

// 자유 비율 (auto)
export const AutoAspectRatio: Story = {
  args: {
    imgUrl:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=450&fit=crop&crop=center',
    aspectRatio: 'auto',
    containerWidth: 'w-[300px]',
    width: 300,
  },
  parameters: {
    docs: {
      description: {
        story: 'aspectRatio="auto" - 이미지 원본 비율 유지',
      },
    },
  },
};

// 자유 비율 + 높이 지정
export const AutoWithHeight: Story = {
  args: {
    imgUrl:
      'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=600&h=400&fit=crop&crop=center',
    aspectRatio: 'auto',
    containerWidth: 'w-[300px]',
    width: 300,
    height: 200,
  },
  parameters: {
    docs: {
      description: {
        story: 'aspectRatio="auto"일 때 width와 height를 모두 지정',
      },
    },
  },
};

// 추가 스타일링
export const WithCustomStyling: Story = {
  args: {
    imgUrl:
      'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=600&h=400&fit=crop&crop=center',
    containerWidth: 'w-[250px]',
    width: 250,
    className: 'rounded-md shadow-sm border-2 border-gray-200',
  },
  parameters: {
    docs: {
      description: {
        story: '추가 className으로 스타일링을 적용한 경우',
      },
    },
  },
};

// 다양한 컨테이너에서의 w-full 동작
export const WidthBehaviorComparison: Story = {
  args: {
    imgUrl:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&crop=center',
  },
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 font-semibold text-gray-800">Square 비율 (1:1)</h3>
        <div className="flex items-end gap-4">
          <div className="text-center">
            <Thumbnail
              imgUrl="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&crop=center"
              aspectRatio="square"
              containerWidth="w-24"
              width={96}
            />
            <p className="mt-2 text-sm text-gray-600">96px</p>
          </div>
          <div className="text-center">
            <Thumbnail
              imgUrl="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&crop=center"
              aspectRatio="square"
              containerWidth="w-32"
              width={128}
            />
            <p className="mt-2 text-sm text-gray-600">128px</p>
          </div>
          <div className="text-center">
            <Thumbnail
              imgUrl="https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&crop=center"
              aspectRatio="square"
              containerWidth="w-48"
              width={192}
            />
            <p className="mt-2 text-sm text-gray-600">192px</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 font-semibold text-gray-800">Auto 비율 (원본 유지)</h3>
        <div className="flex items-end gap-4">
          <div className="text-center">
            <Thumbnail
              imgUrl="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&crop=center"
              aspectRatio="auto"
              containerWidth="w-32"
              width={128}
            />
            <p className="mt-2 text-sm text-gray-600">정사각형 원본</p>
          </div>
          <div className="text-center">
            <Thumbnail
              imgUrl="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=450&fit=crop&crop=center"
              aspectRatio="auto"
              containerWidth="w-48"
              width={192}
            />
            <p className="mt-2 text-sm text-gray-600">가로형 원본</p>
          </div>
          <div className="text-center">
            <Thumbnail
              imgUrl="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=450&h=800&fit=crop&crop=center"
              aspectRatio="auto"
              containerWidth="w-24"
              width={96}
            />
            <p className="mt-2 text-sm text-gray-600">세로형 원본</p>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'square vs auto aspectRatio 비교 - 동일한 이미지의 다른 비율 처리',
      },
    },
  },
};

// 크기 비교
export const SizeComparison: Story = {
  args: {
    imgUrl:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&crop=center',
  },
  render: () => (
    <div className="flex flex-wrap items-end gap-4">
      <div className="text-center">
        <Thumbnail
          imgUrl="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&crop=center"
          containerWidth="w-16"
          width={64}
        />
        <p className="mt-2 text-sm text-gray-600">64px</p>
      </div>
      <div className="text-center">
        <Thumbnail
          imgUrl="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&crop=center"
          containerWidth="w-24"
          width={96}
        />
        <p className="mt-2 text-sm text-gray-600">96px</p>
      </div>
      <div className="text-center">
        <Thumbnail
          imgUrl="https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&crop=center"
          containerWidth="w-32"
          width={128}
        />
        <p className="mt-2 text-sm text-gray-600">128px</p>
      </div>
      <div className="text-center">
        <Thumbnail
          imgUrl="https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop&crop=center"
          containerWidth="w-48"
          width={192}
        />
        <p className="mt-2 text-sm text-gray-600">192px</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 픽셀 크기 비교',
      },
    },
  },
};

// 그리드에서 사용
export const InGrid: Story = {
  args: {
    imgUrl:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&crop=center',
  },
  render: () => (
    <div className="grid max-w-lg grid-cols-3 gap-4">
      <Thumbnail imgUrl="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&crop=center" />
      <Thumbnail imgUrl="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&crop=center" />
      <Thumbnail imgUrl="https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&crop=center" />
      <Thumbnail imgUrl="https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop&crop=center" />
      <Thumbnail imgUrl="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop&crop=center" />
      <Thumbnail imgUrl="https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=400&h=400&fit=crop&crop=center" />
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: '그리드 레이아웃에서 사용된 모습 (기본 w-full 적용)',
      },
    },
  },
};

// 에러 상태들
export const ErrorStates: Story = {
  args: {
    imgUrl: 'https://this-url-does-not-exist.jpg',
  },
  render: () => (
    <div className="grid max-w-2xl grid-cols-3 gap-4">
      <div className="text-center">
        <Thumbnail imgUrl="https://this-url-does-not-exist.jpg" containerWidth="w-32" width={128} />
        <p className="mt-2 text-sm text-gray-600">존재하지 않는 URL</p>
      </div>
      <div className="text-center">
        <Thumbnail imgUrl="invalid-url" containerWidth="w-32" width={128} />
        <p className="mt-2 text-sm text-gray-600">잘못된 URL 형식</p>
      </div>
      <div className="text-center">
        <Thumbnail imgUrl="" containerWidth="w-32" width={128} />
        <p className="mt-2 text-sm text-gray-600">빈 URL</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '다양한 에러 상황에서의 썸네일 표시 - 브라우저 기본 동작에 따라 alt 텍스트나 깨진 이미지 아이콘이 표시됩니다',
      },
    },
  },
};
