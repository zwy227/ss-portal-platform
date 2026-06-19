import {
  BUTTON_RADIUS_SIZE_MAP,
  OVERLAY_RADIUS_MAP,
  PORTAL_RADIUS_USAGE,
  RADIUS_ALIAS_TOKENS,
  RADIUS_LADDER_TOKENS,
} from "../style-guide/tokenCatalog";
import { RadiusExampleBlock } from "../style-guide/RadiusExampleBlock";
import { RadiusAliasTable, RadiusGuideTable } from "../style-guide/RadiusGuideTable";
import { StyleGuidePage, StyleGuideSection, StyleGuideShell } from "../style-guide/StyleGuideShell";

export function RadiusPage() {
  return (
    <StyleGuideShell>
      <StyleGuidePage
        title="圆角规范"
        description="定义并标准化界面元素的角部圆度，确保各业务 App 视觉一致。Button 尺寸与圆角一一对应；弹窗 / 对话框 / 抽屉统一使用 12px（radius-xl）。数值以 packages/tokens/theme.css 为准。"
      >
        <StyleGuideSection title="关于圆角 token">
          <div className="portal-list-card flex flex-col gap-3 p-4">
            <p className="text-14 text-gray-text-3">
              圆角 token 统一控件与容器的角部曲率，避免同一页面出现「有的方、有的圆」的拼凑感。实现时请优先使用标准阶梯{" "}
              <code className="text-13">rounded-xs</code> … <code className="text-13">rounded-3xl</code>
              。<span className="font-medium text-gray-text-2">Button 圆角按尺寸选档</span>（xs→sm、sm→6px、default→8px、lg→10px），
              模态浮层单独使用 <code className="text-13">radius-xl</code>（12px），不与 Button lg 混用。
            </p>
          </div>
        </StyleGuideSection>

        <StyleGuideSection title="Button 尺寸 ↔ 圆角">
          <p className="mb-4 text-14 text-gray-text-4">
            与 <code className="text-13">@ss/portal-ui</code> Button 的{" "}
            <code className="text-13">size</code> 命名对齐。icon 变体（icon-xs / icon-sm / icon / icon-lg）与对应文字按钮同档圆角。
          </p>
          <div className="portal-list-card overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="border-b border-gray-border-light">
                  <th className="px-4 py-3 text-13 font-medium text-gray-text-4">Button size</th>
                  <th className="px-4 py-3 text-13 font-medium text-gray-text-4">Icon size</th>
                  <th className="px-4 py-3 text-13 font-medium text-gray-text-4">圆角 token</th>
                  <th className="px-4 py-3 text-13 font-medium text-gray-text-4">Tailwind</th>
                  <th className="px-4 py-3 text-13 font-medium text-gray-text-4">值</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-border-light">
                {BUTTON_RADIUS_SIZE_MAP.map((row) => (
                  <tr key={row.buttonSize}>
                    <td className="px-4 py-3 text-13 text-gray-text-3">
                      <code>{row.buttonSize}</code>
                    </td>
                    <td className="px-4 py-3 text-13 text-gray-text-3">
                      <code>{row.iconSize}</code>
                    </td>
                    <td className="px-4 py-3 text-13 text-gray-text-4">
                      <code>{row.radiusToken}</code>
                      <p className="mt-1 font-mono text-12 text-gray-text-7">{row.cssVar}</p>
                    </td>
                    <td className="px-4 py-3">
                      <code className="text-13 text-gray-text-5">{row.tailwind}</code>
                    </td>
                    <td className="px-4 py-3 font-mono text-13 text-gray-text-5">{row.px}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 mb-2 text-14 text-gray-text-4">模态浮层（非 Button 尺寸阶梯）：</p>
          <div className="portal-list-card overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse text-left">
              <thead>
                <tr className="border-b border-gray-border-light">
                  <th className="px-4 py-3 text-13 font-medium text-gray-text-4">容器</th>
                  <th className="px-4 py-3 text-13 font-medium text-gray-text-4">圆角 token</th>
                  <th className="px-4 py-3 text-13 font-medium text-gray-text-4">Tailwind</th>
                  <th className="px-4 py-3 text-13 font-medium text-gray-text-4">值</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-border-light">
                {OVERLAY_RADIUS_MAP.map((row) => (
                  <tr key={row.surface}>
                    <td className="px-4 py-3 text-13 text-gray-text-4">{row.surface}</td>
                    <td className="px-4 py-3 text-13 text-gray-text-4">
                      <code>{row.radiusToken}</code>
                      <p className="mt-1 font-mono text-12 text-gray-text-7">{row.cssVar}</p>
                    </td>
                    <td className="px-4 py-3">
                      <code className="text-13 text-gray-text-5">{row.tailwind}</code>
                    </td>
                    <td className="px-4 py-3 font-mono text-13 text-gray-text-5">{row.px}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </StyleGuideSection>

        <StyleGuideSection title="圆角 token 与使用指南">
          <p className="mb-4 text-12 text-gray-text-5">
            下表列出各档 token 的推荐场景。列「值（参考）」从当前 CSS 变量读取，仅供对照；具体数值可能随 token 优化调整。
          </p>
          <RadiusGuideTable tokens={RADIUS_LADDER_TOKENS} />
          <p className="mt-3 text-12 text-gray-text-7">* 值为当前 theme.css 解析结果，后续 token 优化时以代码为准。</p>
        </StyleGuideSection>

        <StyleGuideSection title="圆角示例与用法">
          <p className="mb-4 text-14 text-gray-text-4">
            每一档 token 对应一类典型 UI。示例使用现有 <code className="text-13">portal-*</code> 组合类或等价{" "}
            <code className="text-13">rounded-*</code> 类，便于与业务页面对照。
          </p>
          {RADIUS_LADDER_TOKENS.map((token) => (
            <RadiusExampleBlock key={token.name} token={token} />
          ))}
        </StyleGuideSection>

        <StyleGuideSection title="语义别名">
          <p className="mb-4 text-14 text-gray-text-4">
            语义别名不引入新的像素值，仅通过 CSS 变量引用标准阶梯。Button 尺寸与模态浮层已拆为独立别名（
            <code className="text-13">radius-button-*</code>、<code className="text-13">radius-modal</code>
            ），与上方「Button 尺寸 ↔ 圆角」表一致。
          </p>
          <RadiusAliasTable tokens={RADIUS_ALIAS_TOKENS} />
        </StyleGuideSection>

        <StyleGuideSection title="portal-* 组件圆角映射">
          <p className="mb-4 text-14 text-gray-text-4">
            以下为 Phase 1 已接入的组合类与圆角阶梯的对应关系。新增 portal 组件时应在此表补充一行，并保持与阶梯一致。
          </p>
          <div className="portal-list-card flex flex-col divide-y divide-gray-border-light">
            {PORTAL_RADIUS_USAGE.map((row) => (
              <div key={row.component} className="flex flex-wrap items-baseline gap-4 px-4 py-3">
                <code className="min-w-[12rem] shrink-0 text-13 text-gray-text-3">{row.component}</code>
                <code className="text-13 text-gray-text-5">{row.tailwind}</code>
                <span className="font-mono text-12 text-gray-text-7">{row.cssVar}</span>
              </div>
            ))}
          </div>
        </StyleGuideSection>
      </StyleGuidePage>
    </StyleGuideShell>
  );
}
