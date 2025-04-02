import { endpoints } from "../apis";
import { apiConnector } from "../apiconnector";
const {
  CREATE_INTERVIEW_API,
  FETCH_INTERVIEW_API,
  FETCH_INTERVIEW_BYUSER_API,
  UPDATE_INTERVIEW_API,
  FETCH_LEADERBOARD_API,
} = endpoints;

export const createInterview = async (formData, token) => {
  let data;
  console.log(formData);
  try {
    const response = await apiConnector("POST", CREATE_INTERVIEW_API, {
      formData,
    });

    console.log("Create Interview API Response.....", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    data = response.data;
    console.log(response);
  } catch (error) {
    console.log("Create Interview  API ERROR............", error);
  }

  return data;
};

export const updateInterview = async ({ answers, id }) => {
  let data;
  try {
    const response = await apiConnector("PUT", UPDATE_INTERVIEW_API, {
      answers,
      id,
    });
    console.log("Update Interview API Response.....", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    data = response.data;
    console.log(response);
  } catch (error) {
    console.log("Update Interview  API ERROR............", error);
  }

  return data;
};

export const fetchInterviewByUser = async ({ createdBy }) => {
  console.log(FETCH_INTERVIEW_BYUSER_API, createdBy);
  let data;
  try {
    const response = await apiConnector(
      "GET",
      FETCH_INTERVIEW_BYUSER_API,
      null,
      null,
      { createdBy }
    );
    //console.log("Get all Interview by user API Response.....", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    data = response.data;
  } catch (error) {
    console.log("Update Interview  API ERROR............", error);
  }

  return data;
};

export const fetchCompletedInterviewByUser = async ({ userId }) => {
  let data;
  try {
    const createdBy = userId;
    const response = await apiConnector(
      "GET",
      FETCH_COMPLETED_INTERVIEW_BYUSER_API,
      null,
      null,
      { createdBy }
    );
    console.log("Get all Interview by user API Response.....", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    data = response.data;
  } catch (error) {
    console.log("Update Interview  API ERROR............", error);
  }

  return data;
};


export const fetchLeaderBoardData = async ({ contestId }) => {
  let data;
  try {
    const response = await apiConnector(
      "GET",
      FETCH_LEADERBOARD_API,
      null,
      null,
      { contestId }
    );
    console.log("LeaderBoard API Response.....", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    data = response.data;
  } catch (error) {
    console.log("LeaderBoard API Response ERROR............", error);
  }

  return data;
};
