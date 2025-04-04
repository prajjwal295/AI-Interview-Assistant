export const RatingPrompt = (
  questionList,
  expectedAnswerList,
  userAnswerList,
  jobPosition,
  jobDescription,
  jobExperience
) => {
  prompt = `
Evaluate the user's responses to the interview questions based on the expected answers. For each question, provide a rating on a scale of 1 to 10, considering relevance, correctness, depth, and clarity. Then, offer a brief explanation of the rating.

### Input Data:
- **Job Position:** ${jobPosition}
- **Job Description:** ${jobDescription}
- **Years of Experience:** ${jobExperience}
- **Interview Questions:** ${JSON.stringify(questionList)}
- **Expected Answers:** ${JSON.stringify(expectedAnswerList)}
- **User Responses:** ${JSON.stringify(userAnswerList)}

### Output Format (JSON only):
{
  "questionFeedback": [
    {
      "rating": <score_out_of_10>,
      "feedback": "<brief_reason_for_rating>"
    },
    ...
  ],
  "summary": {
    "overallPerformance": "<a concise paragraph summarizing the user's performance>",
    "areasToImprove": [
      "<area_1_heading>",
      "<area_2_heading>",
      ...
    ]
  }
}

Only return valid JSON with no extra text, markdown, or explanations outside the JSON block.
`;
  return prompt;
};
