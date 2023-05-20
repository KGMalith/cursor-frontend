import axios from "axios";
import { successHandler } from "../interceptors";
import { errorHandler } from "../interceptors";
import { getAccessToken } from "../utils/auth";
const BASE_URL = process.env.REACT_APP_REST_API_BASE_URL;

// Init Axios
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// interceptors

axiosInstance.interceptors.request.use(async (request:any) => {
  let token = await getAccessToken();
  request.headers = {
    Authorization: `${token}`,
  };
  return request;
});


axiosInstance.interceptors.response.use(
  (response) => successHandler(response.data),
  (error) => errorHandler(error.response)
);
