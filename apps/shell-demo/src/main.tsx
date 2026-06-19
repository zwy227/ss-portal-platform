import React from "react";
import ReactDOM from "react-dom/client";
import { Theme } from "@radix-ui/themes";
import { createBrowserRouter, RouterProvider } from "react-router";
import { DemoListPage } from "./DemoListPage";
import "./styles.css";

const router = createBrowserRouter([
  { path: "*", Component: DemoListPage },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Theme appearance="inherit" accentColor="green" grayColor="slate" hasBackground={false}>
      <RouterProvider router={router} />
    </Theme>
  </React.StrictMode>,
);
