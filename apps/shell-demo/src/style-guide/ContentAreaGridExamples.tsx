import { useState } from "react";
import { MiniAppShellFrame } from "./AppShellFrameworkExamples";

const GRID_COLUMNS = 24;
const GRID_GAP_PX = 12;

const FRACTION_ROWS: { label: string; parts: number }[] = [
  { label: "1/6", parts: 6 },
  { label: "1/4", parts: 4 },
  { label: "1/3", parts: 3 },
  { label: "1/2", parts: 2 },
  { label: "1/1", parts: 1 },
];

function WidthBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-sm bg-background px-1.5 py-0.5 text-11 font-medium text-gray-text-4 ring-1 ring-gray-border-light">
      {label}
    </span>
  );
}

function GridStripeBg() {
  return (
    <div
      className="pointer-events-none absolute inset-0 grid"
      style={{
        gridTemplateColumns: `repeat(${GRID_COLUMNS}, minmax(0, 1fr))`,
        gap: GRID_GAP_PX,
      }}
      aria-hidden
    >
      {Array.from({ length: GRID_COLUMNS }, (_, i) => (
        <div
          key={i}
          className="h-full rounded-sm"
          style={{
            background: "color-mix(in srgb, var(--semantic-error-default) 9%, transparent)",
          }}
        />
      ))}
    </div>
  );
}

function FractionCell({ label }: { label: string }) {
  return (
    <div className="flex h-10 items-center justify-center rounded-md border border-gray-border-normal bg-background text-12 font-medium text-gray-text-4">
      {label}
    </div>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <p
      className="m-0 shrink-0 text-12 font-semibold text-semantic-info-text"
      style={{ writingMode: "vertical-rl" }}
    >
      {children}
    </p>
  );
}

/** 内容区栅格示意：落在 App Shell main 内；固定 24 列 */
export function ContentAreaGridExample() {
  const [shellCollapsed, setShellCollapsed] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <WidthBadge label="基础 4px" />
        <WidthBadge label={`${GRID_COLUMNS} 列`} />
        <WidthBadge label={`列间距 gap-3 · ${GRID_GAP_PX}px`} />
      </div>

      <MiniAppShellFrame
        collapsed={shellCollapsed}
        onToggleSidebar={() => setShellCollapsed((p) => !p)}
      >
        <main className="portal-page-main">
          <div className="portal-page-content">
            <div className="flex flex-col gap-5">
              <div className="flex gap-3">
                <SectionLabel>分栏布局</SectionLabel>
                {/* 红栅格与卡片同宽：勿铺在含竖标的外层 */}
                <div className="relative min-w-0 flex-1">
                  <GridStripeBg />
                  <div className="relative z-[1] flex flex-col gap-3">
                    {FRACTION_ROWS.map((row) => (
                      <div
                        key={row.label}
                        className="grid"
                        style={{
                          gridTemplateColumns: `repeat(${row.parts}, minmax(0, 1fr))`,
                          gap: GRID_GAP_PX,
                        }}
                      >
                        {Array.from({ length: row.parts }, (_, i) => (
                          <FractionCell key={i} label={row.label} />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </MiniAppShellFrame>

      <ul className="m-0 list-disc space-y-1 pl-5 text-12 leading-relaxed text-gray-text-5">
        <li>
          栅格落在 App Shell 业务 main 的{" "}
          <code className="text-12">portal-page-content</code> 内；不含侧栏 / 顶栏。
        </li>
        <li>
          尺寸换算见上方「Spacing 基础」：单位 <code className="text-12">1 = 4px</code>。
        </li>
        <li>
          内容区固定 <code className="text-12">{GRID_COLUMNS}</code> 列；列间距{" "}
          <code className="text-12">{GRID_GAP_PX}px</code>（
          <code className="text-12">gap-3</code> = 3×4px）。
        </li>
        <li>分栏按内容区等分（1/6 … 1/1）。</li>
      </ul>
    </div>
  );
}
