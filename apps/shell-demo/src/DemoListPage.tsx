import { AppShell } from "@ss/portal-shell";
import { DEMO_ICONS, DEMO_NAV } from "./demoNav";

export function DemoListPage() {
  return (
    <AppShell
      sidebar={{
        nav: DEMO_NAV,
        homePath: "/",
        brandTitle: "客户侧 Portal",
        defaultOpenIds: ["drayage"],
        iconById: DEMO_ICONS,
      }}
      topNav={{
        logoAlt: "StraightShip",
        userName: "Alex Chen",
        userRole: "超级管理员",
      }}
    >
      <main className="portal-page-main">
        <div className="portal-page-content">
          <h1 className="portal-page-title">
            <span className="portal-page-title-prefix">拖柜运输:</span>
            Shell Demo
          </h1>

          <div className="portal-tab-bar">
            <button type="button" className="portal-tab-item portal-tab-item--active">
              全部 (12)
            </button>
            <button type="button" className="portal-tab-item">
              待处理 (3)
            </button>
          </div>

          <div className="portal-list-card">
            <p className="text-14 text-gray-text-4">
              Phase 1 验证页：侧栏、顶栏、列表页框架与 <code className="text-13">portal-*</code> token 已接入。
            </p>
          </div>
        </div>
      </main>
    </AppShell>
  );
}
