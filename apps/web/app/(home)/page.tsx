import { ProductListWithSuspense } from '@/components/products';

export const dynamic = 'force-dynamic';

const HomePage = () => {
  return (
    <>
      <h2 className="sr-only">경매 상품 리스트</h2>
      <ProductListWithSuspense />
    </>
  );
};

export default HomePage;
