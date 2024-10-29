import { Form, Row, Button, Container, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { LoginRequest } from "../../types/auth/LoginRequest";
import { useDoLoginRequest } from "../../api/auth/auth";
import { AxiosError, AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import logoImage from "../../assets/images/main-logo.jpg";
import { Link } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>();

  const { doLoginRequest } = useDoLoginRequest();
  const navigate = useNavigate();

  const registrationEndpont = "/users/registration";

  const onSubmit = (request: LoginRequest) => {
    doLoginRequest(request)
      .then((res: AxiosResponse) => {
        localStorage.setItem("accessToken", res.data.accessToken);
        navigate("/");
      })
      .catch((err: AxiosError) => {
        alert(err.message);
      });
  };

  return (
    <Container
      fluid
      className="vh-100 d-flex justify-content-center align-items-center"
    >
      <Row className="flex-column align-items-center">
        <Col className="mb-3 imageS">
          <img src={logoImage} />
        </Col>
        <Col className="mb-3"></Col>
        <Col className="mb-3">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Form.Control
                type={"text"}
                placeholder="아이디"
                {...register("loginId", {
                  required: "아이디를 입력해주세요.",
                })}
              />
              <Form.Label className="errorText">
                {errors?.loginId?.message}
              </Form.Label>
            </Row>
            <Row>
              <Form.Control
                type={"password"}
                placeholder="비밀번호"
                {...register("password", {
                  required: "비밀번호를 입력해주세요.",
                })}
              />
              <Form.Label className="errorText">
                {errors?.password?.message}
              </Form.Label>
            </Row>
            <Row>&nbsp;</Row>
            <Row>
              <Button type={"submit"}>로그인</Button>
            </Row>
          </Form>
        </Col>
        <Col className="mb-3">
          <Link to={registrationEndpont}>회원가입</Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
