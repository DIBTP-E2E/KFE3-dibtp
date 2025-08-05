import { cn } from '@repo/ui/utils';

interface ProductTitleProps {
  title: string;
  className?: string;
}

const ProductTitle = ({ title, className }: ProductTitleProps) => {
  return <h2 className={cn('text-2xl font-bold line-clamp-3', className)}>{title}</h2>;
};

export default ProductTitle;
