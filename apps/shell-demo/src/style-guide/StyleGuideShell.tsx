import type { ReactNode } from "react";
import { AppShell } from "@ss/portal-shell";
import { DEMO_ICONS, DEMO_NAV, STYLE_GUIDE_DEFAULT_OPEN } from "../demoNav";

export function StyleGuideShell({ children }: { children: ReactNode }) {
  return (
    <AppShell
      sidebar={{
        nav: DEMO_NAV,
        homePath: "/",
        brandTitle: "SS Design System",
        defaultOpenIds: STYLE_GUIDE_DEFAULT_OPEN,
        iconById: DEMO_ICONS,
      }}
      topNav={{
        logoAlt: "StraightShip",
        userName: "Alex Chen",
        userRole: "超级管理员",
      }}
    >
      {children}
    </AppShell>
  );
}

export function StyleGuidePage({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <main className="portal-page-main">
      <div className="portal-page-content">
        <h1 className="portal-page-title">
          <span className="portal-page-title-prefix">基础样式:</span>
          {title}
        </h1>
        {description ? <p className="mb-6 text-14 text-gray-text-5">{description}</p> : null}
        {children}
      </div>
    </main>
  );
}

export function StyleGuideSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mb-8">
      <h2 className="mb-4 text-16 font-semibold text-gray-text-2">{title}</h2>
      {children}
    </section>
  );
}
