import Section from "./Section";

interface HowToUseProps {
    title: string;
    datas: { name: string; code: string; }[];
}

const HowToUse = ({title, datas}: HowToUseProps) => (
   <Section
    className='bg-bg-neutral p-md rounded-md'
  >
    <h3 className="font-style-headline-h3">
      {title}
    </h3>

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
  </Section>
);

export default HowToUse;
