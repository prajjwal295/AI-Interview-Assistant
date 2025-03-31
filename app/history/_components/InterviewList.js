"use client";
import React, { useEffect, useState } from "react";
import InterviewCard from "./InterviewCard";
import { useUser } from "@clerk/nextjs";
import { fetchInterviewByUser ,fetchCompletedInterviewByUser} from "../../../services/operations/Interview";

const InterviewList = () => {
  const [interviews, setInterviews] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    fetchInterViewHistory();
  }, [user]);

  const fetchInterViewHistory = async () => {
    try {
      const createdBy = user?.primaryEmailAddress?.emailAddress;
      const response = await fetchCompletedInterviewByUser({ createdBy });
      setInterviews(response?.data || []);
    } catch (error) {
      console.error("Error fetching interview history:", error);
    }
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-5">
      {interviews.length > 0 ? (
        interviews.map((d) => <InterviewCard key={d.mockId} data={d} />)
      ) : (
        <p className="text-gray-500">No interview history found.</p>
      )}
    </div>
  );
};

export default InterviewList;
