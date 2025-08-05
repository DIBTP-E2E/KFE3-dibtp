interface ProductDescriptionProps {
  description: string;
}

const ProductDescription = ({ description }: ProductDescriptionProps) => {
  return (
    <div className="mt-md">
      <h2 className="text-lg font-bold mb-sm">상세 설명</h2>
      <p className="text-base whitespace-pre-wrap">{description}</p>
    </div>
  );
};

export default ProductDescription;
