import { useApi } from "..";
import { MyInfoResponse } from "../../types/users/MyInfoResponse";

const myInfoEndpoint = "/users/me";

export const useGetMyInfoRequest = () => {
  const api = useApi();

  const getMyInfoRequest = async () => {
    return api.get<MyInfoResponse>({
      path: myInfoEndpoint,
    });
  };

  return { getMyInfoRequest };
};
