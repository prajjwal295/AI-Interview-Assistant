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
  const [jsonResponse, setJsonResponse] = useState(null);

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
      setJsonResponse(parsedResponse);

      const createInterviewResponse = await createInterview({
        jsonMockResp: parsedResponse,
        jobPosition: jobRole,
        jobDescription: jobDescription,
        jobExperience: jobExperience,
        createdBy: user?.primaryEmailAddress?.emailAddress,
      });

      if (createInterviewResponse.success) {
        dispatch(addQuestions(createInterviewResponse.data?.jsonMockResp));
        setOpen(false);
        router.push(
          `/dashboard/interview/${createInterviewResponse.data?.mockId}`
        );
      }

      console.log(createInterviewResponse);
    } catch (error) {
      console.error("Error during the submission:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        className="p-2 border rounded-lg bg-secondary hover:scale-105 hover:shadow-lg hover:cursor-pointer transition-all"
        onClick={() => setOpen(true)}
      >
        <h2 className="font-bold text-lg text-center">+ Add New</h2>
      </div>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        className="relative z-10"
      >
        <DialogBackdrop className="fixed inset-0 bg-gray-500/75 opacity-50 transition-opacity" />
        <form onSubmit={onSubmit}>
          <div className="fixed inset-0 z-10 flex items-center justify-center p-6 text-center">
            <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-full max-w-3xl">
              <div className="bg-white px-6 pb-6 pt-5 sm:p-8 sm:pb-8">
                <DialogTitle className="font-bold text-xl text-gray-900 mb-4">
                  Tell us more about your job interview
                </DialogTitle>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="job_role"
                      className="block text-sm font-medium text-gray-900"
                    >
                      Job Role / Job Position
                    </label>
                    <input
                      type="text"
                      id="job_role"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                      placeholder="Ex. Full Stack Developer"
                      required
                      value={jobRole}
                      onChange={(e) => setJobRole(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="job_description"
                      className="block text-sm font-medium text-gray-900"
                    >
                      Job Description / Tech Stack (In Short)
                    </label>
                    <textarea
                      id="job_description"
                      rows="4"
                      className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Ex. React, NodeJs"
                      required
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                    ></textarea>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="years_experience"
                      className="block text-sm font-medium text-gray-900"
                    >
                      Years of Experience
                    </label>
                    <input
                      type="number"
                      id="years_experience"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                      placeholder="Ex. 5"
                      max={50}
                      required
                      value={jobExperience}
                      onChange={(e) => setJobExperience(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-6 py-4 sm:flex sm:flex-row-reverse sm:px-8">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full justify-center rounded-md bg-blue-600 px-4 py-3 text-sm font-medium text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                >
                  {loading ? (
                    <>
                      <LoaderCircle className="animate-spin mr-2" />
                      Generating from AI...
                    </>
                  ) : (
                    "Start Interview"
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-4 py-3 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
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
