import { apiConnector } from "../apiconnector";
import { contestEndpoints } from "../apis";

const { FETCH_ACTIVE_CONTEST, FETCH_CLOSED_CONTEST } = contestEndpoints;

export const fetchActiveContest = async () => {
  let data;
  try {
    const response = await apiConnector("GET", FETCH_ACTIVE_CONTEST);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    console.log(response);
    data = response.data;
  } catch (error) {
    console.log("fetch Contest  API ERROR............", error);
  }

  return data;
};

export const fetchClosedContest = async () => {
  let data;
  try {
    const response = await apiConnector("GET", FETCH_CLOSED_CONTEST);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    console.log(response);
    data = response.data;
  } catch (error) {
    console.log("fetch Contest  API ERROR............", error);
  }

  return data;
};
