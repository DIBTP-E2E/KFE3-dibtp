interface SectionTitleProps {
    children: React.ReactNode;
}

const SectionTitle = ({children} : SectionTitleProps) => (
  <h2 className='font-style-headline-h3'>
    {children}
  </h2>
);

export default SectionTitle;
