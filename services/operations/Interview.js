import { endpoints } from "../apis";
import { apiConnector } from "../apiconnector";
const {
  CREATE_INTERVIEW_API,
  FETCH_INTERVIEW_API,
  FETCH_COMPLETED_INTERVIEW_BYUSER_API,
  FETCH_INTERVIEW_BYUSER_API,
  UPDATE_INTERVIEW_API,
  FETCH_LEADERBOARD_API,
  FETCH_INTERVIEW_BYID_API,
  UPDATE_INTERVIEW_FEEDBACK_API,
  DELETE_INTERVIEW_BYID,
} = endpoints;

export const createInterview = async (formData, token) => {
  let data;
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

    data = response?.data;
    return data;
  } catch (error) {
    console.log("Update Interview  API ERROR............", error);
  }
};

export const updateAiResponseInterview = async ({
  questionFeedback,
  areasToImprove,
  overallPerformance,
  score,
  id,
}) => {
  let data;
  try {
    const response = await apiConnector("PUT", UPDATE_INTERVIEW_FEEDBACK_API, {
      questionFeedback,
      areasToImprove,
      overallPerformance,
      score,
      id,
    });
    console.log("Update Interview API Response.....", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    data = response?.data;
    console.log(data);
  } catch (error) {
    console.log("Update Interview  API ERROR............", error);
  }

  return data;
};

export const fetchInterviewByUser = async ({ createdBy }) => {
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
    console.log("Get Interview  API ERROR............", error);
  }

  return data;
};

export const fetchInterviewById = async ({ mockId, createdBy }) => {
  let data;
  try {
    const response = await apiConnector(
      "GET",
      FETCH_INTERVIEW_BYID_API,
      null,
      null,
      { mockId, createdBy }
    );
    console.log("Get all Interview by user API Response.....", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    data = response.data;
    return data;
  } catch (error) {
    console.log("Get Interview  API ERROR............", error);
  }

  return null;
};

export const fetchCompletedInterviewByUser = async ({ createdBy }) => {
  let data;
  try {
    const response = await apiConnector(
      "GET",
      FETCH_COMPLETED_INTERVIEW_BYUSER_API,
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
    console.log("Get Interview  API ERROR............", error);
  }

  return data;
};

export const deleteInterviewById = async ({ mockId, createdBy }) => {
  let data;
  try {
    const response = await apiConnector("DELETE", DELETE_INTERVIEW_BYID, {
      mockId,
      createdBy,
    });
    console.log("Delete Interview by user API Response.....", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    data = response.data;
    return data;
  } catch (error) {
    console.log("Delete Interview  API ERROR............", error);
  }
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
