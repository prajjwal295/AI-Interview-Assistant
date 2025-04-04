"use client";
import React, { useEffect, useState } from "react";
import InterviewCard from "./InterviewCard";
import { useUser } from "@clerk/nextjs";
import { fetchInterviewByUser } from "../../../services/operations/Interview";

const InterviewList = () => {
  const [interviews, setInterviews] = useState([]);
  const { user } = useUser();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (user) fetchInterViewHistory();
  }, [user]);

  const fetchInterViewHistory = async () => {
    try {
      const createdBy = user?.primaryEmailAddress?.emailAddress;
      const response = await fetchInterviewByUser({ createdBy });
      setInterviews(response?.data || []);
    } catch (error) {
      console.error("Error fetching interview history:", error);
    }
  };

  if (!isClient) return null;

  return (
    <div className="relative w-full">
      {/* Horizontal Scroll Container */}
      <div className="flex overflow-x-scroll space-x-4 py-5 px-2 snap-x scroll-smooth transition-all duration-500 ease-in-out no-scrollbar">
        {interviews.length > 0 ? (
          interviews.map((d) => (
            <div key={d.mockId} className="min-w-[320px] snap-start transition-transform duration-500 ease-in-out hover:scale-105">
              <InterviewCard data={d} />
            </div>
          ))
        ) : (
          <p className="text-gray-500">No interview history found.</p>
        )}
      </div>
    </div>
  );
};

export default InterviewList;
