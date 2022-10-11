import { httpClient } from "api/httpClient";
import { urls } from "api/urls";

export const getUser = async () => {
  const response = await httpClient.get(urls.auth.me);

  return response;
};

export const register = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response = await httpClient.post(urls.auth.register, {
    username: email,
    password,
  });

  return response;
};

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response = await httpClient.post(urls.auth.login, {
    username: email,
    password,
  });

  localStorage.setItem("CMS_AUTH_TOKEN", response.data.token);

  return response;
};

export const logout = () => {
  localStorage.removeItem("CMS_AUTH_TOKEN");
};
