interface ProductAddressProps {
  region: string;
  detail_address: string;
}

const ProductAddress = ({ region, detail_address }: ProductAddressProps) => {
  return (
    <section>
      <h2 className="font-style-large font-bold mb-sm">거래 희망 장소</h2>
      <p className="font-style-medium font-medium whitespace-pre-wrap">{`${region} ${detail_address}`}</p>
    </section>
  );
};

export default ProductAddress;
