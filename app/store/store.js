import { configureStore } from "@reduxjs/toolkit";
import interviewReducer from "./slice/interviewSlice";

export const store = configureStore({
  reducer: {
    interview: interviewReducer,
  },
});

export default store;
