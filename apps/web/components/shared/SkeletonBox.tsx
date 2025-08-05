import { cn } from '@repo/ui/utils';

interface SkeletonBoxProps {
  className?: string;
}

const SkeletonBox = ({ className }: SkeletonBoxProps) => {
  return <div className={cn('animate-pulse bg-gray-200', className)} />;
};

export default SkeletonBox;
