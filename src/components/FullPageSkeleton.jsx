import React from "react";

const FullPageSkeleton = () => {
  return (
    <div className="animate-pulse space-y-6 p-6">


      {/* Banner Skeleton */}
      <div className="h-90 bg-gray-300 rounded-lg"></div>

      {/* Content Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">  
        

        {/* Product Grid Skeleton */}
        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="p-4 rounded-lg space-y-4">
              <div className="h-32 bg-gray-300 rounded-md"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              <div className="h-4 bg-gray-300 rounded w-full"></div>
            </div>
          ))}
        </div>

      </div>

     
    </div>
  );
};

export default FullPageSkeleton;
