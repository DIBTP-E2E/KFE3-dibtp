import type { IconName } from '@ui/components/Icons';
import type { Meta, StoryObj } from '@storybook/nextjs';

import IconButton from './IconButton';

const meta: Meta<typeof IconButton> = {
  title: 'Design System/Base Components/Icon Button',
  component: IconButton,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
아이콘 버튼 컴포넌트입니다.

## 주요 기능
- ✅ 다양한 아이콘 지원
- ✅ 5가지 색상 테마 (light, darkMode, primary, secondary, danger)
- ✅ 2가지 스타일 (fulled, outlined)
- ✅ 5가지 크기 (xs, sm, md, lg, xl)
- ✅ 접근성 지원 (aria-label)
- ✅ 다형성 컴포넌트 (as prop)
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    iconName: {
      control: { type: 'select' },
      options: ['Bell', 'Bell', 'ArrowLeft', 'Heart', 'Home', 'Export'],
      description: '아이콘 이름',
    },
    iconSize: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: '아이콘 크기',
    },
    color: {
      control: { type: 'select' },
      options: ['light', 'darkMode', 'primary', 'secondary', 'danger'],
      description: '색상 테마',
    },
    variant: {
      control: { type: 'select' },
      options: ['fulled', 'outlined'],
      description: '스타일 변형',
    },
    buttonSize: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: '버튼 크기',
    },
    ariaLabel: {
      control: { type: 'text' },
      description: '접근성 라벨',
    },
    as: {
      control: { type: 'select' },
      options: ['button', 'div', 'span'],
      description: '렌더링할 HTML 요소',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-bg-light w-full flex flex-col justify-center items-center p-lg">
      {children}
    </div>
  );
};

const DarkBg = ({ children }: { children: React.ReactNode }) => {
  return <div className="bg-bg-dark rounded-md p-md">{children}</div>;
};

const Table = ({ children }: { children: React.ReactNode }) => {
  return (
    <table style={{ maxWidth: '500px', width: '100%', textAlign: 'center' }}>{children}</table>
  );
};

const Th = ({ children }: { children: React.ReactNode }) => {
  return <th style={{ padding: '16px', fontWeight: '500' }}>{children}</th>;
};

const Td = ({ children }: { children: React.ReactNode }) => {
  return <td style={{ padding: '16px', width: '35%' }}>{children}</td>;
};

const IconsTable = ({ iconName, ariaLabel }: { iconName: IconName; ariaLabel: string }) => {
  return (
    <Container>
      <caption
        style={{ maxWidth: '500px', width: '100%' }}
        className="flex justify-between items-center bg-bg-dark p-md text-text-inverse font-style-large"
      >
        <span>sm</span>
        <span>{iconName}</span>
        <span>{ariaLabel}</span>
      </caption>
      <Table>
        <thead>
          <tr>
            <Th>Variant / Color</Th>
            <Th>fulled</Th>
            <Th>outlined</Th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <Th>isTransparent</Th>
            <Td>
              <IconButton
                isTransparent
                iconName={iconName}
                iconSize="md"
                color="lightMode"
                variant="fulled"
                buttonSize="sm"
                ariaLabel={ariaLabel}
                style={{
                  width: '40px',
                  height: '40px',
                }}
              />
            </Td>
            <Th>
              <IconButton
                isTransparent
                iconName={iconName}
                iconSize="md"
                color="lightMode"
                variant="outlined"
                buttonSize="sm"
                ariaLabel={ariaLabel}
                style={{
                  width: '40px',
                  height: '40px',
                }}
              />
            </Th>
          </tr>
          <tr>
            <Th>lightMode</Th>
            <Td>
              <IconButton
                iconName={iconName}
                iconSize="md"
                color="lightMode"
                variant="fulled"
                buttonSize="sm"
                ariaLabel={ariaLabel}
                style={{
                  width: '40px',
                  height: '40px',
                }}
              />
            </Td>
            <Th>
              <IconButton
                iconName={iconName}
                iconSize="md"
                color="lightMode"
                variant="outlined"
                buttonSize="sm"
                ariaLabel={ariaLabel}
                style={{
                  width: '40px',
                  height: '40px',
                }}
              />
            </Th>
          </tr>
          <tr>
            <Th>darkMode</Th>
            <Td>
              <IconButton
                iconName={iconName}
                iconSize="md"
                color="darkMode"
                variant="fulled"
                buttonSize="sm"
                ariaLabel={ariaLabel}
                style={{
                  width: '40px',
                  height: '40px',
                }}
              />
            </Td>
            <Td>
              <DarkBg>
                <IconButton
                  iconName={iconName}
                  iconSize="md"
                  color="darkMode"
                  variant="outlined"
                  buttonSize="sm"
                  ariaLabel={ariaLabel}
                  style={{
                    width: '44px',
                    height: '44px',
                  }}
                />
              </DarkBg>
            </Td>
          </tr>
          <tr>
            <Th>primary</Th>
            <Td>
              <IconButton
                iconName={iconName}
                iconSize="md"
                color="primary"
                variant="fulled"
                buttonSize="sm"
                ariaLabel={ariaLabel}
                style={{
                  width: '40px',
                  height: '40px',
                }}
              />
            </Td>
            <Td>
              <IconButton
                iconName={iconName}
                iconSize="md"
                color="primary"
                variant="outlined"
                buttonSize="sm"
                ariaLabel={ariaLabel}
                style={{
                  width: '40px',
                  height: '40px',
                }}
              />
            </Td>
          </tr>
          <tr>
            <Th>secondary</Th>
            <Td>
              <IconButton
                iconName={iconName}
                iconSize="md"
                color="secondary"
                variant="fulled"
                buttonSize="sm"
                ariaLabel={ariaLabel}
                style={{
                  width: '40px',
                  height: '40px',
                }}
              />
            </Td>
            <Td>
              <IconButton
                iconName={iconName}
                iconSize="md"
                color="secondary"
                variant="outlined"
                buttonSize="sm"
                ariaLabel={ariaLabel}
                style={{
                  width: '40px',
                  height: '40px',
                }}
              />
            </Td>
          </tr>
          <tr>
            <Th>danger</Th>
            <Td>
              <IconButton
                iconName={iconName}
                iconSize="md"
                color="danger"
                variant="fulled"
                buttonSize="sm"
                ariaLabel={ariaLabel}
                style={{
                  width: '40px',
                  height: '40px',
                }}
              />
            </Td>
            <Td>
              <IconButton
                iconName={iconName}
                iconSize="md"
                color="danger"
                variant="outlined"
                buttonSize="sm"
                ariaLabel={ariaLabel}
                style={{
                  width: '40px',
                  height: '40px',
                }}
              />
            </Td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export const Colors: Story = {
  render: () => <IconsTable iconName="Heart" ariaLabel="좋아요" />,
  parameters: {
    docs: {
      description: {
        story: '다양한 색상을 비교해볼 수 있습니다.',
      },
    },
  },
};

export const SizesAndFulledColors: Story = {
  render: () => (
    <Container>
      <Table>
        <thead>
          <tr>
            <Th>Size / Color</Th>
            <Th>xs (32px)</Th>
            <Th>sm (40px)</Th>
            <Th>md (44px)</Th>
            <Th>lg (48px)</Th>
            <Th>xl (56px)</Th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <Th>lightMode</Th>
            <Td>
              <IconButton
                iconName="Bell"
                iconSize="xs"
                color="lightMode"
                variant="fulled"
                buttonSize="xs"
                ariaLabel="알림"
                style={{
                  width: '32px',
                  height: '32px',
                }}
              />
            </Td>
            <Td>
              <IconButton
                iconName="Bell"
                iconSize="sm"
                color="lightMode"
                variant="fulled"
                buttonSize="sm"
                ariaLabel="알림"
                style={{
                  width: '40px',
                  height: '40px',
                }}
              />
            </Td>
            <Td>
              <IconButton
                iconName="Bell"
                iconSize="md"
                color="lightMode"
                variant="fulled"
                buttonSize="md"
                ariaLabel="알림"
                style={{
                  width: '44px',
                  height: '44px',
                }}
              />
            </Td>
            <Td>
              <IconButton
                iconName="Bell"
                iconSize="lg"
                color="lightMode"
                variant="fulled"
                buttonSize="lg"
                ariaLabel="알림"
                style={{
                  width: '48px',
                  height: '48px',
                }}
              />
            </Td>
            <Td>
              <IconButton
                iconName="Bell"
                iconSize="xl"
                color="lightMode"
                variant="fulled"
                buttonSize="xl"
                ariaLabel="알림"
                style={{
                  width: '56px',
                  height: '56px',
                }}
              />
            </Td>
          </tr>
          <tr>
            <Th>darkMode</Th>
            <Td>
              <IconButton
                iconName="Bell"
                iconSize="xs"
                color="darkMode"
                variant="fulled"
                buttonSize="xs"
                ariaLabel="알림"
                style={{
                  width: '32px',
                  height: '32px',
                }}
              />
            </Td>
            <Td>
              <IconButton
                iconName="Bell"
                iconSize="sm"
                color="darkMode"
                variant="fulled"
                buttonSize="sm"
                ariaLabel="알림"
                style={{
                  width: '40px',
                  height: '40px',
                }}
              />
            </Td>
            <Td>
              <IconButton
                iconName="Bell"
                iconSize="md"
                color="darkMode"
                variant="fulled"
                buttonSize="md"
                ariaLabel="알림"
                style={{
                  width: '44px',
                  height: '44px',
                }}
              />
            </Td>
            <Td>
              <IconButton
                iconName="Bell"
                iconSize="lg"
                color="darkMode"
                variant="fulled"
                buttonSize="lg"
                ariaLabel="알림"
                style={{
                  width: '48px',
                  height: '48px',
                }}
              />
            </Td>
            <Td>
              <IconButton
                iconName="Bell"
                iconSize="xl"
                color="darkMode"
                variant="fulled"
                buttonSize="xl"
                ariaLabel="알림"
                style={{
                  width: '56px',
                  height: '56px',
                }}
              />
            </Td>
          </tr>
          <tr>
            <Th>primary</Th>
            <Td>
              <IconButton
                iconName="Bell"
                iconSize="xs"
                color="primary"
                variant="fulled"
                buttonSize="xs"
                ariaLabel="알림"
                style={{
                  width: '32px',
                  height: '32px',
                }}
              />
            </Td>
            <Td>
              <IconButton
                iconName="Bell"
                iconSize="sm"
                color="primary"
                variant="fulled"
                buttonSize="sm"
                ariaLabel="알림"
                style={{
                  width: '40px',
                  height: '40px',
                }}
              />
            </Td>
            <Td>
              <IconButton
                iconName="Bell"
                iconSize="md"
                color="primary"
                variant="fulled"
                buttonSize="md"
                ariaLabel="알림"
                style={{
                  width: '44px',
                  height: '44px',
                }}
              />
            </Td>
            <Td>
              <IconButton
                iconName="Bell"
                iconSize="lg"
                color="primary"
                variant="fulled"
                buttonSize="lg"
                ariaLabel="알림"
                style={{
                  width: '48px',
                  height: '48px',
                }}
              />
            </Td>
            <Td>
              <IconButton
                iconName="Bell"
                iconSize="xl"
                color="primary"
                variant="fulled"
                buttonSize="xl"
                ariaLabel="알림"
                style={{
                  width: '56px',
                  height: '56px',
                }}
              />
            </Td>
          </tr>
          <tr>
            <Th>secondary</Th>
            <Td>
              <IconButton
                iconName="Bell"
                iconSize="xs"
                color="secondary"
                variant="fulled"
                buttonSize="xs"
                ariaLabel="알림"
                style={{
                  width: '32px',
                  height: '32px',
                }}
              />
            </Td>
            <Td>
              <IconButton
                iconName="Bell"
                iconSize="sm"
                color="secondary"
                variant="fulled"
                buttonSize="sm"
                ariaLabel="알림"
                style={{
                  width: '40px',
                  height: '40px',
                }}
              />
            </Td>
            <Td>
              <IconButton
                iconName="Bell"
                iconSize="md"
                color="secondary"
                variant="fulled"
                buttonSize="md"
                ariaLabel="알림"
                style={{
                  width: '44px',
                  height: '44px',
                }}
              />
            </Td>
            <Td>
              <IconButton
                iconName="Bell"
                iconSize="lg"
                color="secondary"
                variant="fulled"
                buttonSize="lg"
                ariaLabel="알림"
                style={{
                  width: '48px',
                  height: '48px',
                }}
              />
            </Td>
            <Td>
              <IconButton
                iconName="Bell"
                iconSize="xl"
                color="secondary"
                variant="fulled"
                buttonSize="xl"
                ariaLabel="알림"
                style={{
                  width: '56px',
                  height: '56px',
                }}
              />
            </Td>
          </tr>
          <tr>
            <Th>danger</Th>
            <Td>
              <IconButton
                iconName="Bell"
                iconSize="xs"
                color="danger"
                variant="fulled"
                buttonSize="xs"
                ariaLabel="알림"
                style={{
                  width: '32px',
                  height: '32px',
                }}
              />
            </Td>
            <Td>
              <IconButton
                iconName="Bell"
                iconSize="sm"
                color="danger"
                variant="fulled"
                buttonSize="sm"
                ariaLabel="알림"
                style={{
                  width: '40px',
                  height: '40px',
                }}
              />
            </Td>
            <Td>
              <IconButton
                iconName="Bell"
                iconSize="md"
                color="danger"
                variant="fulled"
                buttonSize="md"
                ariaLabel="알림"
                style={{
                  width: '44px',
                  height: '44px',
                }}
              />
            </Td>
            <Td>
              <IconButton
                iconName="Bell"
                iconSize="lg"
                color="danger"
                variant="fulled"
                buttonSize="lg"
                ariaLabel="알림"
                style={{
                  width: '48px',
                  height: '48px',
                }}
              />
            </Td>
            <Td>
              <IconButton
                iconName="Bell"
                iconSize="xl"
                color="danger"
                variant="fulled"
                buttonSize="xl"
                ariaLabel="알림"
                style={{
                  width: '56px',
                  height: '56px',
                }}
              />
            </Td>
          </tr>
        </tbody>
      </Table>
    </Container>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 크기와 Fulled Color 아이콘 버튼을 비교해볼 수 있습니다.',
      },
    },
  },
};

export const SizesAndOutlineddColors: Story = {
  render: () => (
    <Container>
      <Table>
        <thead>
          <tr>
            <Th>Size / Color</Th>
            <Th>xs (32px)</Th>
            <Th>sm (40px)</Th>
            <Th>md (44px)</Th>
            <Th>lg (48px)</Th>
            <Th>xl (56px)</Th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <Th>lightMode</Th>
            <Td>
              <IconButton
                iconName="Bell"
                iconSize="xs"
                color="lightMode"
                variant="outlined"
                buttonSize="xs"
                ariaLabel="알림"
                style={{
                  width: '32px',
                  height: '32px',
                }}
              />
            </Td>
            <Td>
              <IconButton
                iconName="Bell"
                iconSize="sm"
                color="lightMode"
                variant="outlined"
                buttonSize="sm"
                ariaLabel="알림"
                style={{
                  width: '40px',
                  height: '40px',
                }}
              />
            </Td>
            <Td>
              <IconButton
                iconName="Bell"
                iconSize="md"
                color="lightMode"
                variant="outlined"
                buttonSize="md"
                ariaLabel="알림"
                style={{
                  width: '44px',
                  height: '44px',
                }}
              />
            </Td>
            <Td>
              <IconButton
                iconName="Bell"
                iconSize="lg"
                color="lightMode"
                variant="outlined"
                buttonSize="lg"
                ariaLabel="알림"
                style={{
                  width: '48px',
                  height: '48px',
                }}
              />
            </Td>
            <Td>
              <IconButton
                iconName="Bell"
                iconSize="xl"
                color="lightMode"
                variant="outlined"
                buttonSize="xl"
                ariaLabel="알림"
                style={{
                  width: '56px',
                  height: '56px',
                }}
              />
            </Td>
          </tr>
          <tr>
            <Th>darkMode</Th>
            <Td>
              <DarkBg>
                <IconButton
                  iconName="Bell"
                  iconSize="xs"
                  color="darkMode"
                  variant="outlined"
                  buttonSize="xs"
                  ariaLabel="알림"
                  style={{
                    width: '32px',
                    height: '32px',
                  }}
                />
              </DarkBg>
            </Td>
            <Td>
              <DarkBg>
                <IconButton
                  iconName="Bell"
                  iconSize="sm"
                  color="darkMode"
                  variant="outlined"
                  buttonSize="sm"
                  ariaLabel="알림"
                  style={{
                    width: '40px',
                    height: '40px',
                  }}
                />
              </DarkBg>
            </Td>
            <Td>
              <DarkBg>
                <IconButton
                  iconName="Bell"
                  iconSize="md"
                  color="darkMode"
                  variant="outlined"
                  buttonSize="md"
                  ariaLabel="알림"
                  style={{
                    width: '44px',
                    height: '44px',
                  }}
                />
              </DarkBg>
            </Td>
            <Td>
              <DarkBg>
                <IconButton
                  iconName="Bell"
                  iconSize="lg"
                  color="darkMode"
                  variant="outlined"
                  buttonSize="lg"
                  ariaLabel="알림"
                  style={{
                    width: '48px',
                    height: '48px',
                  }}
                />
              </DarkBg>
            </Td>
            <Td>
              <DarkBg>
                <IconButton
                  iconName="Bell"
                  iconSize="xl"
                  color="darkMode"
                  variant="outlined"
                  buttonSize="xl"
                  ariaLabel="알림"
                  style={{
                    width: '56px',
                    height: '56px',
                  }}
                />
              </DarkBg>
            </Td>
          </tr>
          <tr>
            <Th>primary</Th>
            <Td>
              <IconButton
                iconName="Bell"
                iconSize="xs"
                color="primary"
                variant="outlined"
                buttonSize="xs"
                ariaLabel="알림"
                style={{
                  width: '32px',
                  height: '32px',
                }}
              />
            </Td>
            <Td>
              <IconButton
                iconName="Bell"
                iconSize="sm"
                color="primary"
                variant="outlined"
                buttonSize="sm"
                ariaLabel="알림"
                style={{
                  width: '40px',
                  height: '40px',
                }}
              />
            </Td>
            <Td>
              <IconButton
                iconName="Bell"
                iconSize="md"
                color="primary"
                variant="outlined"
                buttonSize="md"
                ariaLabel="알림"
                style={{
                  width: '44px',
                  height: '44px',
                }}
              />
            </Td>
            <Td>
              <IconButton
                iconName="Bell"
                iconSize="lg"
                color="primary"
                variant="outlined"
                buttonSize="lg"
                ariaLabel="알림"
                style={{
                  width: '48px',
                  height: '48px',
                }}
              />
            </Td>
            <Td>
              <IconButton
                iconName="Bell"
                iconSize="xl"
                color="primary"
                variant="outlined"
                buttonSize="xl"
                ariaLabel="알림"
                style={{
                  width: '56px',
                  height: '56px',
                }}
              />
            </Td>
          </tr>
          <tr>
            <Th>secondary</Th>
            <Td>
              <IconButton
                iconName="Bell"
                iconSize="xs"
                color="secondary"
                variant="outlined"
                buttonSize="xs"
                ariaLabel="알림"
                style={{
                  width: '32px',
                  height: '32px',
                }}
              />
            </Td>
            <Td>
              <IconButton
                iconName="Bell"
                iconSize="sm"
                color="secondary"
                variant="outlined"
                buttonSize="sm"
                ariaLabel="알림"
                style={{
                  width: '40px',
                  height: '40px',
                }}
              />
            </Td>
            <Td>
              <IconButton
                iconName="Bell"
                iconSize="md"
                color="secondary"
                variant="outlined"
                buttonSize="md"
                ariaLabel="알림"
                style={{
                  width: '44px',
                  height: '44px',
                }}
              />
            </Td>
            <Td>
              <IconButton
                iconName="Bell"
                iconSize="lg"
                color="secondary"
                variant="outlined"
                buttonSize="lg"
                ariaLabel="알림"
                style={{
                  width: '48px',
                  height: '48px',
                }}
              />
            </Td>
            <Td>
              <IconButton
                iconName="Bell"
                iconSize="xl"
                color="secondary"
                variant="outlined"
                buttonSize="xl"
                ariaLabel="알림"
                style={{
                  width: '56px',
                  height: '56px',
                }}
              />
            </Td>
          </tr>
          <tr>
            <Th>danger</Th>
            <Td>
              <IconButton
                iconName="Bell"
                iconSize="xs"
                color="danger"
                variant="outlined"
                buttonSize="xs"
                ariaLabel="알림"
                style={{
                  width: '32px',
                  height: '32px',
                }}
              />
            </Td>
            <Td>
              <IconButton
                iconName="Bell"
                iconSize="sm"
                color="danger"
                variant="outlined"
                buttonSize="sm"
                ariaLabel="알림"
                style={{
                  width: '40px',
                  height: '40px',
                }}
              />
            </Td>
            <Td>
              <IconButton
                iconName="Bell"
                iconSize="md"
                color="danger"
                variant="outlined"
                buttonSize="md"
                ariaLabel="알림"
                style={{
                  width: '44px',
                  height: '44px',
                }}
              />
            </Td>
            <Td>
              <IconButton
                iconName="Bell"
                iconSize="lg"
                color="danger"
                variant="outlined"
                buttonSize="lg"
                ariaLabel="알림"
                style={{
                  width: '48px',
                  height: '48px',
                }}
              />
            </Td>
            <Td>
              <IconButton
                iconName="Bell"
                iconSize="xl"
                color="danger"
                variant="outlined"
                buttonSize="xl"
                ariaLabel="알림"
                style={{
                  width: '56px',
                  height: '56px',
                }}
              />
            </Td>
          </tr>
        </tbody>
      </Table>
    </Container>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 크기와 Outlined Color 아이콘 버튼을 비교해볼 수 있습니다.',
      },
    },
  },
};

export const Icons: Story = {
  render: () => (
    <div className="grid grid-cols-3">
      <IconsTable iconName="Heart" ariaLabel="좋아요" />
      <IconsTable iconName="HeartFill" ariaLabel="좋아요" />
      <IconsTable iconName="Hamburger" ariaLabel="전체 메뉴" />
      <IconsTable iconName="Bell" ariaLabel="알림" />
      <IconsTable iconName="BellFill" ariaLabel="알림" />
      <IconsTable iconName="ArrowLeft" ariaLabel="뒤로가기" />
      <IconsTable iconName="ArrowRight" ariaLabel="더보기" />
      <IconsTable iconName="ArrowUp" ariaLabel="토글 닫기" />
      <IconsTable iconName="ArrowDown" ariaLabel="토글 열기" />
      <IconsTable iconName="ClockFill" ariaLabel="시간" />
      <IconsTable iconName="Clock" ariaLabel="시간" />
      <IconsTable iconName="ClockThin" ariaLabel="시간" />
      <IconsTable iconName="Home" ariaLabel="홈" />
      <IconsTable iconName="HomeFill" ariaLabel="홈" />
      <IconsTable iconName="Refresh" ariaLabel="" />
      <IconsTable iconName="Chat" ariaLabel="채팅" />
      <IconsTable iconName="ChatFill" ariaLabel="채팅" />
      <IconsTable iconName="Photo" ariaLabel="사진" />
      <IconsTable iconName="ShoppingBag" ariaLabel="장바구니" />
      <IconsTable iconName="ShoppingBagFill" ariaLabel="장바구니" />
      <IconsTable iconName="Search" ariaLabel="검색" />
      <IconsTable iconName="Export" ariaLabel="등록" />
      <IconsTable iconName="ExportFill" ariaLabel="출품" />
      <IconsTable iconName="Cancel" ariaLabel="취소" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 아이콘 버튼을 비교해볼 수 있습니다.',
      },
    },
  },
};
