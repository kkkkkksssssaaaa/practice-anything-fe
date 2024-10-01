import api from "..";
import { LoginRequest } from "../../types/login/LoginRequest";

const loginEndpoint = "/auth/login";
const logoutEndpoint = "/auth/logout";

export const doLoginRequest = async (request: LoginRequest) => {
  return api.post({
    path: loginEndpoint,
    bodyParams: request,
  });
};

export const doLogoutRequest = async () => {
  return api.post({
    path: logoutEndpoint,
  });
};
