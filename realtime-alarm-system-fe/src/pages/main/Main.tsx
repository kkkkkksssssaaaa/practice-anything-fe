import { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      console.log("User not logged in.");
      navigate("/auth/login");
    }
  }, []);

  return (
    <Container>
      <Row>
        <h1>FRIENDS</h1>
      </Row>
    </Container>
  );
};

export default Main;
