import { useRouter } from "next/navigation";
import { createInterview } from "../../../services/operations/Interview";
import { chatSession } from "../../../utils/GeminiAI";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";

const ContestCard = ({ data }) => {
  const [jsonResponse, setJsonResponse] = useState(null);
  const router = useRouter();
  const { user } = useUser();

  const onEnrollClick = async () => {
    createInterviewForContest();
  };

  const createInterviewForContest = async () => {
    const QuestionCount = process.env.NEXT_PUBLIC_QUESTION_COUNT;
    const InputPrompt = `Job Position: ${data.jobPosition}, Job Description: ${data.jobDescription}, Years of Experience: ${data.jobExperience}. Based on the provided job role, description, and years of experience, please generate ${QuestionCount} interview question alongside its answers in json format`;

    try {
      const result = await chatSession.sendMessage(InputPrompt);
      const MockJsonResp = await result.response
        .text()
        .replace("```json", "")
        .replace("```", "");

      const parsedResponse = JSON.parse(MockJsonResp);
      setJsonResponse(parsedResponse);

      const createInterviewResponse = await createInterview({
        jsonMockResp: parsedResponse,
        jobPosition: data.jobPosition,
        jobDescription: data.jobDescription,
        jobExperience: data.jobExperience,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        constestId: data._id,
      });

      if (createInterviewResponse.success) {
        dispatch(addQuestions(createInterviewResponse.data?.jsonMockResp));
        router.push(
          `/dashboard/interview/${createInterviewResponse.data?.mockId}`
        );
      }

      console.log(createInterviewResponse);
    } catch (error) {
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
      </div>

      <button
        onClick={onEnrollClick}
        className="w-full bg-green-600 text-white font-medium py-3 rounded-lg hover:bg-green-400 transition duration-300"
      >
        Enroll Now
      </button>
    </div>
  );
};

export default ContestCard;
