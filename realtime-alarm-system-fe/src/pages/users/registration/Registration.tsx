import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { RegistrationRequest } from "../../../types/users/RegistrationRequest";
import { useForm } from "react-hook-form";
import { useDoRegistrationRequest } from "../../../api/users/users";
import { AxiosError, AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { useDoLoginRequest } from "../../../api/auth/auth";

const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationRequest>();
  const { doRegistrationRequest } = useDoRegistrationRequest();
  const { doLoginRequest } = useDoLoginRequest();

  const navigate = useNavigate();

  const onSubmit = (request: RegistrationRequest) => {
    if (request.password != request.passwordConfirm) {
      alert("Not valid password.");
    } else {
      doRegistrationRequest(request)
        .then((_ignore: AxiosResponse) => {
          alert("Registration is complete.");

          const loginRequest = {
            loginId: request.loginId,
            password: request.password,
          };

          doLoginRequest(loginRequest)
            .then((res: AxiosResponse) => {
              localStorage.setItem("accessToken", res.data.accessToken);
              navigate("/");
            })
            .catch((err: AxiosError) => {
              navigate("/auth/login");
            });
        })
        .catch((err: AxiosError) => {
          alert(err.message);
        });
    }
  };

  return (
    <Container
      fluid
      className="vh-100 d-flex justify-content-center align-items-center"
    >
      <Row className="flex-column align-items-center">
        <Col className="mb-3">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Form.Control
                type={"text"}
                placeholder="아이디"
                {...register("loginId", {
                  required: "사용할 아이디를 입력해주세요.",
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
            <Row>
              <Form.Control
                type={"password"}
                placeholder="비밀번호 확인"
                {...register("passwordConfirm", {
                  required: "비밀번호를 입력해주세요.",
                })}
              />
              <Form.Label className="errorText">
                {errors?.password?.message}
              </Form.Label>
            </Row>
            <Row>
              <Form.Control
                type={"text"}
                placeholder="이름"
                {...register("personalInfo.name", {
                  required: "이름을 입력해주세요.",
                })}
              />
              <Form.Label className="errorText">
                {errors?.personalInfo?.name?.message}
              </Form.Label>
            </Row>
            <Row>
              <Form.Control
                type={"date"}
                placeholder="생년월일"
                {...register("personalInfo.birth", {
                  required: "생년월일을 입력해주세요.",
                })}
              />
              <Form.Label className="errorText">
                {errors?.personalInfo?.birth?.message}
              </Form.Label>
            </Row>
            <Row>&nbsp;</Row>
            <Row>
              <Button type={"submit"}>가입</Button>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Registration;
