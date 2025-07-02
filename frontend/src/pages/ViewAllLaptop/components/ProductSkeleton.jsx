import React from "react";

const ProductSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="bg-gray-200 h-48 w-full"></div>
      
      {/* Content skeleton */}
      <div className="p-4">
        {/* Brand */}
        <div className="h-3 bg-gray-200 rounded w-1/4 mb-2"></div>
        
        {/* Title */}
        <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-5 bg-gray-200 rounded w-1/2 mb-3"></div>
        
        {/* Price */}
        <div className="flex items-center mb-3">
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          <div className="ml-auto h-4 bg-gray-200 rounded w-1/6"></div>
        </div>
        
        {/* Specs */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
        </div>
        
        {/* Button */}
        <div className="h-10 bg-gray-200 rounded w-full"></div>
      </div>
    </div>
  );
};

export default ProductSkeleton;