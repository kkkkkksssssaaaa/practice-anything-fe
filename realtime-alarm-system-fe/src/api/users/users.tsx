import api from "..";
import { RegistrationRequest } from "../../types/users/RegistrationRequest";

const registrationEndpoint = "/users/registration";

export const doRegistrationRequest = async (request: RegistrationRequest) => {
  return api.post({
    path: registrationEndpoint,
    bodyParams: request,
  });
};
