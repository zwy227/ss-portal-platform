import { Link } from "react-router";
import { StyleGuidePage, StyleGuideSection, StyleGuideShell } from "./style-guide/StyleGuideShell";

export function DemoListPage() {
  return (
    <StyleGuideShell>
      <StyleGuidePage
        title="列表页框架"
        description="Phase 1 业务壳 demo。基础样式画廊见侧栏「基础样式」或下方链接。"
      >
        <div className="portal-tab-bar">
          <button type="button" className="portal-tab-item portal-tab-item--active">
            全部 (12)
          </button>
          <button type="button" className="portal-tab-item">
            待处理 (3)
          </button>
        </div>

        <div className="portal-list-card mb-6">
          <p className="text-14 text-gray-text-4">
            侧栏、顶栏、列表页框架与 <code className="text-13">portal-*</code> token 已接入。
          </p>
        </div>

        <StyleGuideSection title="基础样式画廊">
          <div className="flex flex-wrap gap-3">
            <Link to="/tokens" className="portal-brand-btn no-underline">
              Token 色板
            </Link>
            <Link to="/radius" className="portal-brand-btn no-underline">
              圆角规范
            </Link>
            <Link to="/typography" className="portal-brand-btn no-underline">
              Typography
            </Link>
            <Link to="/components" className="portal-brand-btn no-underline">
              Components
            </Link>
          </div>
        </StyleGuideSection>
      </StyleGuidePage>
    </StyleGuideShell>
  );
}
