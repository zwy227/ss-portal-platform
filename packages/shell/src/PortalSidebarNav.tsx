import { useCallback, useEffect, useMemo, useState, type ComponentType, type ReactNode } from "react";
import { NavLink, useLocation } from "react-router";
import { ChevronDown, ChevronLeft, FileText, Home } from "lucide-react";
import type { PortalNavNode, ResolveActiveChildId } from "./nav-types";

export const PORTAL_SIDEBAR_EXPANDED_WIDTH = 220;
export const PORTAL_SIDEBAR_COLLAPSED_WIDTH = 60;

function pathnameMatchesNavTo(pathname: string, to: string): boolean {
  return pathname === to || pathname.startsWith(`${to}/`);
}

function defaultResolveActiveChildId(
  _groupId: string,
  pathname: string,
  _search: string,
  children: PortalNavNode[],
): string | null {
  for (const c of children) {
    if (c.to && pathnameMatchesNavTo(pathname, c.to)) return c.id;
  }
  return null;
}

function PortalNavLeafRow({
  label,
  to,
  collapsed,
  isActive: isActiveOverride,
}: {
  label: string;
  to?: string;
  collapsed: boolean;
  isActive?: boolean;
}) {
  const baseRow = "portal-nav-row portal-nav-row--sub";
  const active = "portal-nav-row--active";
  const idle = "portal-nav-row--idle";

  if (to) {
    return (
      <NavLink
        to={to}
        title={collapsed ? label : undefined}
        className={({ isActive }) => {
          const selected = isActiveOverride !== undefined ? isActiveOverride : isActive;
          return `${baseRow} ${selected ? active : ""}`;
        }}
      >
        {!collapsed ? label : <span className="sr-only">{label}</span>}
      </NavLink>
    );
  }

  return (
    <button type="button" className={`${baseRow} ${idle}`} title={collapsed ? label : undefined}>
      {!collapsed ? label : <span className="sr-only">{label}</span>}
    </button>
  );
}

function PortalNavGroup({
  node,
  collapsed,
  open,
  onToggle,
  onRequestExpand,
  activeChildId,
  icon: Icon,
}: {
  node: PortalNavNode;
  collapsed: boolean;
  open: boolean;
  onToggle: () => void;
  onRequestExpand?: () => void;
  activeChildId?: string | null;
  icon: ComponentType<{ className?: string; size?: number; strokeWidth?: number }>;
}) {
  const children = node.children ?? [];
  const headerClass = "portal-nav-row portal-nav-row--primary";

  const onHeaderClick = () => {
    if (collapsed) {
      onRequestExpand?.();
      return;
    }
    onToggle();
  };

  return (
    <div className="flex flex-col gap-0.5">
      <button type="button" className={headerClass} onClick={onHeaderClick} aria-expanded={open}>
        <Icon className="shrink-0 opacity-95" size={18} strokeWidth={1.5} />
        {!collapsed ? (
          <>
            <span className="flex-1 min-w-0 truncate">{node.label}</span>
            <ChevronDown
              className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
              size={16}
              strokeWidth={1.5}
            />
          </>
        ) : (
          <span className="sr-only">{node.label}</span>
        )}
      </button>

      {!collapsed && open ? (
        <div className="flex flex-col gap-0.5 pl-2">
          {children.map((c) => (
            <div key={c.id} className="pl-5">
              <PortalNavLeafRow
                label={c.label}
                to={c.to}
                collapsed={false}
                isActive={activeChildId != null ? activeChildId === c.id : undefined}
              />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function PortalNavTopItem({
  node,
  collapsed,
  icon: Icon,
}: {
  node: PortalNavNode;
  collapsed: boolean;
  icon: ComponentType<{ className?: string; size?: number; strokeWidth?: number }>;
}) {
  const baseRow = "portal-nav-row portal-nav-row--primary";
  const active = "portal-nav-row--active";
  const idle = "portal-nav-row--idle";

  if (node.to) {
    return (
      <NavLink
        to={node.to}
        end={node.id === "home"}
        title={collapsed ? node.label : undefined}
        className={({ isActive }) => `${baseRow} ${isActive ? active : ""}`}
      >
        <Icon className="shrink-0 opacity-95" size={18} strokeWidth={1.5} />
        {!collapsed ? (
          <span className="min-w-0 truncate">{node.label}</span>
        ) : (
          <span className="sr-only">{node.label}</span>
        )}
      </NavLink>
    );
  }

  return (
    <button type="button" className={`${baseRow} ${idle}`} title={collapsed ? node.label : undefined}>
      <Icon className="shrink-0 opacity-95" size={18} strokeWidth={1.5} />
      {!collapsed ? (
        <span className="min-w-0 truncate">{node.label}</span>
      ) : (
        <span className="sr-only">{node.label}</span>
      )}
    </button>
  );
}

export interface PortalSidebarNavProps {
  nav: PortalNavNode[];
  collapsed: boolean;
  homePath: string;
  brandTitle: string;
  backLinkTo?: string;
  backLinkLabel?: string;
  /** 收起态下点到带子菜单的一级项时，请求外层展开侧栏 */
  onRequestExpand?: () => void;
  /** 按 groupId 解析二级菜单高亮；业务侧注入（如 drayage 详情回指规则） */
  resolveActiveChildId?: ResolveActiveChildId;
  /** 一级菜单 id → Lucide 图标 */
  iconById?: Record<string, ComponentType<{ className?: string; size?: number; strokeWidth?: number }>>;
  defaultOpenIds?: string[];
  headerSlot?: ReactNode;
}

export function PortalSidebarNav({
  nav,
  collapsed,
  homePath,
  brandTitle,
  backLinkTo = "/",
  backLinkLabel = "返回",
  onRequestExpand,
  resolveActiveChildId = defaultResolveActiveChildId,
  iconById = {},
  defaultOpenIds = [],
  headerSlot,
}: PortalSidebarNavProps) {
  const { pathname, search } = useLocation();
  const initialOpen = useMemo(() => {
    const next: Record<string, boolean> = {};
    for (const id of defaultOpenIds) next[id] = true;
    return next;
  }, [defaultOpenIds]);
  const [openMap, setOpenMap] = useState<Record<string, boolean>>(initialOpen);

  const autoOpenIds = useMemo(() => {
    const next: Record<string, boolean> = {};
    for (const n of nav) {
      if (!n.children?.length) continue;
      const hit = n.children.some((c) => c.to && pathname.startsWith(c.to));
      if (hit) next[n.id] = true;
    }
    return next;
  }, [nav, pathname]);

  useEffect(() => {
    setOpenMap((prev) => ({ ...prev, ...autoOpenIds }));
  }, [autoOpenIds]);

  const toggleId = useCallback((id: string) => {
    setOpenMap((p) => ({ ...p, [id]: !p[id] }));
  }, []);

  const width = collapsed ? PORTAL_SIDEBAR_COLLAPSED_WIDTH : PORTAL_SIDEBAR_EXPANDED_WIDTH;
  const DefaultIcon = FileText;

  return (
    <div
      className="shrink-0 h-full overflow-hidden transition-[width] duration-300 ease-out"
      style={{ width }}
    >
      <aside
        className="flex h-full flex-col overflow-hidden"
        style={{ width, background: "var(--brand)" }}
        aria-label="Portal 导航"
      >
        <div
          className={`flex h-14 shrink-0 items-center border-b border-white/20 ${collapsed ? "justify-center gap-1 px-2" : "gap-2 px-3"}`}
        >
          {headerSlot ?? (
            <>
              <NavLink
                to={backLinkTo}
                end
                className={`flex shrink-0 items-center rounded-md text-white/90 outline-offset-2 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/70 ${collapsed ? "p-2" : "gap-0.5 px-2 py-1.5 text-13 font-medium"}`}
                aria-label={backLinkLabel}
                title={backLinkLabel}
              >
                <ChevronLeft className="size-4 shrink-0 opacity-95" strokeWidth={1.75} aria-hidden />
                {!collapsed ? <span>{backLinkLabel}</span> : null}
              </NavLink>
              <NavLink
                to={homePath}
                end
                className={`min-w-0 truncate rounded-md text-white outline-offset-2 transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/70 ${collapsed ? "p-2" : "flex-1 px-1 py-1.5 text-15 font-semibold tracking-[-0.02em]"}`}
                aria-label={brandTitle}
                title={brandTitle}
              >
                {collapsed ? (
                  <Home className="size-[18px] shrink-0 opacity-95" strokeWidth={1.75} aria-hidden />
                ) : (
                  brandTitle
                )}
              </NavLink>
            </>
          )}
        </div>

        <nav
          className={`flex-1 min-h-0 overflow-y-auto ${collapsed ? "px-2 py-3" : "px-2 py-2"} flex flex-col gap-0.5`}
        >
          {nav.map((node) => {
            const Icon = iconById[node.id] ?? DefaultIcon;
            if (node.children?.length) {
              const activeChildId = resolveActiveChildId(node.id, pathname, search, node.children);
              return (
                <PortalNavGroup
                  key={node.id}
                  node={node}
                  collapsed={collapsed}
                  open={openMap[node.id] ?? false}
                  onToggle={() => toggleId(node.id)}
                  onRequestExpand={onRequestExpand}
                  activeChildId={activeChildId}
                  icon={Icon}
                />
              );
            }
            return <PortalNavTopItem key={node.id} node={node} collapsed={collapsed} icon={Icon} />;
          })}
        </nav>
      </aside>
    </div>
  );
}
