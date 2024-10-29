import { useApi } from "..";
import { RegistrationRequest } from "../../types/users/RegistrationRequest";

const registrationEndpoint = "/users/registration";

export const useDoRegistrationRequest = () => {
  const api = useApi();

  const doRegistrationRequest = async (request: RegistrationRequest) => {
    return api.post({
      path: registrationEndpoint,
      bodyParams: request,
    });
  };

  return { doRegistrationRequest };
};
