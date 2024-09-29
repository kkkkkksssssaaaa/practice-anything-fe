import api from "..";
import { LoginRequest } from "../../types/login/LoginRequest";

const loginEndpoint = "/auth/login";

export const doLoginRequest = async (request: LoginRequest) => {
  return api.post({
    path: loginEndpoint,
    bodyParams: request,
  });
};
