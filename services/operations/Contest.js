import { apiConnector } from "../apiconnector";
import { contestEndpoints } from "../apis";

const { FETCH_ACTIVE_CONTEST } = contestEndpoints;

export const fetchActiveContest = async () => {
  let data;
  try {
    const response = await apiConnector("GET", FETCH_ACTIVE_CONTEST);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    data = response.data;
  } catch (error) {
    console.log("fetch Contest  API ERROR............", error);
  }

  return data;
};
