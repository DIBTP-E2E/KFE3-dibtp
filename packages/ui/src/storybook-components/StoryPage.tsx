import { cn } from "../utils/cn";

interface StoryPageProps {
    children: React.ReactNode;
    className?: string;
}

const StoryPage = ({children, className} : StoryPageProps) => (
  <main className={cn('flex flex-col gap-5xl w-full p-lg max-w-[1000px] mx-auto ', className)}>
    {children}
  </main>
);

export default StoryPage;
