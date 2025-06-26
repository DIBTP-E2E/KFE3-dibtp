interface PageTitleProps {
    children: React.ReactNode
}

const PageTitle = ({children} : PageTitleProps) => (
  <h1 className='font-style-headline-h2'>
    {children}
  </h1>
);

export default PageTitle;
