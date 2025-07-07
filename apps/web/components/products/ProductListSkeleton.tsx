const ProductListSkeleton = () => {
  return (
    <ul className="grid grid-cols-1">
      {Array.from({ length: 8 }).map((_, index) => (
        <li key={index} className="animate-pulse">
          <div className="bg-white flex items-center gap-md p-sm rounded-[20px]">
            {/* ProductThumb skeleton */}
            <div className="relative w-[80px] h-[80px] bg-gray-200 rounded-lg">
              {/* Badge skeleton */}
              <div className="absolute top-[var(--space-xs)] left-[var(--space-xs)] bg-gray-300 rounded-full w-12 h-5"></div>
            </div>

            {/* Content skeleton */}
            <div className="flex flex-col gap-sm flex-1">
              {/* Title skeleton */}
              <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>

              {/* Price skeleton */}
              <div className="h-5 bg-gray-200 rounded w-24"></div>

              {/* Meta info skeleton */}
              <div className="flex items-center gap-xs">
                <div className="h-3 bg-gray-200 rounded w-16"></div>
                <div className="w-1 h-1 bg-gray-200 rounded-full"></div>
                <div className="h-3 bg-gray-200 rounded w-12"></div>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ProductListSkeleton;
