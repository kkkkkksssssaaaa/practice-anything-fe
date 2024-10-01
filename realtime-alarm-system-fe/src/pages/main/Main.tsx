import { useEffect } from "react";
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
    <div>
      <h1>this is main</h1>
      <span>hihi</span>
    </div>
  );
};

export default Main;
