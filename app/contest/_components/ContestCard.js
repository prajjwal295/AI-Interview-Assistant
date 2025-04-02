import { useRouter } from "next/navigation";
import { createInterview } from "../../../services/operations/Interview";
import { chatSession } from "../../../utils/GeminiAI";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { addQuestions } from "../../store/slice/interviewSlice";
import { useDispatch } from "react-redux";

const ContestCard = ({ data }) => {
  const dispatch = useDispatch();
  const [jsonResponse, setJsonResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { user } = useUser();

  const onEnrollClick = async () => {
    setError(null);
    setLoading(true);
    try {
      await createInterviewForContest();
    } catch (error) {
      setError("Failed to enroll. Please try again.");
      console.error("Enrollment Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const createInterviewForContest = async () => {
    if (!user) {
      setError("You must be logged in to enroll.");
      return;
    }

    const QuestionCount = process.env.NEXT_PUBLIC_QUESTION_COUNT || 5;
    const InputPrompt = `Job Position: ${data.jobPosition}, Job Description: ${data.jobDescription}, Years of Experience: ${data.jobExperience}. Based on the provided job role, description, and years of experience, please generate ${QuestionCount} interview question alongside its answers in json format`;

    try {
      const result = await chatSession.sendMessage(InputPrompt);
      const MockJsonResp = await result.response
        .text()
        .replace("```json", "")
        .replace("```", "");

      if (!MockJsonResp) {
        throw new Error("Invalid response from AI.");
      }

      const parsedResponse = JSON.parse(MockJsonResp);
      setJsonResponse(parsedResponse);

      const createInterviewResponse = await createInterview({
        jsonMockResp: parsedResponse,
        jobPosition: data.jobPosition,
        jobDescription: data.jobDescription,
        jobExperience: data.jobExperience,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        contestId: data._id,
      });

      if (!createInterviewResponse.success) {
        throw new Error(createInterviewResponse.message || "Unknown error");
      }

      dispatch(addQuestions(createInterviewResponse.data?.jsonMockResp));
      router.push(
        `/dashboard/interview/${createInterviewResponse.data?.mockId}`
      );
    } catch (error) {
      setError(
        error.message || "An error occurred while creating the interview."
      );
      console.error("Error during the submission:", error);
    }
  };

  return (
    <div className="bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-2xl shadow-lg p-6 h-[300px] flex flex-col justify-between transition-transform transform hover:scale-105 hover:shadow-2xl">
      <div>
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Job Role: {data.jobPosition}
        </h1>
        <h2 className="text-lg text-gray-700 dark:text-gray-300 mb-2">
          Experience: {data.jobExperience}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {data.difficulty}
        </p>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>

      <button
        onClick={onEnrollClick}
        disabled={loading}
        className={`w-full text-white font-medium py-3 rounded-lg transition duration-300 ${
          loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-400"
        }`}
      >
        {loading ? "Enrolling..." : "Enroll Now"}
      </button>
    </div>
  );
};

export default ContestCard;
