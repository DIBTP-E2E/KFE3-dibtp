import {
  createColorTokenInfo,
  extractColorTypeFromTitle,
  getSemanticColorValue,
} from '../utils/storybook';

import Section from './Section';
import SectionTitle from './SectionTitle';

interface ColorPaletteProps {
  type: 'primitive' | 'semantic';
  title: string;
  colorSet: Record<string, string>;
}

const ColorPalette = ({ type, title, colorSet }: ColorPaletteProps) => (
  <Section>
    <SectionTitle>{title}</SectionTitle>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '1rem',
      }}
    >
      {Object.entries(colorSet).map(([key, value]) => {
        const actualValue = getSemanticColorValue(value);
        const colorType = extractColorTypeFromTitle(title);
        const tokenInfo = createColorTokenInfo(key, value, actualValue, colorType);

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
                {tokenInfo.key}
              </div>
              <ul
                style={{
                  color: '#656565',
                  fontSize: '0.75rem',
                  fontFamily: 'monospace',
                  marginBottom: '0.25rem',
                  lineHeight: '1.4',
                  display: 'flex',
                  flexFlow: 'column',
                  gap: '0.125rem',
                }}
              >
                {type !== 'primitive' && (
                  <li aria-label="Semantic 변수">{tokenInfo.cssVariable}</li>
                )}
                <li aria-label="Primitive 변수">{tokenInfo.primitiveValue}</li>
                <li aria-label="Hex 변수"> {tokenInfo.hexValue}</li>
              </ul>
            </div>
          </article>
        );
      })}
    </div>
  </Section>
);

export default ColorPalette;
