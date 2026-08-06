import { useLayoutEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@ss/portal-ui";
import { ListTabStatusGuidePopover } from "./ListTabStatusGuidePopover";

/** 对齐 Drayage-SS-APP ClientDrayageFulfillmentListPageMain 订单列表 Tab */
const TODO_TAB = { id: "todo", label: "待办", count: 3 } as const;

const STATUS_TABS = [
  { id: "all", label: "全部", count: 28 },
  { id: "pending_submit", label: "待下单", count: 4 },
  { id: "confirming", label: "确认中", count: 5 },
  { id: "executing", label: "执行中", count: 8 },
  { id: "completed", label: "已完成", count: 7 },
  { id: "cancelled", label: "已取消", count: 2 },
  { id: "expired", label: "已失效", count: 2 },
] as const;

/** 与 FulfillmentOrderStatusGuidePopover 文案一致 */
const STATUS_GUIDE_ITEMS = [
  {
    label: "待办",
    description:
      "汇总所有需要您处理的订单，包括待下单、确认中，以及执行中待补充材料、待上传文件等订单。",
  },
  {
    label: "待下单",
    description: "订单信息已生成，尚未完成确认和提交。",
  },
  {
    label: "确认中",
    description:
      "订单已提交，但仍有待办事项（如完善履约材料、上传文件等），需处理后方可进入正式履约执行。",
  },
  {
    label: "执行中",
    description:
      "订单已提交且无待办缺口，正在进行资料准备、提柜、运输、派送或文件回传等履约环节。",
  },
  {
    label: "已完成",
    description: "订单履约及必要文件回传已完成。",
  },
  {
    label: "已取消",
    description: "订单已取消，后续不再继续执行。",
  },
  {
    label: "已失效",
    description: "订单未在有效期内完成确认或提交，已无法继续下单。",
  },
] as const;

/** 对齐 SSLTLDemo QuoteOrderListTabBar / 报价记录列表 */
const QUOTE_TODO_TAB = { id: "todo", label: "待办", count: 5 } as const;

const QUOTE_STATUS_TABS = [
  { id: "all", label: "全部", count: 42 },
  { id: "pending_manual_quote", label: "待提交需求", count: 6 },
  { id: "manual_quote", label: "人工报价中", count: 8 },
  { id: "pending_confirm_quote", label: "待下单", count: 9 },
  { id: "placing_order", label: "已下单", count: 11 },
  { id: "expired", label: "已失效", count: 5 },
  { id: "cannot_quote", label: "已关闭", count: 3 },
] as const;

const QUOTE_STATUS_GUIDE_ITEMS = [
  {
    label: "待办",
    description: "汇总所有需要您处理的询价单，便于快速处理。",
  },
  {
    label: "待提交需求",
    description: "当前需求不满足自动报价条件，提交后将由平台人工报价。",
  },
  {
    label: "人工报价中",
    description: "需求已提交，平台正在人工核算报价。",
  },
  {
    label: "待下单",
    description: "报价已生成，可确认报价并创建订单。",
  },
  {
    label: "已下单",
    description: "报价已确认，并已成功创建订单。",
  },
  {
    label: "已失效",
    description: "报价已超过有效期，无法继续下单。",
  },
  {
    label: "已关闭",
    description: "询价已取消或终止，不再继续处理。",
  },
] as const;

const TAB_GAP_PX = 24; // gap-6

type TabId = (typeof TODO_TAB)["id"] | (typeof STATUS_TABS)[number]["id"];
type QuoteTabId = (typeof QUOTE_TODO_TAB)["id"] | (typeof QUOTE_STATUS_TABS)[number]["id"];

function TodoTabIcon() {
  return (
    <svg
      className="size-5 shrink-0"
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

function tabItemClass(active: boolean, extra = "") {
  return `portal-tab-item shrink-0 ${active ? "portal-tab-item--active" : ""} ${extra}`.trim();
}

export function TabStyleExamples() {
  const [activeTab, setActiveTab] = useState<TabId>("all");

  return (
    <div className="portal-tab-bar relative mb-0 !flex-nowrap" role="tablist" aria-label="订单状态">
      <button
        type="button"
        role="tab"
        aria-selected={activeTab === TODO_TAB.id}
        aria-current={activeTab === TODO_TAB.id ? "page" : undefined}
        className={tabItemClass(activeTab === TODO_TAB.id, "inline-flex items-center gap-1")}
        onClick={() => setActiveTab(TODO_TAB.id)}
      >
        <TodoTabIcon />
        {TODO_TAB.label}
        <span className="ml-1 tabular-nums">({TODO_TAB.count})</span>
      </button>
      <span className="portal-tab-bar__divider" aria-hidden />
      {STATUS_TABS.map((tab) => {
        const active = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={active}
            className={tabItemClass(active)}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
            <span className="ml-1 tabular-nums">({tab.count})</span>
          </button>
        );
      })}
      <div className="ml-auto shrink-0">
        <ListTabStatusGuidePopover items={STATUS_GUIDE_ITEMS} />
      </div>
    </div>
  );
}

/** 报价列表 Tab：栏宽不足时按可用宽度将放不下的末尾项收入「更多」 */
export function TabOverflowStyleExamples() {
  const [activeTab, setActiveTab] = useState<QuoteTabId>("all");
  const [overflowCount, setOverflowCount] = useState(0);
  const barRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const todoRef = useRef<HTMLButtonElement>(null);
  const dividerRef = useRef<HTMLSpanElement>(null);
  const guideRef = useRef<HTMLDivElement>(null);

  const overflowTabs =
    overflowCount > 0 ? QUOTE_STATUS_TABS.slice(-overflowCount) : [];
  const primaryTabs =
    overflowCount > 0
      ? QUOTE_STATUS_TABS.slice(0, -overflowCount)
      : QUOTE_STATUS_TABS;
  const overflowActive = overflowTabs.some((tab) => tab.id === activeTab);

  useLayoutEffect(() => {
    const bar = barRef.current;
    const measure = measureRef.current;
    if (!bar || !measure) return;

    const update = () => {
      const todoW = todoRef.current?.offsetWidth ?? 0;
      const dividerW = dividerRef.current?.offsetWidth ?? 0;
      const guideW = guideRef.current?.offsetWidth ?? 0;
      const moreEl = measure.querySelector<HTMLElement>("[data-measure-more]");
      const moreW = moreEl?.offsetWidth ?? 0;
      const tabEls = measure.querySelectorAll<HTMLElement>("[data-measure-tab]");
      const tabWidths = Array.from(tabEls, (el) => el.offsetWidth);
      const n = tabWidths.length;
      const barW = bar.clientWidth;
      const gap = TAB_GAP_PX;

      // 从少收起到多收起，取能放入栏宽的最小溢出数（末尾优先收入「更多」）
      let nextOverflow = n;
      for (let k = 0; k <= n; k++) {
        const visibleCount = n - k;
        // 子项：待办 + 分隔 + 可见 Tab +（可选）更多 + 状态说明
        const childCount = 2 + visibleCount + (k > 0 ? 1 : 0) + 1;
        const gaps = Math.max(0, childCount - 1);
        const tabsW = tabWidths.slice(0, visibleCount).reduce((sum, w) => sum + w, 0);
        const total = todoW + dividerW + tabsW + (k > 0 ? moreW : 0) + guideW + gaps * gap;
        if (total <= barW + 0.5) {
          nextOverflow = k;
          break;
        }
      }

      setOverflowCount((prev) => (prev === nextOverflow ? prev : nextOverflow));
    };

    const ro = new ResizeObserver(update);
    ro.observe(bar);
    update();
    return () => ro.disconnect();
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <p className="text-12 text-gray-text-5">
        拖拽虚线框右侧边缘缩小宽度，观察放不下的末尾 Tab 收入「更多」。
      </p>
      <div className="min-w-[320px] max-w-full w-[920px] resize-x overflow-auto rounded-md border border-dashed border-gray-border-normal p-2">
        <div ref={barRef} className="portal-tab-bar relative mb-0 !flex-nowrap" role="tablist" aria-label="询价状态">
          <button
            ref={todoRef}
            type="button"
            role="tab"
            aria-selected={activeTab === QUOTE_TODO_TAB.id}
            aria-current={activeTab === QUOTE_TODO_TAB.id ? "page" : undefined}
            className={tabItemClass(activeTab === QUOTE_TODO_TAB.id, "inline-flex items-center gap-1")}
            onClick={() => setActiveTab(QUOTE_TODO_TAB.id)}
          >
            <TodoTabIcon />
            <span className="inline-flex items-center gap-0.5">
              {QUOTE_TODO_TAB.label}
              <span className="tabular-nums">({QUOTE_TODO_TAB.count})</span>
            </span>
          </button>

          <span ref={dividerRef} className="portal-tab-bar__divider" aria-hidden />

          {primaryTabs.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                className={tabItemClass(active)}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
                <span className="ml-1 tabular-nums">({tab.count})</span>
              </button>
            );
          })}

          {overflowCount > 0 ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className={tabItemClass(overflowActive, "inline-flex items-center gap-0.5")}
                  aria-label="更多"
                >
                  更多
                  <ChevronDown className="size-3.5 shrink-0 opacity-70" strokeWidth={2} aria-hidden />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="min-w-[144px]">
                {overflowTabs.map((tab) => {
                  const active = activeTab === tab.id;
                  return (
                    <DropdownMenuItem
                      key={tab.id}
                      className={active ? "font-semibold text-gray-text-1" : undefined}
                      onSelect={() => setActiveTab(tab.id)}
                    >
                      {tab.label}
                      <span className="ml-1 tabular-nums">({tab.count})</span>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : null}

          <div
            className="pointer-events-none absolute left-0 top-0 -z-10 h-0 overflow-hidden opacity-0"
            aria-hidden
          >
            <div ref={measureRef} className="inline-flex items-center gap-6">
              {QUOTE_STATUS_TABS.map((tab) => (
                <span
                  key={tab.id}
                  data-measure-tab
                  className="portal-tab-item shrink-0 whitespace-nowrap"
                >
                  {tab.label}
                  <span className="ml-1 tabular-nums">({tab.count})</span>
                </span>
              ))}
              <span
                data-measure-more
                className="portal-tab-item inline-flex shrink-0 items-center gap-0.5 whitespace-nowrap"
              >
                更多
                <ChevronDown className="size-3.5 shrink-0 opacity-70" strokeWidth={2} aria-hidden />
              </span>
            </div>
          </div>

          <div ref={guideRef} className="ml-auto shrink-0">
            <ListTabStatusGuidePopover items={QUOTE_STATUS_GUIDE_ITEMS} />
          </div>
        </div>
      </div>

      <dl className="m-0 grid gap-2 text-13 sm:grid-cols-[9rem_minmax(0,1fr)]">
        <dt className="font-medium text-gray-text-2">测量</dt>
        <dd className="m-0 text-gray-text-5">
          <code className="text-13">ResizeObserver</code> 逐项测量状态 Tab /「更多」宽度，再与待办、分隔、状态说明及
          gap 合计，对照栏宽。
        </dd>
        <dt className="font-medium text-gray-text-2">收起规则</dt>
        <dd className="m-0 text-gray-text-5">
          按可用宽度自适应：放不下的末尾项全部收入「更多」下拉（数量随栏宽变化）；激活态在溢出项时「更多」高亮。
        </dd>
        <dt className="font-medium text-gray-text-2">样式类</dt>
        <dd className="m-0 text-gray-text-5">
          <code className="text-13">portal-tab-bar</code>（
          <code className="text-13">!flex-nowrap</code>）/
          <code className="text-13"> portal-tab-bar__divider</code> /
          <code className="text-13"> portal-tab-item</code> /
          <code className="text-13"> --active</code>；下拉用{" "}
          <code className="text-13">DropdownMenu</code>。
        </dd>
        <dt className="font-medium text-gray-text-2">参考</dt>
        <dd className="m-0 text-gray-text-5">
          SSLTLDemo <code className="text-13">QuoteOrderListTabBar</code> →{" "}
          <code className="text-13">ClientDrayageQuoteOrderPage</code>；原{" "}
          <code className="text-13">client-tab-*</code> 已映射为 <code className="text-13">portal-tab-*</code>。
        </dd>
      </dl>
    </div>
  );
}
