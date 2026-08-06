# App Shell 框架

## DOM 结构

```text
AppShell
├── PortalSidebarNav（220px / 收起 60px，背景 var(--brand)）
└── 右侧列
    ├── PortalTopNav（h-14）
    └── children（业务 main）
```

## API

```tsx
<AppShell
  sidebar={{
    nav: PortalNavNode[],
    homePath: string,
    brandTitle: string,
    iconById?: Record<string, LucideIcon>,
    resolveActiveChildId?: (groupId, pathname, search, children) => string | null,
    defaultOpenIds?: string[],
  }}
  topNav={{
    logoSrc?: string,
    userName?: string,
    userRole?: string,
  }}
>
  {children}
</AppShell>
```

## 侧栏 class

- 品牌标题：`portal-sidebar-brand`（展开 `portal-sidebar-brand--expanded` · 收起 `portal-sidebar-brand--collapsed`）
- 一级：`portal-nav-row portal-nav-row--primary`
- 二级：`portal-nav-row portal-nav-row--sub`
- 激活：`portal-nav-row--active`

## 内容区栅格

业务 children 内用 `portal-page-content` 承载内容。栅格只约束内容区宽度分配，不含侧栏 / 顶栏。

| 列数 | 列间距 |
|------|--------|
| 24（固定） | `12px`（`gap-3`） |

常用排布：

- **分栏**：按内容区等分（1/6、1/4、1/3、1/2、1/1）
- **详情分栏**：对齐 [`detail-page.md`](detail-page.md) — 左右双栏 `minmax(0,1fr) + minmax(200px,280px)`；三栏 `minmax(180px,212px) + 主栏 + minmax(240px,320px)`；栏间距 `gap-2`

示意见 shell-demo `/layout` →「内容区栅格」。

## 根节点高度

AppShell 使用 `h-screen overflow-hidden`。宿主页须锁死 document 滚动，否则详情分区 scroll 会与整页滚动抢事件：

- `html, body, #root { height: 100%; overflow: hidden; }`（`@ss/portal-tokens` 已带）
- Radix `Theme`（若使用）加 `className="h-full min-h-0 overflow-hidden"`

## 参考实现

`apps/shell-demo/src/DemoListPage.tsx`
