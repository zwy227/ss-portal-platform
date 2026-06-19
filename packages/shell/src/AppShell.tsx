import { useState, type ReactNode } from "react";
import {
  PORTAL_SIDEBAR_COLLAPSED_WIDTH,
  PORTAL_SIDEBAR_EXPANDED_WIDTH,
  PortalSidebarNav,
  type PortalSidebarNavProps,
} from "./PortalSidebarNav";
import { PortalTopNav, type PortalTopNavProps } from "./PortalTopNav";

export interface AppShellProps {
  children: ReactNode;
  className?: string;
  sidebar: Omit<PortalSidebarNavProps, "collapsed" | "onRequestExpand">;
  topNav?: Omit<PortalTopNavProps, "sidebarCollapsed" | "onToggleSidebar">;
}

/** Portal 页壳：侧栏 + 顶栏 + 主内容 */
export function AppShell({ children, className, sidebar, topNav }: AppShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const sidebarWidthPx = sidebarCollapsed ? PORTAL_SIDEBAR_COLLAPSED_WIDTH : PORTAL_SIDEBAR_EXPANDED_WIDTH;

  return (
    <div
      className={["flex h-screen w-full overflow-hidden bg-page-bg", className].filter(Boolean).join(" ")}
      style={{
        ["--portal-sidebar-width" as string]: `${sidebarWidthPx}px`,
      }}
    >
      <PortalSidebarNav
        {...sidebar}
        collapsed={sidebarCollapsed}
        onRequestExpand={() => setSidebarCollapsed(false)}
      />

      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <PortalTopNav
          {...topNav}
          sidebarCollapsed={sidebarCollapsed}
          onToggleSidebar={() => setSidebarCollapsed((p) => !p)}
        />
        {children}
      </div>
    </div>
  );
}
