import { Link } from "react-router";
import { StyleGuidePage, StyleGuideSection, StyleGuideShell } from "../style-guide/StyleGuideShell";

type SetupBlock = { label?: string; code: string };

const SETUP_STEPS: {
  title: string;
  why: string;
  blocks: SetupBlock[];
  note: string | null;
}[] = [
  {
    title: "① 安装三个包（独立业务仓）",
    why: "业务 App 一般不在本 monorepo 里。先 clone / 拉下 ss-portal-platform，再在自己的 App 里用 pnpm link 链上三个包；不要复制 theme.css。",
    blocks: [
      {
        label: "方式 A：pnpm link（本地联调）",
        code: `# 假设设计系统在 ~/ss-portal-platform，业务 App 在 ~/my-app

# 1）在设计系统各包目录注册到本机
cd ~/ss-portal-platform/packages/tokens && pnpm link --global
cd ~/ss-portal-platform/packages/shell  && pnpm link --global
cd ~/ss-portal-platform/packages/ui     && pnpm link --global

# 2）在业务 App 根目录链上这三个包
cd ~/my-app
pnpm link --global @ss/portal-tokens
pnpm link --global @ss/portal-shell
pnpm link --global @ss/portal-ui

# 图标库仍从 registry 安装
pnpm add lucide-react`,
      },
      {
        label: "方式 B：package.json 写 file: 路径（可提交进仓库）",
        code: `{
  "dependencies": {
    "@ss/portal-tokens": "file:../ss-portal-platform/packages/tokens",
    "@ss/portal-shell": "file:../ss-portal-platform/packages/shell",
    "@ss/portal-ui": "file:../ss-portal-platform/packages/ui",
    "lucide-react": "^0.487.0"
  }
}

# 改完后在业务 App 根目录执行
pnpm install`,
      },
    ],
    note: "仅当业务 App 与设计系统同属一个 pnpm workspace 时，才用 \"workspace:*\"。路径按你本机实际目录改。",
  },
  {
    title: "② 引入全局样式",
    why: "这一步把设计系统的 CSS 变量和 portal-* 类装进你的 App；@source 让 Tailwind 能扫到 shell / ui 里的 class。",
    blocks: [
      {
        code: `@import "tailwindcss" source(none);
@config "../tailwind.config.js";
@source "./**/*.{js,ts,jsx,tsx}";
/* 路径指到本机 ss-portal-platform 里的包源码（按实际位置改） */
@source "../../ss-portal-platform/packages/shell/src/**/*.{js,ts,jsx,tsx}";
@source "../../ss-portal-platform/packages/ui/src/**/*.{js,ts,jsx,tsx}";
@import "@ss/portal-tokens/globals.css";`,
      },
    ],
    note: "@source 必须能扫到 packages/shell 与 packages/ui 的源码，否则 portal-* 类可能不生效。",
  },
  {
    title: "③ 挂上 Tailwind preset",
    why: "这样 text-gray-text-2、text-14、bg-brand 等类名才会生效；不要自己再配一套色板。",
    blocks: [
      {
        code: `import portalPreset from "@ss/portal-tokens/tailwind.preset";

/** @type {import('tailwindcss').Config} */
export default {
  presets: [portalPreset],
};`,
      },
    ],
    note: null,
  },
  {
    title: "④ 用 AppShell 包一层，再写业务页",
    why: "侧栏菜单、顶栏由 shell 提供；菜单数据（nav）由你的 App 自己定义并传入，壳不会写死业务路由。",
    blocks: [
      {
        code: `import { AppShell } from "@ss/portal-shell";
import { Button } from "@ss/portal-ui";

const MY_NAV = [
  {
    id: "orders",
    label: "订单",
    children: [{ id: "orders-list", label: "订单列表", to: "/orders" }],
  },
];

export function App() {
  return (
    <AppShell
      sidebar={{
        nav: MY_NAV,
        homePath: "/orders",
        brandTitle: "我的业务",
      }}
      topNav={{ logoAlt: "Brand", userName: "张三" }}
    >
      {/* 这里放路由出口 / 业务页面 */}
      <Button>新建</Button>
    </AppShell>
  );
}`,
      },
    ],
    note: "对照本站侧栏：菜单项都是 demo 注入的，不是 shell 内置。",
  },
];

const DAILY_RULES = [
  {
    title: "写颜色",
    good: "text-gray-text-2、text-brand、bg-page-bg、border-gray-border-normal",
    bad: "text-[#4E5969]、bg-slate-100、text-gray-500",
    tip: "对照侧栏「Token 色板」选类名；缺色不要在业务里写死 hex，应改 packages/tokens/theme.css。",
  },
  {
    title: "写字号",
    good: "text-12、text-14、text-16 … text-32",
    bad: "text-sm、text-base、text-[13px]",
    tip: "对照「字体」页；只用设计系统提供的阶梯。",
  },
  {
    title: "写按钮 / 输入框",
    good: "从 @ss/portal-ui 引入 Button、Input、Dialog…",
    bad: "每个页面自己拼一套按钮样式",
    tip: "交互示例见「组件预览」；列表骨架见「典型页面」。",
  },
  {
    title: "写图标",
    good: "import { Search } from \"lucide-react\"",
    bad: "Font Awesome、iconfont、随意内联 SVG",
    tip: "对照「Icon」页。",
  },
] as const;

const GALLERY_LINKS = [
  { to: "/tokens", label: "Token 色板", when: "不知道该用哪个颜色类" },
  { to: "/icons", label: "Icon", when: "选图标、看尺寸约定" },
  { to: "/radius", label: "圆角规范", when: "按钮 / 弹窗圆角不确定" },
  { to: "/typography", label: "字体", when: "不确定标题 / 正文用几号字" },
  { to: "/blank", label: "组件预览", when: "找现成交互组件怎么用" },
  { to: "/orders", label: "典型页面", when: "搭列表页 / 详情页骨架" },
] as const;

export function GuidePage() {
  return (
    <StyleGuideShell>
      <StyleGuidePage
        title="如何使用"
        description="如果你要开一个新的业务 App，按下面四步接入设计系统，再按「日常写页面」的规则用颜色和组件。这样各产品视觉才会一致。"
      >
        <StyleGuideSection
          title="这套东西解决什么问题"
          description="不要在新项目里重新发明色板、字号和侧栏。装上三个包，就能复用同一套样式与壳层。"
        >
          <div className="portal-list-card flex flex-col divide-y divide-gray-border-light">
            <div className="flex flex-col gap-1 p-4">
              <p className="text-14 font-medium text-gray-text-2">@ss/portal-tokens</p>
              <p className="text-13 text-gray-text-5">
                颜色、字号、圆角、portal-* 组合类。你写 className 时用的 text-14、bg-brand
                都来自这里。
              </p>
            </div>
            <div className="flex flex-col gap-1 p-4">
              <p className="text-14 font-medium text-gray-text-2">@ss/portal-shell</p>
              <p className="text-13 text-gray-text-5">
                整页外壳：左侧菜单 + 顶栏。你只要传入自己的菜单配置（nav）。
              </p>
            </div>
            <div className="flex flex-col gap-1 p-4">
              <p className="text-14 font-medium text-gray-text-2">@ss/portal-ui</p>
              <p className="text-13 text-gray-text-5">
                按钮、输入框、弹窗、表格等现成组件，直接 import 使用。
              </p>
            </div>
          </div>
        </StyleGuideSection>

        <StyleGuideSection
          title="新项目怎么接（四步）"
          description="默认按独立业务仓（非 monorepo）写。做完这四步，页面就能套上统一壳和主题。"
        >
          <div className="portal-list-card flex flex-col divide-y divide-gray-border-light">
            {SETUP_STEPS.map((step) => (
              <div key={step.title} className="flex flex-col gap-2 p-4">
                <p className="text-14 font-medium text-gray-text-2">{step.title}</p>
                <p className="text-13 text-gray-text-5">{step.why}</p>
                {step.blocks.map((block) => (
                  <div key={block.label ?? block.code} className="flex flex-col gap-1.5">
                    {block.label ? (
                      <p className="text-13 font-medium text-gray-text-4">{block.label}</p>
                    ) : null}
                    <pre className="overflow-x-auto rounded-md bg-gray-fill-light p-3 font-mono text-13 text-gray-text-2">
                      {block.code}
                    </pre>
                  </div>
                ))}
                {step.note ? <p className="text-13 text-gray-text-5">{step.note}</p> : null}
              </div>
            ))}
          </div>
        </StyleGuideSection>

        <StyleGuideSection
          title="日常写页面时怎么用"
          description="接入完成后，写业务 UI 时优先用设计系统提供的类名和组件；不要另起一套颜色或字号。"
        >
          <div className="portal-list-card overflow-x-auto">
            <table className="w-full min-w-[40rem] text-left">
              <thead>
                <tr className="border-b border-gray-border-light">
                  <th className="px-4 py-3 text-13 font-medium text-gray-text-4">场景</th>
                  <th className="px-4 py-3 text-13 font-medium text-gray-text-4">推荐写法</th>
                  <th className="px-4 py-3 text-13 font-medium text-gray-text-4">不要这样写</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-border-light">
                {DAILY_RULES.map((row) => (
                  <tr key={row.title}>
                    <td className="px-4 py-3 align-top">
                      <p className="text-14 font-medium text-gray-text-2">{row.title}</p>
                      <p className="mt-1 text-13 text-gray-text-5">{row.tip}</p>
                    </td>
                    <td className="px-4 py-3 align-top">
                      <code className="text-13 text-gray-text-2">{row.good}</code>
                    </td>
                    <td className="px-4 py-3 align-top">
                      <code className="text-13 text-gray-text-5">{row.bad}</code>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 rounded-md border border-gray-border-light bg-gray-fill-light p-4">
            <p className="text-14 font-medium text-gray-text-2">完整示例</p>
            <pre className="mt-2 overflow-x-auto font-mono text-13 text-gray-text-2">
              {`import { Button } from "@ss/portal-ui";

{/* ✅ 正确：token 字号/颜色 + portal-ui 组件 */}
<h1 className="text-18 font-semibold text-gray-text-1">订单详情</h1>
<p className="text-14 text-gray-text-4">创建于 2026-08-06</p>
<Button>提交</Button>

{/* ❌ 错误：自造颜色和字号 */}
<span className="text-sm text-[#4E5969]">标签</span>`}
            </pre>
          </div>
        </StyleGuideSection>

        <StyleGuideSection
          title="卡住了去哪查"
          description="本站左侧菜单就是活文档：先看画廊选对的类名，细则再翻仓库 docs。"
        >
          <div className="portal-list-card flex flex-col divide-y divide-gray-border-light">
            {GALLERY_LINKS.map((item) => (
              <div
                key={item.to}
                className="flex flex-col gap-1 p-4 sm:flex-row sm:items-baseline sm:gap-4"
              >
                <Link
                  to={item.to}
                  className="shrink-0 text-14 font-medium text-brand underline-offset-2 hover:underline"
                >
                  {item.label}
                </Link>
                <span className="text-13 text-gray-text-5">{item.when}</span>
              </div>
            ))}
            <div className="flex flex-col gap-2 p-4">
              <p className="text-14 font-medium text-gray-text-2">仓库文档（本机打开）</p>
              <ul className="list-inside list-disc text-13 text-gray-text-4">
                <li>
                  <code className="text-13">docs/design-system.md</code> — 色 / 字 / 图标总表
                </li>
                <li>
                  <code className="text-13">docs/frameworks/app-shell.md</code> — 壳怎么配
                </li>
                <li>
                  <code className="text-13">docs/frameworks/list-page.md</code> /
                  <code className="text-13"> detail-page.md</code> — 列表与详情结构
                </li>
                <li>
                  <code className="text-13">docs/migration-checklist.md</code> — 接入检查清单
                </li>
              </ul>
            </div>
          </div>
        </StyleGuideSection>
      </StyleGuidePage>
    </StyleGuideShell>
  );
}
