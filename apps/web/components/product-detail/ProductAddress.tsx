interface ProductAddressProps {
  region: string;
  detail_address: string;
}

const ProductAddress = ({ region, detail_address }: ProductAddressProps) => {
  return (
    <div className="mt-4">
      <h2 className="text-lg font-bold text-gray-900 mb-2">거래 희망 장소</h2>
      <p className="text-base text-gray-700 whitespace-pre-wrap">{`${region} ${detail_address}`}</p>
    </div>
  );
};

export default ProductAddress;
