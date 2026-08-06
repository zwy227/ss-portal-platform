import type { ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router";

/* ── 结构常量（去业务语义的框架占位） ── */

const LIST_TABS = [
  { id: "all", label: "全部" },
  { id: "todo", label: "待处理" },
  { id: "done", label: "已完成" },
] as const;

const WHITE_CARD_STYLE = { boxShadow: "var(--elevation-sm)" } as const;

/* ── 子件：标题 / Tab / 筛选占位 / 表格占位 / 分页 ── */

function FrameworkListTitle({
  prefix = "模块名:",
  title = "列表标题",
}: {
  prefix?: string;
  title?: string;
}) {
  return (
    <h1 className="portal-page-title">
      <span className="portal-page-title-prefix">{prefix}</span>
      {title}
    </h1>
  );
}

function FrameworkListTabs({ activeId = "todo" }: { activeId?: string }) {
  return (
    <div className="portal-tab-bar" role="tablist" aria-label="列表状态">
      {LIST_TABS.map((tab) => {
        const active = tab.id === activeId;
        return (
          <span
            key={tab.id}
            role="tab"
            aria-selected={active}
            className={
              active
                ? "portal-tab-item portal-tab-item--active pointer-events-none"
                : "portal-tab-item pointer-events-none"
            }
          >
            {tab.label}
          </span>
        );
      })}
    </div>
  );
}

function FilterBarPlaceholder() {
  return (
    <div className="flex flex-wrap items-center gap-3" aria-hidden>
      <div className="h-8 min-w-[160px] flex-1 rounded-input bg-page-bg ring-1 ring-gray-border-strong" />
      <div className="h-8 w-[120px] rounded-input bg-page-bg ring-1 ring-gray-border-strong" />
      <div className="h-8 w-[100px] rounded-input bg-page-bg ring-1 ring-gray-border-strong" />
      <div className="h-8 w-8 rounded-md bg-page-bg ring-1 ring-gray-border-normal" />
    </div>
  );
}

function TablePlaceholder({ rows = 3 }: { rows?: number }) {
  return (
    <div
      className="overflow-hidden rounded-md border border-gray-border-light bg-background"
      aria-hidden
    >
      <div className="grid grid-cols-[1.2fr_1fr_1.4fr_0.8fr_48px] gap-2 border-b border-gray-border-light bg-page-bg px-3 py-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className="h-2 self-center rounded-sm bg-gray-fill-strong" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, row) => (
        <div
          key={row}
          className={`grid grid-cols-[1.2fr_1fr_1.4fr_0.8fr_48px] items-center gap-2 px-3 py-2.5 ${
            row < rows - 1 ? "border-b border-gray-border-exlight" : ""
          }`}
        >
          <div className="flex flex-col gap-1">
            <span className="h-2.5 w-16 rounded-sm bg-gray-fill-strong" />
            <span className="h-1.5 w-10 rounded-sm bg-gray-fill-normal" />
          </div>
          <span className="h-4 w-14 rounded-full bg-gray-fill-normal" />
          <div className="flex min-w-0 flex-col gap-1">
            <span className="h-1.5 w-full rounded-sm bg-gray-fill-normal" />
            <span className="h-1.5 w-[70%] rounded-sm bg-gray-fill-normal" />
          </div>
          <span className="h-2 w-12 rounded-sm bg-gray-fill-normal" />
          <span className="h-2 w-5 justify-self-end rounded-sm bg-gray-fill-normal" />
        </div>
      ))}
    </div>
  );
}

function CardGridPlaceholder() {
  return (
    <div className="grid gap-3 sm:grid-cols-2" aria-hidden>
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex flex-col gap-2 rounded-md border border-gray-border-light bg-page-bg p-3"
        >
          <span className="h-2.5 w-1/2 rounded-sm bg-gray-fill-strong" />
          <span className="h-1.5 w-full rounded-sm bg-gray-fill-normal" />
          <span className="h-1.5 w-3/4 rounded-sm bg-gray-fill-normal" />
        </div>
      ))}
    </div>
  );
}

function PaginationPlaceholder() {
  return (
    <div className="portal-pagination portal-pagination--spacious pointer-events-none">
      <p className="portal-pagination-summary text-gray-text-5">显示 1 - n / N 条</p>
      <div className="flex flex-wrap items-center gap-4">
        <span className="portal-pagination-label text-gray-text-5">
          每页
          <span className="portal-pagination-size-select mx-1 inline-flex h-7 w-12 items-center justify-center rounded-md bg-page-bg text-12 ring-1 ring-gray-border-normal">
            10
          </span>
          条
        </span>
        <div className="flex items-center gap-1">
          <span className="portal-pagination-nav-btn opacity-50" aria-hidden>
            <ChevronLeft className="size-4" />
          </span>
          <span className="portal-pagination-page portal-pagination-page--active">1</span>
          <span className="portal-pagination-page">2</span>
          <span className="portal-pagination-nav-btn" aria-hidden>
            <ChevronRight className="size-4" />
          </span>
        </div>
      </div>
    </div>
  );
}

function ListCardShell({ children }: { children: ReactNode }) {
  return <div className="portal-list-card flex flex-col gap-4">{children}</div>;
}

function FrameworkPreviewShell({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-border-normal bg-page-bg">
      <div className="w-full px-5 pb-5 pt-5">{children}</div>
    </div>
  );
}

function SlotHint({ children }: { children: ReactNode }) {
  return <p className="m-0 text-13 text-gray-text-5">{children}</p>;
}

/* ── 示例导出 ── */

/** 标准：标题 + Tab + 白卡（筛选 / 表格 / 分页） */
export function ListPageWithTabsExample() {
  return (
    <FrameworkPreviewShell>
      <FrameworkListTitle />
      <FrameworkListTabs />
      <div className="mt-0">
        <ListCardShell>
          <SlotHint>
            白卡内：筛选栏（portal-filter-*）→ 表格 → 分页（portal-pagination）。
          </SlotHint>
          <FilterBarPlaceholder />
          <TablePlaceholder />
          <PaginationPlaceholder />
        </ListCardShell>
      </div>
    </FrameworkPreviewShell>
  );
}

/** 无 Tab：标题直接下方白卡 */
export function ListPageWithoutTabsExample() {
  return (
    <FrameworkPreviewShell>
      <FrameworkListTitle />
      <div className="mt-4">
        <ListCardShell>
          <SlotHint>可选 Tab 省略时，标题下直接接 portal-list-card。</SlotHint>
          <FilterBarPlaceholder />
          <TablePlaceholder rows={2} />
          <PaginationPlaceholder />
        </ListCardShell>
      </div>
    </FrameworkPreviewShell>
  );
}

/** 卡片列表：白卡内筛选 + 卡片网格 + 分页（替代表格） */
export function ListPageCardGridExample() {
  return (
    <FrameworkPreviewShell>
      <FrameworkListTitle />
      <FrameworkListTabs activeId="all" />
      <ListCardShell>
        <SlotHint>内容区可为卡片网格，结构仍是筛选 + 内容 + 分页。</SlotHint>
        <FilterBarPlaceholder />
        <CardGridPlaceholder />
        <PaginationPlaceholder />
      </ListCardShell>
    </FrameworkPreviewShell>
  );
}

/** DOM 槽位对照 */
export function ListPageSlotSpecExample() {
  const slots = [
    {
      label: "portal-page-title",
      detail: "模块前缀 portal-page-title-prefix + 页面名",
    },
    {
      label: "portal-tab-bar（可选）",
      detail: "状态 / 待办等切换",
    },
    {
      label: "portal-list-card",
      detail: "筛选栏 → 表格或卡片 → portal-pagination",
    },
  ] as const;

  return (
    <div className="overflow-hidden rounded-lg border border-gray-border-light">
      <div className="flex flex-col gap-2 bg-page-bg p-4">
        {slots.map((slot) => (
          <div
            key={slot.label}
            className="rounded-md bg-background px-3 py-2.5"
            style={WHITE_CARD_STYLE}
          >
            <p className="m-0 text-13 font-medium text-gray-text-2">
              <code className="text-13">{slot.label}</code>
            </p>
            <p className="m-0 mt-0.5 text-12 text-gray-text-5">{slot.detail}</p>
          </div>
        ))}
      </div>
      <p className="m-0 border-t border-gray-border-light bg-background px-4 py-3 text-12 text-gray-text-5">
        外层：<code className="text-12">main.portal-page-main</code> →{" "}
        <code className="text-12">div.portal-page-content</code>；背景{" "}
        <code className="text-12">--page-bg</code>。完整示例见路由{" "}
        <Link
          to="/orders"
          className="text-12 font-medium text-portal-text-link underline underline-offset-2"
        >
          <code className="text-12">/orders</code>
        </Link>
        。
      </p>
    </div>
  );
}
