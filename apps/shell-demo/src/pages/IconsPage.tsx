import {
  ArrowLeft,
  ArrowUpDown,
  Bell,
  ChevronDown,
  HelpCircle,
  Home,
  MoreVertical,
  Search,
  Settings,
  TriangleAlert,
  X,
  type LucideIcon,
} from "lucide-react";
import { StyleGuidePage, StyleGuideSection, StyleGuideShell } from "../style-guide/StyleGuideShell";

const COMMON_ICONS: { name: string; Icon: LucideIcon; usage: string }[] = [
  { name: "Search", Icon: Search, usage: "筛选 / 搜索框" },
  { name: "ChevronDown", Icon: ChevronDown, usage: "下拉、折叠" },
  { name: "ArrowLeft", Icon: ArrowLeft, usage: "详情返回" },
  { name: "ArrowUpDown", Icon: ArrowUpDown, usage: "表格排序" },
  { name: "MoreVertical", Icon: MoreVertical, usage: "行操作菜单" },
  { name: "X", Icon: X, usage: "关闭 Dialog" },
  { name: "Bell", Icon: Bell, usage: "顶栏通知" },
  { name: "Settings", Icon: Settings, usage: "顶栏设置" },
  { name: "HelpCircle", Icon: HelpCircle, usage: "顶栏帮助" },
  { name: "Home", Icon: Home, usage: "侧栏首页" },
  { name: "TriangleAlert", Icon: TriangleAlert, usage: "待办 / 告警" },
];

const SIZE_ROWS = [
  { size: "14px", className: "size-3.5", usage: "表格内辅助图标（如排序）" },
  { size: "16px", className: "size-4", usage: "Button 内、Dialog 关闭、筛选区" },
  { size: "18px", className: "size-[18px]", usage: "侧栏导航、详情返回、顶栏图标" },
] as const;

export function IconsPage() {
  return (
    <StyleGuideShell>
      <StyleGuidePage
        title="Icon"
        description="SS Portal 全部图标统一使用 Lucide（lucide-react）。禁止引入其他图标库，也不要手写 SVG / iconfont 替代。在 lucide.dev 按名称检索后，从 lucide-react 按需 import。"
      >
        <StyleGuideSection
          title="唯一来源：Lucide"
          description="壳层、portal-ui、业务 App 与本画廊均依赖 lucide-react。选图、命名、描边风格以此为准。"
        >
          <div className="portal-list-card flex flex-col divide-y divide-gray-border-light">
            <div className="flex flex-col gap-2 p-4">
              <p className="text-14 font-medium text-gray-text-2">依赖</p>
              <code className="text-13 text-gray-text-4">lucide-react</code>
              <p className="text-13 text-gray-text-5">
                官网检索：{" "}
                <a
                  href="https://lucide.dev/icons"
                  target="_blank"
                  rel="noreferrer"
                  className="text-13 text-brand underline-offset-2 hover:underline"
                >
                  lucide.dev/icons
                </a>
              </p>
            </div>
            <div className="flex flex-col gap-2 p-4">
              <p className="text-14 font-medium text-gray-text-2">导入</p>
              <pre className="overflow-x-auto rounded-md bg-gray-fill-light p-3 font-mono text-13 text-gray-text-2">
                {`import { Search, ChevronDown } from "lucide-react";`}
              </pre>
            </div>
            <div className="flex flex-col gap-2 p-4">
              <p className="text-14 font-medium text-gray-text-2">禁止</p>
              <ul className="list-inside list-disc text-13 text-gray-text-4">
                <li>Font Awesome、Heroicons、Ant Design Icons、iconfont 等其它图标源</li>
                <li>业务内随意内联 SVG（设计系统未收录的图形）</li>
                <li>用 emoji 充当 UI 图标</li>
              </ul>
            </div>
          </div>
        </StyleGuideSection>

        <StyleGuideSection
          title="尺寸"
          description="用 Tailwind size-* 控制宽高，勿另设 width/height。侧栏与顶栏优先 18px；控件内优先 16px。"
        >
          <div className="portal-list-card overflow-x-auto">
            <table className="w-full min-w-[36rem] text-left">
              <thead>
                <tr className="border-b border-gray-border-light">
                  <th className="px-4 py-3 text-13 font-medium text-gray-text-4">预览</th>
                  <th className="px-4 py-3 text-13 font-medium text-gray-text-4">像素</th>
                  <th className="px-4 py-3 text-13 font-medium text-gray-text-4">className</th>
                  <th className="px-4 py-3 text-13 font-medium text-gray-text-4">适用场景</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-border-light">
                {SIZE_ROWS.map((row) => (
                  <tr key={row.size}>
                    <td className="px-4 py-3 text-gray-text-4">
                      <Search className={row.className} strokeWidth={1.75} aria-hidden />
                    </td>
                    <td className="px-4 py-3 font-mono text-13 text-gray-text-4">{row.size}</td>
                    <td className="px-4 py-3">
                      <code className="text-13 text-gray-text-5">{row.className}</code>
                    </td>
                    <td className="px-4 py-3 text-13 text-gray-text-4">{row.usage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </StyleGuideSection>

        <StyleGuideSection
          title="描边与颜色"
          description="描边用 strokeWidth；颜色跟文字 token，让图标与相邻文案同色，不要写 fill hex。"
        >
          <div className="portal-list-card flex flex-col divide-y divide-gray-border-light">
            <div className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
              <div>
                <p className="text-14 font-medium text-gray-text-2">strokeWidth</p>
                <p className="mt-1 text-13 text-gray-text-5">
                  壳层与多数控件用 <code className="text-13">1.5</code>～
                  <code className="text-13">1.75</code>；与同区域已有图标保持一致。
                </p>
              </div>
              <div className="flex items-center gap-4 text-gray-text-4">
                <span className="flex items-center gap-1.5 text-13">
                  <Search className="size-[18px]" strokeWidth={1.5} aria-hidden />
                  1.5
                </span>
                <span className="flex items-center gap-1.5 text-13">
                  <Search className="size-[18px]" strokeWidth={1.75} aria-hidden />
                  1.75
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2 p-4">
              <p className="text-14 font-medium text-gray-text-2">颜色</p>
              <p className="text-13 text-gray-text-5">
                继承父级 <code className="text-13">text-*</code>，或直接加{" "}
                <code className="text-13">text-gray-text-7</code>（次要图标）、
                <code className="text-13">text-gray-text-4</code>（常规）、
                <code className="text-13">text-brand</code>（品牌强调）。筛选区可用{" "}
                <code className="text-13">portal-filter-icon</code>。
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-4">
                <span className="flex items-center gap-1.5 text-13 text-gray-text-7">
                  <Bell className="size-[18px]" strokeWidth={1.75} aria-hidden />
                  text-gray-text-7
                </span>
                <span className="flex items-center gap-1.5 text-13 text-gray-text-4">
                  <Settings className="size-[18px]" strokeWidth={1.75} aria-hidden />
                  text-gray-text-4
                </span>
                <span className="flex items-center gap-1.5 text-13 text-brand">
                  <Home className="size-[18px]" strokeWidth={1.75} aria-hidden />
                  text-brand
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2 p-4">
              <p className="text-14 font-medium text-gray-text-2">无障碍</p>
              <p className="text-13 text-gray-text-5">
                装饰性图标加 <code className="text-13">aria-hidden</code>；若图标单独表达含义（无可见文字），给按钮写{" "}
                <code className="text-13">aria-label</code>。
              </p>
            </div>
          </div>
        </StyleGuideSection>

        <StyleGuideSection
          title="常用图标"
          description="平台壳与 portal-ui 里已在用的一组；新场景优先复用同名图标，再在 Lucide 目录里找语义接近的。"
        >
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {COMMON_ICONS.map(({ name, Icon, usage }) => (
              <div
                key={name}
                className="flex flex-col gap-2 rounded-lg border border-gray-border-light bg-white p-4"
              >
                <Icon className="size-[18px] text-gray-text-4" strokeWidth={1.75} aria-hidden />
                <code className="text-13 text-gray-text-2">{name}</code>
                <p className="text-12 text-gray-text-5">{usage}</p>
              </div>
            ))}
          </div>
        </StyleGuideSection>

        <StyleGuideSection title="写法示例">
          <pre className="overflow-x-auto rounded-lg border border-gray-border-light bg-gray-fill-light p-4 font-mono text-13 text-gray-text-2">
            {`import { Search } from "lucide-react";

<button type="button" className="portal-topnav-icon-btn" aria-label="搜索">
  <Search className="size-[18px]" strokeWidth={1.75} aria-hidden />
</button>`}
          </pre>
        </StyleGuideSection>
      </StyleGuidePage>
    </StyleGuideShell>
  );
}
