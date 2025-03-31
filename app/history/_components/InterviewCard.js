import { useRouter } from "next/navigation";

const InterviewCard = ({ data }) => {
  const router = useRouter();

  const fullDetailsClick = () => {
    router.push(`/interview/${data.mockId}`);
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
          AI Output: {data.aiFeedback}
        </p>
      </div>

      <button
        onClick={fullDetailsClick}
        className="w-full bg-black text-white font-medium py-3 rounded-lg hover:bg-gray-900 transition duration-300"
      >
        View Full Details
      </button>
    </div>
  );
};

export default InterviewCard;
