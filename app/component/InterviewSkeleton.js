const InterviewShimmer = () => {
  return (
    <div className="flex flex-col lg:flex-row w-full h-full p-6 gap-6 bg-gray-950 text-white lg:h-[91vh] animate-pulse">
      <div className="w-full lg:w-1/2 flex flex-col gap-5 bg-gray-900 p-5 rounded-2xl shadow">
        <div className="flex flex-wrap gap-3 overflow-x-auto pb-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="h-8 w-32 bg-gray-800 rounded-full"
            ></div>
          ))}
        </div>

        <div>
          <div className="h-6 w-1/3 bg-gray-700 rounded mb-2"></div>
          <div className="h-4 w-full bg-gray-800 rounded mt-2 mb-1"></div>
          <div className="h-4 w-3/4 bg-gray-800 rounded mb-1"></div>
        </div>

        <div>
          <div className="h-5 w-1/2 bg-gray-700 rounded mt-4 mb-2"></div>
          <div className="h-32 w-full bg-gray-800 rounded"></div>
          <div className="h-9 w-24 mt-3 bg-red-800 rounded"></div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 flex flex-col items-center bg-gray-900 p-5 rounded-2xl shadow">
        <div className="h-6 w-1/3 bg-gray-700 rounded mb-4"></div>

        <div className="w-full mb-4 aspect-video rounded-lg bg-gray-800"></div>

        <div className="w-full flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-1/2 h-12 bg-gray-700 rounded-lg"></div>
          <div className="w-full sm:w-1/2 h-12 bg-gray-600 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};


export default InterviewShimmer;