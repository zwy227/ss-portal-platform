import type { ReactNode } from "react";
import { Link } from "react-router";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CloudUpload,
  FileText,
  LayoutList,
  LayoutPanelLeft,
  ListFilter,
  MessageSquare,
  MousePointerClick,
  PanelsTopLeft,
  Rows3,
  Search,
  SquareStack,
  Table2,
  Tags,
  type LucideIcon,
} from "lucide-react";

export type ComponentEntry = {
  id: string;
  title: string;
  description: string;
  source: "portal-*" | "@ss/portal-ui";
  icon: LucideIcon;
  preview: ReactNode;
};

export function componentDetailPath(id: string) {
  return `/blank/${id}`;
}

export function getComponentEntry(id: string | undefined): ComponentEntry | undefined {
  if (!id) return undefined;
  const resolved = id === "detail" ? "form" : id;
  return COMPONENT_ENTRIES.find((e) => e.id === resolved);
}

/** 页面框架入口 — 列表 / 详情 / 表单布局 */
export const PAGE_FRAMEWORK_ENTRIES: ComponentEntry[] = [
  {
    id: "list-page",
    title: "列表页框架",
    description: "标题 + 可选 Tab + 白卡（筛选 / 表格或卡片 / 分页）。",
    source: "portal-*",
    icon: Rows3,
    preview: (
      <div className="pointer-events-none flex w-full max-w-[220px] flex-col gap-1">
        <div className="h-2.5 w-1/2 rounded-sm bg-gray-fill-strong" aria-hidden />
        <div className="flex gap-2" aria-hidden>
          <span className="h-2 w-8 rounded-sm bg-gray-fill-strong" />
          <span className="h-2 w-8 rounded-sm bg-gray-fill-normal" />
          <span className="h-2 w-8 rounded-sm bg-gray-fill-normal" />
        </div>
        <div className="rounded-sm bg-background p-2 shadow-sm" aria-hidden>
          <div className="mb-1.5 flex gap-1">
            <span className="h-2 flex-1 rounded-sm bg-page-bg ring-1 ring-gray-border-light" />
            <span className="h-2 w-8 rounded-sm bg-page-bg ring-1 ring-gray-border-light" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="h-2 w-full rounded-sm bg-gray-fill-normal" />
            <span className="h-2 w-full rounded-sm bg-gray-fill-light" />
            <span className="h-2 w-[80%] rounded-sm bg-gray-fill-light" />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "detail-page",
    title: "详情页框架",
    description: "单栏、左右双栏、三栏三种布局（去内容）。",
    source: "portal-*",
    icon: LayoutPanelLeft,
    preview: (
      <div className="pointer-events-none flex w-full max-w-[220px] flex-col gap-1">
        <div className="grid grid-cols-[minmax(0,1fr)_40px] gap-1">
          <div className="rounded-sm bg-background py-4 shadow-sm" aria-hidden />
          <div className="rounded-sm bg-background py-4 shadow-sm" aria-hidden />
        </div>
        <div className="grid grid-cols-[36px_minmax(0,1fr)_36px] gap-1">
          <div className="rounded-sm bg-white/40 py-3 ring-1 ring-gray-border-light" aria-hidden />
          <div className="rounded-sm bg-background py-3 shadow-sm" aria-hidden />
          <div className="rounded-sm bg-background py-3 shadow-sm" aria-hidden />
        </div>
      </div>
    ),
  },
  {
    id: "form-page",
    title: "表单页框架",
    description: "顶栏 + 白卡 Section 堆叠 + 页级 / 卡底操作（去内容）。",
    source: "portal-*",
    icon: FileText,
    preview: (
      <div className="pointer-events-none flex w-full max-w-[220px] flex-col gap-1">
        <div className="flex items-center gap-1" aria-hidden>
          <span className="h-2 w-6 rounded-sm bg-gray-fill-normal" />
          <span className="h-2.5 w-1/3 rounded-sm bg-gray-fill-strong" />
          <span className="h-2 w-8 rounded-full bg-gray-fill-normal" />
        </div>
        <div className="flex flex-col gap-1">
          <div className="rounded-sm bg-background p-2 shadow-sm" aria-hidden>
            <span className="mb-1.5 block h-2 w-1/3 rounded-sm bg-gray-fill-strong" />
            <div className="grid grid-cols-2 gap-1">
              <span className="h-3 rounded-sm bg-page-bg ring-1 ring-gray-border-light" />
              <span className="h-3 rounded-sm bg-page-bg ring-1 ring-gray-border-light" />
            </div>
          </div>
          <div className="rounded-sm bg-background p-2 shadow-sm" aria-hidden>
            <span className="mb-1.5 block h-2 w-1/4 rounded-sm bg-gray-fill-strong" />
            <span className="block h-3 w-full rounded-sm bg-page-bg ring-1 ring-gray-border-light" />
          </div>
        </div>
        <div
          className="flex justify-end gap-1 rounded-sm border-t border-gray-border-light bg-background px-1.5 py-1"
          aria-hidden
        >
          <span className="h-2 w-8 rounded-sm bg-gray-fill-normal" />
          <span className="h-2 w-10 rounded-sm bg-gray-fill-strong" />
        </div>
      </div>
    ),
  },
];

/** 组件入口目录 — 卡片预览 + 跳转至独立详情页 */
export const COMPONENT_GALLERY_ENTRIES: ComponentEntry[] = [
  {
    id: "badge",
    title: "Badge",
    description: "Soft 四档语义标签；有待办用 warning，进行中用 info。",
    source: "portal-*",
    icon: Tags,
    preview: (
      <div className="flex flex-wrap items-center gap-2">
        <span className="portal-badge portal-badge--info">进行中</span>
        <span className="portal-badge portal-badge--warning">待办</span>
        <span className="portal-badge portal-badge--success">已完成</span>
      </div>
    ),
  },
  {
    id: "button",
    title: "Button",
    description: "品牌主按钮、黑色实心按钮；更多变体见 Button 详情。",
    source: "@ss/portal-ui",
    icon: MousePointerClick,
    preview: (
      <div className="flex flex-wrap items-center gap-2">
        <button type="button" className="portal-brand-btn">
          主操作
        </button>
        <button type="button" className="portal-black-btn">
          黑色
        </button>
      </div>
    ),
  },
  {
    id: "filter",
    title: "筛选器",
    description: "搜索框、原生 select、重置按钮；Ant Select 见筛选器详情。",
    source: "portal-*",
    icon: ListFilter,
    preview: (
      <div className="relative w-full max-w-[200px]">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 portal-filter-icon"
          strokeWidth={1.75}
          aria-hidden
        />
        <input
          type="search"
          className="portal-filter-input pointer-events-none"
          placeholder="搜索…"
          tabIndex={-1}
          readOnly
        />
      </div>
    ),
  },
  {
    id: "tab",
    title: "Tab 栏",
    description: "履约列表 Tab；报价列表支持宽度自适应收起「更多」。",
    source: "portal-*",
    icon: PanelsTopLeft,
    preview: (
      <div className="portal-tab-bar mb-0 w-full !flex-nowrap !gap-3 border-b-0">
        <span className="portal-tab-item portal-tab-item--active pointer-events-none inline-flex items-center gap-1 py-1 text-14">
          待办
        </span>
        <span className="portal-tab-bar__divider self-center" aria-hidden />
        <span className="portal-tab-item pointer-events-none py-1 text-14">全部</span>
        <span className="portal-tab-item pointer-events-none py-1 text-14">执行中</span>
      </div>
    ),
  },
  {
    id: "pagination",
    title: "分页",
    description: "summary、每页条数与页码；--spacious / --compact。",
    source: "portal-*",
    icon: LayoutList,
    preview: (
      <div className="flex items-center gap-1">
        <span className="portal-pagination-nav-btn pointer-events-none opacity-50" aria-hidden>
          <ChevronLeft className="size-3.5" />
        </span>
        <span className="portal-pagination-page portal-pagination-page--active pointer-events-none">
          1
        </span>
        <span className="portal-pagination-page pointer-events-none">2</span>
        <span className="portal-pagination-nav-btn pointer-events-none" aria-hidden>
          <ChevronRight className="size-3.5" />
        </span>
      </div>
    ),
  },
  {
    id: "dropdown",
    title: "Dropdown",
    description: "行内操作菜单；取消类用 portal-dropdown-item--cancel。",
    source: "@ss/portal-ui",
    icon: ChevronDown,
    preview: (
      <div className="pointer-events-none portal-dropdown-menu max-w-[140px] shadow-none">
        <div className="portal-dropdown-item py-1.5">编辑</div>
        <div className="portal-dropdown-item portal-dropdown-item--cancel py-1.5">取消</div>
      </div>
    ),
  },
  {
    id: "form",
    title: "表单组件",
    description: "详情页 Label / Input / Textarea / 可搜索下拉；白卡 Section 组合。",
    source: "@ss/portal-ui",
    icon: SquareStack,
    preview: (
      <div className="w-full max-w-[200px]">
        <p className="mb-1 text-12 font-medium text-gray-text-4">货柜数量</p>
        <div className="pointer-events-none h-8 rounded-input border border-gray-border-strong bg-background px-2.5 text-12 leading-8 text-gray-text-2">
          1
        </div>
      </div>
    ),
  },
  {
    id: "table",
    title: "Table",
    description: "PortalTable 原语、粘性操作列与状态/待办单元格。",
    source: "@ss/portal-ui",
    icon: Table2,
    preview: (
      <div
        className="pointer-events-none w-full max-w-[240px] overflow-hidden rounded-md border border-gray-border-light bg-background shadow-sm"
        aria-hidden
      >
        <div className="grid grid-cols-[72px_64px_minmax(0,1fr)_40px] gap-2 border-b border-gray-border-light bg-page-bg px-2.5 py-1.5">
          <span className="h-2 self-center rounded-sm bg-gray-fill-strong" />
          <span className="h-2 self-center rounded-sm bg-gray-fill-strong" />
          <span className="h-2 self-center rounded-sm bg-gray-fill-strong" />
          <span className="h-2 self-center rounded-sm bg-gray-fill-strong" />
        </div>
        <div className="grid grid-cols-[72px_64px_minmax(0,1fr)_40px] items-center gap-2 border-b border-gray-border-exlight px-2.5 py-2">
          <div className="flex flex-col gap-1">
            <span className="h-2.5 w-14 rounded-sm bg-gray-fill-strong" />
            <span className="h-1.5 w-10 rounded-sm bg-gray-fill-normal" />
          </div>
          <span className="h-4 w-12 rounded-full bg-semantic-info-bg ring-1 ring-semantic-info-light" />
          <div className="flex min-w-0 flex-col gap-1">
            <span className="h-1.5 w-full rounded-sm bg-gray-fill-normal" />
            <span className="h-1.5 w-[80%] rounded-sm bg-gray-fill-normal" />
          </div>
          <span className="h-2 w-5 justify-self-end rounded-sm bg-gray-fill-normal" />
        </div>
        <div className="grid grid-cols-[72px_64px_minmax(0,1fr)_40px] items-center gap-2 px-2.5 py-2">
          <div className="flex flex-col gap-1">
            <span className="h-2.5 w-14 rounded-sm bg-gray-fill-strong" />
            <span className="h-1.5 w-9 rounded-sm bg-gray-fill-normal" />
          </div>
          <span className="h-4 w-12 rounded-full bg-semantic-warning-bg ring-1 ring-semantic-warning-light" />
          <div className="flex min-w-0 flex-col gap-1">
            <span className="h-1.5 w-full rounded-sm bg-gray-fill-normal" />
            <span className="h-1.5 w-[60%] rounded-sm bg-gray-fill-normal" />
          </div>
          <span className="h-2 w-5 justify-self-end rounded-sm bg-gray-fill-normal" />
        </div>
      </div>
    ),
  },
  {
    id: "document-link",
    title: "文档链接",
    description: "文件名链接与文件单证摘要卡；hover/focus 用 portal-text-link。",
    source: "portal-*",
    icon: FileText,
    preview: (
      <div
        className="pointer-events-none w-full max-w-[200px] overflow-hidden rounded-md border border-gray-border-light bg-background px-3 pb-2 pt-2.5 shadow-sm"
        aria-hidden
      >
        <p className="text-12 font-semibold text-gray-text-2">文件单证</p>
        <div className="mt-1.5 flex flex-col gap-1.5 border-t border-gray-border-light pt-1.5">
          <span className="h-2 w-[85%] rounded-sm bg-gray-fill-strong" />
          <span className="h-2 w-[70%] rounded-sm bg-gray-fill-normal" />
          <span className="h-2 w-[78%] rounded-sm bg-gray-fill-normal" />
        </div>
      </div>
    ),
  },
  {
    id: "file-upload",
    title: "文件上传",
    description: "样式一拖拽批量；样式二点击上传（附件行 + 回形针按钮）。",
    source: "portal-*",
    icon: CloudUpload,
    preview: (
      <div className="pointer-events-none flex w-full max-w-[220px] flex-col items-center gap-2 rounded-card border border-dashed border-gray-border-normal bg-background px-3 py-4">
        <div
          className="flex size-9 items-center justify-center rounded-xl bg-gray-fill-normal text-gray-text-4 ring-1 ring-gray-border-normal"
          aria-hidden
        >
          <CloudUpload className="size-4" strokeWidth={1.75} />
        </div>
        <p className="text-center text-12 leading-snug text-gray-text-5">拖拽或选择 · 支持批量</p>
      </div>
    ),
  },
  {
    id: "messages",
    title: "留言模块",
    description: "列表操作列、单侧/双端留言、全部留言侧栏。",
    source: "portal-*",
    icon: MessageSquare,
    preview: (
      <div className="pointer-events-none relative inline-flex size-10 items-center justify-center rounded-md text-gray-text-4">
        <MessageSquare className="size-5" strokeWidth={1.75} aria-hidden />
        <span
          className="absolute right-1 top-1 inline-flex h-3 min-w-3 origin-center scale-75 items-center justify-center rounded-full border border-gray-border-normal bg-gray-fill-normal px-0.5 text-11 font-semibold tabular-nums leading-none text-gray-text-3"
          aria-hidden
        >
          3
        </span>
      </div>
    ),
  },
];

/** 全部入口（详情路由查找用） */
export const COMPONENT_ENTRIES: ComponentEntry[] = [
  ...PAGE_FRAMEWORK_ENTRIES,
  ...COMPONENT_GALLERY_ENTRIES,
];

export function ComponentEntryCard({ entry }: { entry: ComponentEntry }) {
  const Icon = entry.icon;

  return (
    <Link
      to={componentDetailPath(entry.id)}
      className="portal-list-card group flex flex-col gap-0 border border-gray-border-normal p-0 no-underline transition hover:border-gray-border-strong"
    >
      <div className="flex h-[112px] items-center justify-center overflow-hidden border-b border-gray-border-light bg-page-bg px-4 py-5">
        {entry.preview}
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <div className="flex items-center gap-2">
          <Icon className="size-4 shrink-0 text-gray-text-5" strokeWidth={1.75} aria-hidden />
          <h3 className="text-15 font-semibold text-gray-text-1 group-hover:text-brand">{entry.title}</h3>
        </div>
        <p className="text-13 leading-relaxed text-gray-text-5">{entry.description}</p>
        <p className="mt-auto pt-2 text-12 text-gray-text-7">{entry.source}</p>
      </div>
    </Link>
  );
}
