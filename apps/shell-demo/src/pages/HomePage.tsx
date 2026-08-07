import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router";
import {
  ArrowUpRight,
  ArrowUpDown,
  BookOpen,
  Check,
  Columns2,
  LayoutPanelLeft,
  LayoutTemplate,
  Loader2,
  Palette,
  Rows3,
  TriangleAlert,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@ss/portal-ui";
import { BRAND_TOKENS, GRAY_TEXT_TOKENS } from "../style-guide/tokenCatalog";
import {
  COMPONENT_ENTRIES,
  componentDetailPath,
  type ComponentEntry,
} from "../style-guide/ComponentEntryCard";
import { InstallFlowProcess } from "../components/InstallFlowProcess";

/**
 * Design read: design-system gallery entry for engineers,
 * white canvas + brand-green grid, SS Portal tokens.
 * Dials: VARIANCE 6 / MOTION 4 / DENSITY 3 · Redesign-preserve.
 */

const TOKEN_SWATCHES = [...BRAND_TOKENS.slice(0, 3), ...GRAY_TEXT_TOKENS.slice(0, 3)];

type FrameworkDiagramKind = "list" | "three-col" | "two-col";

const FRAMEWORK_OPTIONS: Array<{
  id: FrameworkDiagramKind;
  label: string;
  entryId: string;
  icon: LucideIcon;
}> = [
  { id: "list", label: "列表页", entryId: "list-page", icon: Rows3 },
  { id: "three-col", label: "三栏布局", entryId: "detail-page", icon: LayoutPanelLeft },
  { id: "two-col", label: "双栏布局", entryId: "detail-page", icon: Columns2 },
];

/** Bento 瓷砖：页面框架切换 + 地址搜索 + 待办预警 */
const BENTO_TILES: Array<{
  id: string;
  span: string;
  delayClass: string;
  tone?: "default" | "soft" | "accent";
}> = [
  { id: "list-page", span: "sm:col-span-2 lg:col-span-2 lg:row-span-2", delayClass: "home-reveal-delay-1", tone: "soft" },
  { id: "address-search", span: "sm:col-span-2 lg:col-span-2", delayClass: "home-reveal-delay-2" },
  { id: "todo-message", span: "sm:col-span-2 lg:col-span-2", delayClass: "home-reveal-delay-3" },
];

function entryById(id: string): ComponentEntry | undefined {
  return COMPONENT_ENTRIES.find((e) => e.id === id);
}

/** 步骤圆点：loading → 对勾，循环演示 */
function StepStatusDot() {
  const [phase, setPhase] = useState<"loading" | "done">("loading");

  useEffect(() => {
    let timeoutId = 0;
    const run = (next: "loading" | "done", delay: number) => {
      timeoutId = window.setTimeout(() => {
        setPhase(next);
        if (next === "loading") run("done", 1100);
        else run("loading", 2200);
      }, delay);
    };
    run("done", 1100);
    return () => window.clearTimeout(timeoutId);
  }, []);

  if (phase === "loading") {
    return (
      <span className="flex size-3 shrink-0 items-center justify-center" aria-hidden>
        <Loader2 className="size-2.5 animate-spin text-brand" strokeWidth={2.5} />
      </span>
    );
  }

  return (
    <span
      className="framework-step-check flex size-3 shrink-0 items-center justify-center rounded-full bg-brand"
      aria-hidden
    >
      <Check className="size-2 text-white" strokeWidth={3} />
    </span>
  );
}

function FrameworkDiagram({ kind }: { kind: FrameworkDiagramKind }) {
  if (kind === "list") {
    return (
      <div className="flex w-full min-w-[280px] flex-col gap-2.5" aria-hidden>
        <div className="h-2 w-16 rounded-full bg-gray-fill-strong" />
        <div className="flex gap-3 border-b border-gray-border-light pb-1.5">
          <span className="h-1.5 w-8 rounded-full bg-brand" />
          <span className="h-1.5 w-7 rounded-full bg-gray-fill-normal" />
          <span className="h-1.5 w-7 rounded-full bg-gray-fill-normal" />
        </div>
        <div className="flex gap-1.5">
          <span className="h-6 flex-1 rounded-sm bg-background ring-1 ring-gray-border-light" />
          <span className="h-6 w-10 rounded-sm bg-background ring-1 ring-gray-border-light" />
        </div>
        <div className="overflow-hidden rounded-sm bg-background ring-1 ring-gray-border-light">
          <div className="grid grid-cols-[1.2fr_0.8fr_1fr] gap-2 border-b border-gray-border-light bg-page-bg px-2.5 py-1.5">
            <span className="h-1.5 rounded-full bg-gray-fill-strong" />
            <span className="h-1.5 rounded-full bg-gray-fill-strong" />
            <span className="h-1.5 rounded-full bg-gray-fill-strong" />
          </div>
          {[0, 1, 2].map((row) => (
            <div
              key={row}
              className={`grid grid-cols-[1.2fr_0.8fr_1fr] items-center gap-2 px-2.5 py-2 ${
                row < 2 ? "border-b border-gray-border-exlight" : ""
              } ${row === 0 ? "bg-brand-xlight" : ""}`}
            >
              <span className="h-1.5 rounded-full bg-gray-fill-strong" />
              <span
                className={`h-4 w-10 rounded-full ${
                  row === 0 ? "bg-semantic-info-bg ring-1 ring-semantic-info-light" : "bg-gray-fill-normal"
                }`}
              />
              <span className="h-1.5 w-[70%] rounded-full bg-gray-fill-normal" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (kind === "three-col") {
    return (
      <div className="flex w-full min-w-[280px] flex-col gap-2" aria-hidden>
        <div className="h-2 w-20 rounded-full bg-gray-fill-strong" />
        <div className="flex gap-1.5 border-b border-gray-border-light pb-1.5">
          <span className="h-1.5 w-8 rounded-full bg-gray-fill-strong" />
          <span className="h-1.5 w-7 rounded-full bg-gray-fill-normal" />
          <span className="h-1.5 w-7 rounded-full bg-gray-fill-normal" />
        </div>
        <div className="grid min-h-[148px] grid-cols-[88px_minmax(0,1fr)_24px] gap-1.5">
          {/* 左侧：精简步骤导航 */}
          <div className="flex flex-col gap-1 overflow-hidden rounded-sm bg-page-bg p-1.5 ring-1 ring-gray-border-light">
            <span className="mx-0.5 h-1.5 w-10 rounded-full bg-gray-fill-strong" />
            <div className="flex items-center gap-1 rounded-sm bg-background px-1 py-1 shadow-[0_2px_6px_color-mix(in_srgb,var(--brand-dark)_8%,transparent)] ring-1 ring-gray-border-light">
              <StepStatusDot />
              <span className="h-1 flex-1 rounded-full bg-gray-fill-strong" />
            </div>
            <div className="flex items-center gap-1 px-1 py-0.5">
              <span className="size-3 shrink-0 rounded-full border border-gray-border-strong bg-transparent" />
              <span className="h-1 flex-1 rounded-full bg-gray-fill-normal" />
            </div>
            <div className="flex items-center gap-1 px-1 py-0.5">
              <span className="size-3 shrink-0 rounded-full border border-gray-border-strong bg-transparent" />
              <span className="h-1 w-[70%] rounded-full bg-gray-fill-normal" />
            </div>
            <div className="my-0.5 h-px bg-gray-border-light" />
            <span className="mx-0.5 h-1.5 w-10 rounded-full bg-gray-fill-strong" />
            <div className="flex items-center gap-1 px-1 py-0.5">
              <span className="size-3 shrink-0 rounded-full border border-gray-border-strong bg-transparent" />
              <span className="h-1 flex-1 rounded-full bg-gray-fill-normal" />
            </div>
          </div>

          <div className="flex flex-col gap-2 rounded-sm bg-background p-2.5 ring-1 ring-gray-border-light">
            <span className="h-1.5 w-14 rounded-full bg-gray-fill-strong" />
            <div className="grid grid-cols-2 gap-1.5">
              <span className="h-1.5 rounded-full bg-gray-fill-normal" />
              <span className="h-1.5 rounded-full bg-gray-fill-normal" />
              <span className="h-1.5 rounded-full bg-gray-fill-normal" />
              <span className="h-1.5 w-[70%] rounded-full bg-gray-fill-normal" />
              <span className="h-1.5 rounded-full bg-gray-fill-normal" />
              <span className="h-1.5 w-[55%] rounded-full bg-gray-fill-normal" />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex-1 rounded-sm bg-gray-fill-normal ring-1 ring-gray-border-exlight" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full min-w-[280px] flex-col gap-2" aria-hidden>
      <div className="flex items-center gap-2">
        <span className="h-1.5 w-6 rounded-full bg-gray-fill-normal" />
        <span className="h-2 w-20 rounded-full bg-gray-fill-strong" />
      </div>
      <div className="grid min-h-[132px] grid-cols-[minmax(0,1fr)_52px] gap-1.5">
        <div className="flex flex-col gap-2 rounded-sm bg-background p-2.5 ring-1 ring-gray-border-light">
          <span className="h-1.5 w-12 rounded-full bg-gray-fill-strong" />
          <div className="grid grid-cols-2 gap-1.5">
            <span className="h-6 rounded-sm bg-page-bg ring-1 ring-gray-border-light" />
            <span className="h-6 rounded-sm bg-page-bg ring-1 ring-gray-border-light" />
          </div>
          <span className="h-6 w-full rounded-sm bg-page-bg ring-1 ring-gray-border-light" />
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex-1 rounded-sm bg-brand-xlight ring-1 ring-brand-light" />
          <div className="h-7 rounded-sm bg-background ring-1 ring-gray-border-light" />
        </div>
      </div>
      <div className="flex justify-end gap-1.5">
        <span className="h-5 w-10 rounded-sm bg-gray-fill-normal" />
        <span className="h-5 w-12 rounded-sm bg-brand" />
      </div>
    </div>
  );
}

function FrameworkSideThumb({
  kind,
  label,
  onSelect,
}: {
  kind: FrameworkDiagramKind;
  label: string;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="group/thumb relative z-0 flex w-[120px] shrink-0 items-center justify-center rounded-sm border-0 bg-transparent p-0 opacity-50 transition duration-300 hover:z-[2] hover:opacity-100 focus-visible:z-[2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
      aria-label={`切换到${label}`}
    >
      <div className="flex h-[120px] w-full items-center justify-center overflow-hidden rounded-sm bg-background/80 ring-1 ring-gray-border-light transition group-hover/thumb:ring-brand">
        <div className="flex origin-center scale-[0.42] items-center justify-center">
          <FrameworkDiagram kind={kind} />
        </div>
      </div>
    </button>
  );
}

/** 三框架切换：中间当前项抬高，左右两侧缩略可点；中间与两侧部分重叠 */
function FrameworkCarousel({
  activeId,
  onChange,
}: {
  activeId: FrameworkDiagramKind;
  onChange: (id: FrameworkDiagramKind) => void;
}) {
  const activeIndex = FRAMEWORK_OPTIONS.findIndex((item) => item.id === activeId);
  const active = FRAMEWORK_OPTIONS[activeIndex] ?? FRAMEWORK_OPTIONS[0];
  const left = FRAMEWORK_OPTIONS[(activeIndex + FRAMEWORK_OPTIONS.length - 1) % FRAMEWORK_OPTIONS.length];
  const right = FRAMEWORK_OPTIONS[(activeIndex + 1) % FRAMEWORK_OPTIONS.length];

  return (
    <div className="mx-auto flex w-full items-center justify-center">
      <FrameworkSideThumb kind={left.id} label={left.label} onSelect={() => onChange(left.id)} />
      <Link
        to="/orders"
        className="relative z-[1] -mx-7 flex shrink-0 scale-100 items-center justify-center no-underline transition duration-300 group-hover:scale-[1.02] sm:-mx-9"
        aria-label="进入典型页面"
      >
        <div className="overflow-hidden rounded-sm bg-background p-3.5 shadow-[0_14px_32px_color-mix(in_srgb,var(--brand-dark)_14%,transparent)] ring-1 ring-brand-light sm:p-4">
          <div className="w-[320px] sm:w-[348px]">
            <FrameworkDiagram kind={active.id} />
          </div>
        </div>
      </Link>
      <FrameworkSideThumb kind={right.id} label={right.label} onSelect={() => onChange(right.id)} />
    </div>
  );
}

function FrameworkBentoTile({
  span,
  delayClass,
  tone = "soft",
}: {
  span: string;
  delayClass: string;
  tone?: "default" | "soft" | "accent";
}) {
  const [activeId, setActiveId] = useState<FrameworkDiagramKind>("three-col");
  const active = FRAMEWORK_OPTIONS.find((item) => item.id === activeId) ?? FRAMEWORK_OPTIONS[0];
  const Icon = active.icon;
  const surface =
    tone === "soft"
      ? "bg-gradient-to-b from-brand-xlight/70 to-background"
      : tone === "accent"
        ? "bg-semantic-warning-bg/40"
        : "bg-background";

  return (
    <div
      className={`home-reveal group flex h-full min-h-[148px] flex-col overflow-hidden rounded-md border border-gray-border-normal transition duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-brand hover:shadow-[0_12px_28px_color-mix(in_srgb,var(--brand-dark)_10%,transparent)] ${surface} ${span} ${delayClass}`}
    >
      <div className="flex flex-1 items-center justify-center overflow-hidden px-2 min-h-[240px] py-5 sm:px-3 sm:py-6">
        <FrameworkCarousel activeId={activeId} onChange={setActiveId} />
      </div>
      <Link
        to="/orders"
        className="flex items-start justify-between gap-3 border-t border-gray-border-light/80 bg-background/80 px-4 py-3 no-underline backdrop-blur-[2px] transition hover:bg-background"
      >
        <div className="flex min-w-0 items-center gap-2">
          <Icon className="size-3.5 shrink-0 text-brand" strokeWidth={1.5} aria-hidden />
          <div className="min-w-0">
            <h2 className="line-clamp-2 text-14 font-semibold leading-snug text-gray-text-1 transition group-hover:text-brand">
              适合复杂链路 · 多方协同的后台页面框架
            </h2>
            <p className="mt-0.5 line-clamp-1 text-12 text-gray-text-7">
              进入典型页面 · 当前 {active.label} · 两侧可切换
            </p>
          </div>
        </div>
        <ArrowUpRight
          className="mt-0.5 size-3.5 shrink-0 text-gray-text-7 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand"
          strokeWidth={1.5}
          aria-hidden
        />
      </Link>
    </div>
  );
}

function TodoTabIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg
      className={`shrink-0 ${className}`}
      viewBox="0 0 1024 1024"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path d="M575.32 890.5H268.68c-71.78 0-130.18-58.4-130.18-130.18V245.68c0-71.78 58.4-130.18 130.18-130.18h386.64c71.78 0 130.18 58.4 130.18 130.18v274.64a32.5 32.5 0 1 1-65 0V245.68a65.25 65.25 0 0 0-65.18-65.18H268.68a65.25 65.25 0 0 0-65.18 65.18v514.64a65.25 65.25 0 0 0 65.18 65.18h306.64a32.5 32.5 0 1 1 0 65z" />
      <path d="M611 322.41H315.93a32.5 32.5 0 0 1 0-65H611a32.5 32.5 0 0 1 0 65zM611 455.74H315.93a32.5 32.5 0 0 1 0-65H611a32.5 32.5 0 0 1 0 65zM437 589.08H315.93a32.5 32.5 0 1 1 0-65H437a32.5 32.5 0 0 1 0 65zM702.19 936.35a220.11 220.11 0 1 1 155.64-64.47 218.7 218.7 0 0 1-155.64 64.47z m0-375.22c-85.53 0-155.11 69.58-155.11 155.11s69.58 155.11 155.11 155.11S857.3 801.76 857.3 716.24s-69.59-155.11-155.11-155.11z" />
      <path d="M704.19 758.74h-56.44a32.5 32.5 0 0 1 0-65h23.94v-50.28a32.5 32.5 0 0 1 65 0v82.78a32.51 32.51 0 0 1-32.5 32.5z" />
    </svg>
  );
}

/** 待办 Tab 缩略插画：列表 + 时钟待办点 */
function TodoTabIllustration() {
  return (
    <div
      className="relative flex h-[72px] w-[88px] shrink-0 flex-col overflow-hidden rounded-sm bg-background p-2 shadow-sm ring-1 ring-gray-border-light"
      aria-hidden
    >
      <div className="mb-1.5 flex items-center gap-1">
        <span className="size-2.5 rounded-sm bg-semantic-warning-bg ring-1 ring-semantic-warning-light" />
        <span className="h-1 w-8 rounded-full bg-gray-fill-strong" />
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <div className="flex items-center gap-1">
          <span className="size-1.5 shrink-0 rounded-full bg-semantic-warning-text" />
          <span className="h-1 flex-1 rounded-full bg-gray-fill-strong" />
        </div>
        <div className="flex items-center gap-1">
          <span className="size-1.5 shrink-0 rounded-full bg-gray-fill-normal" />
          <span className="h-1 w-[70%] rounded-full bg-gray-fill-normal" />
        </div>
        <div className="flex items-center gap-1">
          <span className="size-1.5 shrink-0 rounded-full bg-gray-fill-normal" />
          <span className="h-1 w-[55%] rounded-full bg-gray-fill-normal" />
        </div>
      </div>
      <span className="absolute bottom-1.5 right-1.5 flex size-5 items-center justify-center rounded-full bg-semantic-warning-bg text-semantic-warning-text ring-1 ring-semantic-warning-light">
        <TodoTabIcon className="size-3" />
      </span>
    </div>
  );
}

/** 表格「订单状态 / 待办」列插画 — 对齐 OrderListStatusTodoCell（无文字缩略） */
function TodoTableIllustration() {
  return (
    <div
      className="flex w-[168px] shrink-0 flex-col overflow-hidden rounded-sm bg-background shadow-sm ring-1 ring-gray-border-light"
      aria-hidden
    >
      <div className="grid grid-cols-[40px_minmax(0,1fr)] gap-1.5 border-b border-gray-border-light bg-page-bg px-2 py-1">
        <span className="h-1 self-center rounded-full bg-gray-fill-strong" />
        <div className="flex items-center gap-0.5">
          <span className="h-1 w-10 rounded-full bg-gray-fill-strong" />
          <ArrowUpDown className="size-2 shrink-0 text-gray-text-7" strokeWidth={1.75} />
        </div>
      </div>
      <div className="grid grid-cols-[40px_minmax(0,1fr)] items-center gap-1.5 border-b border-gray-border-exlight bg-semantic-warning-bg/35 px-2 py-1.5">
        <div className="flex flex-col gap-0.5">
          <span className="h-1 w-8 rounded-full bg-gray-fill-strong" />
          <span className="h-0.5 w-5 rounded-full bg-gray-fill-normal" />
        </div>
        <div className="flex min-w-0 items-center gap-1">
          <span className="h-3 w-8 shrink-0 rounded-full bg-semantic-warning-bg ring-1 ring-semantic-warning-light" />
          <span className="inline-flex min-w-0 items-center gap-0.5 text-semantic-warning-text">
            <TriangleAlert className="size-2.5 shrink-0" strokeWidth={2} aria-hidden />
            <span className="h-1 w-9 rounded-full bg-semantic-warning-text/70" />
          </span>
        </div>
      </div>
      <div className="grid grid-cols-[40px_minmax(0,1fr)] items-center gap-1.5 px-2 py-1.5">
        <div className="flex flex-col gap-0.5">
          <span className="h-1 w-7 rounded-full bg-gray-fill-normal" />
          <span className="h-0.5 w-4 rounded-full bg-gray-fill-normal" />
        </div>
        <span className="h-3 w-8 rounded-full bg-semantic-info-bg ring-1 ring-semantic-info-light" />
      </div>
    </div>
  );
}

function TodoAlertBentoPreview() {
  return (
    <div className="flex w-full items-center justify-center gap-4" aria-hidden>
      <TodoTableIllustration />
      <TodoTabIllustration />
    </div>
  );
}

function BentoPreview({ entry }: { entry: ComponentEntry }) {
  if (entry.id === "todo-message") {
    return <TodoAlertBentoPreview />;
  }

  return entry.preview;
}

function BentoTile({
  entry,
  span,
  delayClass,
  tone = "default",
}: {
  entry: ComponentEntry;
  span: string;
  delayClass: string;
  tone?: "default" | "soft" | "accent";
}) {
  const Icon = entry.icon;
  const surface =
    tone === "soft"
      ? "bg-gradient-to-b from-brand-xlight/70 to-background"
      : tone === "accent"
        ? "bg-semantic-warning-bg/40"
        : "bg-background";

  return (
    <Link
      to={componentDetailPath(entry.id)}
      className={`home-reveal group flex h-full min-h-[148px] flex-col overflow-hidden rounded-md border border-gray-border-normal no-underline transition duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-brand hover:shadow-[0_12px_28px_color-mix(in_srgb,var(--brand-dark)_10%,transparent)] active:scale-[0.99] ${surface} ${span} ${delayClass}`}
    >
      <div className="flex flex-1 items-center justify-center overflow-hidden px-5 min-h-[96px] py-5">
        <div className="pointer-events-none flex w-full max-w-full items-center justify-center scale-[0.98] transition duration-300 group-hover:scale-100">
          <BentoPreview entry={entry} />
        </div>
      </div>
      <div className="flex items-start justify-between gap-3 border-t border-gray-border-light/80 bg-background/80 px-4 py-3 backdrop-blur-[2px]">
        <div className="flex min-w-0 items-center gap-2">
          <Icon className="size-3.5 shrink-0 text-brand" strokeWidth={1.5} aria-hidden />
          <div className="min-w-0">
            <h2 className="truncate text-14 font-semibold text-gray-text-1 transition group-hover:text-brand">
              {entry.title}
            </h2>
            <p className="mt-0.5 line-clamp-1 text-12 text-gray-text-7">{entry.description}</p>
          </div>
        </div>
        <ArrowUpRight
          className="mt-0.5 size-3.5 shrink-0 text-gray-text-7 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand"
          strokeWidth={1.5}
          aria-hidden
        />
      </div>
    </Link>
  );
}

function HomeBentoGrid() {
  const tiles: ReactNode[] = [];

  for (const tile of BENTO_TILES) {
    if (tile.id === "list-page") {
      tiles.push(
        <FrameworkBentoTile
          key={tile.id}
          span={tile.span}
          delayClass={tile.delayClass}
          tone={tile.tone}
        />,
      );
      continue;
    }

    const entry = entryById(tile.id);
    if (!entry) continue;
    tiles.push(
      <BentoTile
        key={tile.id}
        entry={entry}
        span={tile.span}
        delayClass={tile.delayClass}
        tone={tile.tone}
      />,
    );
  }

  return (
    <div className="grid auto-rows-[minmax(148px,auto)] gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {tiles}
    </div>
  );
}

/** 设计系统 OnePage 首页（壳层外；首屏入口） */
export function HomePage() {
  return (
    <div className="h-full min-h-0 overflow-y-auto text-gray-text-1">
      <div className="home-page-canvas">
        <header className="sticky top-0 z-10 border-b border-gray-border-light/60 bg-transparent">
          <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-4 px-5 sm:px-6">
            <Link
              to="/"
              className="inline-flex h-10 shrink-0 items-center no-underline"
              aria-label="StraightShip"
            >
              <img
                src="/straight-ship-logo.png"
                alt="StraightShip"
                className="h-10 w-auto max-w-[168px] object-contain object-left"
              />
            </Link>
            <nav className="flex min-w-0 items-center gap-1 sm:gap-3">
              <Link
                to="/guide"
                className="hidden items-center gap-1.5 px-2 py-1.5 text-13 font-medium text-gray-text-5 no-underline transition hover:text-brand sm:inline-flex"
              >
                <BookOpen className="size-3.5" strokeWidth={1.5} aria-hidden />
                如何使用
              </Link>
              <Link
                to="/tokens"
                className="hidden items-center gap-1.5 px-2 py-1.5 text-13 font-medium text-gray-text-5 no-underline transition hover:text-brand md:inline-flex"
              >
                <Palette className="size-3.5" strokeWidth={1.5} aria-hidden />
                Token 色板
              </Link>
              <Link
                to="/layout"
                className="hidden items-center gap-1.5 px-2 py-1.5 text-13 font-medium text-gray-text-5 no-underline transition hover:text-brand lg:inline-flex"
              >
                <LayoutTemplate className="size-3.5" strokeWidth={1.5} aria-hidden />
                布局
              </Link>
              <Button asChild size="sm" className="active:scale-[0.98]">
                <Link to="/blank" target="_blank" rel="noopener noreferrer">
                  进入画廊
                </Link>
              </Button>
            </nav>
          </div>
        </header>

        <section className="mx-auto flex min-h-[calc(100dvh-5rem)] max-w-6xl flex-col justify-start px-5 pb-10 pt-10 sm:px-6 sm:pb-14 sm:pt-12">
          <div className="mb-8 flex max-w-2xl flex-col gap-2">
            <h1 className="home-reveal text-32 font-semibold tracking-tight text-gray-text-1">
              <span className="home-title-en">Onelink Design System</span>
              <span className="home-title-tagline font-medium text-gray-text-4">
                <span className="mx-2.5" aria-hidden>
                  ·
                </span>
                为 Vibe Coding 打造
              </span>
            </h1>
            <p className="home-reveal home-reveal-delay-2 max-w-[48ch] text-15 leading-relaxed text-gray-text-5">
              先{" "}
              <Link to="/guide" className="font-medium text-brand no-underline hover:underline">
                安装设计系统
              </Link>
              ，再对照组件画廊落地页面。
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="grid gap-4 lg:grid-cols-3">
              <Link
                to="/guide"
                className="home-reveal home-reveal-delay-1 group flex flex-col rounded-md border border-gray-border-normal bg-background p-5 no-underline shadow-[0_8px_24px_color-mix(in_srgb,var(--brand-dark)_6%,transparent)] transition duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-brand hover:shadow-[0_12px_28px_color-mix(in_srgb,var(--brand-dark)_12%,transparent)] active:scale-[0.99] sm:p-6"
              >
                <InstallFlowProcess />
              </Link>

              <Link
                to="/tokens"
                className="home-reveal home-reveal-delay-2 group flex flex-col gap-4 overflow-hidden rounded-md border border-gray-border-normal bg-background p-5 no-underline shadow-[0_8px_24px_color-mix(in_srgb,var(--brand-dark)_6%,transparent)] transition duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-brand hover:shadow-[0_12px_28px_color-mix(in_srgb,var(--brand-dark)_12%,transparent)] active:scale-[0.99] sm:p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Palette className="size-4 text-brand" strokeWidth={1.5} aria-hidden />
                    <h2 className="text-16 font-semibold text-gray-text-1 transition group-hover:text-brand">
                      Token 色板
                    </h2>
                  </div>
                  <ArrowUpRight
                    className="size-4 text-gray-text-7 transition group-hover:text-brand"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {TOKEN_SWATCHES.map((token) => (
                    <span
                      key={token.name}
                      className="size-6 rounded-sm ring-1 ring-gray-border-light"
                      style={{ background: `var(${token.cssVar})` }}
                      title={token.name}
                    />
                  ))}
                </div>
                <p className="text-13 leading-relaxed text-gray-text-4">
                  文字、边框、填充与品牌色来自 theme.css。业务只写 token 类。
                </p>
                <p className="mt-auto text-12 text-gray-text-5">@ss/portal-tokens</p>
              </Link>

              <Link
                to="/layout"
                className="home-reveal home-reveal-delay-3 group relative flex flex-col justify-between gap-5 overflow-hidden rounded-md border border-gray-border-normal bg-background p-5 no-underline transition duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-brand hover:shadow-[0_12px_28px_color-mix(in_srgb,var(--brand-dark)_12%,transparent)] active:scale-[0.99] sm:p-6"
              >
                <div
                  className="pointer-events-none absolute -right-6 -top-6 size-28 rounded-full bg-brand-xlight opacity-80"
                  aria-hidden
                />
                <div className="relative flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <LayoutTemplate className="size-4 text-brand" strokeWidth={1.5} aria-hidden />
                    <h2 className="text-16 font-semibold text-gray-text-1 transition group-hover:text-brand">
                      容器框架
                    </h2>
                  </div>
                  <ArrowUpRight
                    className="size-4 text-gray-text-7 transition group-hover:text-brand"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                </div>
                <div
                  className="relative flex h-[120px] w-full overflow-hidden rounded-sm ring-1 ring-gray-border-light"
                  aria-hidden
                >
                  <div className="w-9 shrink-0 bg-brand" />
                  <div className="flex min-w-0 flex-1 flex-col bg-page-bg">
                    <div className="h-5 border-b border-gray-border-light bg-background" />
                    <div className="flex-1 p-1.5">
                      <div className="h-full rounded-sm bg-background ring-1 ring-gray-border-exlight" />
                    </div>
                  </div>
                </div>
                <p className="relative mt-auto text-12 text-gray-text-7">@ss/portal-shell</p>
              </Link>
            </div>

            <HomeBentoGrid />
          </div>
        </section>

        <footer className="border-t border-gray-border-light bg-background/80 px-5 py-7 sm:px-6">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-12 text-gray-text-7">StraightShip Design System</p>
            <div className="flex flex-wrap gap-5 text-12 font-medium">
              <Link to="/guide" className="text-gray-text-5 no-underline transition hover:text-brand">
                如何使用
              </Link>
              <Link to="/tokens" className="text-gray-text-5 no-underline transition hover:text-brand">
                Token 色板
              </Link>
              <Link to="/blank" className="text-gray-text-5 no-underline transition hover:text-brand">
                组件预览
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
