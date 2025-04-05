import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const LeftResult = ({ data, questions, userAnswers }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="space-y-4">
      {questions?.map((q, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={index}
            className={`rounded-xl shadow-md transition duration-300 ${
              isOpen ? "bg-white text-gray-900" : "bg-gray-800 text-white"
            }`}
          >
            {/* Question Header */}
            <button
              className="w-full flex justify-between items-center text-left p-4 font-semibold focus:outline-none"
              onClick={() => toggleIndex(index)}
            >
              <span>
                Q{index + 1}: {q.question}
              </span>
              {isOpen ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </button>

            {/* Collapsible Content */}
            {isOpen && (
              <div className="px-4 pb-4 space-y-2 text-sm">
                <p>
                  <span className="font-medium text-gray-600">
                    Your Answer:
                  </span>{" "}
                  {userAnswers?.[index]?.answer || "N/A"}
                </p>
                <p>
                  <span className="font-medium text-green-600">
                    AI Feedback:
                  </span>{" "}
                  {data?.[index]?.feedback || "N/A"}
                </p>
                <p>
                  <span className="font-medium text-blue-600">Rating:</span>{" "}
                  {data?.[index]?.rating || "N/A"}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default LeftResult;
