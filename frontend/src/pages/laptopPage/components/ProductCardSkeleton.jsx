import React from "react";

const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 animate-pulse">
      <div className="h-48 bg-gray-200"></div>
      <div className="p-4">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
        
        <div className="flex items-center mb-2">
          <div className="h-4 bg-gray-200 rounded w-16 mr-2"></div>
          <div className="h-4 bg-gray-200 rounded w-20"></div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-3">
          <div className="h-6 bg-gray-200 rounded w-16"></div>
          <div className="h-6 bg-gray-200 rounded w-16"></div>
          <div className="h-6 bg-gray-200 rounded w-16"></div>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <div className="h-6 bg-gray-200 rounded w-24"></div>
        </div>
        
        <div className="h-10 bg-gray-200 rounded w-full"></div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;