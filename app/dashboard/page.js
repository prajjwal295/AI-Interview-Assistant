"use client";

import React, { useEffect, useState } from "react";
import AddNewInterview from "@/app/dashboard/_components/AddNewInterview";
import Image from "next/image";

const Dashboard = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-8 md:py-16 flex justify-center">
      <div className="w-full max-w-7xl flex flex-col gap-12 relative">
        {/* Dashboard Heading */}
        <div className="text-left animate-fadeInUp px-2">
          <h2 className="text-3xl sm:text-4xl font-bold text-neon-blue">
            Dashboard
          </h2>
          <p className="text-gray-400 text-base sm:text-lg mt-1">
            Create and Start your AI-powered Mock Interview
          </p>
        </div>

        {/* Grid Layout for Interviews */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-2 animate-scaleIn">
          <AddNewInterview />
        </div>

        {/* Responsive Row for Side Sections */}
        <div className="flex flex-col lg:flex-row gap-6 px-2">
          {/* How It Works */}
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg flex-1 transition-transform duration-300 hover:scale-[1.02]">
            <h3 className="text-xl font-semibold text-neon-blue mb-2">
              How It Works
            </h3>
            <p className="text-gray-300 text-sm sm:text-base">
              Start your mock interview, get instant feedback, and improve your
              skills.
            </p>
          </div>

          {/* Upcoming Features */}
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg flex-1 transition-transform duration-300 hover:scale-[1.02]">
            <h3 className="text-xl font-semibold text-neon-blue mb-2">
              Upcoming Features
            </h3>
            <p className="text-gray-300 text-sm sm:text-base mb-4">
              Stay tuned for more AI-powered enhancements and exciting updates.
            </p>
            <Image
              src="/idea.gif"
              alt="Upcoming Features"
              width={300}
              height={200}
              unoptimized
              className="rounded-lg shadow-md mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
