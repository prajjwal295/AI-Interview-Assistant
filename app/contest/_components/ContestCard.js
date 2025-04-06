import { useRouter } from "next/navigation";
import { createInterview } from "../../../services/operations/Interview";
import { chatSession } from "../../../utils/GeminiAI";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { addQuestions } from "../../store/slice/interviewSlice";
import { useDispatch } from "react-redux";

const getColorByDifficulty = (level) => {
  switch (level.toLowerCase()) {
    case "easy":
      return "bg-green-600 text-white";
    case "medium":
      return "bg-yellow-400 text-black";
    case "hard":
      return "bg-red-600 text-white";
    default:
      return "bg-gray-500 text-white";
  }
};

const ContestCard = ({ data, enrolled }) => {
  const dispatch = useDispatch();
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
    <div className="bg-white border border-gray-300 rounded-2xl shadow-md p-6 w-full h-[320px] flex flex-col justify-between transition-transform duration-300 hover:scale-[1.03]">
      <div className="space-y-3">
        <h1 className="text-xl font-semibold text-gray-900">
          {data.jobPosition}
        </h1>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Experience:</span> {data.jobExperience}{" "}
        </p>
        <span
          className={`inline-block px-3 py-1 text-xs font-semibold rounded-full w-fit ${getColorByDifficulty(
            data.difficulty
          )}`}
        >
          {data.difficulty}
        </span>
      </div>

      <button
        onClick={onEnrollClick}
        disabled={loading || enrolled}
        className="mt-6 w-full bg-gray-900 text-white font-semibold py-2 rounded-lg hover:bg-gray-700 transition duration-300"
      >
        {enrolled
          ? "Already Enrolled"
          : loading
          ? "Enrolling..."
          : "Enroll Now"}
      </button>

      {error && (
        <p className="mt-2 text-sm text-red-500 font-medium text-center">
          {error}
        </p>
      )}
    </div>
  );
};

export default ContestCard;
