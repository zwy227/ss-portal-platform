import { Bell, Settings, HelpCircle, ChevronDown, Globe, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Link } from "react-router";

export interface PortalTopNavProps {
  sidebarCollapsed: boolean;
  onToggleSidebar: () => void;
  logoSrc?: string;
  logoAlt?: string;
  logoHref?: string;
  avatarSrc?: string;
  userName?: string;
  userRole?: string;
  showNotificationDot?: boolean;
  rightSlot?: ReactNode;
}

export function PortalTopNav({
  sidebarCollapsed,
  onToggleSidebar,
  logoSrc,
  logoAlt = "StraightShip",
  logoHref = "/",
  avatarSrc,
  userName = "Demo User",
  userRole = "管理员",
  showNotificationDot = true,
  rightSlot,
}: PortalTopNavProps) {
  const [lang, setLang] = useState<"CN" | "EN">("CN");

  return (
    <header className="portal-topnav">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="portal-topnav-icon-btn"
          aria-label={sidebarCollapsed ? "展开侧栏" : "收起侧栏"}
        >
          {sidebarCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
        </button>

        <Link
          to={logoHref}
          className="inline-flex max-w-[min(200px,40vw)] shrink-0 rounded-lg outline-none ring-offset-2 ring-offset-white transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-gray-400/80"
          aria-label="返回首页"
        >
          {logoSrc ? (
            <img src={logoSrc} alt={logoAlt} className="h-8 w-auto max-w-[125px] object-contain object-left" />
          ) : (
            <span className="text-16 font-semibold text-gray-text-2">{logoAlt}</span>
          )}
        </Link>
      </div>

      {rightSlot ?? (
        <div className="flex shrink-0 items-center gap-1">
          <button type="button" className="portal-topnav-icon-btn relative">
            <Bell size={16} />
            {showNotificationDot ? <span className="portal-topnav-notif-dot" /> : null}
          </button>

          <button
            type="button"
            onClick={() => setLang((p) => (p === "CN" ? "EN" : "CN"))}
            className="portal-topnav-icon-btn gap-1 px-2"
          >
            <Globe size={15} />
            <span className="text-12 font-medium">{lang}</span>
          </button>

          <div className="portal-topnav-divider" />

          <button type="button" className="portal-topnav-icon-btn">
            <Settings size={16} />
          </button>

          <button type="button" className="portal-topnav-icon-btn">
            <HelpCircle size={16} />
          </button>

          <div className="portal-topnav-divider" />

          <button
            type="button"
            className="ml-1 flex items-center gap-2 rounded-lg px-1 py-1 transition-colors hover:bg-gray-fill-normal"
          >
            {avatarSrc ? (
              <img src={avatarSrc} alt="用户头像" className="size-8 rounded-full object-cover" />
            ) : (
              <span className="flex size-8 items-center justify-center rounded-full bg-gray-fill-normal text-13 font-medium text-gray-text-4">
                {userName.slice(0, 1)}
              </span>
            )}
            <div className="hidden flex-col items-start md:flex">
              <span className="portal-topnav-user-name">{userName}</span>
              <span className="portal-topnav-user-role">{userRole}</span>
            </div>
            <ChevronDown size={14} className="portal-topnav-user-role hidden md:block" />
          </button>
        </div>
      )}
    </header>
  );
}
