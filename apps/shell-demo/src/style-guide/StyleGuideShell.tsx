import type { ReactNode } from "react";
import { AppShell } from "@ss/portal-shell";
import { DEMO_ICONS, DEMO_NAV, STYLE_GUIDE_DEFAULT_OPEN } from "../demoNav";

export function StyleGuideShell({ children }: { children: ReactNode }) {
  return (
    <AppShell
      sidebar={{
        nav: DEMO_NAV,
        homePath: "/guide",
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
        {description ? <p className="mb-8 max-w-3xl text-14 text-gray-text-5">{description}</p> : null}
        {children}
      </div>
    </main>
  );
}

/** 顶层分类：用于 Components 等需要把多组组件分区的画廊页 */
export function StyleGuideCategory({
  title,
  description,
  children,
}: {
  title: string;
  description?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="mb-14 last:mb-0">
      <header className="mb-6 border-b border-gray-border-normal pb-4">
        <h2 className="text-18 font-semibold text-gray-text-1">{title}</h2>
        {description ? (
          <div className="mt-1.5 max-w-3xl text-14 text-gray-text-5">{description}</div>
        ) : null}
      </header>
      <div className="flex flex-col gap-10">{children}</div>
    </section>
  );
}

export function StyleGuideSection({
  title,
  description,
  nested = false,
  children,
}: {
  title: string;
  description?: ReactNode;
  /** 置于 StyleGuideCategory 内时设为 true，标题降为 h3、去掉顶部分隔 */
  nested?: boolean;
  children: ReactNode;
}) {
  const Heading = nested ? "h3" : "h2";

  return (
    <section
      className={nested ? "scroll-mt-4" : "mb-10 border-t border-gray-border-light pt-8"}
    >
      <div className={nested ? "mb-4" : "mb-5"}>
        <Heading
          className={
            nested
              ? "text-15 font-semibold text-gray-text-2"
              : "text-16 font-semibold text-gray-text-2"
          }
        >
          {title}
        </Heading>
        {description ? (
          <div className="mt-1.5 max-w-3xl text-13 text-gray-text-5">{description}</div>
        ) : null}
      </div>
      {children}
    </section>
  );
}
