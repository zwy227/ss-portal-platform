import { Link } from "react-router";
import { AppShellNavShellExample } from "../style-guide/AppShellFrameworkExamples";
import { ContentAreaGridExample } from "../style-guide/ContentAreaGridExamples";
import {
  ComponentEntryCard,
  PAGE_FRAMEWORK_ENTRIES,
  componentDetailPath,
} from "../style-guide/ComponentEntryCard";
import { SpacingScaleExample } from "../style-guide/SpacingScaleExamples";
import { StyleGuidePage, StyleGuideSection, StyleGuideShell } from "../style-guide/StyleGuideShell";

const LAYOUT_LAYERS = [
  {
    title: "App Shell",
    doc: "docs/frameworks/app-shell.md",
    summary: "侧栏 + 顶栏 + 业务 main；侧栏宽 220 / 收起 60，背景 brand。",
    demo: { to: "/orders", label: "典型页面" },
  },
  {
    title: "列表页",
    doc: "docs/frameworks/list-page.md",
    summary: "标题 + 可选 Tab + 白卡（筛选 / 表格或卡片 / 分页）。",
    demo: { to: componentDetailPath("list-page"), label: "列表页框架" },
  },
  {
    title: "详情页",
    doc: "docs/frameworks/detail-page.md",
    summary:
      "单栏 / 左右双栏 / 三栏；滚动落在 portal-page-main--detail 内。带数据典型页 /orders/:id 对齐履约跟踪三栏。",
    demo: { to: componentDetailPath("detail-page"), label: "详情页框架" },
  },
  {
    title: "表单页",
    doc: "docs/frameworks/form-page.md",
    summary: "详情单栏特化：白卡 Section 堆叠；操作在页级底栏或卡底。",
    demo: { to: componentDetailPath("form-page"), label: "表单页框架" },
  },
] as const;

export function LayoutPage() {
  return (
    <StyleGuideShell>
      <StyleGuidePage
        title="布局说明"
        description="页面骨架分层：App Shell → 列表 / 详情 / 表单。业务只填槽位，不重造侧栏与主区滚动。细则见 docs/frameworks；下方可进去内容骨架预览。"
      >
        <StyleGuideSection
          title="页面导航壳层"
          description="App Shell 可视结构：侧栏品牌底 + 顶栏 + 业务 main；侧栏展开 220px / 收起 60px，顶栏 h-14（56px）。"
        >
          <AppShellNavShellExample />
        </StyleGuideSection>

        <StyleGuideSection
          title="Spacing 基础"
          description="Tailwind 默认 spacing：1 = 4px（根字号 16px）。下列为 Portal 高频档；不另建 --space-* token。"
        >
          <SpacingScaleExample />
        </StyleGuideSection>

        <StyleGuideSection
          title="内容区栅格"
          description="示意外层为 App Shell（侧栏 + 顶栏）；业务内容落在 portal-page-content 内。固定 24 列；列间距 12px（gap-3 = 3×4px）。分栏按内容区等分。"
        >
          <ContentAreaGridExample />
        </StyleGuideSection>

        <StyleGuideSection
          title="分层一览"
          description="先定壳层与页面类型，再填 portal-* 字段与组件。"
        >
          <div className="portal-list-card flex flex-col divide-y divide-gray-border-light">
            {LAYOUT_LAYERS.map((layer) => (
              <div
                key={layer.title}
                className="flex flex-col gap-2 p-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6"
              >
                <div className="min-w-0 flex-1">
                  <p className="m-0 text-14 font-medium text-gray-text-2">{layer.title}</p>
                  <p className="m-0 mt-1 text-13 leading-relaxed text-gray-text-5">
                    {layer.summary}
                  </p>
                  <p className="m-0 mt-1.5 text-12 text-gray-text-7">
                    <code className="text-12">{layer.doc}</code>
                  </p>
                </div>
                <Link
                  to={layer.demo.to}
                  className="shrink-0 text-13 font-medium text-brand underline-offset-2 hover:underline"
                >
                  {layer.demo.label} →
                </Link>
              </div>
            ))}
          </div>
        </StyleGuideSection>

        <StyleGuideSection
          title="App Shell DOM"
          description="宿主须锁死 document 滚动（html/body/#root height 100% + overflow hidden）；Radix Theme 加 h-full min-h-0 overflow-hidden。"
        >
          <pre className="m-0 overflow-x-auto rounded-md border border-gray-border-light bg-page-bg p-4 text-12 leading-relaxed text-gray-text-3">{`AppShell
├── PortalSidebarNav（220px / 收起 60px，背景 var(--brand)）
└── 右侧列
    ├── PortalTopNav（h-14 · 56px）
    └── children（业务 main）`}</pre>
        </StyleGuideSection>

        <StyleGuideSection
          title="页面框架预览"
          description="去业务内容的骨架；点击进入独立说明与示意。"
        >
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {PAGE_FRAMEWORK_ENTRIES.map((entry) => (
              <ComponentEntryCard key={entry.id} entry={entry} />
            ))}
          </div>
        </StyleGuideSection>

        <StyleGuideSection title="选型速查">
          <div className="overflow-hidden rounded-lg border border-gray-border-normal">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-gray-border-light bg-page-bg">
                  <th className="px-4 py-3 text-13 font-medium text-gray-text-4">场景</th>
                  <th className="px-4 py-3 text-13 font-medium text-gray-text-4">选用</th>
                  <th className="px-4 py-3 text-13 font-medium text-gray-text-4">操作区</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-border-light">
                <tr>
                  <td className="px-4 py-3 text-13 text-gray-text-3">检索 / 批量浏览</td>
                  <td className="px-4 py-3 text-13 text-gray-text-2">列表页</td>
                  <td className="px-4 py-3 text-13 text-gray-text-5">行内 / 筛选区</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-13 text-gray-text-3">只读信息 + 辅助栏</td>
                  <td className="px-4 py-3 text-13 text-gray-text-2">详情 · 双栏 / 三栏</td>
                  <td className="px-4 py-3 text-13 text-gray-text-5">页级底栏或主栏卡底</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-13 text-gray-text-3">完善需求 / 确认提交</td>
                  <td className="px-4 py-3 text-13 text-gray-text-2">表单页（常 max-w-3xl）</td>
                  <td className="px-4 py-3 text-13 text-gray-text-5">页级底栏</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-13 text-gray-text-3">局部编辑（仓库预约等）</td>
                  <td className="px-4 py-3 text-13 text-gray-text-2">详情白卡内表单</td>
                  <td className="px-4 py-3 text-13 text-gray-text-5">PortalDetailCardFooter</td>
                </tr>
              </tbody>
            </table>
          </div>
        </StyleGuideSection>
      </StyleGuidePage>
    </StyleGuideShell>
  );
}
