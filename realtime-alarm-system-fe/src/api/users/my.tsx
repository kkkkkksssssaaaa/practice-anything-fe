import api from "..";
import { MyInfoResponse } from "../../types/users/MyInfoResponse";

const myInfoEndpoint = "/users/me";

export const getMyInfoRequest = async () => {
  return api.get<MyInfoResponse>({
    path: myInfoEndpoint,
  });
};
