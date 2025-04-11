"use client";
import { useParams } from "next/navigation";
import { fetchInterviewById } from "@/services/operations/Interview";
import { useEffect, useState } from "react";
import ThingsToImprove from "./ThingsToImprove";
import LeftResult from "./LeftResult";
import FeedbackBox from "./FeedbackBox";
import { useUser } from "@clerk/nextjs";

const Result = () => {
  const [interviewData, setInterviewData] = useState(null);
  const params = useParams();
  const { id } = params;
  const { user } = useUser();

  useEffect(() => {
    if (id) {
      fetchInterviewDetails(id);
    }
  }, [id, user]);

  const fetchInterviewDetails = async (id) => {
    if (id && user) {
      const { data } = await fetchInterviewById({
        mockId: id,
        createdBy: user?.primaryEmailAddress?.emailAddress,
      });
      if (data) {
        setInterviewData(data);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 py-8 px-4 md:px-16 text-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">
              {interviewData?.jobPosition}
            </h1>
            <p className="text-gray-400 mt-2">
              {interviewData?.jobDescription}
            </p>
          </div>

          {interviewData && (
            <div
              className={`text-white px-5 py-2 rounded-full font-semibold text-lg shadow-md ${
                interviewData?.aiFeedback?.score <= 2
                  ? "bg-red-600"
                  : interviewData?.aiFeedback?.score <= 4
                  ? "bg-orange-500"
                  : interviewData?.aiFeedback?.score <= 6
                  ? "bg-yellow-500 text-black"
                  : interviewData?.aiFeedback?.score <= 8
                  ? "bg-blue-500"
                  : "bg-green-600"
              }`}
            >
              Final Score: {interviewData?.aiFeedback?.score}/10
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-900 rounded-xl shadow-md p-6">
            <LeftResult
              data={interviewData?.aiFeedback?.questionFeedback}
              questions={interviewData?.jsonMockResp}
              userAnswers={interviewData?.userAnswers}
            />
          </div>
          <div className="flex flex-col gap-6">
            <div className="bg-gray-900 rounded-xl shadow-md p-6">
              <FeedbackBox
                data={interviewData?.aiFeedback?.overallPerformance}
              />
            </div>
            <div className="bg-gray-900 rounded-xl shadow-md p-6">
              <ThingsToImprove
                data={interviewData?.aiFeedback?.areasToImprove}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
