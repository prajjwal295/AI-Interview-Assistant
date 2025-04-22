"use client";
import React, { useState } from "react";
import ContestDashBoard from "./_components/ContestDashboard";
import PastContestPage from "./_components/PastContestPage";

const Contest = () => {
  const [isActive, setIsActive] = useState(0);
  return (
    <div className="w-full min-h-screen bg-gray-950 text-white px-4 py-6 sm:px-8 md:px-12 lg:px-24 xl:px-32">
      {/* Buttons */}
      <div className="flex w-full gap-4 flex-col sm:flex-row mb-8">
        <button
          className={`w-full sm:w-auto py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
            isActive === 0
              ? "bg-white text-black"
              : "bg-gray-700 text-white hover:bg-gray-600"
          }`}
          onClick={() => setIsActive(0)}
        >
          {"Today's Contest"}
        </button>

        <button
          className={`w-full sm:w-auto py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
            isActive === 1
              ? "bg-white text-black"
              : "bg-gray-700 text-white hover:bg-gray-600"
          }`}
          onClick={() => setIsActive(1)}
        >
          Previous Contest
        </button>
      </div>
      <div className="w-full">
        {isActive == 0 ? <ContestDashBoard /> : <PastContestPage />}
      </div>
    </div>
  );
};

export default Contest;
