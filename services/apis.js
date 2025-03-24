const BASE_URL = process.env.NEXT_BASE_URL;

export const endpoints = {
  CREATE_INTERVIEW_API: `http://localhost:4000/api/interviews/create`,
  FETCH_INTERVIEW_API: `${BASE_URL}/api/interviews/all`,
  FETCH_INTERVIEW_BYUSER_API: `${BASE_URL}/api/interviews/user/:createdBy`,
  UPDATE_INTERVIEW_API: `http://localhost:4000/api/interviews/update`,
};
