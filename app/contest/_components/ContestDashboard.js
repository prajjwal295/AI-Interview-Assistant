"use client";
import { fetchActiveContest } from "../../../services/operations/Contest";
import React, { useEffect, useState } from "react";
import ContestCard from "./ContestCard";
import LeaderBoard from "./LeaderBoard";
import CardSkeleton from "@/app/component/CardSkeleton";

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
    <div className="w-full">
      {loading ? (
        <CardSkeleton />
      ) : activeContest ? (
        <div className="w-full max-w-7xl space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ContestCard data={activeContest} />
            <LeaderBoard contestId={activeContest._id} />
          </div>
        </div>
      ) : (
        <p className="text-lg text-gray-500 italic border border-gray-700 px-6 py-4 rounded-lg">
          No active contests available.
        </p>
      )}
    </div>
  );
};

export default ContestDashBoard;
