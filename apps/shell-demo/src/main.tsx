import React from "react";
import ReactDOM from "react-dom/client";
import { Theme } from "@radix-ui/themes";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import { ComponentsPage } from "./pages/ComponentsPage";
import { RadiusPage } from "./pages/RadiusPage";
import { TokensPage } from "./pages/TokensPage";
import { TypographyPage } from "./pages/TypographyPage";
import { UiComponentsPage } from "./pages/UiComponentsPage";
import "./styles.css";

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/tokens" replace /> },
  { path: "/tokens", Component: TokensPage },
  { path: "/radius", Component: RadiusPage },
  { path: "/typography", Component: TypographyPage },
  { path: "/components", Component: ComponentsPage },
  { path: "/ui", Component: UiComponentsPage },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Theme appearance="inherit" accentColor="green" grayColor="slate" hasBackground={false}>
      <RouterProvider router={router} />
    </Theme>
  </React.StrictMode>,
);
