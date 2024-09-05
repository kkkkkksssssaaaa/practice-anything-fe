import { useState } from "react";
import Toolbar from "./Toolbar";
import { on } from "events";

const LandingPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const onClickLogin = () => {
    setIsLoggedIn(true);
  };

  const onClickLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div>
      <Toolbar
        isLoggedIn={isLoggedIn}
        onClickLogin={onClickLogin}
        onClickLogout={onClickLogout}
      />
      <div style={{ padding: 16 }}>호이</div>
    </div>
  );
};

export default LandingPage;
