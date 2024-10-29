import { useApi } from "..";
import { LoginRequest } from "../../types/auth/LoginRequest";

const loginEndpoint = "/auth/login";
const logoutEndpoint = "/auth/logout";

export const useDoLoginRequest = () => {
  const api = useApi();

  const doLoginRequest = async (request: LoginRequest) => {
    return api.post({
      path: loginEndpoint,
      bodyParams: request,
    });
  };

  return { doLoginRequest };
};

export const useDoLogoutRequest = () => {
  const api = useApi();

  const doLogoutRequest = async () => {
    return api.post({
      path: logoutEndpoint,
    });
  };

  return { doLogoutRequest };
};
