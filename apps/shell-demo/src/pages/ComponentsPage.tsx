import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { PortalListFilterResetButton } from "@ss/portal-shell";
import { StyleGuidePage, StyleGuideSection, StyleGuideShell } from "../style-guide/StyleGuideShell";
import { PortalFocusStyleExamples } from "../style-guide/FocusStyleExamples";

export function ComponentsPage() {
  return (
    <StyleGuideShell>
      <StyleGuidePage
        title="Components"
        description="portal-* 组合类预览。改 token 后刷新本页即可视觉验证。"
      >
        <StyleGuideSection title="Focus 样式">
          <PortalFocusStyleExamples />
        </StyleGuideSection>

        <StyleGuideSection title="Tab 栏">
          <div className="portal-tab-bar">
            <button type="button" className="portal-tab-item portal-tab-item--active">
              全部 (12)
            </button>
            <button type="button" className="portal-tab-item">
              待处理 (3)
            </button>
            <button type="button" className="portal-tab-item">
              已完成 (9)
            </button>
          </div>
        </StyleGuideSection>

        <StyleGuideSection title="筛选器">
          <div className="portal-list-card flex flex-wrap items-center gap-3">
            <div className="relative min-w-[200px] flex-1">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 portal-filter-icon"
                strokeWidth={1.75}
                aria-hidden
              />
              <input type="search" className="portal-filter-input" placeholder="搜索订单号、询价单号…" />
            </div>
            <div className="relative min-w-[140px]">
              <select className="portal-filter-select portal-filter-select--plain" defaultValue="30">
                <option value="7">最近 7 天</option>
                <option value="30">最近 30 天</option>
              </select>
            </div>
            <PortalListFilterResetButton onReset={() => undefined} />
          </div>
        </StyleGuideSection>

        <StyleGuideSection title="按钮">
          <div className="flex flex-wrap items-center gap-3">
            <button type="button" className="portal-brand-btn">
              主操作
            </button>
            <button type="button" className="portal-brand-btn" disabled>
              禁用
            </button>
          </div>
        </StyleGuideSection>

        <StyleGuideSection title="Dropdown 菜单">
          <div className="portal-dropdown-menu portal-dropdown-menu--wide max-w-[180px]">
            <div className="portal-dropdown-item">编辑</div>
            <div className="portal-dropdown-item">复制链接</div>
            <div className="portal-dropdown-item portal-dropdown-item--cancel">取消询价</div>
          </div>
        </StyleGuideSection>

        <StyleGuideSection title="分页">
          <div className="portal-list-card">
            <div className="portal-pagination portal-pagination--spacious">
              <p className="portal-pagination-summary">显示 1 - 10 / 238 条</p>
              <div className="flex flex-wrap items-center gap-4">
                <label className="portal-pagination-label">
                  每页
                  <select className="portal-pagination-size-select" defaultValue="10">
                    <option value="10">10</option>
                    <option value="20">20</option>
                  </select>
                  条
                </label>
                <div className="flex items-center gap-1">
                  <button type="button" className="portal-pagination-nav-btn" disabled aria-label="上一页">
                    <ChevronLeft className="size-4" />
                  </button>
                  <button type="button" className="portal-pagination-page portal-pagination-page--active">
                    1
                  </button>
                  <button type="button" className="portal-pagination-page">
                    2
                  </button>
                  <span className="portal-pagination-ellipsis">…</span>
                  <button type="button" className="portal-pagination-page">
                    24
                  </button>
                  <button type="button" className="portal-pagination-nav-btn" aria-label="下一页">
                    <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </StyleGuideSection>

        <StyleGuideSection title="文档链接">
          <div className="flex flex-col gap-2">
            <button type="button" className="portal-document-link w-fit">
              提货单 B/L-20260801.pdf
            </button>
            <button type="button" className="portal-document-action-link w-fit">
              下载
            </button>
          </div>
        </StyleGuideSection>

        <StyleGuideSection title="列表白卡 portal-list-card">
          <div className="portal-list-card">
            <p className="text-14 text-gray-text-4">白底 + shadow-sm + rounded-lg · 列表/筛选容器</p>
          </div>
        </StyleGuideSection>
      </StyleGuidePage>
    </StyleGuideShell>
  );
}
