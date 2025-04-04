import { useRouter } from "next/navigation";

const InterviewCard = ({ data, isActive }) => {
  const router = useRouter();

  const fullDetailsClick = () => {
    router.push(`/interview/${data.mockId}`);
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-lg p-6 w-[320px] h-[300px] flex flex-col justify-between transition-transform duration-500 ease-in-out hover:scale-105 hover:shadow-xl">
      <div>
        <h1 className="text-xl font-semibold text-white">{data.jobPosition}</h1>
        <h2 className="text-lg text-gray-400">
          Experience: {data.jobExperience}
        </h2>
        <p className="text-sm text-gray-500">AI Feedback: {data.aiFeedback}</p>
      </div>

      <button
        onClick={fullDetailsClick}
        className="w-full bg-gray-700 text-white font-bold py-3 rounded-lg hover:bg-gray-300 hover:text-black transition duration-300"
      >
        {isActive ? "View Details" : "Complete Your Interview"}
      </button>
    </div>
  );
};

export default InterviewCard;
