import { fetchInterviewById } from "../../../../../services/operations/Interview";
import { chatSession } from "../../../../../utils/GeminiAI";
import { RatingPrompt } from "../../../../../utils/RatingPrompt";
import React, { useEffect, useState } from "react";

const AiFeedbackModal = ({ id, setOpenModal }) => {
  const [interview, setInterview] = useState(null);

  useEffect(() => {
    if (id) {
      fetchInterviewDetails(id);
    }
  }, [id]);

  const fetchInterviewDetails = async (id) => {
    const data = await fetchInterviewById({ mockId: id });

    if (data) {
      const questionList =
        data?.data?.jsonMockResp?.map((res) => res.question) || [];
      const expectedAnswerList =
        data?.data?.jsonMockResp?.map((res) => res.answer) || [];

      const jobPosition = data?.data?.jobPosition;
      const jobDescription = data?.data?.jobDescription;
      const jobExperience = data?.data?.jobExperience;

      let userAnswerList = [];
      const aList = data?.data?.userAnswers;

      aList?.forEach((answerSet) => {
        let idx = answerSet.id;
        let answer = answerSet.answer;
        userAnswerList[idx] = answer;
      });

      console.log(
        questionList,
        expectedAnswerList,
        userAnswerList,
        jobPosition,
        jobDescription,
        jobExperience
      );

      const InputPrompt = RatingPrompt(
        questionList,
        expectedAnswerList,
        userAnswerList,
        jobPosition,
        jobDescription,
        jobExperience
      );

      console.log({ InputPrompt });

      const result = await chatSession.sendMessage(InputPrompt);
      const MockJsonResp = await result.response.text();

      console.log(MockJsonResp);
    }
  };

  return <></>;
};

export default AiFeedbackModal;
