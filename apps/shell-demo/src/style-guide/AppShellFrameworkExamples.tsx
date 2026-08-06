import { useState, type CSSProperties, type ReactNode } from "react";
import { ChevronDown, FileText, Home, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import {
  PORTAL_SIDEBAR_COLLAPSED_WIDTH,
  PORTAL_SIDEBAR_EXPANDED_WIDTH,
} from "@ss/portal-shell";

const SHELL_HEIGHT = 280;

function WidthBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-sm bg-background px-1.5 py-0.5 text-11 font-medium text-gray-text-4 ring-1 ring-gray-border-light">
      {label}
    </span>
  );
}

function MiniTopNav({
  collapsed,
  onToggleSidebar,
}: {
  collapsed: boolean;
  onToggleSidebar: () => void;
}) {
  return (
    <header className="portal-topnav px-3">
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <button
          type="button"
          className="portal-topnav-icon-btn size-8"
          aria-label={collapsed ? "展开侧栏" : "收起侧栏"}
          onClick={onToggleSidebar}
        >
          {collapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
        </button>
        <span className="text-13 font-semibold text-gray-text-2" aria-hidden>
          StraightShip
        </span>
      </div>
      <div className="flex shrink-0 items-center gap-1" aria-hidden>
        <span className="hidden text-11 text-gray-text-7 sm:inline">
          顶栏 · h-14
          {collapsed ? " · 侧栏收起" : ""}
        </span>
        <span className="ml-2 size-6 rounded-full bg-gray-fill-normal" />
      </div>
    </header>
  );
}

function MiniSidebar({ collapsed }: { collapsed: boolean }) {
  const width = collapsed ? PORTAL_SIDEBAR_COLLAPSED_WIDTH : PORTAL_SIDEBAR_EXPANDED_WIDTH;

  return (
    <aside
      className="flex shrink-0 flex-col self-stretch overflow-hidden"
      style={{ width, background: "var(--brand)" }}
      aria-hidden
    >
      <div
        className={`portal-sidebar-header ${collapsed ? "portal-sidebar-header--collapsed" : ""}`}
      >
        <span
          className={`portal-sidebar-brand ${collapsed ? "portal-sidebar-brand--collapsed" : "portal-sidebar-brand--expanded"}`}
        >
          {collapsed ? (
            <Home className="size-[18px] shrink-0 opacity-95" strokeWidth={1.75} />
          ) : (
            "SS Portal"
          )}
        </span>
      </div>
      <nav
        className={`flex min-h-0 flex-1 flex-col gap-0.5 overflow-hidden ${collapsed ? "px-2 py-3" : "px-2 py-2"}`}
      >
        <span className="portal-nav-row portal-nav-row--primary portal-nav-row--idle">
          <FileText className="shrink-0 opacity-95" size={18} strokeWidth={1.5} />
          {!collapsed ? (
            <>
              <span className="min-w-0 flex-1 truncate">业务模块</span>
              <ChevronDown className="shrink-0 rotate-180" size={16} strokeWidth={1.5} />
            </>
          ) : (
            <span className="sr-only">业务模块</span>
          )}
        </span>
        {!collapsed ? (
          <>
            <span className="portal-nav-row portal-nav-row--sub portal-nav-row--active">
              列表页
            </span>
            <span className="portal-nav-row portal-nav-row--sub">详情页</span>
            <span className="portal-nav-row portal-nav-row--sub">表单页</span>
          </>
        ) : null}
      </nav>
    </aside>
  );
}

function MiniMainSlot() {
  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-page-bg p-3" aria-hidden>
      <div className="mb-2 h-2.5 w-24 rounded-sm bg-gray-fill-strong" />
      <div
        className="flex min-h-0 flex-1 flex-col gap-2 rounded-md border border-dashed border-gray-border-normal bg-background p-3"
      >
        <p className="m-0 text-12 font-medium text-gray-text-4">业务 main</p>
        <p className="m-0 text-11 leading-relaxed text-gray-text-6">
          列表 / 详情 / 表单装入此处；滚动落在 main 内，不重造侧栏与顶栏。
        </p>
        <div className="mt-auto flex flex-col gap-1.5">
          <span className="h-1.5 w-full rounded-sm bg-gray-fill-normal" />
          <span className="h-1.5 w-4/5 rounded-sm bg-gray-fill-normal" />
          <span className="h-1.5 w-3/5 rounded-sm bg-gray-fill-normal" />
        </div>
      </div>
    </div>
  );
}

/** 迷你 App Shell 外框：侧栏 + 顶栏 + 业务 main 槽（供内容区栅格等复用） */
export function MiniAppShellFrame({
  collapsed,
  onToggleSidebar,
  children,
  className = "",
  style,
}: {
  collapsed: boolean;
  onToggleSidebar: () => void;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={`flex overflow-hidden rounded-lg border border-gray-border-normal ${className}`.trim()}
      style={style}
    >
      <MiniSidebar collapsed={collapsed} />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <MiniTopNav collapsed={collapsed} onToggleSidebar={onToggleSidebar} />
        {children}
      </div>
    </div>
  );
}

function ShellPreview({
  collapsed,
  onToggleSidebar,
}: {
  collapsed: boolean;
  onToggleSidebar: () => void;
}) {
  const width = collapsed ? PORTAL_SIDEBAR_COLLAPSED_WIDTH : PORTAL_SIDEBAR_EXPANDED_WIDTH;
  const caption = collapsed ? "收起态" : "展开态";

  return (
    <div className="flex min-w-0 flex-col gap-2">
      <div className="flex flex-wrap items-center gap-2">
        <p className="m-0 text-13 font-medium text-gray-text-2">{caption}</p>
        <WidthBadge label={`侧栏 ${width}px`} />
        <WidthBadge label="顶栏 h-14" />
        <span className="text-11 text-gray-text-6">点击顶栏折叠按钮切换</span>
      </div>
      <MiniAppShellFrame
        collapsed={collapsed}
        onToggleSidebar={onToggleSidebar}
        style={{ height: SHELL_HEIGHT }}
      >
        <MiniMainSlot />
      </MiniAppShellFrame>
    </div>
  );
}

/** App Shell 可视示意：侧栏宽 + 顶栏高 + 业务 main 槽位 */
export function AppShellNavShellExample() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <ShellPreview
        collapsed={collapsed}
        onToggleSidebar={() => setCollapsed((p) => !p)}
      />
      <p className="m-0 text-12 leading-relaxed text-gray-text-5">
        <code className="text-12">AppShell</code> ={" "}
        <code className="text-12">PortalSidebarNav</code>（背景{" "}
        <code className="text-12">var(--brand)</code>，宽{" "}
        {PORTAL_SIDEBAR_EXPANDED_WIDTH} / 收起 {PORTAL_SIDEBAR_COLLAPSED_WIDTH}）+{" "}
        <code className="text-12">PortalTopNav</code>（<code className="text-12">h-14</code>）+
        业务 children。细则见{" "}
        <code className="text-12">docs/frameworks/app-shell.md</code>。
      </p>
    </div>
  );
}
