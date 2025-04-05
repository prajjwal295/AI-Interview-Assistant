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

  useEffect(() => {
    if (id) fetchInterviewDetails(id);
  }, [id]);

  const fetchInterviewDetails = async (id) => {
    const data = await fetchInterviewById({ mockId: id });
    if (data?.data?.aiFeedback) router.push(`/history/${id}`);

    const qList = data?.data?.jsonMockResp?.map((res) => res.question);
    const aList = data?.data?.userAnswers;
    setQuestions(qList);
    aList?.forEach((answerSet) => {
      dispatch(addAnswers({ index: answerSet.id, answer: answerSet.answer }));
    });
  };

  useEffect(() => {
    clearResponse();
  }, [isActive]);

  const clearResponse = () => {
    setFinalTranscript("");
    setResults([]);
  };

  const handleStopRecording = () => {
    setTimeout(() => {
      stopSpeechToText();
      const transcriptText = results?.map((r) => r?.transcript).join(" ") || "";
      if (transcriptText === "") return;
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
      const data = await updateInterview({ answers: answerArray, id });
      console.log({ data });
      if (data) {
        setOpenModal(true);
      }
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full h-full p-6 gap-6 bg-gray-950 text-white lg:h-[91vh]">
      {/* Question Panel */}
      <div className="w-full lg:w-1/2 flex flex-col gap-5 bg-gray-900 p-5 rounded-2xl shadow">
        <div className="flex flex-wrap gap-3 overflow-x-auto pb-4">
          {questions.map((q, index) => {
            const isAnswered = answers && answers[index] !== undefined;
            const isCurrent = isActive === index;

            return (
              <button
                key={index}
                onClick={() => setIsActive(index)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition duration-300 flex items-center gap-2
          ${
            isCurrent
              ? "bg-white text-black"
              : isAnswered
              ? "bg-green-600 text-white"
              : "bg-gray-800 text-white hover:bg-gray-700"
          }`}
              >
                {q.slice(0, 20)}...
                {isAnswered && <span className="ml-2">✔</span>}
              </button>
            );
          })}
        </div>

        <div>
          <h2 className="text-xl font-semibold">Question {isActive + 1}</h2>
          <p className="text-gray-300 mt-3">{questions[isActive]}</p>
        </div>

        <div className="relative">
          <h3 className="mt-4 text-lg font-semibold">Your Answer</h3>
          <textarea
            readOnly
            value={finalTranscript}
            className="w-full h-32 mt-2 p-3 rounded-lg bg-gray-800 text-white resize-none"
          ></textarea>
          <button
            onClick={clearResponse}
            className="mt-2 px-4 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded-md shadow"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Recording Section */}
      <div className="w-full lg:w-1/2 flex flex-col items-center bg-gray-900 p-5 rounded-2xl shadow">
        <h3 className="text-lg font-semibold mb-4 text-white">
          Record Your Response
        </h3>

        <div className="w-full mb-4 relative aspect-video rounded-lg overflow-hidden">
          <Webcam
            mirrored={true}
            className="absolute inset-0 w-full h-full object-cover rounded-lg"
          />
        </div>

        <div className="w-full flex flex-col sm:flex-row gap-4">
          <button
            onClick={isRecording ? handleStopRecording : handleStartRecording}
            className={`w-full sm:w-1/2 py-3 rounded-lg font-semibold transition duration-300
        ${
          isRecording
            ? "bg-red-600 hover:bg-red-700"
            : "bg-green-600 hover:bg-green-700"
        }
        text-white`}
          >
            {isRecording ? "Stop Recording" : "Start Recording"}
          </button>

          <button
            onClick={handleSave}
            className="w-full sm:w-1/2 py-3 bg-white text-black hover:bg-gray-200 rounded-lg font-semibold"
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
