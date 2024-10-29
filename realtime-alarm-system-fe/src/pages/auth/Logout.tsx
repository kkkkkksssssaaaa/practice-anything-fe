import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDoLogoutRequest } from "../../api/auth/auth";
import { useMutation } from "react-query";
import { AxiosError, AxiosResponse } from "axios";

const Logout = () => {
  const navigate = useNavigate();
  const { doLogoutRequest } = useDoLogoutRequest();
  const mutation = useMutation(doLogoutRequest);

  useEffect(() => {
    mutation
      .mutateAsync()
      .then((res: AxiosResponse) => {
        localStorage.removeItem("accessToken");
        navigate("/auth/login");
      })
      .catch((err: AxiosError) => {
        alert(err.message);
      });
  }, []);

  return <div></div>;
};

export default Logout;
