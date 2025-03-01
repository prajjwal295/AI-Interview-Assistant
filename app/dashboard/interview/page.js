"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import QuestionTab from "../_components/QuestionTab";
import VideoRecorder from "../_components/VideoRecorder"; // ✅ Import VideoRecorder

const InterviewPage = () => {
  const router = useRouter();
  const { questions } = useSelector((store) => store.interview);
  const [isActive, setIsActive] = useState(0);
  const [transcript, setTranscript] = useState("");

  useEffect(() => {
    if (!questions) {
      router.push("/dashboard");
    }
  }, [questions, router]);

  if (!questions) return null;

  return (
    <div className="flex flex-col h-screen p-4">
      <div className="flex flex-wrap gap-2 mb-4">
        {questions.map((q, index) => (
          <div
            key={index}
            onClick={() => setIsActive(index)}
            className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-all duration-200 ${
              isActive === index
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {q.question.slice(0, 20)}...
          </div>
        ))}
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-grow">
        {/* Question Display */}
        <div className="p-6 border rounded-lg bg-white shadow-md">
          <h2 className="text-lg font-semibold text-gray-800">
            Question {isActive + 1}
          </h2>
          <p className="text-gray-700 mt-2">{questions[isActive].question}</p>
        </div>

        <div className="flex flex-col items-center p-6 bg-gray-200 border rounded-lg shadow-md">
          <VideoRecorder onTranscript={(text) => setTranscript(text)} />

          {/* Live Transcript */}
          {transcript && (
            <div className="mt-4 p-3 bg-white border rounded-md shadow-sm w-full max-w-lg">
              <h3 className="font-medium text-gray-800">Live Transcript:</h3>
              <p className="text-gray-600">{transcript}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterviewPage;
