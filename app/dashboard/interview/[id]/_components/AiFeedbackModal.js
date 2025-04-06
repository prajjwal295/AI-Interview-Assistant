import { useRouter } from "next/navigation";
import {
  fetchInterviewById,
  updateAiResponseInterview,
} from "../../../../../services/operations/Interview";
import { chatSession } from "../../../../../utils/GeminiAI";
import { RatingPrompt } from "../../../../../utils/RatingPrompt";
import React, { useEffect, useState } from "react";
const AiFeedbackModal = ({ id, setOpenModal }) => {
  const [interview, setInterview] = useState(null);
  const [fullData, setFullData] = useState(null);
  const [finalScore, setFinalScore] = useState(null);
  const [feedbackData, setFeedbackData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      fetchInterviewDetails(id);
    }
  }, [id]);

  const fetchInterviewDetails = async (id) => {
    const data = await fetchInterviewById({ mockId: id });

    if (data) {
      const questionList =
        data?.data?.jsonMockResp?.map((res) => res.question) || [];
      const expectedAnswerList =
        data?.data?.jsonMockResp?.map((res) => res.answer) || [];

      const jobPosition = data?.data?.jobPosition;
      const jobDescription = data?.data?.jobDescription;
      const jobExperience = data?.data?.jobExperience;

      let userAnswerList = [];
      const aList = data?.data?.userAnswers;

      aList?.forEach((answerSet) => {
        let idx = answerSet.id;
        let answer = answerSet.answer;
        userAnswerList[idx] = answer;
      });

      const InputPrompt = RatingPrompt(
        questionList,
        expectedAnswerList,
        userAnswerList,
        jobPosition,
        jobDescription,
        jobExperience
      );

      const result = await chatSession.sendMessage(InputPrompt);
      const MockJsonResp = await result.response
        .text()
        .replace("```json", "")
        .replace("```", "");

      const parsedResponse = await JSON.parse(MockJsonResp);

      if (parsedResponse?.questionFeedback) {
        const questionFeedback = parsedResponse?.questionFeedback;
        const areasToImprove = parsedResponse?.summary?.areasToImprove;
        const overallPerformance = parsedResponse?.summary?.overallPerformance;

        const ratings = questionFeedback.map((item) => item.rating);
        const totalScore = ratings.reduce((sum, score) => sum + score, 0);
        const score = (totalScore / ratings.length).toFixed(1);

        const response = await updateAiResponseInterview({
          questionFeedback,
          areasToImprove,
          overallPerformance,
          score,
          id,
        });

        if (response.success) {
          setFullData(response.interview);
          setFinalScore(score);
        }
      }
    }
  };

  const onOk = () => {
    router.push(`/history/${id}`);
    setOpenModal(false);
  };

  const onClose = () => {
    router.push(`/dashboard`);
    setOpenModal(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-900 text-white rounded-2xl shadow-xl max-w-md w-[90%] p-6 text-center">
        <h2 className="text-2xl font-bold mb-6">AI ScoreCard</h2>

        {finalScore === null ? (
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-12 h-12 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
            <p className="text-gray-300 text-base font-medium">
              {"We're calculating your score..."}
            </p>
          </div>
        ) : (
          <>
            <div className="flex justify-center mb-4">
              <img
                src="/hurray.png"
                alt="Modal Visual"
                className="h-32 w-32 object-contain"
              />
            </div>

            <p className="text-lg font-medium text-gray-300 mb-6">
              Final Score:{" "}
              <span className="font-bold text-green-500">{finalScore}/10</span>
            </p>

            <div className="flex justify-between gap-4">
              <button
                onClick={onClose}
                className="w-full bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-600 transition"
              >
                Go To Home
              </button>
              <button
                onClick={onOk}
                className="w-full bg-white text-black py-2 rounded-lg hover:bg-gray-200 transition"
              >
                Check Full Details
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AiFeedbackModal;
