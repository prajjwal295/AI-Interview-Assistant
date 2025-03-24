import { endpoints } from "../apis";
import { apiConnector } from "../apiconnector";
const {
  CREATE_INTERVIEW_API,
  FETCH_INTERVIEW_API,
  FETCH_INTERVIEW_BYUSER_API,
  UPDATE_INTERVIEW_API,
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
