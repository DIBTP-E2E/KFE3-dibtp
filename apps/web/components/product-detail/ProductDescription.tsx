interface ProductDescriptionProps {
  description: string;
}

const ProductDescription = ({ description }: ProductDescriptionProps) => {
  return (
    <div className="mt-4">
      <h2 className="text-lg font-bold text-gray-900 mb-2">상세 설명</h2>
      <p className="text-base text-gray-700 whitespace-pre-wrap">{description}</p>
    </div>
  );
};

export default ProductDescription;
