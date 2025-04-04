"use client";
import React from "react";
import InterviewList from "./_components/InterviewList";

const History = () => {
  const [isActive, setIsActive] = useState(0);
  return (
    <div className="relative mt-1 justify-center ml-[-23vh] w-[223.8vh] min-h-[88vh] bg-gray-950 p-10 rounded-2xl shadow-lg text-white">
      {/* New Button Above */}
      <div className="flex gap-1">
        {/* New Button */}
        <button
          className="mb-8 bg-gray-700 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-600 transition duration-300 ml-10"
          onClick={() => {
            setIsActive(0);
          }}
        >
          History
        </button>

        {/* Completed Interviews Button (Slightly Right) */}
        <button
          className="mb-8 bg-gray-700 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-600 transition duration-300 ml-10"
          onClick={() => {
            setIsActive(1);
          }}
        >
          Completed Interviews
        </button>
      </div>

      {/* Render InterviewList by default */}
      <InterviewList isActive={isActive} />
    </div>
  );
};

export default History;
