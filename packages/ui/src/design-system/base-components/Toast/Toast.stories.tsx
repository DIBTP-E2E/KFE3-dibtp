import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import { ToastProvider } from './Toast';
import { toast } from './utils/toast';
import { Button } from '../Button';

const meta: Meta<typeof ToastProvider> = {
  title: 'Design System/Base Components/Toast',
  component: ToastProvider,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
Sonner 기반의 토스트 메시지 컴포넌트입니다.
사용자에게 피드백을 제공하는 비침습적 알림 시스템으로, 성공, 오류, 경고, 정보 메시지를 표시할 수 있습니다.

## 주요 기능
- ✅ **4가지 토스트 타입**: success, error, warning, info
- ✅ **Promise 기반 토스트**: 비동기 작업의 로딩 → 성공/실패 자동 처리
- ✅ **액션 버튼 지원**: 토스트에 실행 가능한 버튼 추가
- ✅ **커스터마이징**: 위치, 테마, 지속시간, 최대 개수 설정
- ✅ **모바일 최적화**: 스와이프 제스처 및 터치 인터랙션 지원
- ✅ **접근성**: 스크린 리더 및 키보드 내비게이션 지원

## 설치 및 설정

### 1. Provider 설정 (필수)
앱의 최상단에서 ToastProvider를 설정해주세요:

\`\`\`tsx
import { ToastProvider } from '@repo/ui/components/Toast';

function App() {
  return (
    <>
      <ToastProvider 
        position="bottom-center"
        theme="system"
        duration={4000}
        visibleToasts={3}
      />
      {/* 나머지 앱 컴포넌트 */}
    </>
  );
}
\`\`\`

## 기본 사용법

### 2. toast 유틸리티 함수 사용
\`\`\`tsx
import { toast } from '@repo/ui/components/Toast';

function MyComponent() {
  // 기본 토스트
  const handleSuccess = () => {
    toast.success('성공적으로 저장되었습니다!');
  };

  const handleError = () => {
    toast.error('오류가 발생했습니다.');
  };

  // 액션 버튼과 함께
  const handleWithAction = () => {
    toast.success('파일이 업로드되었습니다!', {
      action: {
        label: '보기',
        onClick: () => router.push('/files')
      }
    });
  };

  // 취소 버튼과 함께
  const handleWithCancel = () => {
    toast.warning('파일을 삭제하시겠습니까?', {
      cancel: {
        label: '취소',
        onClick: () => toast.dismiss()
      },
      action: {
        label: '삭제',
        onClick: () => deleteFile()
      }
    });
  };
}
\`\`\`

## 고급 사용법

### Promise 기반 토스트
비동기 작업의 상태를 자동으로 관리합니다:

\`\`\`tsx
// 로딩 → 성공/실패 자동 전환
toast.promise(
  fetch('/api/save').then(res => res.json()),
  {
    loading: '저장 중...',
    success: (data) => \`\${data.name}이 저장되었습니다!\`,
    error: '저장에 실패했습니다.'
  }
);
\`\`\`

### 토스트 제어
\`\`\`tsx
// 로딩 토스트 표시 후 수동 제어
const loadingId = toast.loading('처리 중...');

// 특정 토스트 닫기
toast.dismiss(loadingId);

// 모든 토스트 닫기
toast.dismissAll();
\`\`\`

### 커스텀 옵션
\`\`\`tsx
toast.success('메시지', {
  duration: 5000,        // 5초 동안 표시
  id: 'unique-id',       // 중복 방지
  position: 'top-right'  // 개별 위치 설정
});
\`\`\`

## 토스트 타입별 사용 사례

- **success**: 데이터 저장, 파일 업로드, 작업 완료
- **error**: API 오류, 유효성 검사 실패, 네트워크 오류
- **warning**: 확인이 필요한 작업, 주의사항
- **info**: 일반 정보, 알림, 업데이트 소식

## Provider 설정 옵션

| Props | 타입 | 기본값 | 설명 |
|-------|------|--------|------|
| position | string | 'bottom-center' | 토스트 표시 위치 |
| theme | string | 'system' | 테마 (light/dark/system) |
| duration | number | 4000 | 기본 지속 시간 (ms) |
| visibleToasts | number | 3 | 최대 표시 개수 |
| expand | boolean | false | 토스트 확장 여부 |
| closeButton | boolean | false | 닫기 버튼 표시 |

        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'select',
      options: ['light', 'dark', 'system'],
      description: '토스트 테마',
    },
    position: {
      control: 'select',
      options: [
        'top-left',
        'top-center',
        'top-right',
        'bottom-left',
        'bottom-center',
        'bottom-right',
      ],
      description: '토스트 위치',
    },
    duration: {
      control: 'number',
      description: '토스트 지속 시간 (ms)',
    },
    visibleToasts: {
      control: 'number',
      description: '최대 표시 토스트 개수',
    },
    expand: {
      control: 'boolean',
      description: '토스트 확장 여부',
    },
    closeButton: {
      control: 'boolean',
      description: '닫기 버튼 표시',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ToastProvider>;

// Toast 데모를 위한 래퍼 컴포넌트
const ToastDemo = (args: Story['args']) => {
  const [loadingToastId, setLoadingToastId] = useState<string | number | null>(null);

  const handleSuccess = () => {
    toast.success('성공적으로 처리되었습니다!', {
      action: {
        label: '보기',
        onClick: () => console.log('보기 클릭'),
      },
    });
  };

  const handleError = () => {
    toast.error('오류가 발생했습니다!', {
      action: {
        label: '재시도',
        onClick: () => console.log('재시도 클릭'),
      },
    });
  };

  const handleWarning = () => {
    toast.warning('주의하세요!', {
      cancel: {
        label: '취소',
        onClick: () => console.log('취소 클릭'),
      },
      action: {
        label: '계속',
        onClick: () => console.log('계속 클릭'),
      },
    });
  };

  const handleInfo = () => {
    toast.info('정보 알림입니다.');
  };

  const handleLoading = () => {
    const id = toast.loading('처리 중입니다...', {
      duration: Infinity,
    });
    setLoadingToastId(id);
  };

  const handlePromise = () => {
    const mockPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.5) {
          resolve('성공!');
        } else {
          reject(new Error('실패!'));
        }
      }, 2000);
    });

    toast.promise(mockPromise, {
      loading: '데이터 저장 중...',
      success: '데이터가 성공적으로 저장되었습니다!',
      error: '저장에 실패했습니다.',
    });
  };

  const handleDismissLoading = () => {
    if (loadingToastId) {
      toast.dismiss(loadingToastId);
      setLoadingToastId(null);
    }
  };

  const sectionClasses = 'flex flex-col gap-md';
  const headingClasses = 'font-style-headline-h4';
  const gridClasses = 'grid grid-cols-2 md:grid-cols-3 gap-md';

  return (
    <section className="p-lg space-y-md flex flex-col gap-lg">
      <ToastProvider {...args} />

      <section className={sectionClasses}>
        <h2 className={headingClasses}>이벤트 처리 전 - 안내 토스트</h2>

        <div className={gridClasses}>
          <Button onClick={handleWarning} color="darkMode" size="md">
            경고 안내 토스트 메시지 확인하기
          </Button>

          <Button onClick={handleInfo} color="primary" size="md">
            정보 알림 토스트 메시지 확인하기
          </Button>
        </div>
      </section>

      <section className={sectionClasses}>
        <h2 className={headingClasses}>이벤트 비동기 처리 결과 - 상태 알림 토스트</h2>

        <div className={gridClasses}>
          <Button onClick={handlePromise} color="primary" size="md">
            Promise 안내 토스트 확인하기 <br />
            (로딩, 실패, 성공)
          </Button>

          <Button onClick={handleSuccess} color="success" size="md">
            Success 안내 토스트 확인하기
          </Button>

          <Button onClick={handleError} color="danger" size="md">
            Error 안내 토스트 확인하기
          </Button>
        </div>
      </section>

      <section className={sectionClasses}>
        <h2 className={headingClasses}>로딩 상태 알림 토스트</h2>

        <div className={gridClasses}>
          <Button onClick={handleLoading} color="darkMode" size="md">
            로딩 토스트 확인하기
          </Button>

          <Button onClick={handleDismissLoading} color="lightMode" variant="outlined" size="md">
            로딩 토스트 닫기
          </Button>
        </div>
      </section>

      <section className={sectionClasses}>
        <h2 className={headingClasses}>모든 알림 닫기</h2>

        <div className={gridClasses}>
          <Button onClick={toast.dismissAll} color="lightMode" variant="outlined" size="md">
            토스트 알림 모두 닫기
          </Button>
        </div>
      </section>

      <div className="mt-lg p-md bg-bg-base rounded-lg">
        <h3 className="font-style-large mb-sm">사용 예시</h3>
        <pre className="font-style-small bg-bg-base p-sm rounded overflow-x-auto">
          {`// toast 유틸리티 함수 사용
import { toast } from '@repo/ui/components';

toast.success('성공!');
toast.error('실패!');

// 액션 버튼과 함께
toast.success('저장 완료', {
  action: {
    label: '보기',
    onClick: () => router.push('/view')
  }
});

// Promise 기반
toast.promise(
  saveData(),
  {
    loading: '저장 중...',
    success: '저장 완료!',
    error: '저장 실패'
  }
);

`}
        </pre>
      </div>
    </section>
  );
};

export const Default: Story = {
  render: (args) => <ToastDemo {...args} />,
  args: {
    theme: 'system',
    position: 'bottom-center',
    duration: 4000,
    visibleToasts: 3,
    expand: false,
    closeButton: false,
  },
  parameters: {
    docs: {
      description: {
        story: '기본 토스트 설정입니다. 다양한 토스트 타입을 테스트해볼 수 있습니다.',
      },
    },
  },
};

export const TopPosition: Story = {
  render: (args) => <ToastDemo {...args} />,
  args: {
    ...Default.args,
    position: 'top-center',
  },
  parameters: {
    docs: {
      description: {
        story:
          '화면 상단에 토스트를 표시합니다. 헤더나 상단 네비게이션과 겹치지 않도록 주의해주세요.',
      },
    },
  },
};

export const Expanded: Story = {
  render: (args) => <ToastDemo {...args} />,
  args: {
    ...Default.args,
    expand: true,
    visibleToasts: 5,
  },
  parameters: {
    docs: {
      description: {
        story:
          '토스트를 확장 모드로 표시하여 더 많은 토스트를 동시에 볼 수 있습니다. 최대 5개까지 표시됩니다.',
      },
    },
  },
};
