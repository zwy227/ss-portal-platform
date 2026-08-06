import React from "react";
import ReactDOM from "react-dom/client";
import { Theme } from "@radix-ui/themes";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import { Toaster } from "sonner";
import { DemoDetailPage } from "./DemoDetailPage";
import { DemoListPage } from "./DemoListPage";
import { BlankPage } from "./pages/BlankPage";
import { ComponentDetailPage } from "./pages/ComponentDetailPage";
import { GuidePage } from "./pages/GuidePage";
import { IconsPage } from "./pages/IconsPage";
import { LayoutPage } from "./pages/LayoutPage";
import { RadiusPage } from "./pages/RadiusPage";
import { TokensPage } from "./pages/TokensPage";
import { TypographyPage } from "./pages/TypographyPage";
import "./styles.css";

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/guide" replace /> },
  { path: "/guide", Component: GuidePage },
  { path: "/tokens", Component: TokensPage },
  { path: "/layout", Component: LayoutPage },
  { path: "/icons", Component: IconsPage },
  { path: "/radius", Component: RadiusPage },
  { path: "/typography", Component: TypographyPage },
  { path: "/blank", Component: BlankPage },
  { path: "/blank/:componentId", Component: ComponentDetailPage },
  { path: "/orders", Component: DemoListPage },
  { path: "/orders/:orderId", Component: DemoDetailPage },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Theme
      className="h-full min-h-0 overflow-hidden"
      appearance="inherit"
      accentColor="green"
      grayColor="slate"
      hasBackground={false}
    >
      <RouterProvider router={router} />
      <Toaster richColors position="top-center" closeButton />
    </Theme>
  </React.StrictMode>,
);
