import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/styles/global.scss";
import reportWebVitals from "./reportWebVitals";
import { QueryClientProvider } from "react-query";
import queryClient from "./api/queryClient";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { ApiProvider } from "./api";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <ApiProvider>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </ApiProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
