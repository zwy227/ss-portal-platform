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

- 一级：`portal-nav-row portal-nav-row--primary`
- 二级：`portal-nav-row portal-nav-row--sub`
- 激活：`portal-nav-row--active`

## 参考实现

`apps/shell-demo/src/DemoListPage.tsx`
