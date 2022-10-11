import { getStoredToken } from "auth/auth";
import axios, { AxiosRequestConfig } from "axios";

export const httpClient = axios.create({
  baseURL: "http://localhost:3000/api",
});

httpClient.interceptors.request.use((request) => {
  return addTokenIfRequired(request);
});

const addTokenIfRequired = (
  request: AxiosRequestConfig
): AxiosRequestConfig => {
  const token = getStoredToken();
  if (!token) {
    return request;
  }

  if (request.headers) {
    request.headers["Authorization"] = `Bearer ${token}`;
  } else {
    request.headers = { Authorization: `Bearer ${token}` };
  }
  return request;
};
