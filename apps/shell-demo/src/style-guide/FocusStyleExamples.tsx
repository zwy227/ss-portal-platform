import type { ReactNode } from "react";
import { Search } from "lucide-react";
import { Input } from "@ss/portal-ui";

function FocusTokenNote() {
  return (
    <div className="flex flex-col gap-1 text-12 text-gray-text-5">
      <p>
        Normal：外层 <code className="text-13">portal-field-shell</code> 用{" "}
        <code className="text-13">focus-within</code> 驱动边框 + 外圈；内层 input 仅{" "}
        <code className="text-13">outline-none</code>，无独立 focus 类。
      </p>
      <p>
        Token：<code className="text-13">gray-border-black</code>（slate-900）+{" "}
        <code className="text-13">--focus-ring-normal</code>（4px gray-fill-normal，对齐 ring-4
        ring-slate-100）。
      </p>
      <p>
        Brand：筛选 input 自身 <code className="text-13">:focus</code> +{" "}
        <code className="text-13">--focus-ring-brand</code>。
      </p>
    </div>
  );
}

function FocusCompareGrid({ left, right }: { left: ReactNode; right: ReactNode }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="flex flex-col gap-2">{left}</div>
      <div className="flex flex-col gap-2">{right}</div>
    </div>
  );
}

function FocusLabel({ title, token }: { title: string; token: string }) {
  return (
    <p className="text-12 font-medium text-gray-text-5">
      {title}
      <span className="ml-1 font-normal text-gray-text-7">({token})</span>
    </p>
  );
}

function PlaceSearchFieldDemo({ className }: { className?: string }) {
  return (
    <div className={className ?? "portal-field-shell h-12 max-w-sm"}>
      <Search
        className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-gray-text-7"
        strokeWidth={1.75}
        aria-hidden
      />
      <input
        type="search"
        className="portal-field-shell-input pl-12 pr-12 font-semibold"
        placeholder="请输入仓库、城市/邮编或…"
      />
    </div>
  );
}

/** portal-* 组合类 focus 对照 */
export function PortalFocusStyleExamples() {
  return (
    <div className="flex flex-col gap-4">
      <FocusCompareGrid
        left={
          <>
            <FocusLabel title="Normal · 表单字段壳" token="portal-field-shell + focus-within" />
            <PlaceSearchFieldDemo />
          </>
        }
        right={
          <>
            <FocusLabel title="Brand · 列表筛选" token="portal-filter-input :focus" />
            <div className="relative max-w-sm">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 portal-filter-icon"
                strokeWidth={1.75}
                aria-hidden
              />
              <input type="search" className="portal-filter-input" placeholder="搜索订单号、询价单号…" />
            </div>
          </>
        }
      />

      <div className="flex flex-col gap-2">
        <FocusLabel title="已选中 · 无 focus-within" token="portal-field-shell--static" />
        <div className="portal-field-shell portal-field-shell--static flex h-12 max-w-sm items-center pl-12 pr-3">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-gray-text-7"
            strokeWidth={1.75}
            aria-hidden
          />
          <span className="truncate text-13 font-semibold text-gray-text-2">Los Angeles, CA 90001</span>
        </div>
        <p className="text-12 text-gray-text-7">
          业务侧在 <code className="text-13">selected</code> 有值时不挂载 focus-within 类，或使用{" "}
          <code className="text-13">--static</code> 修饰符。
        </p>
      </div>

      <FocusTokenNote />
    </div>
  );
}

/** @ss/portal-ui Input focusStyle 对照 */
export function UiFocusStyleExamples() {
  return (
    <div className="flex flex-col gap-4">
      <FocusCompareGrid
        left={
          <>
            <FocusLabel title="Normal · 字段壳 + shell input" token='focusStyle="shell"' />
            <div className="portal-field-shell h-12 max-w-sm">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-gray-text-7"
                strokeWidth={1.75}
                aria-hidden
              />
              <Input
                type="search"
                focusStyle="shell"
                className="pl-12 pr-12 font-semibold"
                placeholder="请输入仓库、城市/邮编或…"
              />
            </div>
          </>
        }
        right={
          <>
            <FocusLabel title="Brand · 列表筛选（默认）" token="focusStyle 默认 brand" />
            <div className="relative max-w-sm">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-text-7"
                strokeWidth={1.75}
                aria-hidden
              />
              <Input type="search" className="pl-9" placeholder="搜索订单号、询价单号…" />
            </div>
          </>
        }
      />

      <FocusTokenNote />
    </div>
  );
}
