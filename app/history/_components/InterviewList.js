import InterviewCard from "./InterviewCard";
import CardSkeleton from "../../component/CardSkeleton"; // <-- import this
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import {
  fetchCompletedInterviewByUser,
  fetchInterviewByUser,
} from "../../../services/operations/Interview";

const InterviewList = ({ isActive }) => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (user) {
      fetchInterViewHistory();
    }
  }, [user, isActive]);

  const fetchInterViewHistory = async () => {
    setLoading(true);
    try {
      const createdBy = user?.primaryEmailAddress?.emailAddress;
      const response =
        isActive === 0
          ? await fetchInterviewByUser({ createdBy })
          : await fetchCompletedInterviewByUser({ createdBy });

      setInterviews(response?.data || []);
    } catch (error) {
      console.error("Error fetching interview history:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isClient) return null;

  return (
    <div className="w-full">
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 5 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      ) : interviews.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {interviews.map((d) => (
            <InterviewCard key={d.mockId} data={d} isActive={isActive} />
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-center mt-10">
          No interview history found.
        </p>
      )}
    </div>
  );
};

export default InterviewList;
