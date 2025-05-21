"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { chatSession } from "../../../utils/GeminiAI";
import { LoaderCircle } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { createInterview } from "../../../services/operations/Interview";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { addQuestions } from "../../store/slice/interviewSlice";

const AddNewInterview = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [jobRole, setJobRole] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useUser();

  const onSubmit = async (e) => {
    e.preventDefault();
    const QuestionCount = process.env.NEXT_PUBLIC_QUESTION_COUNT;
    setLoading(true);

    const InputPrompt = `Job Position: ${jobRole}, Job Description: ${jobDescription}, Years of Experience: ${jobExperience}. Based on the provided job role, description, and years of experience, please generate ${QuestionCount} interview question alongside its answers in json format`;

    try {
      const result = await chatSession.sendMessage(InputPrompt);
      const MockJsonResp = await result.response
        .text()
        .replace("```json", "")
        .replace("```", "");

      const parsedResponse = JSON.parse(MockJsonResp);

      const createInterviewResponse = await createInterview({
        jsonMockResp: parsedResponse,
        jobPosition: jobRole,
        jobDescription: jobDescription,
        jobExperience: jobExperience,
        createdBy: user?.primaryEmailAddress?.emailAddress,
      });

      if (createInterviewResponse.success) {
        dispatch(addQuestions(createInterviewResponse.data?.jsonMockResp));
        router.push(
          `/dashboard/interview/${createInterviewResponse.data?.mockId}`
        );
        setOpen(false);
      }
    } catch (error) {
      console.error("Error during the submission:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Trigger button */}
      <div
        className="p-4 border rounded-lg bg-white text-black font-semibold shadow-md transition-all transform hover:scale-105 hover:shadow-lg cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <h2 className="text-center text-lg">+ Add New</h2>
      </div>

      {/* Modal Dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        className="relative z-10"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/70 transition-opacity" />

        <form onSubmit={onSubmit}>
          <div className="fixed inset-0 z-10 flex items-center justify-center p-4">
            <DialogPanel className="relative w-full max-w-3xl transform overflow-hidden rounded-2xl bg-gray-900 text-white shadow-xl transition-all p-6">
              <DialogTitle className="text-2xl font-bold text-neon-blue mb-6 text-center">
                Job Interview Details
              </DialogTitle>

              <div className="space-y-5">
                {/* Job Role */}
                <div>
                  <label
                    htmlFor="job_role"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Job Role / Position
                  </label>
                  <input
                    type="text"
                    id="job_role"
                    className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-neon-blue focus:outline-none"
                    placeholder="Ex. Full Stack Developer"
                    required
                    value={jobRole}
                    onChange={(e) => setJobRole(e.target.value)}
                  />
                </div>

                {/* Job Description */}
                <div>
                  <label
                    htmlFor="job_description"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Job Description / Tech Stack
                  </label>
                  <textarea
                    id="job_description"
                    rows="4"
                    className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-neon-blue focus:outline-none"
                    placeholder="Ex. React, Node.js, MongoDB"
                    required
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                  ></textarea>
                </div>

                {/* Years of Experience */}
                <div>
                  <label
                    htmlFor="years_experience"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Years of Experience
                  </label>
                  <input
                    type="number"
                    id="years_experience"
                    className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-neon-blue focus:outline-none"
                    placeholder="Ex. 5"
                    max={50}
                    required
                    value={jobExperience}
                    onChange={(e) => setJobExperience(e.target.value)}
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-6 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-300 border border-gray-600 rounded-md bg-gray-800 hover:bg-gray-700 transition-all"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2.5 text-sm font-semibold text-black bg-yellow-500 rounded-md hover:bg-yellow-600 transition-all flex items-center"
                >
                  {loading ? (
                    <>
                      <LoaderCircle className="animate-spin mr-2 h-4 w-4" />
                      Generating...
                    </>
                  ) : (
                    "Start Interview"
                  )}
                </button>
              </div>
            </DialogPanel>
          </div>
        </form>
      </Dialog>
    </div>
  );
};

export default AddNewInterview;
