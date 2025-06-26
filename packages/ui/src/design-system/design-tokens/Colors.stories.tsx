import type { Meta, StoryObj } from '@storybook/nextjs';
import { cn } from "../../utils/cn";
import { colorTokens, actualColorValues, semanticColorUtils } from './generated-tokens';

const meta: Meta = {
  title: 'Design System/Design Tokens/Colors',
  parameters: {
    docs: {
      description: {
        component: '디자인 시스템에서 사용하는 모든 컬러 토큰들을 확인할 수 있습니다.',
      },
    },
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

// 생성된 토큰에서 실제 색상 값을 가져오는 함수
const getActualColorValue = (cssVar: string): string => {
  return actualColorValues[cssVar as keyof typeof actualColorValues] || cssVar;
};

const StoryPage = ({children, className} : {children: React.ReactNode; className?: string}) => (
  <main className={cn('flex flex-col gap-5xl w-full p-lg max-w-[1000px] mx-auto ', className)}>
    {children}
  </main>
);

const PageTitle = ({children} : {children: React.ReactNode}) => (
  <h1 className='font-style-headline-h1'>
    {children}
  </h1>
);

const Section = ({children, className} : {children: React.ReactNode; className?: string}) => (
  <section className={cn('w-full flex flex-col gap-lg', className)}>
    {children}
  </section>
);

const SectionTitle = ({children} : {children: React.ReactNode}) => (
  <h2 className='font-style-headline-h2'>
    {children}
  </h2>
);

const HowToUse = ({title, datas}: {title: string; datas: { name: string; code: string; }[]}) => (
   <section
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
      {title}
    </h4>
    <div style={{ fontSize: '0.875rem', color: '#656565' }}>
      <ul>
        {
          datas.map((item, index) => <li key={`use-${index}`}>
            <div style={{ marginBottom: '0.5rem' }}>
              {item.name}{' : '}<code
                style={{
                  backgroundColor: '#ffffff',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '4px',
                  fontFamily: 'monospace',
                }}
              >
                {item.code}
              </code>
            </div>
          </li>)
        }
      </ul>
    </div>
  </section>
);

const HowToUseClass = () => (<HowToUse
  title='💡 토큰 기준 유틸클래스 생성 규칙'
  datas={[
      {name: '배경색 토큰', code: '--color-bg-*'},
      {name: '배경색 유틸클래스', code: 'bg-bg-*'},
      {name: 'text 색상 토큰', code: '--color-text-*'},
      {name: 'text 색상 유틸클래스', code: 'text-text-*'},
      {name: 'border 색상 토큰', code: '--color-border-*'},
      {name: 'border 색상 유틸클래스', code: 'border-border-*'},
]} />);

const ColorPalette = ({ title, colorSet }: { title: string; colorSet: Record<string, string> }) => (
  <Section>
    <SectionTitle>
      {title}
    </SectionTitle>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
        gap: '1rem',
      }}
    >
      {Object.entries(colorSet).map(([key, value]) => {
        const actualValue = getActualColorValue(value);
        return (
          <article key={key} style={{ textAlign: 'center' }}>
            <div
              style={{
                width: '100%',
                height: '80px',
                borderRadius: '8px',
                border: '1px solid #e8e8e8',
                marginBottom: '0.5rem',
                backgroundColor: actualValue,
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              }}
            />
            <div style={{ fontSize: '0.875rem' }}>
              <div
                style={{
                  fontWeight: 500,
                  color: '#1f1f1f',
                  marginBottom: '0.25rem',
                }}
              >
                {key}
              </div>
              <div
                style={{
                  color: '#656565',
                  fontSize: '0.75rem',
                  fontFamily: 'monospace',
                  marginBottom: '0.25rem',
                }}
              >
                {value}
              </div>
              <div
                style={{
                  color: '#8f8f8f',
                  fontSize: '0.75rem',
                  fontFamily: 'monospace',
                }}
              >
                {actualValue}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  </Section>
);

interface ColorListProps {
  title?: string;
  datas: {
    name: string;
    value: string;
  }[];
}

const ColorList = ({title, datas}: ColorListProps) => (
  <Section className='flex flex-col gap-lg w-full'>
    <SectionTitle>{title ?? 'Use Building'}</SectionTitle>
    {datas.map(({ name, value }) => (
      <div key={name} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '4px',
            border: '1px solid #e8e8e8',
            backgroundColor: getActualColorValue(value),
          }}
        />
        <div>
          <div style={{ fontWeight: 500, marginBottom: '0.25rem' }}>{name}</div>
          <div
            style={{
              fontSize: '0.875rem',
              color: '#656565',
              fontFamily: 'monospace',
            }}
          >
            {value}
          </div>
        </div>
      </div>
    ))}
  </Section>
);

export const SemanticColorsTokens: Story = {
  render: () => (
    <StoryPage>
      <PageTitle>🎨 Design Tokens - Semantic Colors </PageTitle>

      <ColorList
        title='Use Primary'
        datas={[
        { name: 'Text Primary', value: semanticColorUtils.text.primary },
        { name: 'Background Primary', value: semanticColorUtils.background.primary },
        { name: 'Border Primary', value: semanticColorUtils.border.primary },
      ]} />

      <ColorList
        title='Use Secondary'
        datas={[
        { name: 'Text Secondary', value: semanticColorUtils.text.secondary },
        { name: 'Background Secondary', value: semanticColorUtils.background.secondary },
        { name: 'Border Secondary', value: semanticColorUtils.border.secondary },
      ]} />

      <ColorList
        title='Use Base'
        datas={[
        { name: 'Text Base', value: semanticColorUtils.text.base },
        { name: 'Border Base', value: semanticColorUtils.border.base },
        { name: 'Background Neutral', value: semanticColorUtils.background.neutral },
      ]} />

      <ColorList
        title='Use Form'
        datas={[
        { name: 'Border Form', value: semanticColorUtils.border.form },
      ]} />

      <ColorList
        title='Use Info'
        datas={[
        { name: 'Text Info', value: semanticColorUtils.text.info },
      ]} />

      <ColorList
        title='Use Disabled'
        datas={[
        { name: 'Text Disabled', value: semanticColorUtils.text.disabled },
        { name: 'Background Disabled', value: semanticColorUtils.background.disabled },
        { name: 'Border Disabled', value: semanticColorUtils.border.disabled },
      ]} />

      <ColorList
        title='Use Success'
        datas={[
        { name: 'Text Success', value: semanticColorUtils.text.success },
        { name: 'Background Success', value: semanticColorUtils.background.success },
        { name: 'Border Success', value: semanticColorUtils.border.success },
      ]} />

      <ColorList
        title='Use Danger'
        datas={[
        { name: 'Text Danger', value: semanticColorUtils.text.danger },
        { name: 'Background Danger', value: semanticColorUtils.background.danger },
        { name: 'Border Danger', value: semanticColorUtils.border.danger },
      ]} />

      <ColorList
        title='Use Error'
        datas={[
        { name: 'Text Error', value: semanticColorUtils.text.error },
        { name: 'Background Error', value: semanticColorUtils.background.error },
        { name: 'Border Error', value: semanticColorUtils.border.errer },
      ]} />

      <HowToUseClass />
    </StoryPage>
  ),
};

export const PrimaryColorsTokens: Story = {
  render: () => (
    <StoryPage>
      <PageTitle>🎨 Design Tokens - Primary Colors (브랜딩 컬러)</PageTitle>

      <ColorList
        datas={[
        { name: 'Text Primary', value: semanticColorUtils.text.primary },
        { name: 'Background Primary', value: semanticColorUtils.background.primary },
        { name: 'Border Primary', value: semanticColorUtils.border.primary },
      ]} />

      <ColorPalette title="Primary Colors Palette" colorSet={colorTokens.primary} />

      <HowToUseClass />
    </StoryPage>
  ),
};

export const SecondaryColorsTokens: Story = {
  render: () => (
    <StoryPage>
      <PageTitle>🎨 Design Tokens - Secondary Colors (보조 컬러)</PageTitle>

      <ColorList
        datas={[
        { name: 'Text Secondary', value: semanticColorUtils.text.secondary },
        { name: 'Background Secondary', value: semanticColorUtils.background.secondary },
        { name: 'Border Secondary', value: semanticColorUtils.border.secondary },
      ]} />

      <ColorPalette title="Secondary Colors (보조 컬러)" colorSet={colorTokens.secondary} />

      <HowToUseClass />
    </StoryPage>
  ),
};

export const NeutralColorsTokens: Story = {
  render: () => (
    <StoryPage>
      <PageTitle>🎨 Design Tokens - Neutral Colors (회색조)</PageTitle>

      <ColorList
        title='Use Base, Form'
        datas={[
        { name: 'Text Base', value: semanticColorUtils.text.base },
        { name: 'Border Base', value: semanticColorUtils.border.base },
        { name: 'Border Form', value: semanticColorUtils.border.form },
        { name: 'Background Neutral', value: semanticColorUtils.background.neutral },
      ]} />

      <ColorList
        title='Use Info'
        datas={[
        { name: 'Text Info', value: semanticColorUtils.text.info },
      ]} />

      <ColorList
        title='Use Disabled'
        datas={[
        { name: 'Text Disabled', value: semanticColorUtils.text.disabled },
        { name: 'Background Disabled', value: semanticColorUtils.background.disabled },
        { name: 'Border Disabled', value: semanticColorUtils.border.disabled },
      ]} />

      <ColorPalette title="Neutral Colors (회색조)" colorSet={colorTokens.neutral} />

      <HowToUseClass />
    </StoryPage>
  ),
};

export const SuccessColorsTokens: Story = {
  render: () => (
    <StoryPage>
      <PageTitle>🎨 Design Tokens - Success Colors (성공 상태)</PageTitle>

      <ColorList
        datas={[
        { name: 'Text Success', value: semanticColorUtils.text.success },
        { name: 'Background Success', value: semanticColorUtils.background.success },
        { name: 'Border Success', value: semanticColorUtils.border.success },
      ]} />

      <ColorPalette title="Success Colors (성공 상태)" colorSet={colorTokens.success} />

      <HowToUseClass />
    </StoryPage>
  ),
};

export const DangerColorsTokens: Story = {
  render: () => (
    <StoryPage>
      <PageTitle>🎨 Design Tokens - Danger Colors (위험, 경고 상태)</PageTitle>

      <ColorList
        datas={[
        { name: 'Text Danger', value: semanticColorUtils.text.danger },
        { name: 'Background Danger', value: semanticColorUtils.background.danger },
        { name: 'Border Danger', value: semanticColorUtils.border.danger },
      ]} />

      <ColorPalette title="Danger Colors (위험, 경고 상태)" colorSet={colorTokens.danger} />
      <ColorPalette title="Error Colors (에러 상태)" colorSet={colorTokens.error} />

      <HowToUseClass />
    </StoryPage>
  ),
};

export const ErrorColorsTokens: Story = {
  render: () => (
    <StoryPage>
      <PageTitle>🎨 Design Tokens - Error Colors (에러 상태)</PageTitle>

      <ColorList
        datas={[
        { name: 'Text Error', value: semanticColorUtils.text.error },
        { name: 'Background Error', value: semanticColorUtils.background.error },
        { name: 'Border Error', value: semanticColorUtils.border.errer },
      ]} />

      <ColorPalette title="Error Colors (에러 상태)" colorSet={colorTokens.error} />

      <HowToUseClass />
    </StoryPage>
  ),
};