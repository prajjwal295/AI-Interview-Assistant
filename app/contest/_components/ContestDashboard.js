"use client";
import { fetchActiveContest } from "../../../services/operations/Contest";
import React, { useEffect, useState } from "react";
import ContestCard from "./ContestCard";
import LeaderBoard from "./LeaderBoard";

const ContestDashBoard = () => {
  const [activeContest, setActiveContest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContestInformation();
  }, []);

  const fetchContestInformation = async () => {
    try {
      const response = await fetchActiveContest();
      setActiveContest(response?.data || null);
    } catch (error) {
      console.error("Error fetching contest:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full px-6 md:px-10 lg:px-20 py-6 bg-gray-950 text-white">
      {loading ? (
        <p className="text-lg text-gray-400 animate-pulse">
          Loading contests...
        </p>
      ) : activeContest ? (
        <div className="w-full space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ContestCard data={activeContest} />
            <LeaderBoard contestId={activeContest._id} />
          </div>
        </div>
      ) : (
        <p className="text-gray-500">No active contests available.</p>
      )}
    </div>
  );
};

export default ContestDashBoard;
