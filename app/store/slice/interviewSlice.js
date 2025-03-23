import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questions: null,
  answers: null,
};

const interviewSlice = createSlice({
  name: "interview",
  initialState,
  reducers: {
    addQuestions: (state, actions) => {
      state.questions = actions.payload;
    },
    addAnswers: (state, actions) => {
      const { index, answer } = actions.payload;
      if (!state.answers) state.answers = {};
      state.answers[index] = answer;
    },
    resetInterview: (state) => {
      state.questions = null;
      state.answers = null;
    },
  },
});

export const { addQuestions, addAnswers, resetInterview } =
  interviewSlice.actions;
export default interviewSlice.reducer;
