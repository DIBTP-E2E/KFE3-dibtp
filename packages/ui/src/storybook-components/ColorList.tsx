import Section from './Section';
import SectionTitle from './SectionTitle';
import { getUtilityClass, getHexValue, getSemanticColorValue } from '../utils/storybook';

interface ColorListProps {
  title?: string;
  datas: {
    name: string;
    value: string;
  }[];
}

const ColorList = ({ title, datas }: ColorListProps) => (
  <Section className="flex flex-col gap-lg w-full">
    <SectionTitle>{title ?? 'Use Semantic'}</SectionTitle>
    {datas.map(({ name, value }) => {
      const hexValue = getHexValue(value);
      const utilityClass = getUtilityClass(value);

      return (
        <article key={name} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '4px',
              border: '1px solid #e8e8e8',
              backgroundColor: hexValue || getSemanticColorValue(value),
            }}
          />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 500, marginBottom: '0.25rem' }}>{name}</div>
            <ul
              style={{
                fontSize: '0.75rem',
                color: '#656565',
                fontFamily: 'monospace',
                lineHeight: '1.4',
                display: 'flex',
                flexFlow: 'column',
                gap: '0.125rem',
                margin: 0,
                padding: 0,
                listStyle: 'none',
              }}
            >
              <li>
                {`.${utilityClass}`}, {value}, {hexValue}
              </li>
            </ul>
          </div>
        </article>
      );
    })}
  </Section>
);

export default ColorList;
