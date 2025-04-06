import { deleteInterviewById } from "@/services/operations/Interview";
import { useRouter } from "next/navigation";
import ConfirmModal from "../../component/ConfirmModal";
import { useState } from "react";

const InterviewCard = ({ data, isActive, setInterviews }) => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const fullDetailsClick = () => {
    if (isActive) {
      router.push(`/history/${data.mockId}`);
    } else {
      router.push(`/dashboard/interview/${data.mockId}`);
    }
  };

  const handleDeleteConfirm = async () => {
    const { mockId, createdBy } = data;

    const response = await deleteInterviewById({ mockId, createdBy });
    if (response.success) {
      setInterviews(response?.data || []);
      setShowModal(false);
    }
  };

  return (
    <>
      <div className="relative bg-gray-800 border border-gray-700 rounded-2xl shadow-lg p-6 w-[300px] h-[300px] flex flex-col justify-between transition-transform duration-500 ease-in-out hover:scale-105 hover:shadow-xl">
        {/* ❌ Cross Button */}
        {!isActive && (
          <button
            onClick={() => setShowModal(true)}
            className="absolute top-3 right-3 border border-gray-400 text-gray-400 hover:text-red-500 hover:border-red-500 transition p-1 rounded-full text-sm font-bold w-7 h-7 flex items-center justify-center"
            aria-label="Delete interview"
          >
            ×
          </button>
        )}

        {/* Interview Details */}
        <div>
          <h1 className="text-xl font-semibold text-white">
            {data.jobPosition}
          </h1>
          <h2 className="text-lg text-gray-400">
            Experience: {data.jobExperience}
          </h2>
          <p className="text-sm text-gray-500">
            AI Feedback: {data.aiFeedback}
          </p>
        </div>

        {/* Button to view or complete interview */}
        <div className="flex flex-col gap-2 mt-4">
          <button
            onClick={fullDetailsClick}
            className="w-full bg-white text-gray-900 font-bold py-3 rounded-lg hover:bg-gray-200 transition duration-300"
          >
            {isActive ? "View Details" : "Complete Your Interview"}
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <ConfirmModal
          heading="Delete Interview?"
          subheading="Are you sure you want to delete this interview? This action is irreversible."
          cancelText="Cancel"
          okText="Delete"
          onCancel={() => setShowModal(false)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </>
  );
};

export default InterviewCard;
