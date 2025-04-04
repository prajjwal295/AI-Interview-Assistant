"use client";
import React, { useEffect, useState } from "react";
import InterviewCard from "./InterviewCard";
import { useUser } from "@clerk/nextjs";
import {
  fetchCompletedInterviewByUser,
  fetchInterviewByUser,
} from "../../../services/operations/Interview";

const InterviewList = ({ isActive }) => {
  const [interviews, setInterviews] = useState([]);
  const { user } = useUser();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (user) {
      fetchInterViewHistory();
    }
  }, [user, isActive]);

  const fetchInterViewHistory = async () => {
    try {
      const createdBy = user?.primaryEmailAddress?.emailAddress;
      var response;
      if (isActive === 0) {
        response = await fetchCompletedInterviewByUser({ createdBy });
      } else {
        response = await fetchInterviewByUser({ createdBy });
      }

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
            <div
              key={d.mockId}
              className="min-w-[320px] snap-start transition-transform duration-500 ease-in-out hover:scale-105"
            >
              <InterviewCard data={d} isActive={isActive} />
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
