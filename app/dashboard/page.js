"use client";

import React, { useEffect, useState } from "react";
import AddNewInterview from "@/app/dashboard/_components/AddNewInterview";

import Image from "next/image";

const Dashboard = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // Prevent SSR mismatch

  return (
    <div className="relative mt-1 flex justify-center ml-[-23vh] w-[223.8vh] h-[88vh] bg-gray-950 text-white p-16 rounded-2xl">
      <div className="relative flex flex-col items-center justify-center w-full max-w-7xl p-16 rounded-2xl pb-6">
        {/* Dashboard Heading (Top-Left) */}
        <div className="absolute top-4 left-4 text-left animate-fadeInUp">
          <h2 className="text-4xl font-bold text-neon-blue">Dashboard</h2>
          <p className="text-gray-400 text-lg">
            Create and Start your AI-powered Mock Interview
          </p>
        </div>

        {/* Grid Layout with Transitions (Below Heading) */}
        <div className="absolute top-4 left-4 mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl animate-scaleIn">
          <AddNewInterview />
        </div>

        {/* Upcoming Features (Top-Right Corner) */}
        <div className="absolute top-1 right-4 bg-gray-700 p-10 rounded-2xl shadow-lg w-[65vh] h-[70vh] transition-transform duration-500 hover:scale-105">
          <h3 className="text-2xl font-semibold text-neon-blue">
            Upcoming Features
          </h3>
          <p className="text-gray-400 mt-4 text-lg">
            Stay tuned for more AI-powered enhancements and exciting updates.
          </p>
          <Image
            src="/idea.gif"
            alt="Upcoming Features"
            width={256}
            height={200}
            unoptimized 
            className="mt-4 rounded-lg shadow-lg mx-auto"
          />
        </div>

        {/* How It Works (Bottom-Left Corner) */}
        <div className="absolute top-80 left-4 bg-gray-700 p-6 rounded-2xl shadow-lg w-full max-w-3xl transition-transform duration-500 hover:scale-105">
          <h3 className="text-xl font-semibold text-neon-blue">How It Works</h3>
          <p className="text-gray-400 mt-2">
            Start your mock interview, get instant feedback, and improve your
            skills.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
