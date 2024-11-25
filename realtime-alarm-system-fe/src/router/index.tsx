import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import Main from "../pages/main/Main";
import Login from "../pages/auth/Login";
import Logout from "../pages/auth/Logout";
import Registration from "../pages/users/registration/Registration";
import More from "../pages/more/More";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/auth/logout",
    element: <Logout />,
  },
  {
    path: "/users/registration",
    element: <Registration />,
  },
  {
    path: "/more",
    element: <More />,
  },
]);

export default router;
