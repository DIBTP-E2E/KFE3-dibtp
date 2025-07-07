import { ProductList } from '@/components/products';

export const dynamic = 'force-dynamic';

const HomePage = () => {
  return (
    <>
      <h2 className="sr-only">경매 상품 리스트</h2>
      <ProductList />
    </>
  );
};

export default HomePage;
