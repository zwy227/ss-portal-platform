import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import {
  Check,
  ChevronDown,
  ChevronRight,
  CircleAlert,
  GripVertical,
  Layers,
} from "lucide-react";
import { PortalDetailBackButton } from "@ss/portal-shell";
import {
  Button,
  cn,
  portalDetailInfoFieldItemClass,
  portalDetailInfoFieldsClass,
} from "@ss/portal-ui";

/* ── 结构常量（去业务语义的框架占位） ── */

const DETAIL_TABS = [
  { id: "session", label: "会话" },
  { id: "task", label: "任务" },
  { id: "workorder", label: "分区三" },
  { id: "bill", label: "分区四" },
  { id: "audit", label: "分区五" },
] as const;

type DetailTabId = (typeof DETAIL_TABS)[number]["id"];

/** 类型一：扁平 Session 步骤（无折叠 + 小标题进度） */
const SESSION_STEPS = [
  { id: "step-1", label: "环节一", done: true },
  { id: "step-2", label: "环节二", done: true },
  { id: "step-3", label: "环节三", done: false },
  { id: "step-4", label: "环节四", done: false, alert: true },
] as const;

/** 类型二：多对象下挂 Task 步骤（演示用精简，避免预览区纵向滚动） */
const TASK_STEPS = [
  { id: "task-1", label: "步骤一" },
  { id: "task-2", label: "步骤二" },
  { id: "task-3", label: "步骤三" },
] as const;

const DEMO_OBJECTS = ["对象 A", "对象 B"] as const;

const WHITE_CARD_STYLE = { boxShadow: "var(--elevation-sm)" } as const;
const RESIZE_MIN_WIDTH = 280;
const RESIZE_DEFAULT_WIDTH = 720;
const NAV_FOCUS =
  "focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--brand)_35%,transparent)]";
/** 左导航外壳：portal-card-bg-glass 叠 page-bg */
const SECTION_NAV_SHELL =
  "portal-card-bg-glass order-1 flex min-w-0 flex-col gap-1 rounded-lg px-1.5 py-4 lg:sticky lg:top-6 lg:self-start";
const SECTION_NAV_ITEM =
  "flex w-full min-w-[140px] items-start gap-2.5 rounded-md border border-solid py-2 pl-2 pr-2 text-left outline-none transition-colors lg:min-w-0";
const SECTION_NAV_ITEM_ACTIVE = "border-gray-border-light bg-background";
const SECTION_NAV_ITEM_IDLE = "border-transparent hover:bg-gray-fill-light/60";

/* ── 子件：步骤图标 / 顶栏 / Tab / 左导航 / 白卡 / 右栏 ── */

function SectionNavStepIcon({
  done,
  alert,
}: {
  done?: boolean;
  alert?: boolean;
}) {
  if (alert) {
    return (
      <span
        className="mt-0.5 inline-flex size-4 shrink-0 items-center justify-center rounded-full ring-1 ring-semantic-warning-default"
        aria-hidden
      >
        <CircleAlert
          className="size-4 fill-semantic-warning-default text-white"
          strokeWidth={2}
        />
      </span>
    );
  }
  if (done) {
    return (
      <span
        className="mt-0.5 inline-flex size-4 shrink-0 items-center justify-center rounded-full bg-semantic-success-default"
        aria-hidden
      >
        <Check className="size-2.5 text-white" strokeWidth={3} />
      </span>
    );
  }
  return (
    <span
      className="mt-0.5 size-4 shrink-0 rounded-full border-2 border-gray-text-7 bg-background"
      aria-hidden
    />
  );
}

function FrameworkHeader({
  title = "详情标题",
  backLabel = "返回列表",
  status = "状态",
}: {
  title?: string;
  backLabel?: string;
  status?: string;
}) {
  return (
    <header className="mb-1">
      <div className="flex min-w-0 flex-wrap items-center gap-3">
        <PortalDetailBackButton label={backLabel} onClick={() => undefined} />
        <h1 className="portal-page-detail-title text-gray-text-1">{title}</h1>
        <span className="portal-badge portal-badge--info">{status}</span>
      </div>
    </header>
  );
}

function FrameworkTopTabs({
  activeTab,
  onChange,
}: {
  activeTab: DetailTabId;
  onChange: (id: DetailTabId) => void;
}) {
  return (
    <div className="portal-tab-bar" role="tablist" aria-label="详情顶部分区">
      {DETAIL_TABS.map((tab) => {
        const active = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(tab.id)}
            className={cn("portal-tab-item", active && "portal-tab-item--active")}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

function SessionStepNav({
  activeId,
  onChange,
}: {
  activeId: string;
  onChange: (id: string) => void;
}) {
  const completed = SESSION_STEPS.filter((s) => s.done).length;

  return (
    <nav className={SECTION_NAV_SHELL} style={WHITE_CARD_STYLE} aria-label="Session 分区导航">
      <p className="mb-2 ml-1.5 mt-0 text-11 font-medium uppercase tracking-wide text-gray-text-7">
        SESSION {completed} / {SESSION_STEPS.length}
      </p>
      <ol className="flex flex-row gap-1.5 overflow-x-auto lg:flex-col lg:gap-1.5 lg:overflow-visible">
        {SESSION_STEPS.map((section) => {
          const current = section.id === activeId;
          return (
            <li key={section.id} className="min-w-0 shrink-0 lg:shrink">
              <button
                type="button"
                aria-current={current ? "true" : undefined}
                onClick={() => onChange(section.id)}
                className={cn(
                  SECTION_NAV_ITEM,
                  NAV_FOCUS,
                  current ? SECTION_NAV_ITEM_ACTIVE : SECTION_NAV_ITEM_IDLE,
                )}
                style={current ? WHITE_CARD_STYLE : undefined}
              >
                <SectionNavStepIcon done={section.done} alert={"alert" in section && section.alert} />
                <span
                  className={cn(
                    "min-w-0 flex-1 text-14 leading-snug",
                    current ? "font-semibold text-gray-text-1" : "font-medium text-gray-text-5",
                  )}
                >
                  {section.label}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function MultiObjectTaskNav({
  activeSection,
  activeObject,
  onSectionChange,
  onObjectChange,
}: {
  activeSection: string;
  activeObject: string;
  onSectionChange: (id: string) => void;
  onObjectChange: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(DEMO_OBJECTS.map((c) => [c, true])),
  );

  return (
    <nav className={SECTION_NAV_SHELL} style={WHITE_CARD_STYLE} aria-label="多对象 Task 导航">
      <ul className="m-0 flex list-none flex-col gap-1 p-0">
        {DEMO_OBJECTS.map((objectId, index) => {
          const isExpanded = expanded[objectId] ?? false;
          const isActiveObject = objectId === activeObject;
          const ChevronIcon = isExpanded ? ChevronDown : ChevronRight;

          return (
            <li
              key={objectId}
              className={cn(
                "min-w-0",
                index > 0 && "mt-3 border-t border-solid border-gray-border-normal pt-4",
              )}
            >
              <div className="flex min-w-0 flex-col gap-1.5">
                <button
                  type="button"
                  aria-expanded={isExpanded}
                  onClick={() =>
                    setExpanded((prev) => ({ ...prev, [objectId]: !prev[objectId] }))
                  }
                  className={cn(
                    "flex w-full min-w-0 items-center gap-1.5 rounded-md py-1 pl-1.5 pr-2 text-left outline-none transition-colors",
                    "hover:bg-gray-fill-light/60",
                    NAV_FOCUS,
                  )}
                >
                  <ChevronIcon className="size-3.5 shrink-0 text-gray-text-5" strokeWidth={2} aria-hidden />
                  <Layers className="size-3.5 shrink-0 text-gray-text-4" strokeWidth={1.75} aria-hidden />
                  <span
                    className="min-w-0 flex-1 truncate text-14 font-semibold leading-snug text-gray-text-1"
                    title={objectId}
                  >
                    {objectId}
                  </span>
                </button>

                {isExpanded ? (
                  <ol className="m-0 flex list-none flex-col gap-1 p-0">
                    {TASK_STEPS.map((section, stepIndex) => {
                      const current = isActiveObject && section.id === activeSection;
                      const done = stepIndex === 0;
                      return (
                        <li key={`${objectId}-${section.id}`} className="min-w-0">
                          <button
                            type="button"
                            aria-current={current ? "true" : undefined}
                            onClick={() => {
                              onObjectChange(objectId);
                              onSectionChange(section.id);
                            }}
                            className={cn(
                              SECTION_NAV_ITEM,
                              NAV_FOCUS,
                              current ? SECTION_NAV_ITEM_ACTIVE : SECTION_NAV_ITEM_IDLE,
                            )}
                            style={current ? WHITE_CARD_STYLE : undefined}
                          >
                            <SectionNavStepIcon done={done} />
                            <span
                              className={cn(
                                "min-w-0 flex-1 text-14 leading-snug",
                                current
                                  ? "font-semibold text-gray-text-1"
                                  : "font-medium text-gray-text-5",
                              )}
                            >
                              {section.label}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ol>
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function PlaceholderWhiteCard({
  title,
  children,
  footer,
}: {
  title: string;
  children?: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div
      className="flex h-full min-h-0 flex-col rounded-lg bg-background px-5 py-5 sm:px-6"
      style={WHITE_CARD_STYLE}
    >
      <h2 className="m-0 text-16 font-semibold leading-snug tracking-[-0.01em] text-gray-text-1">
        {title}
      </h2>
      <div className="mt-3 flex min-h-0 flex-1 flex-col gap-2">
        {children ?? (
          <>
            <div className="h-3 w-2/3 rounded-sm bg-gray-fill-normal" aria-hidden />
            <div className="h-3 w-full rounded-sm bg-gray-fill-light" aria-hidden />
            <div className="h-3 w-5/6 rounded-sm bg-gray-fill-light" aria-hidden />
            <div className="mt-2 h-12 rounded-md bg-page-bg ring-1 ring-gray-border-light" aria-hidden />
          </>
        )}
      </div>
      {footer ? (
        <div className="mt-auto flex flex-wrap items-center justify-end gap-2 border-t border-gray-border-light pt-4">
          {footer}
        </div>
      ) : null}
    </div>
  );
}

function PlaceholderRightAside({
  title = "右栏",
  className,
}: {
  title?: string;
  /** 默认 ≥1280 显示；双栏可传 `hidden lg:block` */
  className?: string;
}) {
  return (
    <aside
      className={cn("min-w-0", className ?? "hidden min-[1280px]:block")}
      aria-label="右栏"
    >
      <div className="portal-scrollbar sticky top-6 z-10 max-h-[320px] overflow-y-auto overscroll-contain">
        <section className="overflow-hidden rounded-lg bg-background p-4" style={WHITE_CARD_STYLE}>
          <h3 className="m-0 text-14 font-semibold text-gray-text-2">{title}</h3>
          <div className="mt-3 flex flex-col gap-2" aria-hidden>
            <div className="h-3 w-2/3 rounded-sm bg-gray-fill-normal" />
            <div className="h-3 w-full rounded-sm bg-gray-fill-light" />
            <div className="h-3 w-5/6 rounded-sm bg-gray-fill-light" />
            <div className="mt-1 h-16 rounded-md bg-page-bg ring-1 ring-gray-border-light" />
          </div>
        </section>
      </div>
    </aside>
  );
}

function CardFooterActions() {
  return (
    <>
      <Button type="button" variant="outline">
        次要操作
      </Button>
      <button type="button" className="portal-brand-btn">
        主操作
      </button>
    </>
  );
}

/** 页级底栏操作（单栏 / 双栏）：贴在滚动区下方，非白卡内底栏 */
function PageBottomActionBar({
  leading,
}: {
  leading?: ReactNode;
}) {
  return (
    <footer
      className="relative z-10 shrink-0 border-t border-gray-border-normal bg-background px-5 py-3"
      role="toolbar"
      aria-label="页级底部操作"
    >
      <div
        className={cn(
          "mx-auto flex w-full flex-col gap-3 sm:flex-row sm:items-center",
          leading ? "sm:justify-between" : "sm:justify-end",
        )}
      >
        {leading ?? null}
        <div className="flex flex-wrap items-center justify-end gap-2">
          <CardFooterActions />
        </div>
      </div>
    </footer>
  );
}

function FrameworkPreviewShell({
  children,
  footer,
}: {
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-gray-border-normal bg-page-bg">
      <div className="w-full px-5 pb-4 pt-5">{children}</div>
      {footer}
    </div>
  );
}

function ContentPlaceholderLines({ hint }: { hint: string }) {
  return (
    <>
      <p className="m-0 text-13 text-gray-text-5">{hint}</p>
      <div className="mt-2 h-12 rounded-md bg-page-bg ring-1 ring-gray-border-light" aria-hidden />
    </>
  );
}

/* ── 示例导出 ── */

/** 单栏：顶栏 + 主内容白卡堆叠 + 页级底栏操作 */
export function DetailPageSingleColumnExample() {
  return (
    <FrameworkPreviewShell
      footer={
        <PageBottomActionBar
          leading={
            <Button type="button" variant="outline">
              返回
            </Button>
          }
        />
      }
    >
      <FrameworkHeader />
      <div className="mt-4 flex flex-col gap-3">
        <PlaceholderWhiteCard title="分区一">
          <ContentPlaceholderLines hint="单栏主内容：白卡纵向堆叠，全宽。" />
        </PlaceholderWhiteCard>
        <PlaceholderWhiteCard title="分区二">
          <ContentPlaceholderLines hint="无左导航、无右栏；操作在页级底栏。" />
        </PlaceholderWhiteCard>
      </div>
    </FrameworkPreviewShell>
  );
}

/** 左右双栏：顶栏 + 主栏白卡堆叠 + 右栏 sticky + 页级底栏操作 */
export function DetailPageTwoColumnExample() {
  return (
    <FrameworkPreviewShell
      footer={
        <PageBottomActionBar
          leading={
            <Button type="button" variant="outline">
              返回
            </Button>
          }
        />
      }
    >
      <FrameworkHeader />
      <div className="mt-4 flex flex-col gap-4">
        <div
          className={cn(
            "min-w-0",
            "lg:grid lg:min-h-0 lg:grid-cols-[minmax(0,1fr)_minmax(200px,280px)] lg:items-start lg:gap-2",
          )}
        >
          <div className="flex min-w-0 flex-col gap-3">
            <PlaceholderWhiteCard title="主栏 · 分区一">
              <ContentPlaceholderLines hint="主栏白卡堆叠；lg+ 右侧为辅助栏。" />
            </PlaceholderWhiteCard>
            <PlaceholderWhiteCard title="主栏 · 分区二">
              <ContentPlaceholderLines hint="操作在页级底栏，不在白卡内。" />
            </PlaceholderWhiteCard>
          </div>
          <PlaceholderRightAside title="右栏" className="hidden lg:block" />
        </div>
        <aside className="min-w-0 lg:hidden" aria-label="右栏（窄屏下沉）">
          <section className="overflow-hidden rounded-lg bg-background p-4" style={WHITE_CARD_STYLE}>
            <h3 className="m-0 text-14 font-semibold text-gray-text-2">右栏</h3>
            <p className="m-0 mt-2 text-13 text-gray-text-5">窄屏下沉至主栏下方。</p>
          </section>
        </aside>
      </div>
    </FrameworkPreviewShell>
  );
}

/** 三栏：顶栏 + Top Tab + 左导航 / 主栏白卡（卡底操作）/ 右栏 */
export function DetailPageThreeColumnExample() {
  const [tab, setTab] = useState<DetailTabId>("task");
  const [sessionStep, setSessionStep] = useState<string>("step-3");
  const [taskStep, setTaskStep] = useState("task-1");
  const [objectId, setObjectId] = useState<string>(DEMO_OBJECTS[0]);

  const showThreeColumn = tab === "session" || tab === "task";
  const sectionLabel =
    tab === "task"
      ? (TASK_STEPS.find((s) => s.id === taskStep)?.label ?? taskStep)
      : (SESSION_STEPS.find((s) => s.id === sessionStep)?.label ?? sessionStep);

  return (
    <FrameworkPreviewShell>
      <FrameworkHeader />
      <FrameworkTopTabs activeTab={tab} onChange={setTab} />

      {showThreeColumn ? (
        <div className="mt-4 flex flex-col gap-4">
          <div
            className={cn(
              "min-w-0",
              "min-[1280px]:grid min-[1280px]:min-h-0 min-[1280px]:grid-cols-[minmax(0,1fr)_minmax(240px,320px)] min-[1280px]:items-stretch min-[1280px]:gap-2",
            )}
          >
            <div className="flex flex-col gap-4 lg:grid lg:grid-cols-[minmax(180px,212px)_minmax(0,1fr)] lg:items-stretch lg:gap-x-0">
              {tab === "task" ? (
                <MultiObjectTaskNav
                  activeSection={taskStep}
                  activeObject={objectId}
                  onSectionChange={setTaskStep}
                  onObjectChange={setObjectId}
                />
              ) : (
                <SessionStepNav activeId={sessionStep} onChange={setSessionStep} />
              )}
              <div className="order-2 flex min-h-0 min-w-0 flex-col lg:h-full lg:pl-2">
                <PlaceholderWhiteCard title={sectionLabel} footer={<CardFooterActions />}>
                  <ContentPlaceholderLines hint="主栏白卡；操作在卡片底部（分割线 + 右对齐）。" />
                </PlaceholderWhiteCard>
              </div>
            </div>
            <PlaceholderRightAside />
          </div>
        </div>
      ) : (
        <div className="mt-4">
          <PlaceholderWhiteCard title={DETAIL_TABS.find((t) => t.id === tab)?.label ?? tab}>
            <ContentPlaceholderLines hint="非会话/任务 Tab：无左导航时的单栏内容。" />
          </PlaceholderWhiteCard>
        </div>
      )}
    </FrameworkPreviewShell>
  );
}

/** @deprecated 使用 DetailPageThreeColumnExample */
export const DetailPageFrameworkFullExample = DetailPageThreeColumnExample;

function NavTypeBlock({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-2">
      <div>
        <h3 className="m-0 text-14 font-semibold text-gray-text-2">{title}</h3>
        <p className="m-0 mt-0.5 text-12 text-gray-text-5">{description}</p>
      </div>
      <div className="w-fit rounded-lg bg-page-bg p-4">{children}</div>
    </div>
  );
}

/** Session/Task 导航：类型一扁平小标题；类型二多对象卡片 */
export function DetailPageSessionTaskNavExample() {
  const [sessionStep, setSessionStep] = useState("step-2");
  const [taskStep, setTaskStep] = useState("task-1");
  const [objectId, setObjectId] = useState<string>(DEMO_OBJECTS[0]);

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
      <NavTypeBlock
        title="类型一 · 默认无折叠 + 小标题"
        description="单列环节列表；顶部 SESSION 进度小标题；完成勾选 / 告警 / 空心圆。"
      >
        <div className="w-[212px]">
          <SessionStepNav activeId={sessionStep} onChange={setSessionStep} />
        </div>
      </NavTypeBlock>
      <NavTypeBlock
        title="类型二 · 多对象卡片"
        description="按对象折叠展开，对象下挂分区步骤；分隔线区分多个对象。"
      >
        <div className="w-[212px]">
          <MultiObjectTaskNav
            activeSection={taskStep}
            activeObject={objectId}
            onSectionChange={setTaskStep}
            onObjectChange={setObjectId}
          />
        </div>
      </NavTypeBlock>
    </div>
  );
}

/** 示意用：纵向堆叠白卡，露出 gap-3 页背景作为卡片间距 */
function GridSpecStackedCards({ labels }: { labels: readonly [string, string] }) {
  return (
    <div className="flex min-w-0 flex-col gap-3">
      {labels.map((label, index) => (
        <div
          key={`${index}-${label}`}
          className="rounded-md bg-background px-2 py-3 text-center text-12 text-gray-text-5"
          style={WHITE_CARD_STYLE}
        >
          {label}
        </div>
      ))}
    </div>
  );
}

/** 栅格宽度示意（三种布局） */
export function DetailPageGridSpecExample() {
  return (
    <div className="flex flex-col gap-5 text-13 text-gray-text-4">
      <div className="flex flex-col gap-2">
        <p className="m-0 text-12 font-medium text-gray-text-3">单栏</p>
        <div className="overflow-hidden rounded-md border border-gray-border-light">
          <div className="bg-page-bg p-3">
            <GridSpecStackedCards labels={["主内容白卡", "主内容白卡"]} />
            <div className="mt-2 rounded-md border border-dashed border-gray-border-normal bg-background px-2 py-2 text-center text-12 text-gray-text-5">
              页级底栏操作
            </div>
          </div>
        </div>
        <p className="m-0 text-12 text-gray-text-5">
          全宽纵向堆叠；白卡间距 <code className="text-12">gap-3</code>（12）。
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <p className="m-0 text-12 font-medium text-gray-text-3">左右双栏</p>
        <div className="overflow-hidden rounded-md border border-gray-border-light">
          <div className="grid grid-cols-[minmax(0,1fr)_240px] gap-2 bg-page-bg p-3">
            <GridSpecStackedCards labels={["主栏白卡", "主栏白卡"]} />
            <div
              className="flex items-center justify-center rounded-md bg-background px-2 py-3 text-center text-12 text-gray-text-5"
              style={WHITE_CARD_STYLE}
            >
              右栏 sticky
              <br />
              420 / 540
            </div>
          </div>
          <div className="border-t border-gray-border-light bg-page-bg px-3 pb-3">
            <div className="rounded-md border border-dashed border-gray-border-normal bg-background px-2 py-2 text-center text-12 text-gray-text-5">
              页级底栏操作
            </div>
          </div>
        </div>
        <p className="m-0 text-12 text-gray-text-5">
          主栏白卡间距 <code className="text-12">gap-3</code>；栏间距{" "}
          <code className="text-12">lg:gap-2</code>。<code className="text-12">lg+</code> 右栏
          420；<code className="text-12">≥1681</code> 540。窄屏右栏下沉。
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <p className="m-0 text-12 font-medium text-gray-text-3">三栏</p>
        <div className="overflow-hidden rounded-md border border-gray-border-light">
          <div className="grid grid-cols-[minmax(180px,212px)_minmax(0,1fr)_320px] gap-2 bg-page-bg p-3">
            <div
              className="portal-card-bg-glass flex items-center justify-center rounded-md px-2 py-3 text-center text-12 text-gray-text-5"
              style={WHITE_CARD_STYLE}
            >
              左导航
              <br />
              180–212
            </div>
            <GridSpecStackedCards labels={["主栏白卡", "主栏白卡（卡底操作）"]} />
            <div
              className="flex items-center justify-center rounded-md bg-background px-2 py-3 text-center text-12 text-gray-text-5"
              style={WHITE_CARD_STYLE}
            >
              右栏
              <br />
              320 / 360 / 480
            </div>
          </div>
        </div>
        <ul className="m-0 list-disc space-y-1 pl-5 text-gray-text-5">
          <li>
            主栏多卡时间距 <code className="text-12">gap-3</code>；与右栏{" "}
            <code className="text-12">gap-2</code>；左导航与主栏{" "}
            <code className="text-12">lg:pl-2</code>
          </li>
          <li>
            <code className="text-12">lg</code>：左导航{" "}
            <code className="text-12">minmax(180px,212px)</code> + 主栏
          </li>
          <li>
            <code className="text-12">≥1280</code> 右栏 320；<code className="text-12">≥1440</code>{" "}
            360；<code className="text-12">≥1680</code> 480
          </li>
          <li>
            左导航 <code className="text-12">portal-card-bg-glass</code> + sticky；白卡{" "}
            <code className="text-12">elevation-sm</code>
          </li>
          <li>主操作在主栏白卡底部（分割线 + 右对齐），默认不用页级底栏</li>
        </ul>
      </div>
    </div>
  );
}

/* ── 履约只读信息字段网格（自适应） ── */

/** 字段骨架槽：label 条 + 值占位 */
function AdaptiveFieldSlot() {
  return (
    <div className="flex flex-col gap-1.5" aria-hidden>
      <span className="h-2 w-12 rounded-sm bg-gray-fill-strong" />
      <span className="h-8 w-full rounded-input bg-page-bg ring-1 ring-gray-border-strong" />
    </div>
  );
}

/** 示意用固定列数骨架（非真实 container query）；宽度递增、仅 1 行字段 */
function ColumnSchematic({
  cols,
  label,
  widthClass,
}: {
  cols: 1 | 2 | 3 | 4;
  label: string;
  widthClass: string;
}) {
  return (
    <div className={["flex flex-col gap-2", widthClass].join(" ")}>
      <span className="text-13 font-medium text-gray-text-3">{label}</span>
      <div
        className="rounded-lg border border-gray-border-normal bg-page-bg p-3"
        aria-hidden
      >
        <div className="rounded-lg bg-background px-4 py-4" style={WHITE_CARD_STYLE}>
          <div
            className={[
              "grid gap-x-6 gap-y-4",
              cols === 1
                ? "grid-cols-1"
                : cols === 2
                  ? "grid-cols-2"
                  : cols === 3
                    ? "grid-cols-3"
                    : "grid-cols-4",
            ].join(" ")}
          >
            {Array.from({ length: cols }).map((_, i) => (
              <AdaptiveFieldSlot key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/** @container 信息字段网格：槽位骨架 */
function AdaptiveFieldSlots({ count = 6 }: { count?: number }) {
  return (
    <div className={portalDetailInfoFieldsClass} aria-hidden>
      {Array.from({ length: count }).map((_, i) => {
        const isFullSpan = i === count - 1;
        return (
          <div
            key={i}
            className={[portalDetailInfoFieldItemClass, isFullSpan ? "col-span-full" : ""]
              .filter(Boolean)
              .join(" ")}
          >
            <AdaptiveFieldSlot />
          </div>
        );
      })}
    </div>
  );
}

/** 可拖宽预览：右侧手柄调整容器宽度，触发 @container 换列 */
function ResizablePreviewShell({ children }: { children: ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(RESIZE_DEFAULT_WIDTH);
  const [maxWidth, setMaxWidth] = useState(RESIZE_DEFAULT_WIDTH);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const syncMax = () => {
      const nextMax = Math.floor(track.clientWidth);
      setMaxWidth(nextMax);
      setWidth((prev) => Math.min(Math.max(prev, RESIZE_MIN_WIDTH), nextMax));
    };

    syncMax();
    const observer = new ResizeObserver(syncMax);
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  const clampWidth = (next: number) =>
    Math.min(Math.max(Math.round(next), RESIZE_MIN_WIDTH), maxWidth);

  const onHandlePointerDown = (event: ReactPointerEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const handle = event.currentTarget;
    const startX = event.clientX;
    const startWidth = width;
    handle.setPointerCapture(event.pointerId);
    setDragging(true);

    const onMove = (moveEvent: PointerEvent) => {
      setWidth(clampWidth(startWidth + (moveEvent.clientX - startX)));
    };
    const onUp = (upEvent: PointerEvent) => {
      handle.releasePointerCapture(upEvent.pointerId);
      setDragging(false);
      handle.removeEventListener("pointermove", onMove);
      handle.removeEventListener("pointerup", onUp);
      handle.removeEventListener("pointercancel", onUp);
    };

    handle.addEventListener("pointermove", onMove);
    handle.addEventListener("pointerup", onUp);
    handle.addEventListener("pointercancel", onUp);
  };

  return (
    <div ref={trackRef} className="w-full pr-3">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <p className="m-0 text-13 text-gray-text-5">
          拖动右侧手柄调整预览宽度（当前{" "}
          <span className="tabular-nums text-gray-text-3">{width}px</span>
          ），观察 1 / 2 / 3 / 4 列切换。
        </p>
        <button
          type="button"
          className="rounded-md border border-gray-border-normal bg-background px-2.5 py-1 text-12 text-gray-text-4 transition hover:border-gray-border-strong hover:text-gray-text-2"
          onClick={() => setWidth(clampWidth(maxWidth))}
        >
          重置全宽
        </button>
      </div>
      <div className="relative" style={{ width }}>
        <div
          className={`flex flex-col overflow-hidden rounded-lg border bg-page-bg ${
            dragging ? "border-gray-border-strong" : "border-gray-border-normal"
          }`}
        >
          <div className="w-full px-5 pb-4 pt-5">{children}</div>
        </div>
        <button
          type="button"
          aria-label="拖动调整预览宽度"
          aria-valuemin={RESIZE_MIN_WIDTH}
          aria-valuemax={maxWidth}
          aria-valuenow={width}
          role="slider"
          className={`absolute -right-3 top-0 z-10 flex h-full w-6 cursor-col-resize items-center justify-center rounded-md border border-gray-border-normal bg-background text-gray-text-5 shadow-sm outline-none transition hover:border-gray-border-strong hover:text-gray-text-2 focus-visible:shadow-focus-normal ${
            dragging ? "border-gray-border-strong text-gray-text-2" : ""
          }`}
          onPointerDown={onHandlePointerDown}
        >
          <GripVertical className="size-3.5" strokeWidth={2} aria-hidden />
        </button>
      </div>
    </div>
  );
}

/** 信息字段网格自适应：列数示意 + 可拖宽真实预览 */
export function DetailPageAdaptiveLayoutExample() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        <p className="m-0 text-13 text-gray-text-5">
          白卡内只读信息字段会随{" "}
          <span className="font-medium text-gray-text-3">可用宽度</span>
          自动换列：1 → 2 → 3 → 4 列；最后一行通栏（如备注）。
        </p>
        <div className="flex flex-col gap-4">
          <ColumnSchematic cols={1} label="窄 → 1 列" widthClass="w-1/4" />
          <ColumnSchematic cols={2} label="中 → 2 列" widthClass="w-1/2" />
          <ColumnSchematic cols={3} label="宽 → 3 列" widthClass="w-3/4" />
          <ColumnSchematic cols={4} label="更宽 → 4 列" widthClass="w-full" />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-13 font-medium text-gray-text-3">可拖宽预览</span>
        <ResizablePreviewShell>
          <PlaceholderWhiteCard title="分区标题">
            <p className="m-0 text-13 text-gray-text-5">
              通栏槽位已加 <code className="text-13">col-span-full</code>
              ；列数由容器宽度触发。
            </p>
            <section className="@container" aria-label="自适应字段网格">
              <AdaptiveFieldSlots count={9} />
            </section>
          </PlaceholderWhiteCard>
        </ResizablePreviewShell>
      </div>
    </div>
  );
}
