interface ProductAddressProps {
  region: string;
  detail_address: string;
}

const ProductAddress = ({ region, detail_address }: ProductAddressProps) => {
  return (
    <div className="mt-md">
      <h2 className="text-lg font-bold mb-sm">거래 희망 장소</h2>
      <p className="text-base whitespace-pre-wrap">{`${region} ${detail_address}`}</p>
    </div>
  );
};

export default ProductAddress;
