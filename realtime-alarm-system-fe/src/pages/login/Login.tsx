import { Form, Row, Button } from "react-bootstrap";

const Login = () => {
  const handleSubmit = () => {
    console.log("call handle submit");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Form.Label>아이디</Form.Label>
        <Form.Control type={"text"} />
      </Row>
      <Row>
        <Form.Label>비밀번호</Form.Label>
        <Form.Control type={"password"} />
      </Row>
      <Row>
        <Button type={"submit"}>로그인</Button>
      </Row>
    </Form>
  );
};

export default Login;
