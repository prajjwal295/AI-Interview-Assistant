const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const endpoints = {
  CREATE_INTERVIEW_API: `${BASE_URL}/api/interviews/create`,
  FETCH_INTERVIEW_API: `${BASE_URL}/api/interviews/all`,
  FETCH_INTERVIEW_BYUSER_API: `${BASE_URL}/api/interviews/user`,
  FETCH_COMPLETED_INTERVIEW_BYUSER_API: `${BASE_URL}/api/interviews/user/completed`,
  FETCH_INTERVIEW_BYID_API: `${BASE_URL}/api/interviews/fetchById`,
  UPDATE_INTERVIEW_API: `${BASE_URL}/api/interviews/update`,
  UPDATE_INTERVIEW_FEEDBACK_API: `${BASE_URL}/api/interviews/updateFeedback`,
  FETCH_LEADERBOARD_API: `${BASE_URL}/api/interviews/LeaderBoardData`,
  DELETE_INTERVIEW_BYID: `${BASE_URL}/api/interviews/user`,
};

export const contestEndpoints = {
  FETCH_ACTIVE_CONTEST: `${BASE_URL}/api/contests/active`,
  FETCH_CLOSED_CONTEST: `${BASE_URL}/api/contests/closed`,
};
