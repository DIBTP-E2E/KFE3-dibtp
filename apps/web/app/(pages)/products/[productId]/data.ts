export interface Product {
  product_id: number;
  title: string;
  description: string;
  start_price: number;
  current_price: number;
  min_price: number;
  decrease_unit: number;
  status: 'ACTIVE' | 'SOLD' | 'EXPIRED';
  region: string;
  detail_address: string;
  view_count: number;
  created_at: string;
  updated_at: string | null;
  seller_user_id: string;
}

export interface ProductImage {
  image_id: number;
  product_id: number;
  image_url: string;
  created_at: string;
}

export const mockProduct: Product = {
  product_id: 1,
  title: '아이폰 14 Pro 128GB 딥퍼플',
  description:
    '거의 새 상품입니다. 액정보호필름과 케이스 포함해드립니다. 박스, 충전기 모두 있어요.\n거의 새 상품입니다. 액정보호필름과 케이스 포함해드립니다. 박스, 충전기 모두 있어요.\n거의 새 상품입니다. 액정보호필름과 케이스 포함해드립니다. 박스, 충전기 모두 있어요.\n거의 새 상품입니다. 액정보호필름과 케이스 포함해드립니다. 박스, 충전기 모두 있어요.',
  start_price: 1200000,
  current_price: 1200000,
  min_price: 800000,
  decrease_unit: 10000,
  status: 'ACTIVE',
  region: '서울특별시 강남구',
  detail_address: '강남역 3번 출구 근처',
  view_count: 0,
  created_at: '2025-06-19T05:30:00.000Z',
  updated_at: null,
  seller_user_id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
};

export const mockProductImages: ProductImage[] = [
  {
    image_id: 1,
    product_id: 1,
    image_url: 'https://picsum.photos/600/600?random=1',
    created_at: '2025-06-19T05:30:00.000Z',
  },
  {
    image_id: 2,
    product_id: 1,
    image_url: 'https://picsum.photos/600/600?random=2',
    created_at: '2025-06-19T05:30:00.000Z',
  },
  {
    image_id: 3,
    product_id: 1,
    image_url: 'https://picsum.photos/600/600?random=3',
    created_at: '2025-06-19T05:30:00.000Z',
  },
];
