interface ProductTitleProps {
  title: string;
}

const ProductTitle = ({ title }: ProductTitleProps) => {
  return <h1 className="text-2xl font-bold text-gray-900 line-clamp-3">{title}</h1>;
};

export default ProductTitle;
