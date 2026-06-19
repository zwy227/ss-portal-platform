import { TYPOGRAPHY_SAMPLES } from "../style-guide/tokenCatalog";
import { StyleGuidePage, StyleGuideSection, StyleGuideShell } from "../style-guide/StyleGuideShell";

export function TypographyPage() {
  return (
    <StyleGuideShell>
      <StyleGuidePage
        title="Typography"
        description="字号 + 行高 token（行高均为 4px 倍数）· 字重 font-normal / font-medium / font-semibold。"
      >
        <StyleGuideSection title="字体（Font Family）">
          <div className="portal-list-card flex flex-col gap-4 p-4">
            <div>
              <p className="text-13 text-gray-text-5">font-sans · 全局 UI（macOS SF · Windows Segoe UI）</p>
              <p className="mt-1 text-16 text-gray-text-2">
                拖柜运输 Shipping Quote · 中英文混排 The quick brown fox
              </p>
            </div>
            <div>
              <p className="text-13 text-gray-text-5">font-mono · 订单号、代码、token 名</p>
              <p className="mt-1 font-mono text-14 text-gray-text-2">ORD-20260801-001 · --gray-text-2</p>
            </div>
            <div>
              <p className="text-13 text-gray-text-5">portal-text-numeric · 表格数字等宽对齐（仍用 sans）</p>
              <div className="mt-1 flex gap-8 text-14 text-gray-text-2">
                <span className="portal-text-numeric">1,234.56</span>
                <span className="portal-text-numeric">98,765.43</span>
                <span className="portal-text-numeric">0123456789</span>
              </div>
            </div>
          </div>
        </StyleGuideSection>

        <StyleGuideSection title="字号与行高">
          <div className="portal-list-card overflow-x-auto">
            <table className="w-full min-w-[36rem] text-left">
              <thead>
                <tr className="border-b border-gray-border-light">
                  <th className="px-4 py-3 text-13-compact font-medium text-gray-text-4">Token</th>
                  <th className="px-4 py-3 text-13-compact font-medium text-gray-text-4">字号</th>
                  <th className="px-4 py-3 text-13-compact font-medium text-gray-text-4">行高</th>
                  <th className="px-4 py-3 text-13-compact font-medium text-gray-text-4">示例</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-border-light">
                {TYPOGRAPHY_SAMPLES.map((row) => (
                  <tr key={row.token}>
                    <td className="px-4 py-3">
                      <code className="text-13-compact text-gray-text-5">{row.token}</code>
                    </td>
                    <td className="px-4 py-3 text-13-compact text-gray-text-4">{row.size}</td>
                    <td className="px-4 py-3 text-13-compact text-gray-text-4">{row.leading}</td>
                    <td className={`px-4 py-3 text-gray-text-2 ${row.className}`}>{row.sample}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </StyleGuideSection>

        <StyleGuideSection title="13px 紧凑 vs 可读">
          <div className="portal-list-card grid gap-4 p-4 md:grid-cols-2">
            <div className="rounded-md border border-gray-border-light p-4">
              <p className="text-13-compact text-gray-text-5">text-13-compact · 16px 行高</p>
              <p className="mt-2 text-13-compact text-gray-text-2">
                表格单元格、Tooltip、紧凑菜单。单行密度高，与 text-11 / text-12 共用 leading-16。
              </p>
            </div>
            <div className="rounded-md border border-gray-border-light p-4">
              <p className="text-13-compact text-gray-text-5">text-13-reading · 20px 行高</p>
              <p className="mt-2 text-13-reading text-gray-text-2">
                多行说明、帮助文案。与 text-14 共用 leading-20，适合稍长的可读段落。
              </p>
            </div>
          </div>
        </StyleGuideSection>

        <StyleGuideSection title="字重">
          <div className="portal-list-card flex flex-col gap-3 p-4">
            <p className="text-16 font-normal text-gray-text-2">font-normal · 400 · 次要正文</p>
            <p className="text-16 font-medium text-gray-text-2">font-medium · 500 · 侧栏、label</p>
            <p className="text-16 font-semibold text-gray-text-2">font-semibold · 600 · 激活 Tab、详情标题</p>
          </div>
        </StyleGuideSection>

        <StyleGuideSection title="页面标题（portal-page-title）">
          <div className="rounded-lg border border-gray-border-normal bg-page-bg p-5">
            <h1 className="portal-page-title">
              <span className="portal-page-title-prefix">拖柜运输:</span>
              报价记录
            </h1>
            <h1 className="portal-page-detail-title mt-4 text-gray-text-2">
              拖柜运输<span className="text-gray-text-7">-</span>加拿大港口拖柜
              <span className="text-gray-text-7">-</span>履约：ORD-20260801-001
            </h1>
          </div>
        </StyleGuideSection>
      </StyleGuidePage>
    </StyleGuideShell>
  );
}
