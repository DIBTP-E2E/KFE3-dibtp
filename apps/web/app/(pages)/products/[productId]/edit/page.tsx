import { notFound, redirect } from 'next/navigation';

import { ProductEditForm } from '@web/components/product-edit';
import { PAGE_ROUTES } from '@web/constants';
import { PRODUCT_STATUS } from '@web/constants/products';
import { fetchProductDetailWithPrisma } from '@web/services/products/server';
import { getAuthenticatedUser } from '@web/utils/auth/server';

interface ProductEditPageProps {
  params: Promise<{
    productId: string;
  }>;
}

const ProductEditPage = async ({ params }: ProductEditPageProps) => {
  const { productId } = await params;

  // 사용자 인증 확인
  const authResult = await getAuthenticatedUser();
  if (!authResult.success || !authResult.userId) {
    redirect(PAGE_ROUTES.AUTH.LOGIN);
  }

  try {
    const product = await fetchProductDetailWithPrisma(parseInt(productId));

    if (!product) {
      notFound();
    }

    // 상품 소유자 확인 및 상품 상태 확인 (READY 상태가 아니면 수정 불가)
    if (product.seller_user_id !== authResult.userId || product.status !== PRODUCT_STATUS.READY) {
      redirect(PAGE_ROUTES.MYPAGE.SALES);
    }

    return <ProductEditForm productId={productId} product={product} />;
  } catch (error) {
    console.error('상품 조회 실패:', error);
    notFound();
  }
};

export default ProductEditPage;
