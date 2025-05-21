"use client";
import { fetchClosedContest } from "../../../services/operations/Contest";
import React, { useEffect, useState } from "react";
import ContestCard from "./ContestCard";
import LeaderBoard from "./LeaderBoard";
import CardSkeleton from "@/app/component/CardSkeleton";
import { useUser } from "@clerk/nextjs";

const PastContestPage = () => {
  const [closedContest, setClosedContest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContestInformation();
  }, []);

  const fetchContestInformation = async () => {
    try {
      const response = await fetchClosedContest();
      if (response.success) {
        setClosedContest(response?.data || null);
        console.log(response?.data);
      }
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
      ) : closedContest ? (
        <div className="w-full max-w-7xl space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ContestCard data={closedContest} enrolled={false} past={true} />
          </div>
        </div>
      ) : (
        <p className="text-lg text-gray-500 italic border border-gray-700 px-6 py-4 rounded-lg">
          No Past contests available.
        </p>
      )}
    </div>
  );
};

export default PastContestPage;
