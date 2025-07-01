import { cn } from '@/utils/cn';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

const Section = ({ children, className }: SectionProps) => (
  <section className={cn('w-full flex flex-col gap-lg', className)}>{children}</section>
);

export default Section;
