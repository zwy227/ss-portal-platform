/**
 * Tailwind spacing / height primer for Portal layout gallery.
 * Base: 1 = 0.25rem = 4px (root 16px). No custom --space-* tokens.
 */

const SPACING_ROWS = [
  { cls: "0.5", px: 2, rem: "0.125rem", usage: "侧栏 nav 行间距（gap-0.5）" },
  { cls: "1", px: 4, rem: "0.25rem", usage: "紧凑图标隙（gap-1 / p-1）" },
  { cls: "1.5", px: 6, rem: "0.375rem", usage: "顶栏内控件（gap-1.5）" },
  { cls: "2", px: 8, rem: "0.5rem", usage: "详情栏间距、卡内（gap-2 / p-2）" },
  { cls: "3", px: 12, rem: "0.75rem", usage: "内容区列间距、白卡纵向（gap-3）" },
  { cls: "4", px: 16, rem: "1rem", usage: "区块间距（gap-4 / p-4）" },
  { cls: "5", px: 20, rem: "1.25rem", usage: "portal-page-content 水平内边距（px-5）" },
  { cls: "6", px: 24, rem: "1.5rem", usage: "Tab 栏 gap-6" },
  { cls: "7", px: 28, rem: "1.75rem", usage: "portal-page-content 垂直内边距（py-7）" },
] as const;

const HEIGHT_ROWS = [
  { cls: "h-6", px: 24, usage: "Button xs" },
  { cls: "h-8", px: 32, usage: "Button sm、顶栏 icon 钮" },
  { cls: "h-9", px: 36, usage: "Button default" },
  { cls: "h-10", px: 40, usage: "Button lg" },
  { cls: "h-14", px: 56, usage: "PortalTopNav 顶栏" },
] as const;

function WidthBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-sm bg-background px-1.5 py-0.5 text-11 font-medium text-gray-text-4 ring-1 ring-gray-border-light">
      {label}
    </span>
  );
}

/** Tailwind spacing 基础 + Portal 常用档位示意 */
export function SpacingScaleExample() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-2">
        <WidthBadge label="基础单位 1 = 4px" />
        <WidthBadge label="px = n × 4" />
        <WidthBadge label="根字号 16px" />
      </div>

      <p className="m-0 text-13 leading-relaxed text-gray-text-5">
        沿用 Tailwind 默认 spacing，不另建 <code className="text-13">--space-*</code>。半档如{" "}
        <code className="text-13">1.5</code> → 6px、<code className="text-13">3.5</code> → 14px。
        列间距、内容区内边距见下方常用档。
      </p>

      <div>
        <h3 className="mb-3 text-14 font-medium text-gray-text-2">常用 spacing</h3>
        <div className="portal-list-card overflow-x-auto">
          <table className="w-full min-w-[40rem] text-left">
            <thead>
              <tr className="border-b border-gray-border-light">
                <th className="px-4 py-3 text-13 font-medium text-gray-text-4">档位</th>
                <th className="px-4 py-3 text-13 font-medium text-gray-text-4">px</th>
                <th className="px-4 py-3 text-13 font-medium text-gray-text-4">rem</th>
                <th className="px-4 py-3 text-13 font-medium text-gray-text-4">示意</th>
                <th className="px-4 py-3 text-13 font-medium text-gray-text-4">典型用法</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-border-light">
              {SPACING_ROWS.map((row) => (
                <tr key={row.cls}>
                  <td className="px-4 py-3">
                    <code className="text-13 text-gray-text-5">{row.cls}</code>
                  </td>
                  <td className="px-4 py-3 text-13 text-gray-text-4">{row.px}</td>
                  <td className="px-4 py-3 text-13 text-gray-text-5">{row.rem}</td>
                  <td className="px-4 py-3">
                    <div
                      className="h-2 rounded-sm bg-brand/35"
                      style={{ width: row.px }}
                      title={`${row.px}px`}
                    />
                  </td>
                  <td className="px-4 py-3 text-13 text-gray-text-4">{row.usage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-14 font-medium text-gray-text-2">常用高度</h3>
        <div className="portal-list-card overflow-x-auto">
          <table className="w-full min-w-[32rem] text-left">
            <thead>
              <tr className="border-b border-gray-border-light">
                <th className="px-4 py-3 text-13 font-medium text-gray-text-4">Class</th>
                <th className="px-4 py-3 text-13 font-medium text-gray-text-4">px</th>
                <th className="px-4 py-3 text-13 font-medium text-gray-text-4">示意</th>
                <th className="px-4 py-3 text-13 font-medium text-gray-text-4">典型用法</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-border-light">
              {HEIGHT_ROWS.map((row) => (
                <tr key={row.cls}>
                  <td className="px-4 py-3">
                    <code className="text-13 text-gray-text-5">{row.cls}</code>
                  </td>
                  <td className="px-4 py-3 text-13 text-gray-text-4">{row.px}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-end" style={{ height: 56 }}>
                      <div
                        className="w-8 rounded-sm border border-brand-light bg-brand-xlight"
                        style={{ height: row.px }}
                        title={`${row.px}px`}
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3 text-13 text-gray-text-4">{row.usage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="m-0 mt-2 text-12 leading-relaxed text-gray-text-5">
          注意：<code className="text-12">h-14</code> = 56px，不是 48px（48px 对应{" "}
          <code className="text-12">h-12</code>）。AppShell 根高度用{" "}
          <code className="text-12">h-screen</code>。
        </p>
      </div>
    </div>
  );
}
