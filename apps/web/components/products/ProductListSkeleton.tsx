const ProductListSkeleton = () => {
  return (
    <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <li key={index} className="animate-pulse">
          <div className="aspect-square bg-gray-200 rounded-lg mb-2"></div>
          <div className="h-4 bg-gray-200 rounded mb-1"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </li>
      ))}
    </ul>
  );
};

export default ProductListSkeleton;
