# 表单页框架

表单页骨架（**不含**字段控件细则）。交互画廊见 shell-demo `/blank/form-page`；控件与 Section 原子见 `/blank/form`。

对齐 SSLTLDemo 询价详情「完善需求 / 确认」等客户端表单页。布局上属于详情单栏的特化：主内容多为白卡 Section 纵向堆叠，操作在页级底栏或卡底。

## DOM 层级

```text
AppShell
└─ main.portal-page-main--detail
   ├─ 可滚动区
   │  └─ Header（返回 / 标题 / 状态）
   │     └─ 主内容（常 max-w-3xl 居中）
   │        └─ PortalDetailCard × N（gap-3）
   │             ├─ PortalDetailSection | PortalDetailSectionStack
   │             │    └─ portal-detail-form-* 字段
   │             └─ [可选] PortalDetailCardFooter
   └─ [可选] 页级底栏操作（border-t + 右对齐按钮）
```

勿让 document / body 参与滚动；滚动落在 `portal-page-main--detail` 内可滚动区。

## 两种操作区

| 模式 | 操作位置 | 适用 |
|------|----------|------|
| 页级底栏 | `main` 底部 sticky / 贴底 toolbar | 整页提交（完善需求、确认） |
| 卡底操作 | `PortalDetailCardFooter` | 局部保存（仓库预约等） |

二者不要叠用在同一提交语义上。

## 白卡与 Section

- 白卡：`PortalDetailCard`（`portal-detail-card` + `elevation-sm`）
- Section：`PortalDetailSection`；同卡多块用 `PortalDetailSectionStack`（块间 `border-light`）
- 卡内小标题 + 分割线：`PortalDetailBlockTitle` + `PortalDetailDividedStack`
- 白卡纵向间距统一 `gap-3`（12）

字段 label / input / hint / 选择卡等见 [`design-system.md` §6.3.1](../design-system.md) 与 shell-demo「表单组件」。

## 宽度

| 场景 | 主内容宽度 |
|------|------------|
| 客户端完善需求 / 确认 | 常 `max-w-3xl` 居中 |
| 与详情单栏同构的全宽表单 | 全宽（无 max-w） |

栅格断点与右栏规格见 [`detail-page.md`](detail-page.md)（表单页默认不用左右双栏 / 三栏）。

## 与详情页 / 表单组件的分工

| 入口 | 职责 |
|------|------|
| `/blank/form-page` | 页级骨架：顶栏、白卡堆叠、操作区位置、宽度 |
| `/blank/detail-page` | 单栏 / 双栏 / 三栏布局类型 |
| `/blank/form` | 字段控件、提示、只读态、白卡 Section 组合原子 |

## 参考实现

- 画廊：`apps/shell-demo` → `/blank/form-page`
- 带数据的详情内嵌表单：`apps/shell-demo/src/DemoDetailPage.tsx`（`/orders/:id`）
