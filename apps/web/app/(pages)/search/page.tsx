import { PageContainer } from '@/components/layout';
import { ProductListWithSuspense } from '@/components/products';

import { searchProductsWithPrisma } from '@/services';

const SearchResultPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ keyword: string }>;
}) => {
  const { keyword } = await searchParams;
  const products = await searchProductsWithPrisma({ keyword });

  return (
    <PageContainer>
      <ProductListWithSuspense products={products} />
    </PageContainer>
  );
};

export default SearchResultPage;
