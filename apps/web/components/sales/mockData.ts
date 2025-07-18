import { PRODUCT_STATUS } from '@/constants';
import type { Product } from '@/types';

export const MOCK_SALES_PRODUCTS: Product[] = [
  {
    product_id: 1,
    title: '아이폰 14 Pro 128GB 경매',
    description: '상태 양호한 아이폰 14 Pro 판매합니다.',
    start_price: 1000000,
    min_price: 100000,
    decrease_unit: 10000,
    status: PRODUCT_STATUS.ACTIVE,
    region: '송파구 잠실동',
    detail_address: '송파구 잠실동 123-45',
    view_count: 15,
    created_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3시간 전
    updated_at: null,
    seller_user_id: 'seller-1',
    product_images: [
      {
        image_id: 1,
        product_id: 1,
        image_url: '/placeholder-product.jpg',
        image_order: 0,
        created_at: new Date().toISOString(),
      },
    ],
  },
  {
    product_id: 2,
    title: '아이폰 + 맥북 + 에어팟 위치',
    description: '애플 제품 일괄 판매합니다.',
    start_price: 3000000,
    min_price: 1500000,
    decrease_unit: 50000,
    status: PRODUCT_STATUS.ACTIVE,
    region: '송파구 잠실동',
    detail_address: '송파구 잠실동 678-90',
    view_count: 42,
    created_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1시간 전
    updated_at: null,
    seller_user_id: 'seller-1',
    product_images: [
      {
        image_id: 2,
        product_id: 2,
        image_url: '/placeholder-product.jpg',
        image_order: 0,
        created_at: new Date().toISOString(),
      },
    ],
  },
  {
    product_id: 3,
    title: '갤럭시 S23 Ultra 256GB',
    description: '거의 새것 같은 갤럭시 S23 Ultra',
    start_price: 800000,
    min_price: 400000,
    decrease_unit: 20000,
    status: PRODUCT_STATUS.SOLD,
    region: '강남구 신사동',
    detail_address: '강남구 신사동 456-78',
    view_count: 28,
    created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5시간 전
    updated_at: null,
    seller_user_id: 'seller-1',
    product_images: [
      {
        image_id: 3,
        product_id: 3,
        image_url: '/placeholder-product.jpg',
        image_order: 0,
        created_at: new Date().toISOString(),
      },
    ],
  },
  {
    product_id: 4,
    title: '에어팟 프로 2세대',
    description: '새상품 미개봉 에어팟 프로',
    start_price: 300000,
    min_price: 200000,
    decrease_unit: 5000,
    status: PRODUCT_STATUS.READY,
    region: '서초구 서초동',
    detail_address: '서초구 서초동 789-01',
    view_count: 12,
    created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30분 전
    updated_at: null,
    seller_user_id: 'seller-1',
    product_images: [
      {
        image_id: 4,
        product_id: 4,
        image_url: '/placeholder-product.jpg',
        image_order: 0,
        created_at: new Date().toISOString(),
      },
    ],
  },
  {
    product_id: 5,
    title: '맥북 에어 M2',
    description: '사용감 있는 맥북 에어 M2',
    start_price: 1200000,
    min_price: 800000,
    decrease_unit: 30000,
    status: PRODUCT_STATUS.CANCEL,
    region: '마포구 홍대',
    detail_address: '마포구 홍대 234-56',
    view_count: 8,
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2시간 전
    updated_at: null,
    seller_user_id: 'seller-1',
    product_images: [
      {
        image_id: 5,
        product_id: 5,
        image_url: '/placeholder-product.jpg',
        image_order: 0,
        created_at: new Date().toISOString(),
      },
    ],
  },
];
