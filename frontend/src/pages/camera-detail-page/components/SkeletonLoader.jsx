import React from "react";

const SkeletonLoader = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
        {/* Image Gallery Skeleton */}
        <div className="flex flex-col space-y-4">
          <div className="bg-gray-200 rounded-lg h-96"></div>
          <div className="flex space-x-2">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-gray-200 rounded-md w-20 h-20"></div>
            ))}
          </div>
        </div>
        
        {/* Product Info Skeleton */}
        <div className="flex flex-col">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="flex items-center mb-4">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="w-4 h-4 bg-gray-200 rounded-full"></div>
              ))}
            </div>
            <div className="w-16 h-4 bg-gray-200 rounded ml-2"></div>
          </div>
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded mb-6"></div>
          
          <div className="mb-6">
            <div className="h-5 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="space-y-2">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-4 h-4 bg-gray-200 rounded-full mr-2 mt-1"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <div className="h-5 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="flex space-x-2">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="w-10 h-10 bg-gray-200 rounded-full"></div>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <div className="h-5 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="grid grid-cols-4 gap-2">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="h-12 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
          
          <div className="flex space-x-3 mt-auto">
            <div className="h-12 bg-gray-200 rounded flex-1"></div>
            <div className="h-12 bg-gray-200 rounded w-40"></div>
          </div>
        </div>
      </div>
      
      {/* Tabs Skeleton */}
      <div className="border-t border-gray-200 mt-8">
        <div className="flex border-b border-gray-200">
          <div className="h-12 bg-gray-200 rounded w-32 m-2"></div>
          <div className="h-12 bg-gray-200 rounded w-32 m-2"></div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[...Array(3)].map((_, categoryIndex) => (
              <div key={categoryIndex}>
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="space-y-2">
                  {[...Array(4)].map((_, itemIndex) => (
                    <div key={itemIndex} className="flex">
                      <div className="h-6 bg-gray-200 rounded w-1/3 mr-4"></div>
                      <div className="h-6 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;