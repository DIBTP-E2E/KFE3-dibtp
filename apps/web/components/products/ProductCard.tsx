import { formatRelativeTime } from '@/utils';

import ProductThumb from './ProductThumb';

interface ProductCardProps {
  imgUrl: string;
  name: string;
  price: number;
  region: string;
  createdAt: string;
}

const ProductCard = ({ imgUrl, name, price, region, createdAt }: ProductCardProps) => {
  return (
    <article
      className="bg-white flex items-center gap-md p-sm rounded-[20px]"
      aria-label={`${name}, 경매 중, 현재가 ${price}, 지역 ${region}`}
    >
      <ProductThumb imgUrl={imgUrl} name={name} width="w-[80px]" />

      <section className="flex flex-col gap-sm">
        <h3 className="font-normal text-base line-clamp-2">{name}</h3>
        <p className="font-style-large">현재가 {price.toLocaleString()}원</p>
        <p className="text-xs flex items-center gap-xs  text-text-info">
          {region}
          <i>•</i>
          {formatRelativeTime(createdAt)}
        </p>
      </section>
    </article>
  );
};

export default ProductCard;
