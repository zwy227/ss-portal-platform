import { TYPOGRAPHY_SAMPLES } from "../style-guide/tokenCatalog";
import { StyleGuidePage, StyleGuideSection, StyleGuideShell } from "../style-guide/StyleGuideShell";

export function TypographyPage() {
  return (
    <StyleGuideShell>
      <StyleGuidePage
        title="字体规范"
        description="统一界面的字体族、字号阶梯与字重，保证各业务 App 阅读节奏一致。字号与行高成对使用（行高均为 4px 倍数）；业务侧只用 text-11 … text-32，不要写 text-sm / text-[14px]。"
      >
        <StyleGuideSection
          title="字体族"
          description="默认用系统无衬线。订单号等标识用 mono；表格金额/数量仍用 sans，加 tabular-nums 做列对齐。"
        >
          <div className="portal-list-card flex flex-col divide-y divide-gray-border-light">
            <div className="flex flex-col gap-2 p-4">
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <code className="text-13 text-gray-text-4">font-sans</code>
                <span className="text-13 text-gray-text-5">默认 · 全局 UI</span>
              </div>
              <p className="text-14 text-gray-text-4">
                macOS 为 SF，Windows 为 Segoe UI。中英文混排、菜单、表单、正文都走这一档。
              </p>
              <p className="text-16 text-gray-text-2">
                拖柜运输 Shipping Quote · The quick brown fox
              </p>
            </div>
            <div className="flex flex-col gap-2 p-4">
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <code className="text-13 text-gray-text-4">font-mono</code>
                <span className="text-13 text-gray-text-5">等宽 · 标识与代码</span>
              </div>
              <p className="text-14 text-gray-text-4">
                订单号、集装箱号、token 名、短代码片段。不要用于普通正文。
              </p>
              <p className="font-mono text-14 text-gray-text-2">ORD-20260801-001 · --gray-text-2</p>
            </div>
            <div className="flex flex-col gap-2 p-4">
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <code className="text-13 text-gray-text-4">portal-text-numeric</code>
                <span className="text-13 text-gray-text-5">表格数字 · 仍用 sans</span>
              </div>
              <p className="text-14 text-gray-text-4">
                金额、数量等需纵向对齐时使用（tabular-nums）。字体仍是 sans，只是数字等宽。
              </p>
              <div className="flex gap-8 text-14 text-gray-text-2">
                <span className="portal-text-numeric">1,234.56</span>
                <span className="portal-text-numeric">98,765.43</span>
                <span className="portal-text-numeric">0123456789</span>
              </div>
            </div>
          </div>
        </StyleGuideSection>

        <StyleGuideSection
          title="字号阶梯"
          description="按「出现位置」选档，而不是凭感觉调 px。下表「适用场景」是首选参考。"
        >
          <div className="portal-list-card overflow-x-auto">
            <table className="w-full min-w-[36rem] text-left">
              <thead>
                <tr className="border-b border-gray-border-light">
                  <th className="px-4 py-3 text-13-compact font-medium text-gray-text-4">Token</th>
                  <th className="px-4 py-3 text-13-compact font-medium text-gray-text-4">字号</th>
                  <th className="px-4 py-3 text-13-compact font-medium text-gray-text-4">行高</th>
                  <th className="px-4 py-3 text-13-compact font-medium text-gray-text-4">适用场景</th>
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

        <StyleGuideSection
          title="13px：紧凑还是可读？"
          description="同为 13px，行高不同。单行控件 / 卡标题用 compact；详情字段与正文用 reading。"
        >
          <div className="portal-list-card grid gap-0 md:grid-cols-2 md:divide-x md:divide-gray-border-light">
            <div className="flex flex-col gap-2 p-4">
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <code className="text-13 text-gray-text-4">text-13-compact</code>
                <span className="text-13 text-gray-text-5">行高 16px</span>
              </div>
              <p className="text-13 text-gray-text-5">何时用</p>
              <p className="text-13-compact text-gray-text-2">
                表格、按钮、文件名、右侧卡标题、Tooltip——单行高密度，与 text-11 / text-12 同属 leading-16。
              </p>
              <p className="mt-1 text-12 text-gray-text-5">
                兼容别名 <code className="text-12">text-13</code> 指向此档，新代码请写 compact。
              </p>
            </div>
            <div className="flex flex-col gap-2 p-4">
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <code className="text-13 text-gray-text-4">text-13-reading</code>
                <span className="text-13 text-gray-text-5">行高 20px</span>
              </div>
              <p className="text-13 text-gray-text-5">何时用</p>
              <p className="text-13-reading text-gray-text-2">
                详情默认正文：字段 label/value、待办、进展说明、侧栏二级。与 text-14 共用 leading-20。
              </p>
            </div>
          </div>
        </StyleGuideSection>

        <StyleGuideSection
          title="字重"
          description="三档够用：正文用 normal，控件与导航用 medium，需要强调层级时用 semibold。"
        >
          <div className="portal-list-card flex flex-col divide-y divide-gray-border-light">
            <div className="flex flex-col gap-1 p-4 sm:flex-row sm:items-baseline sm:gap-6">
              <p className="min-w-[10rem] text-16 font-normal text-gray-text-2">font-normal · 400</p>
              <p className="text-14 text-gray-text-4">次要正文、说明、未激活项</p>
            </div>
            <div className="flex flex-col gap-1 p-4 sm:flex-row sm:items-baseline sm:gap-6">
              <p className="min-w-[10rem] text-16 font-medium text-gray-text-2">font-medium · 500</p>
              <p className="text-14 text-gray-text-4">侧栏菜单、表单 label、按钮、列表页标题</p>
            </div>
            <div className="flex flex-col gap-1 p-4 sm:flex-row sm:items-baseline sm:gap-6">
              <p className="min-w-[10rem] text-16 font-semibold text-gray-text-2">font-semibold · 600</p>
              <p className="text-14 text-gray-text-4">激活 Tab、详情页标题、需要更强层级时</p>
            </div>
          </div>
        </StyleGuideSection>

        <StyleGuideSection
          title="页面标题"
          description="列表与详情共用 text-18，字重不同。前缀、分隔符用组合类，不要手写字号。"
        >
          <div className="rounded-lg border border-gray-border-normal bg-page-bg p-5">
            <p className="mb-2 text-12 text-gray-text-5">
              列表页 · <code className="text-12">portal-page-title</code>（medium）
            </p>
            <h1 className="portal-page-title">
              <span className="portal-page-title-prefix">拖柜运输:</span>
              报价记录
            </h1>
            <p className="mb-2 mt-6 text-12 text-gray-text-5">
              详情页 · <code className="text-12">portal-page-detail-title</code>（semibold）
            </p>
            <h1 className="portal-page-detail-title text-gray-text-2">
              拖柜运输<span className="text-gray-text-7">-</span>加拿大港口拖柜
              <span className="text-gray-text-7">-</span>履约：ORD-20260801-001
            </h1>
          </div>
        </StyleGuideSection>
      </StyleGuidePage>
    </StyleGuideShell>
  );
}
