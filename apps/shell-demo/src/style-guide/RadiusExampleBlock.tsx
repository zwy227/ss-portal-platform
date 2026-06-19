import { Bell } from "lucide-react";
import type { ReactNode } from "react";
import type { RadiusToken } from "./tokenCatalog";

function ExampleFrame({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-lg border border-gray-border-normal bg-page-bg p-5">
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}

function RadiusExamplePreview({ token }: { token: RadiusToken }) {
  switch (token.name) {
    case "radius-xs":
      return (
        <ExampleFrame>
          <label className="flex items-center gap-2 text-13 text-gray-text-3">
            <span className="flex size-4 items-center justify-center rounded-xs border border-gray-border-strong bg-white" />
            复选框
          </label>
          <span className="rounded-xs bg-brand-xlight px-2 py-0.5 text-11 font-medium text-brand">Badge</span>
          <span className="size-2 rounded-xs bg-brand" aria-hidden />
        </ExampleFrame>
      );
    case "radius-sm":
      return (
        <ExampleFrame>
          <button
            type="button"
            className="rounded-sm border border-gray-border-strong px-2 py-0.5 text-12 text-gray-text-3"
          >
            Button xs
          </button>
          <button
            type="button"
            className="flex size-6 items-center justify-center rounded-sm border border-gray-border-strong text-12 text-gray-text-3"
            aria-label="icon-xs"
          >
            ·
          </button>
          <span className="rounded-sm bg-gray-fill-normal px-2 py-1 text-12 text-gray-text-3">Tag</span>
          <span className="rounded-sm border border-gray-border-light px-2 py-1 text-12 text-gray-text-5">
            2026-06-19
          </span>
        </ExampleFrame>
      );
    case "radius":
      return (
        <ExampleFrame>
          <button
            type="button"
            className="rounded border border-gray-border-strong px-2.5 py-1 text-13 text-gray-text-3"
          >
            Button sm
          </button>
          <div className="flex items-center gap-1">
            <button type="button" className="flex size-8 items-center justify-center rounded border border-gray-border-normal text-13 text-gray-text-4">
              1
            </button>
            <button type="button" className="flex size-8 items-center justify-center rounded border border-brand bg-brand text-13 text-white">
              2
            </button>
            <button type="button" className="flex size-8 items-center justify-center rounded border border-gray-border-normal text-13 text-gray-text-4">
              3
            </button>
          </div>
        </ExampleFrame>
      );
    case "radius-md":
      return (
        <ExampleFrame>
          <input
            readOnly
            value="筛选关键词"
            className="portal-filter-input h-9 max-w-[10rem]"
            aria-label="筛选示例"
          />
          <button type="button" className="portal-brand-btn">
            主按钮
          </button>
          <button type="button" className="portal-topnav-icon-btn" aria-label="通知">
            <Bell size={16} />
          </button>
          <div className="overflow-hidden rounded-lg" style={{ background: "var(--brand)" }}>
            <button type="button" className="portal-nav-row portal-nav-row--sub mx-1 my-1 max-w-[8rem]">
              导航行
            </button>
          </div>
        </ExampleFrame>
      );
    case "radius-lg":
      return (
        <ExampleFrame>
          <button type="button" className="portal-brand-btn rounded-lg px-6">
            Button lg
          </button>
          <div className="portal-list-card max-w-[12rem] p-3">
            <p className="text-13 text-gray-text-4">白卡容器</p>
          </div>
          <div className="portal-dropdown-menu static relative max-w-[10rem] shadow-none">
            <div className="portal-dropdown-item">菜单项 A</div>
            <div className="portal-dropdown-item">菜单项 B</div>
          </div>
        </ExampleFrame>
      );
    case "radius-xl":
      return (
        <ExampleFrame>
          <div className="w-full max-w-sm rounded-xl border border-gray-border-normal bg-white p-5 shadow-lg">
            <p className="text-16 font-semibold text-gray-text-2">确认提交</p>
            <p className="mt-2 text-13 text-gray-text-5">Dialog / 抽屉外框示意，使用 rounded-xl（12px）。</p>
            <div className="mt-4 flex justify-end gap-2">
              <button type="button" className="rounded-md border border-gray-border-normal px-3 py-1.5 text-13 text-gray-text-3">
                取消
              </button>
              <button type="button" className="portal-brand-btn">
                确定
              </button>
            </div>
          </div>
        </ExampleFrame>
      );
    case "radius-2xl":
      return (
        <ExampleFrame>
          <div className="w-full max-w-md rounded-2xl border border-gray-border-light bg-white p-6">
            <p className="text-18 font-semibold text-gray-text-2">大型 onboarding 面板</p>
            <p className="mt-2 text-14 text-gray-text-5">比弹窗更大块的独立区域，使用 rounded-2xl（16px）。</p>
          </div>
        </ExampleFrame>
      );
    case "radius-3xl":
      return (
        <ExampleFrame>
          <div className="w-full max-w-md rounded-3xl border border-gray-border-light bg-white p-6">
            <p className="text-18 font-semibold text-gray-text-2">全屏级面板</p>
            <p className="mt-2 text-14 text-gray-text-5">宽屏 Hero / onboarding 独立分区，圆角明显大于弹窗档。</p>
          </div>
        </ExampleFrame>
      );
    case "radius-full":
      return (
        <ExampleFrame>
          <span className="flex size-10 items-center justify-center rounded-full bg-brand text-14 font-medium text-white">
            AC
          </span>
          <span className="rounded-full bg-gray-fill-normal px-3 py-1 text-12 text-gray-text-3">胶囊标签</span>
          <span className="size-2 rounded-full bg-brand" aria-hidden />
        </ExampleFrame>
      );
    default:
      return null;
  }
}

export function RadiusExampleBlock({ token }: { token: RadiusToken }) {
  if (!token.exampleTitle) return null;

  return (
    <article className="mb-6 border-b border-gray-border-light pb-6 last:mb-0 last:border-b-0 last:pb-0">
      <h3 className="text-15 font-semibold text-gray-text-2">{token.exampleTitle}</h3>
      <p className="mt-2 text-14 text-gray-text-4">
        使用 <code className="text-13">{token.name}</code>
        {token.tailwind !== "—" ? (
          <>
            {" "}
            / <code className="text-13">{token.tailwind}</code>
          </>
        ) : null}
        。{token.exampleDescription}
      </p>
      <div className="mt-4">
        <RadiusExamplePreview token={token} />
      </div>
    </article>
  );
}
