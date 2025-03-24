"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import useSpeechToText from "react-hook-speech-to-text";
import Webcam from "react-webcam";
import { addAnswers } from "../../../store/slice/interviewSlice";
import { updateInterview } from "../../../../services/operations/Interview";

const InterviewPage = ({ params }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { questions, answers } = useSelector((store) => store.interview);
  const [isActive, setIsActive] = useState(0);
  const [finalTranscript, setFinalTranscript] = useState("");
  const { id } = params;
  useEffect(() => {
    if (!questions) {
      router.push("/dashboard");
    }
  }, [questions, router]);

  useEffect(() => {
    return () => {
      handleStopRecording();
      setFinalTranscript("");
      setResults([]);
    };
  }, [isActive]);

  if (!questions) return null;

  const {
    error,
    interimResult,
    isRecording,
    results,
    setResults,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  const handleStopRecording = () => {
    stopSpeechToText();
    console.log(results);
    const transcriptText = results?.[0]?.transcript?.join(" ") || "";
    setFinalTranscript(transcriptText);
    dispatch(addAnswers({ index: isActive, answer: transcriptText }));
  };

  const handleSave = async () => {
    console.log(JSON.stringify(answers, null, 2));
    const firstUnansweredIndex = questions.findIndex(
      (_, index) => !answers[index]
    );
    if (firstUnansweredIndex !== -1) {
      setIsActive(firstUnansweredIndex);
    } else {
      console.log("All responses saved:", answers);
      const saveAnswer = await updateInterview({ answers, id });
      console.log(saveAnswer);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen p-6 gap-6 bg-gray-100 dark:bg-gray-900">
      {/* Questions Panel */}
      <div className="flex flex-col w-full lg:w-1/2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl shadow-lg p-5">
        <div className="flex flex-wrap gap-3 mb-6 overflow-x-auto">
          {questions.map((q, index) => {
            const isAnswered = answers && answers[index] !== undefined;
            return (
              <button
                key={index}
                onClick={() => setIsActive(index)}
                className={`px-5 py-2 rounded-full text-sm font-medium cursor-pointer transition-all duration-300 shadow-md 
                ${
                  isAnswered
                    ? "bg-green-600 text-white shadow-lg scale-105 hover:bg-green-700"
                    : isActive === index
                    ? "bg-blue-600 text-white shadow-lg scale-105 hover:bg-blue-700"
                    : "bg-gray-300 text-gray-800 hover:bg-gray-400 dark:bg-gray-700 dark:text-white"
                }`}
              >
                {q.question.slice(0, 20)}...
                {isAnswered && <span className="ml-2">✔</span>}
              </button>
            );
          })}
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Question {isActive + 1}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mt-3 leading-relaxed">
            {questions[isActive].question}
          </p>
        </div>
      </div>

      {/* Answer Recording Section */}
      <div className="w-full lg:w-2/5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
          Record Your Response
        </h3>

        <div className="relative flex flex-col justify-center items-center bg-gray-200 dark:bg-gray-700 p-5 rounded-lg shadow-md">
          <Webcam
            mirrored={true}
            className="bg-black rounded-xl"
            style={{ height: 300, width: "100%", zIndex: 10 }}
          />
        </div>

        <div className="mt-4 flex flex-col items-center gap-3">
          <button
            onClick={isRecording ? handleStopRecording : startSpeechToText}
            className={`px-5 py-2 w-full text-white rounded-lg shadow-md transition-all duration-300 text-lg font-semibold
            ${
              isRecording
                ? "bg-red-600 hover:bg-red-700 scale-105 shadow-lg"
                : "bg-green-600 hover:bg-green-700 scale-105 shadow-lg"
            }`}
          >
            {isRecording ? "Stop Recording" : "Start Recording"}
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition-all duration-300 text-lg font-semibold"
          >
            Save & Finish
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterviewPage;
