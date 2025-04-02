export const RatingPrompt = (
  questionList,
  expectedAnswerList,
  userAnswerList,
  jobPosition,
  jobDescription,
  jobExperience
) => {
  const prompt = `Evaluate the user's responses to the interview questions based on the expected answers. For each question, provide a rating on a scale of 1 to 10, considering relevance, correctness, depth, and clarity. Then, offer a brief explanation of the rating. 

### Input Data:
- **Job Position:** ${jobPosition}
- **Job Description:** ${jobDescription}
- **Years of Experience:** ${jobExperience}
- **Interview Questions:** ${JSON.stringify(questionList)}
- **Expected Answers:** ${JSON.stringify(expectedAnswerList)}
- **User Responses:** ${JSON.stringify(userAnswerList)}

### Output Format (JSON):
[
  {
    "question": "<question>",
    "expected_answer": "<expected_answer>",
    "user_answer": "<user_answer>",
    "rating": <score_out_of_10>,
    "feedback": "<brief_reason_for_rating>"
  },
  ...
]

Finally, provide an **overall performance assessment** based on the ratings, highlighting strengths, weaknesses, and areas for improvement.

Additionally, calculate the **average rating** across all responses and include it in the final assessment.`;
  return prompt;
};
