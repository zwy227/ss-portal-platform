# 详情页框架

详情页骨架（**不含**业务表单内容）。交互画廊见 shell-demo `/blank/detail-page`。以表单分区为主的页级骨架见 [`form-page.md`](form-page.md)（`/blank/form-page`）。

带数据的**履约跟踪典型详情**（对齐 SS `TradeDetailThreeColumnBodyContent`：顶栏 + Top Tab + 货柜左导航 + 待办条 + 主栏仓库预约 + 右栏订单摘要）见 shell-demo `/orders/:id`（`DemoDetailPage`）。

共三种布局类型：

| 类型 | 结构 | 操作区 |
|------|------|--------|
| 单栏 | 顶栏 + 主内容白卡纵向堆叠 | 页级底栏 |
| 左右双栏 | 顶栏 + 主栏白卡堆叠 + 右栏 sticky | 页级底栏 |
| 三栏 | 顶栏 + Top Tab + 左导航 + 主栏白卡 + 右栏 | 主栏白卡底部 |

白卡纵向堆叠间距统一为 `gap-3`（12）。左右双栏主/右栏间距 `lg:gap-2`；三栏与右栏 `gap-2`，左导航与主栏 `lg:pl-2`。

勿让 document / body 参与滚动；滚动落在 `portal-page-main--detail` 内可滚动区。

## 1. 单栏 + 底部操作

```text
AppShell
└─ main.portal-page-main--detail
   ├─ 可滚动区
   │  └─ Header（返回 / 标题 / 状态）
   │     └─ 主内容白卡纵向堆叠（全宽）
   └─ 页级底栏操作（border-t + 右对齐按钮）
```

适用：内容以表单/说明分区纵向展开、无需侧栏辅助信息。

## 2. 左右双栏 + 底部操作

```text
AppShell
└─ main.portal-page-main--detail
   ├─ 可滚动区
   │  └─ Header
   │     └─ 内容区
   │        ├─ 主栏白卡堆叠（lg 为右栏预留宽度）
   │        └─ 右栏（lg sticky；窄屏下沉）
   └─ 页级底栏操作
```

| 断点 | 布局 |
|------|------|
| `< lg` | 主栏全宽；右栏下沉到主栏下方 |
| `lg+` | 主栏 + 右栏 420px |
| `≥1681` | 右栏 540px |

主栏 / 右栏白卡：圆角 + `box-shadow: var(--elevation-sm)`。

## 3. 三栏

```text
AppShell
└─ main.portal-page-main--detail
   └─ 可滚动区
      └─ .portal-page-content
         ├─ Header（返回 / 标题 / 状态）
         ├─ TopTabs（portal-tab-bar）
         └─ 内容栅格
            ├─ Session/Task 导航（180–212px，lg sticky，portal-card-bg-glass）
            ├─ 主栏白卡（elevation-sm；**卡底**操作区）
            └─ 右栏（≥1280：320 / ≥1440：360 / ≥1680：480）
```

| 断点 | 布局 |
|------|------|
| `< lg` | 左导航横滑或置顶，主栏全宽；右栏可下沉 |
| `lg` | `grid-cols-[minmax(180px,212px)_minmax(0,1fr)]` |
| `≥1280` | 再加右栏 320px |
| `≥1440` | 右栏 360px |
| `≥1680` | 右栏 480px |

左导航：`portal-card-bg-glass` + `elevation-sm` + `lg:sticky lg:top-6`。  
主操作：主栏白卡底部（顶部分割线 + 右对齐按钮），默认**不**使用页级 sticky 底栏。

### 三栏槽位

| 区块 | 职责 |
|------|------|
| Header | 返回、标题、状态 |
| TopTabs | 会话 / 任务 / 其他分区 |
| Session/Task 导航 | 类型一：无折叠 + SESSION 小标题进度；类型二：多对象折叠 + 下挂步骤 |
| 主栏 | 当前分区内容（白卡）+ 卡片底部操作 |
| 右栏 | 辅助信息，sticky 内滚 |

## 4. 履约只读信息字段网格（自适应）

用于详情主栏白卡内「预约状态 / 送货信息」等 label-上 value-下的只读字段（对齐 Drayage 仓库预约、承运商确认等）。壳层：`PortalDetailCard`（≈ `DrayDetailWhiteCard`）；底部操作：`PortalDetailCardFooter`。

常量：`portalDetailInfoFieldsClass`（`@ss/portal-ui`）。**父级区块必须加 `@container`**，列数按**容器宽度**切换，列宽按**视口**切换。

| 视口 | 列宽 | 列间距 | 2 列容器阈值 | 3 列容器阈值 | 4 列容器阈值 |
|------|------|--------|--------------|--------------|--------------|
| `<1440` | 200px | `gap-x-6`（24） | `@[424px]` | `@[648px]` | `@[872px]` |
| `≥1440` | 260px | `gap-x-0` + `justify-between` | `@[520px]` | `@[780px]` | `@[1040px]` |

- 通栏字段（备注、附件等）：子项加 `col-span-full`
- 分组小标题（送货信息 / 系统记录）：`portalDetailGroupHeadingClass`（`text-13 font-medium`）
- 可交互画廊：shell-demo `/blank/detail-info-card`（带数据原子）；去内容栅格预览见 `/blank/detail-page` →「6 · 自适应布局」

```tsx
<section className="@container" aria-label="预约状态概览">
  <dl className={portalDetailInfoFieldsClass}>
    <div className={portalDetailInfoFieldItemClass}>
      <dt className="m-0 text-13 leading-5 text-gray-text-5">预约状态</dt>
      <dd className="m-0 min-w-0 text-13 leading-5 text-gray-text-2">…</dd>
    </div>
    <div className={`${portalDetailInfoFieldItemClass} col-span-full`}>
      <dt>…</dt>
      <dd>…</dd>
    </div>
  </dl>
</section>
```

## 与列表页差异

| | 列表 | 详情 |
|--|------|------|
| main | `portal-page-main` | `portal-page-main--detail` |
| 滚动 | main 整体 scroll | 常分区 scroll（顶栏下独立滚动区；单栏/双栏底栏在滚动区外） |
| 导航 | 侧栏 AppShell | 三栏另有页内左分区导航 + Top Tab |
