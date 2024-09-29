import { Form, Row, Button } from "react-bootstrap";
import Api from "../../api";
import { useForm } from "react-hook-form";
import { LoginRequest } from "../../types/login/LoginRequest";
import { useState } from "react";
import { useMutation } from "react-query";
import { doLoginRequest } from "../../api/login/login";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>();

  const mutation = useMutation(doLoginRequest);

  const onSubmit = (request: LoginRequest) => {
    mutation
      .mutateAsync(request)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log("error accured");
        console.log(err.message);
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
