//const BASE_URL = process.env.NEXT_BASE_URL;
const BASE_URL = "http://localhost:4000";

export const endpoints = {
  CREATE_INTERVIEW_API: `http://localhost:4000/api/interviews/create`,
  FETCH_INTERVIEW_API: `${BASE_URL}/api/interviews/all`,
  FETCH_INTERVIEW_BYUSER_API: `${BASE_URL}/api/interviews/user`,
  FETCH_COMPLETED_INTERVIEW_BYUSER_API: `${BASE_URL}/api/interviews/user/completed`,
  FETCH_INTERVIEW_BYID_API: `${BASE_URL}/api/interviews/fetchById`,
  UPDATE_INTERVIEW_API: `http://localhost:4000/api/interviews/update`,
  UPDATE_INTERVIEW_FEEDBACK_API: `http://localhost:4000/api/interviews/updateFeedback`,
  FETCH_LEADERBOARD_API: `http://localhost:4000/api/interviews/LeaderBoardData`,
  DELETE_INTERVIEW_BYID: `http://localhost:4000/api/interviews/user`,
};

export const contestEndpoints = {
  FETCH_ACTIVE_CONTEST: `${BASE_URL}/api/contests/active`,
};
