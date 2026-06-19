# 列表页框架

## DOM 层级

```text
AppShell
└─ main.portal-page-main
   └─ div.portal-page-content
      ├─ h1.portal-page-title
      │    └─ span.portal-page-title-prefix
      ├─ [可选] div.portal-tab-bar
      └─ div.portal-list-card
           ├─ 筛选栏（portal-filter-*）
           └─ 表格 / 卡片 + portal-pagination
```

## 最小模板

见 `apps/shell-demo/src/DemoListPage.tsx`。

## 规则

- 标题格式：`{模块名}:` + 页面名
- 列表背景：`portal-page-main` + `--page-bg`
- 白卡：`portal-list-card`
