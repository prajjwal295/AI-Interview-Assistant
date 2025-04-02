import React from "react";
import ContestDashBoard from "./_components/ContestDashboard";

const Contest = () => {
  return (
    <div className="pt-10">
      <h2 className="font-bold text-2xl">Contests</h2>
      <h2 className="text-gray-500">Join Into the Exciting Contest</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 my-5">
        <ContestDashBoard />
      </div>
    </div>
  );
};

export default Contest;
