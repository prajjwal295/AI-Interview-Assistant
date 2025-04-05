import React from "react";
import ContestDashBoard from "./_components/ContestDashboard";

const Contest = () => {
  return (
    <div className="w-full min-h-screen bg-gray-950 text-white px-6 md:px-10 lg:px-20 py-10">
      {/* Heading */}
      <div className="mb-6">
        <h2 className="font-extrabold text-3xl md:text-4xl">Contests</h2>
        <p className="text-gray-400 mt-2 text-sm md:text-base">
          Join Into the Exciting Contest
        </p>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <ContestDashBoard />
      </div>
    </div>
  );
};

export default Contest;
