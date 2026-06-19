# Platform Monorepo 迁移清单

> **原则**：现仓 `SSLTLDemo` **只读参考，不修改**。从本仓 **复制** 文件到新 GitHub 仓库；在新仓内完成 `client-*` → `portal-*` 重命名与解耦。
>
> **源仓库路径**：`/Users/zhangwenyu/Documents/SSDemo/SSLTLDemo`（下文简称 **源仓**）

---

## 0. 分阶段范围

| 阶段 | 新仓库 | 必做？ | 交付物 |
|------|--------|--------|--------|
| **Phase 1** | **ss-portal-platform** | ✅ 是 | `@ss/portal-tokens`、`@ss/portal-shell`、设计/框架文档 |
| **Phase 2** | **portal-drayage-app**（或 platform 内 `apps/drayage`） | ⬜ 可选 | 204 个拖柜业务文件 + 路由 + PRD 落地 |

**Phase 1 完成后**：

- 拖柜业务可**继续留在源仓** `SSLTLDemo`，不必立刻迁出。
- 源仓或其它未来 App 通过 `pnpm link` / npm 依赖接入 platform 包即可。
- Phase 2 仅在需要「独立、干净的 drayage 专用 App」时再启动。

### 0.1 目标仓库一览

| 仓库 | 阶段 | 用途 | npm 包名（建议） |
|------|------|------|------------------|
| **ss-portal-platform** | Phase 1 | 设计 token + 壳层组件 + 框架文档 | `@ss/portal-tokens`、`@ss/portal-shell` |
| **portal-drayage-app** | Phase 2（可选） | 拖柜业务 App | 私有应用，不发包 |
| *备选* `ss-portal-platform/apps/drayage` | Phase 2（可选） | 与 platform 同 monorepo 管理业务 | 同上，不单独开 GitHub repo |

---

## Phase 1 — `ss-portal-platform`（必做）

## 1. 仓库结构

### 1.1 目录结构（新建 scaffold，再 copy）

```text
ss-portal-platform/
├── package.json                 # pnpm workspace 根
├── pnpm-workspace.yaml
├── packages/
│   ├── tokens/
│   │   ├── package.json         # name: @ss/portal-tokens
│   │   ├── theme.css            # ← 源仓 copy + rename
│   │   ├── radix-themes-brand.css
│   │   ├── fonts.css
│   │   ├── globals.css          # 精简版装配
│   │   ├── index.css            # 对外入口
│   │   └── tailwind.preset.js   # ← 源仓 tailwind.config.js 镜像
│   └── shell/
│       ├── package.json         # name: @ss/portal-shell
│       ├── src/
│       │   ├── AppShell.tsx
│       │   ├── PortalSidebarNav.tsx
│       │   ├── PortalTopNav.tsx
│       │   ├── PortalDetailBackLink.tsx
│       │   ├── PortalListFilterResetButton.tsx
│       │   ├── PortalPrimaryButtonUi.ts
│       │   ├── nav-types.ts
│       │   └── index.ts
│       └── tsconfig.json
├── docs/
│   ├── design-system.md         # ← 源仓 style-guide 整理 + portal 化
│   ├── nav-schema.md            # NavNode 书写规范
│   └── frameworks/
│       ├── app-shell.md         # 新建
│       ├── list-page.md         # 新建
│       └── detail-page.md       # 新建
├── .cursor/rules/
│   └── ss-portal-design-tokens.mdc
└── AGENTS.md
```

---

### 1.2 `@ss/portal-tokens` — 从源仓复制的文件

| 源仓路径 | 目标路径 | 复制后操作 |
|----------|----------|------------|
| `src/styles/theme.css` | `packages/tokens/theme.css` | 全文 `client-*` → `portal-*`；`--client-text-link` → `--portal-text-link` |
| `src/styles/radix-themes-brand.css` | `packages/tokens/radix-themes-brand.css` | 注释中 `client-*` 改为 `portal-*` |
| `src/styles/fonts.css` | `packages/tokens/fonts.css` | 原样（当前为 placeholder） |
| `tailwind.config.js` | `packages/tokens/tailwind.preset.js` | 改为 `export default { theme: { extend: … } }` preset 格式 |

**从 `theme.css` 提取的组合类（复制后统一 rename）** — 共 **50** 个 selector：

<details>
<summary>portal-* 类名对照表（client → portal）</summary>

| 现名 | 新名 |
|------|------|
| `client-page-main` | `portal-page-main` |
| `client-page-main--detail` | `portal-page-main--detail` |
| `client-page-content` | `portal-page-content` |
| `client-page-title` | `portal-page-title` |
| `client-page-detail-title` | `portal-page-detail-title` |
| `client-page-title-prefix` | `portal-page-title-prefix` |
| `client-tab-bar` | `portal-tab-bar` |
| `client-tab-item` | `portal-tab-item` |
| `client-tab-item--active` | `portal-tab-item--active` |
| `client-list-card` | `portal-list-card` |
| `client-filter-input` | `portal-filter-input` |
| `client-filter-select` | `portal-filter-select` |
| `client-filter-select--with-icon` | `portal-filter-select--with-icon` |
| `client-filter-select--plain` | `portal-filter-select--plain` |
| `client-filter-icon` | `portal-filter-icon` |
| `client-filter-reset-btn` | `portal-filter-reset-btn` |
| `client-brand-btn` | `portal-brand-btn` |
| `client-dropdown-menu` | `portal-dropdown-menu` |
| `client-dropdown-menu--wide` | `portal-dropdown-menu--wide` |
| `client-dropdown-item` | `portal-dropdown-item` |
| `client-dropdown-item--sm` | `portal-dropdown-item--sm` |
| `client-dropdown-item--cancel` | `portal-dropdown-item--cancel` |
| `client-pagination` | `portal-pagination` |
| `client-pagination--compact` | `portal-pagination--compact` |
| `client-pagination--spacious` | `portal-pagination--spacious` |
| `client-pagination-summary` | `portal-pagination-summary` |
| `client-pagination-label` | `portal-pagination-label` |
| `client-pagination-size-select` | `portal-pagination-size-select` |
| `client-pagination-nav-btn` | `portal-pagination-nav-btn` |
| `client-pagination-page` | `portal-pagination-page` |
| `client-pagination-page--active` | `portal-pagination-page--active` |
| `client-pagination-ellipsis` | `portal-pagination-ellipsis` |
| `client-nav-row` | `portal-nav-row` |
| `client-nav-row--primary` | `portal-nav-row--primary` |
| `client-nav-row--sub` | `portal-nav-row--sub` |
| `client-nav-row--active` | `portal-nav-row--active` |
| `client-nav-row--idle` | `portal-nav-row--idle` |
| `client-topnav` | `portal-topnav` |
| `client-topnav-icon-btn` | `portal-topnav-icon-btn` |
| `client-topnav-divider` | `portal-topnav-divider` |
| `client-topnav-user-name` | `portal-topnav-user-name` |
| `client-topnav-user-role` | `portal-topnav-user-role` |
| `client-topnav-notif-dot` | `portal-topnav-notif-dot` |
| `client-document-link` | `portal-document-link` |
| `client-document-action-link` | `portal-document-action-link` |

</details>

**CSS 变量 rename：**

| 现名 | 新名 |
|------|------|
| `--client-text-link` | `--portal-text-link` |
| `--color-client-text-link` | `--color-portal-text-link` |

**`:root` 中不需 rename 的 token（整段保留）**：`--brand*`、`--gray-*`、`--page-bg*`、`--sidebar-nav-*`、`--semantic-*`、`--text-11`…`--text-32`、`--radius*`、`--focus-ring-brand` 等。

**新建（不 copy）**：

| 文件 | 说明 |
|------|------|
| `packages/tokens/globals.css` | 参考源仓 `src/styles/globals.css`，`@import` tokens 内各文件 |
| `packages/tokens/index.css` | `export` 给 App：`@import './globals.css'` |
| `packages/tokens/package.json` | `"exports": { ".": "./index.css", "./tailwind.preset": "./tailwind.preset.js" }` |

---

### 1.3 `@ss/portal-shell` — 从源仓复制的文件

| 源仓路径 | 目标路径 | 复制后操作 |
|----------|----------|------------|
| `src/app/components/clientPortal/clientDray/ClientDrayagePageShell.tsx` | `packages/shell/src/AppShell.tsx` | 泛化：侧栏/顶栏从 package 内 import；`--client-sidebar-width` → `--portal-sidebar-width` |
| `src/app/components/shared/ClientSidebarNav.tsx` | `packages/shell/src/PortalSidebarNav.tsx` | **解耦**：移除对 drayage 路由文件的 import（见 §4） |
| `src/app/components/shared/ClientPortalTopNav.tsx` | `packages/shell/src/PortalTopNav.tsx` | Logo/头像改为 props 或 slot，不 hardcode 源仓 assets 路径 |
| `src/app/components/clientPortal/shared/clientPortalDetailBackLink.tsx` | `packages/shell/src/PortalDetailBackLink.tsx` | 移除对 `fulfillmentDetailUi` 的业务 import，边框 class 内联或 token |
| `src/app/components/shared/ClientListFilterResetButton.tsx` | `packages/shell/src/PortalListFilterResetButton.tsx` | `client-filter-reset-btn` → `portal-filter-reset-btn` |
| `src/app/components/shared/primaryButtonUi.ts` | `packages/shell/src/PortalPrimaryButtonUi.ts` | 原样 export class 常量 |

**新建（不 copy）**：

| 文件 | 说明 |
|------|------|
| `packages/shell/src/nav-types.ts` | 从 `clientPortalNavConfig.ts` 抽出 `NavNode` 类型 |
| `packages/shell/src/index.ts` | 统一 export |

**常量（从 shell 源文件提取，写入 package）**：

| 现名 | 新名 | 现值 |
|------|------|------|
| `CLIENT_SIDEBAR_EXPANDED_WIDTH` | `PORTAL_SIDEBAR_EXPANDED_WIDTH` | `220` |
| `CLIENT_SIDEBAR_COLLAPSED_WIDTH` | `PORTAL_SIDEBAR_COLLAPSED_WIDTH` | `60` |

---

### 1.4 Platform 文档 — 从源仓复制的文件

| 源仓路径 | 目标路径 | 操作 |
|----------|----------|------|
| `docs/style-guide/client-portal.md` | `docs/design-system.md` | 全文 portal 化；§4–§5 拆到 frameworks |
| `.cursor/rules/ss-portal-design-tokens.mdc` | `.cursor/rules/ss-portal-design-tokens.mdc` | 权威源路径改为 `@ss/portal-tokens` |
| `doc/client-sidebar-nav.md` | `docs/nav-schema.md` | 补充拖柜菜单树；格式规范保留 |
| `doc/sidebar-nav-maintenance.md` | `docs/nav-maintenance.md` | 可选；更新为 portal 命名 |

**新建框架文档（内容从 design-system §5 + 现 drayage 页归纳）**：

| 文件 | 内容来源 |
|------|----------|
| `docs/frameworks/app-shell.md` | `ClientDrayagePageShell` + `PortalSidebarNav` DOM 结构 |
| `docs/frameworks/list-page.md` | `ClientDrayageQuoteOrderPage`、`ClientDrayageFulfillmentListPageMain` |
| `docs/frameworks/detail-page.md` | `OrderDetailPageHeader`、`ClientDrayageOrderDetailPage` |

---

### 1.5 Platform 仓库 — 明确不复制

| 路径 | 原因 |
|------|------|
| `src/app/components/SSDrayage/**` | 运营端，忽略 |
| `src/app/components/SSCRM/**` | CRM demo，忽略 |
| `src/app/components/shared/SidebarNav.tsx` | 运营侧栏旧实现 |
| `src/app/components/shared/SSTopNav.tsx` | 运营顶栏 |
| `src/app/components/clientPortal/clientDray/**` | 业务，进 App 仓 |
| `public/client-*.css`、`public/client-auth-static.html` | 静态 demo，style guide 已标记废弃 |

---

## Phase 2 — 拖柜业务 App（可选）

> **何时做**：platform 包已发布或本地 link 稳定；需要从源仓剥离 drayage、或要独立部署时再启动。
>
> **何时不做**：Phase 1 只交付设计系统；拖柜 demo 继续用源仓 `SSLTLDemo` 即可。

## 2. 仓库 B：`portal-drayage-app`（或 `apps/drayage`）

### 2.1 目录结构

```text
portal-drayage-app/
├── package.json                 # 依赖 @ss/portal-tokens、@ss/portal-shell
├── vite.config.ts
├── tailwind.config.js           # presets: [@ss/portal-tokens/tailwind.preset]
├── index.html
├── src/
│   ├── main.tsx
│   ├── app/App.tsx
│   ├── routes/drayageRoutes.tsx
│   ├── nav/
│   │   └── portalNavConfig.ts   # ← 源仓 clientPortalNavConfig 的 drayage 部分
│   ├── nav/
│   │   └── drayageNavActive.ts  # 新建：从 ClientSidebarNav 抽出的高亮规则
│   ├── assets/                  # logo、avatar
│   ├── lib/utils.ts
│   ├── components/ui/           # shadcn 最小集
│   └── modules/drayage/         # ← 源仓 clientDray 整树（204 文件）
└── docs/prd/                    # ← 源仓 drayage PRD
```

---

### 2.2 业务模块 — 整目录复制

**源目录**：`src/app/components/clientPortal/clientDray/`  
**目标目录**：`src/modules/drayage/`  
**文件数**：**204**

<details>
<summary>完整文件列表（204 个，相对 clientDray/）</summary>

```
Billing/BillingDetailContent.tsx
Billing/BillingOrderFeesTab.tsx
Billing/ClientDrayageBillingDetailPage.tsx
Billing/ClientDrayageBillingListPageMain.tsx
Billing/DrayageBillingPaymentStatusBadge.tsx
Billing/DrayageBillingRelatedOrderCell.tsx
Billing/DrayageBillingStatusBadge.tsx
Billing/DrayageBillingTable.tsx
Billing/drayageBillingData.ts
Billing/drayageBillingRoutes.ts
ClientDrayageBillingPage.tsx
ClientDrayageBlankMain.tsx
ClientDrayageFulfillmentPage.tsx
ClientDrayageOrdersFulfillmentProfilePage.tsx
ClientDrayageOrdersPage.tsx
ClientDrayagePageShell.tsx          ← 迁移后期删除，改用 @ss/portal-shell AppShell
ClientDrayageQuickQuotePage.tsx
ClientDrayageTrackingPage.tsx
ClientDrayageWorkorderPage.tsx
DrayageAddressBookDialog.tsx
DrayageCustomAddressDialog.tsx
DrayageHistoryQuoteDialog.tsx
DrayageQuickQuoteForm.tsx
DrayageQuickQuoteResultPanel.tsx
DrayageQuoteCargoFieldsBlock.tsx
DrayageQuoteContainerLengthSelect.tsx
DrayageRouteSelectionFields.tsx
DrayageSmartRecognitionDialog.tsx
Fulfillment/ClientDrayageFulfillmentListPageMain.tsx
Fulfillment/DrayageFulfillmentOrderStatusBadge.tsx
Fulfillment/DrayageFulfillmentOrderTable.tsx
Fulfillment/FilledOrangeAlertIcon.tsx
Fulfillment/FulfillmentBatchUploadDialog.tsx
Fulfillment/FulfillmentContainerOverviewEmptyState.tsx
Fulfillment/FulfillmentContainerProgressPopover.tsx
Fulfillment/FulfillmentContainerProgressSwitcher.tsx
Fulfillment/FulfillmentContainerSelectionContext.tsx
Fulfillment/FulfillmentContainerSwitcherOverviewCard.tsx
Fulfillment/FulfillmentDedicatedSupportDock.tsx
Fulfillment/FulfillmentDocumentSummaryCard.tsx
Fulfillment/FulfillmentOrderDocumentsTab.tsx
Fulfillment/FulfillmentOrderListStatusBadge.tsx
Fulfillment/FulfillmentOrderSnapshotTab.tsx
Fulfillment/FulfillmentOverviewCardSection.tsx
Fulfillment/FulfillmentPrepWarehouseTopPanel.tsx
Fulfillment/FulfillmentRiskCollaborationCard.tsx
Fulfillment/FulfillmentSquareTag.tsx
Fulfillment/FulfillmentTodoLink.tsx
Fulfillment/FulfillmentTrackingDetailPanel.tsx
Fulfillment/FulfillmentTrackingTimeline.tsx
Fulfillment/drayageFulfillmentOrderData.ts
Fulfillment/drayageFulfillmentOrderRoutes.ts
Fulfillment/drayageFulfillmentServiceCodes.ts
Fulfillment/fulfillmentContainerDetailGrid.tsx
Fulfillment/fulfillmentContainerDetailGridClasses.ts
Fulfillment/fulfillmentContainerMilestoneAlerts.ts
Fulfillment/fulfillmentContainerStatusTodos.ts
Fulfillment/fulfillmentDetailUi.ts
Fulfillment/fulfillmentListDisplay.ts
Fulfillment/fulfillmentListStatusHint.ts
Fulfillment/fulfillmentMilestoneTimestamp.ts
Fulfillment/fulfillmentOrderDocumentsData.ts
Fulfillment/fulfillmentOrderListContainerSubrow.ts
Fulfillment/fulfillmentOrderListDisplayRules.ts
Fulfillment/fulfillmentOrderListTodoRules.ts
Fulfillment/fulfillmentOrderSnapshotSections.tsx
Fulfillment/fulfillmentOverviewCardLayout.ts
Fulfillment/fulfillmentRiskCollaborationData.ts
Fulfillment/fulfillmentStatusColors.ts
Fulfillment/fulfillmentStatusIcons.ts
Fulfillment/fulfillmentTodoActions.ts
Fulfillment/fulfillmentTrackingDetailDemo.ts
Fulfillment/fulfillmentTrackingKeyTime.ts
Fulfillment/fulfillmentTrackingTimelineModel.ts
Fulfillment/milestoneOngoingContext/CompletedMilestoneContext.tsx
Fulfillment/milestoneOngoingContext/CompletedMilestoneServiceEvaluation.tsx
Fulfillment/milestoneOngoingContext/CompletedMilestoneTodoSection.tsx
Fulfillment/milestoneOngoingContext/ContainerPickedMilestoneContext.tsx
Fulfillment/milestoneOngoingContext/DocPrepMilestoneContext.tsx
Fulfillment/milestoneOngoingContext/DocPrepReadinessProgressPanel.tsx
Fulfillment/milestoneOngoingContext/DocPrepTodoDialogs.tsx
Fulfillment/milestoneOngoingContext/DocReturnDocumentProgressPanel.tsx
Fulfillment/milestoneOngoingContext/DocReturnMilestoneContext.tsx
Fulfillment/milestoneOngoingContext/InTransitDeliveryProgressPanel.tsx
Fulfillment/milestoneOngoingContext/InTransitMilestoneContext.tsx
Fulfillment/milestoneOngoingContext/MilestoneContextCompoundValue.tsx
Fulfillment/milestoneOngoingContext/MilestoneContextFieldGrid.tsx
Fulfillment/milestoneOngoingContext/MilestoneOngoingContextContent.tsx
Fulfillment/milestoneOngoingContext/MilestoneOngoingSectionShell.tsx
Fulfillment/milestoneOngoingContext/MilestoneTimeAnchorGrid.tsx
Fulfillment/milestoneOngoingContext/PickupArrangementMilestoneContext.tsx
Fulfillment/milestoneOngoingContext/completedMilestoneDemo.ts
Fulfillment/milestoneOngoingContext/containerPickedMilestoneDemo.ts
Fulfillment/milestoneOngoingContext/docPrepMilestoneDemo.ts
Fulfillment/milestoneOngoingContext/docPrepMilestoneDemoState.tsx
Fulfillment/milestoneOngoingContext/docReturnMilestoneDemo.ts
Fulfillment/milestoneOngoingContext/inTransitMilestoneDemo.ts
Fulfillment/milestoneOngoingContext/pickupArrangementMilestoneDemo.ts
Fulfillment/orderDetail/ClientDrayageOrderDetailPage.tsx
Fulfillment/orderDetail/OrderDetailBillingTab.tsx
Fulfillment/orderDetail/OrderDetailBody.tsx
Fulfillment/orderDetail/OrderDetailLeftPanel.tsx
Fulfillment/orderDetail/OrderDetailPageHeader.tsx
Fulfillment/orderDetail/OrderDetailRightPanel.tsx
Fulfillment/orderDetail/OrderDetailWorkorderSwitcherCard.tsx
Fulfillment/orderDetail/OrderDetailWorkordersTab.tsx
Fulfillment/orderDetail/OrderSubmitFlowDetail.tsx
Fulfillment/orderDetail/orderDetailLeftPanelTypes.ts
Fulfillment/pendingSubmit/ClientDrayagePendingSubmitOrderPage.tsx
Fulfillment/pendingSubmit/PendingOrderConfirmDetailBody.tsx
Fulfillment/pendingSubmit/PendingSubmitOrderPageHeader.tsx
Fulfillment/pendingSubmit/pendingSubmitOrderActionBars.tsx
Fulfillment/pendingSubmit/pendingSubmitOrderUi.ts
Fulfillment/trackingDetail/ClientDrayageFulfillmentTrackingDetailPage.tsx
Fulfillment/trackingDetail/TrackingDetailBody.tsx
Fulfillment/trackingDetail/TrackingDetailPageHeader.tsx
Fulfillment/trackingDetail/TrackingDetailRightPanel.tsx
Fulfillment/useDrayageOrderDetailRouteRecord.ts
OverweightCargoPopoverField.tsx
PickupNodeModal.tsx
PickupNodeRow.tsx
PickupNodeSearchDropdown.tsx
PickupNodeSelector.tsx
Workorder/ClientDrayageWorkorderListPageMain.tsx
Workorder/DrayageWorkorderStatusBadge.tsx
Workorder/DrayageWorkorderTable.tsx
Workorder/WorkorderDetailPanel.tsx
Workorder/WorkorderProgressSwitcher.tsx
Workorder/WorkorderProgressTimeline.tsx
Workorder/WorkorderRelatedFilesTable.tsx
Workorder/WorkorderSelectionContext.tsx
Workorder/drayageWorkorderData.ts
clientDrayDetailActionUi.ts
demand/CancelQuoteOrderConfirmDialog.tsx
demand/ClientDrayageAuthorizationLetterPage.tsx
demand/ClientDrayageOrderConfirmationPage.tsx
demand/ClientDrayageQuoteOrderDetailPage.tsx
demand/ClientDrayageQuoteOrderPage.tsx
demand/DrayageAuthorizationLetterView.tsx
demand/DrayageAutoFillFormTriggerButton.tsx
demand/DrayageContainerVesselSmartFillDialog.tsx
demand/DrayageOrderConfirmationModule.tsx
demand/DrayagePlaceDisplayCard.tsx
demand/DrayageQuoteOrderDeliveryCell.tsx
demand/DrayageQuoteOrderListTag.tsx
demand/DrayageQuoteOrderPickupCell.tsx
demand/DrayageQuoteOrderStatusBadge.tsx
demand/DrayageQuoteOrderTable.tsx
demand/PendingOrderSubmitResultDialog.tsx
demand/QuoteOrderFulfillmentTodoLink.tsx
demand/QuoteOrderLocationCascader.tsx
demand/QuoteOrderStatusMultiSelect.tsx
demand/UnNumberSearchField.tsx
demand/detailServicePriceLabel.tsx
demand/drayageAuthorizationLetterLoa.ts
demand/drayageContainerVesselSmartFillParse.ts
demand/drayageDropOffZones.ts
demand/drayageOrderConfirmationDocument.tsx
demand/drayageOrderConfirmationPageData.ts
demand/drayageQuoteOrderConfirmReadonly.tsx
demand/drayageQuoteOrderContainerVesselForm.tsx
demand/drayageQuoteOrderCustomsClearanceForm.tsx
demand/drayageQuoteOrderData.ts
demand/drayageQuoteOrderDetailForm.tsx
demand/drayageQuoteOrderDetailStepBar.tsx
demand/drayageQuoteOrderDetailUi.ts
demand/drayageQuoteOrderFulfillmentCompleteness.ts
demand/drayageQuoteOrderFulfillmentNotificationForm.tsx
demand/drayageQuoteOrderFulfillmentReadOnly.tsx
demand/drayageQuoteOrderListFilters.ts
demand/drayageQuoteOrderPlaces.ts
demand/drayageQuoteOrderRefineEstimate.ts
demand/drayageQuoteOrderRoutes.ts
demand/drayageQuoteOrderServicePrices.ts
demand/drayageQuoteOrderSession.ts
demand/drayageQuoteOrderSubmit.ts
demand/drayageQuoteOrderSubmitResult.tsx
demand/drayageQuoteOrderSubmitSuccessNav.ts
demand/drayageQuoteOrderWarehouseAppointmentForm.tsx
demand/drayageUnNumberCatalog.ts
demand/orderConfirmationDocumentFeeSection.tsx
demand/orderConfirmationDocumentStyles.ts
demand/orderConfirmationModuleUi.ts
demand/orderDetailQuoteMarkdown.ts
demand/orderSubmitConfirmShell.tsx
demand/quoteOrderFilterAntdTheme.ts
demand/quoteOrderFulfillmentTodoLinkUtils.ts
demand/quoteOrderLocationCascader.css
demand/quoteOrderStatusMultiSelect.css
demoOrderId.ts
docNoTypography.ts
drayageCustomAddressRecognitionParse.ts
drayageHistoryQuoteImport.ts
drayageQuickQuoteEstimate.ts
drayageQuickQuotePlaces.ts
drayageQuickQuoteRequote.ts
drayageQuickQuoteUi.ts
drayageQuoteContainerLengthSelect.css
drayageRouteMarkers.tsx
drayageRouteSelectionToolbar.tsx
drayageSmartRecognitionParse.ts
overweightCargoJudgment.ts
pickupNodes.ts
stickyTableActionColumn.ts
```

</details>

**复制后批量替换（App 仓内）**：

| 查找 | 替换为 |
|------|--------|
| `client-page-` | `portal-page-` |
| `client-tab-` | `portal-tab-` |
| `client-list-` | `portal-list-` |
| `client-filter-` | `portal-filter-` |
| `client-brand-` | `portal-brand-` |
| `client-dropdown-` | `portal-dropdown-` |
| `client-pagination-` | `portal-pagination-` |
| `client-nav-` | `portal-nav-` |
| `client-topnav` | `portal-topnav` |
| `client-document-` | `portal-document-` |
| `ClientDrayagePageShell` | `AppShell` from `@ss/portal-shell` |
| `ClientPortalDetailBackLink` | `PortalDetailBackLink` |
| `ClientListFilterResetButton` | `PortalListFilterResetButton` |
| `getClientNavNodeLabel` | `getPortalNavNodeLabel` |
| `formatClientPortalBackLabel` | `formatPortalBackLabel` |

**组件 rename（业务层，可选第二批）**：`ClientDrayage*` → `Drayage*`（如 `DrayageQuickQuotePage`）。

---

### 2.3 App 仓 — 额外从源仓复制的文件（非 clientDray 目录）

| 源仓路径 | 目标路径 | 说明 |
|----------|----------|------|
| `src/app/components/shared/clientPortalNavConfig.ts` | `src/nav/portalNavConfig.ts` | 只保留 drayage 相关 `PORTAL_NAV` 段；路由前缀改为新 App 约定 |
| `src/lib/utils.ts` | `src/lib/utils.ts` | `cn()`，shadcn 依赖 |
| `src/components/ui/button.tsx` | `src/components/ui/button.tsx` | 仅 `CancelQuoteOrderConfirmDialog` 使用 |
| `src/components/ui/alert-dialog.tsx` | `src/components/ui/alert-dialog.tsx` | 同上 |
| `src/app/components/shared/SelectInput.tsx` | `src/components/SelectInput.tsx` | `DrayageCustomAddressDialog` 依赖；后续可 portal 化样式 |
| `src/assets/logo-ss.png` | `src/assets/logo-ss.png` | 顶栏 Logo（若源仓无文件，从运行环境或设计稿补） |
| `src/assets/avatar.png` | `src/assets/avatar.png` | 顶栏头像 demo |

**从源仓 `routes.tsx` 提取的路由段**（复制逻辑，非整文件）：

| 源路由 path | 页面组件 |
|-------------|----------|
| `/demos/client-portal-demand/drayage-quick-quote` | `ClientDrayageQuickQuotePage` |
| `.../drayage-quote-order` | `ClientDrayageQuoteOrderPage` |
| `.../drayage-quote-order/:inquiryNo` (+ children) | Quote 详情 layout 四子路由 |
| `.../drayage-orders` | `ClientDrayageOrdersPage` |
| `.../drayage-orders/pending-submit/:inquiryNo` | `ClientDrayagePendingSubmitOrderPage` |
| `.../drayage-orders/fulfillment-profile` | `ClientDrayageOrdersFulfillmentProfilePage` |
| `.../drayage-orders/:orderId` | `ClientDrayageOrderDetailPage` |
| `.../drayage-fulfillment` | `ClientDrayageFulfillmentPage` |
| `.../drayage-fulfillment/:orderId` | `ClientDrayageFulfillmentTrackingDetailPage` |
| `.../drayage-billing` | `ClientDrayageBillingPage` |
| `.../drayage-billing/:billId` | `ClientDrayageBillingDetailPage` |
| `.../drayage-workorder` | `ClientDrayageWorkorderPage` |
| `.../drayage-tracking` | `ClientDrayageTrackingPage` |

新 App 建议路由前缀：`/drayage/*` 或 `/portal/drayage/*`（与 `portalNavConfig.ts` 同步）。

---

### 2.4 App 仓 — PRD 文档复制

| 源仓路径 |
|----------|
| `docs/prd/client-portal-drayage-fulfillment-list.md` |
| `docs/prd/client-portal-drayage-order-list-status-todos.md` |
| `docs/prd/client-portal-drayage-order-container-status.md` |
| `docs/prd/client-portal-drayage-quote-order-list-actions.md` |
| `docs/prd/client-portal-drayage-quote-detail-fees.md` |
| `docs/prd/client-portal-drayage-quote-detail-right-panel-structure.md` |
| `docs/prd/client-portal-online-pricing-form-two-column-layout.md` |
| `docs/prd/货柜履约进展时间轴.md` |

**可选参考（非 PRD，业务 spec）**：

| 源仓路径 |
|----------|
| `doc/canada-drayage-pickup-node-selector-spec.md` |
| `doc/在线询价页面代码参考` |
| `doc/路线展示` |

---

### 2.5 App 仓 — 脚手架参考（复制配置，非业务）

| 源仓路径 | 用途 |
|----------|------|
| `vite.config.ts` | alias `@` → `src` |
| `package.json` | 依赖版本参考（见 §3） |
| `src/app/App.tsx` | Radix Theme + Router + Toaster 装配 |
| `src/main.tsx` | 入口 |
| `index.html` | Vite 入口 |

---

### 2.6 App 仓 — 明确不复制

| 路径 | 原因 |
|------|------|
| `src/app/components/pages/client-portal/*` | 首页/企业信息等非 drayage |
| `src/app/components/pages/client-auth/*` | 登录注册 demo |
| `src/app/components/SSDrayage/**` | 运营端 |
| `ClientDrayagePageShell.tsx` | 稳定后删除，用 `@ss/portal-shell` |
| `src/app/components/shared/ClientSidebarNav.tsx` 等 | 已在 platform shell package |

---

## 3. npm 依赖（Phase 2 · App 仓最小集，从源仓 package.json 对齐）

**运行时（drayage 实际用到）**：

```
react ^18.3
react-router ^7
@radix-ui/themes ^3.3
@radix-ui/react-dialog
@radix-ui/react-dropdown-menu
@radix-ui/react-popover
@radix-ui/react-tooltip
lucide-react
antd ^6.3          # Select、Cascader、ConfigProvider
dayjs
sonner             # toast
class-variance-authority
clsx
tailwind-merge     # lib/utils
```

**开发**：

```
vite
@tailwindcss/vite ^4
tailwindcss ^4
typescript
@vitejs/plugin-react
```

**Workspace 链接（本地开发）**：

```json
{
  "@ss/portal-tokens": "workspace:*",
  "@ss/portal-shell": "workspace:*"
}
```

或 monorepo 根目录用 `pnpm link` / `"file:../ss-portal-platform/packages/tokens"`。

---

## 4. 复制时必须处理的耦合（⚠️）

### Phase 1 必处理

#### 4.1 `ClientSidebarNav` ↔ drayage 路由（Platform 解耦）

源仓 `ClientSidebarNav.tsx` import 了：

- `../clientPortal/clientDray/Fulfillment/drayageFulfillmentOrderRoutes`
- `../clientPortal/clientDray/demand/drayageQuoteOrderRoutes`

**处理**：高亮逻辑移到 App 仓 `src/nav/drayageNavActive.ts`，通过 props 传给 `PortalSidebarNav`：

```typescript
// 任意消费方（源仓 SSLTLDemo、Phase 2 App 等）
<PortalSidebarNav
  nav={PORTAL_NAV}
  resolveActiveChildId={resolveDrayageChildActiveId}  // 由业务侧注入
/>
```

Phase 1 抽 shell 时：**不要**在 `@ss/portal-shell` 内 import drayage 路由文件；高亮逻辑留在消费方。

#### 4.4 `PortalDetailBackLink` ↔ fulfillmentDetailUi

源仓 back link 依赖 `FULFILLMENT_DETAIL_MODULE_BORDER_CLASS`。

**处理（Phase 1）**：Platform 包内用 token 边框类，移除对 drayage 业务文件的 import。

### Phase 2 再处理

#### 4.2 `clientPortalNavConfig` ↔ drayage 路由

源仓 `clientPortalNavConfig.ts` import `DRAYAGE_ORDERS_FULFILLMENT_PROFILE_LIST_PATH`。

**处理**：App 仓 `portalNavConfig.ts` 只保留常量路径字符串，或从 `drayageFulfillmentOrderRoutes.ts` re-export。

#### 4.3 `ClientDrayagePendingSubmitOrderPage` ↔ SSDrayage

源文件 import：

`../../../../SSDrayage/Demand/drayageQuoteOrderBasicInfo` → `resolveDrayageQuoteOrderServiceCodeName`

**处理**：将该函数 **复制** 到 App 仓 `src/modules/drayage/shared/drayageServiceCodeNames.ts`（约 20 行），删除对 SSDrayage 的依赖。

#### 4.5 `SelectInput.tsx`

仍含 `slate-*` / `text-[14px]` 旧写法。

**处理**：App 仓先原样复制跑通；第二批改为 `portal-filter-*` token。

---

## 5. 推荐执行顺序

### Phase 1（必做）

1. 新建 **ss-portal-platform** monorepo scaffold（pnpm workspace）
2. copy §1.2 tokens 文件 → rename `client-*` → `portal-*`
3. copy §1.3 shell 文件 → 解耦 §4.1、§4.4
4. 写 §1.4 文档 + `AGENTS.md` + `.cursor/rules`
5. （可选）在 platform 内加 `apps/storybook` 或 `apps/shell-demo`，用 mock `NavNode[]` 验证壳层渲染
6. 发布或 `pnpm link`；源仓 **SSLTLDemo 暂不改动**，待你决定何时接入

### Phase 2（可选 · 需要独立 drayage App 时）

1. 新建 **portal-drayage-app**（或 platform 内 `apps/drayage`），link platform packages
2. 整目录 copy §2.2（204 文件）+ §2.3 辅助文件
3. 处理 §4.2、§4.3、§4.5
4. 从 `routes.tsx` 提取 §2.3 路由表，`npm run dev` 冒烟
5. 全局 replace 业务文件内 `client-*` class → `portal-*`
6. 删除冗余 `ClientDrayagePageShell.tsx`，改用 `@ss/portal-shell`

---

## 6. 复制命令参考（在源仓外执行，不修改源仓）

### Phase 1 — platform only

```bash
SRC="/Users/zhangwenyu/Documents/SSDemo/SSLTLDemo"
PLATFORM="/path/to/ss-portal-platform"

mkdir -p "$PLATFORM/packages/tokens"
cp "$SRC/src/styles/theme.css" "$PLATFORM/packages/tokens/theme.css"
cp "$SRC/src/styles/radix-themes-brand.css" "$PLATFORM/packages/tokens/"
cp "$SRC/src/styles/fonts.css" "$PLATFORM/packages/tokens/"
cp "$SRC/tailwind.config.js" "$PLATFORM/packages/tokens/tailwind.preset.js"

# shell 源文件需手动放入 packages/shell/src/ 并按 §1.3 rename
```

### Phase 2 — drayage App（可选）

```bash
SRC="/Users/zhangwenyu/Documents/SSDemo/SSLTLDemo"
APP="/path/to/portal-drayage-app"

cp -R "$SRC/src/app/components/clientPortal/clientDray/" "$APP/src/modules/drayage/"
# 其余见 §2.3
```

---

## 7. 统计摘要

| 类别 | Phase | 数量 |
|------|-------|------|
| Platform tokens 源文件 | 1 | 4 |
| Platform shell 源文件 | 1 | 6 |
| Platform 文档源文件 | 1 | 3–4 + 3 新建 |
| Phase 1 解耦点 | 1 | **2**（§4.1、§4.4） |
| Drayage 业务文件 | 2 | **204** |
| App 辅助 copy | 2 | ~10 |
| Drayage PRD | 2 | 8 |
| Phase 2 解耦点 | 2 | **3**（§4.2、§4.3、§4.5） |

---

*文档版本：2026-06-19（Phase 1 / Phase 2 分版）· 基于源仓 `SSLTLDemo` 静态盘点*
