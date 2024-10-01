import { Form, Row, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { LoginRequest } from "../../types/login/LoginRequest";
import { useMutation } from "react-query";
import { doLoginRequest } from "../../api/auth/auth";
import { AxiosError, AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>();

  const navigate = useNavigate();
  const mutation = useMutation(doLoginRequest);

  const onSubmit = (request: LoginRequest) => {
    mutation
      .mutateAsync(request)
      .then((res: AxiosResponse) => {
        localStorage.setItem("accessToken", res.data.accessToken);
        navigate("/");
      })
      .catch((err: AxiosError) => {
        alert(err.message);
      });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Form.Label>아이디</Form.Label>
        <Form.Control type={"text"} {...register("loginId")} />
      </Row>
      <Row>
        <Form.Label>비밀번호</Form.Label>
        <Form.Control type={"password"} {...register("password")} />
      </Row>
      <Row>
        <Button type={"submit"}>로그인</Button>
      </Row>
    </Form>
  );
};

export default Login;
