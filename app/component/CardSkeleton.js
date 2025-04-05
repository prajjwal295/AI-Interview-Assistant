const CardSkeleton = () => {
  return (
    <div className="bg-[#111827] border border-gray-800 rounded-2xl shadow-lg p-6 h-[300px] flex flex-col justify-between animate-pulse">
      <div className="space-y-4">
        {/* Job Role Skeleton */}
        <div className="h-5 w-3/4 bg-gray-700 rounded shimmer" />
        {/* Experience Skeleton */}
        <div className="h-4 w-1/2 bg-gray-700 rounded shimmer" />
        {/* Difficulty Skeleton */}
        <div className="h-4 w-1/4 bg-gray-700 rounded shimmer" />
      </div>

      {/* Button Skeleton */}
      <div className="h-10 w-full bg-gray-700 rounded-lg shimmer" />
    </div>
  );
};

export default CardSkeleton;
