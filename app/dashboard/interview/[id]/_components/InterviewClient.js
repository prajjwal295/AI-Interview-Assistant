"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import useSpeechToText from "react-hook-speech-to-text";
import Webcam from "react-webcam";
import { addAnswers } from "../../../../store/slice/interviewSlice";
import {
  updateInterview,
  fetchInterviewById,
} from "../../../../../services/operations/Interview";
import AiFeedbackModal from "./AiFeedbackModal";

const InterviewClient = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { answers } = useSelector((store) => store.interview);
  const [isActive, setIsActive] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [finalTranscript, setFinalTranscript] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (id) {
      fetchInterviewDetails(id);
    }
  }, [id]);

  const fetchInterviewDetails = async (id) => {
    const data = await fetchInterviewById({ mockId: id });
    const qList = data?.data?.jsonMockResp?.map((res) => res.question);
    const aList = data?.data?.userAnswers;
    setQuestions(qList);

    // console.log(aList);

    aList?.map((answerSet) => {
      var idx = answerSet.id;
      var answer = answerSet.answer;
      console.log(`Dispatching Answer: index=${idx}, answer=${answer}`);
      dispatch(addAnswers({ index: idx, answer: answer }));
    });
  };

  useEffect(() => {
    clearResponse();
  }, [isActive]);

  const clearResponse = () => {
    setFinalTranscript("");
    setResults([]);
  };

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
    setTimeout(() => {
      stopSpeechToText();
      console.log(results);
      const transcriptText = results?.map((r) => r?.transcript).join(" ") || "";
      if (transcriptText === "") {
        return;
      }
      setFinalTranscript(transcriptText);
      dispatch(addAnswers({ index: isActive, answer: transcriptText }));
    }, 2000);
  };

  const handleStartRecording = () => {
    setResults([]);
    setFinalTranscript("");
    startSpeechToText();
  };

  const handleSave = async () => {
    const firstUnansweredIndex = questions.findIndex(
      (_, index) => !answers[index]
    );
    if (firstUnansweredIndex !== -1) {
      setIsActive(firstUnansweredIndex);
    } else {
      const answerArray = Object.entries(answers).map(([key, value]) => ({
        id: Number(key),
        answer: value,
      }));
      console.log(answerArray);
      const saveAnswer = await updateInterview({ answers: answerArray, id });
      setOpenModal(true);
      console.log(saveAnswer);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen p-6 gap-6 bg-gray-100 dark:bg-gray-900">
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
                {q.slice(0, 20)}...
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
            {questions[isActive]}
          </p>

          <p className="text-gray-700 dark:text-gray-300 mt-3 leading-relaxed border-1">
            {finalTranscript}
          </p>

          <button
            onClick={() => {
              clearResponse();
            }}
          >
            clear
          </button>
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
            onClick={isRecording ? handleStopRecording : handleStartRecording}
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
      {openModal && <AiFeedbackModal id={id} setOpenModal={setOpenModal} />}
    </div>
  );
};

export default InterviewClient;
