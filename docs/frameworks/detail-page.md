# 详情页框架

## DOM 层级

```text
AppShell
└─ main.portal-page-main--detail
   ├─ header（PortalDetailBackLink + portal-page-detail-title + 状态 Badge）
   └─ body（单栏 scroll 或左右分栏）
```

## 组件

- 返回：`PortalDetailBackLink`（`formatPortalBackLabel(nav, nodeId)`）
- 标题：`portal-page-detail-title`

## 与列表页差异

| | 列表 | 详情 |
|--|------|------|
| main | `portal-page-main` | `portal-page-main--detail` |
| 滚动 | main 整体 scroll | 常分区 scroll |
