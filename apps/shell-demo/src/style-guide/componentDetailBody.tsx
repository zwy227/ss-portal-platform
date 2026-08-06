import type { ReactNode } from "react";
import { ChevronDown, MoreVertical, Search } from "lucide-react";
import { Link } from "react-router";
import { PortalListFilterResetButton } from "@ss/portal-shell";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@ss/portal-ui";
import { BadgeStyleExamples } from "./BadgeStyleExamples";
import { ButtonDetailExamples } from "./ButtonDetailExamples";
import { componentDetailPath } from "./ComponentEntryCard";
import {
  DetailPageGridSpecExample,
  DetailPageSessionTaskNavExample,
  DetailPageSingleColumnExample,
  DetailPageThreeColumnExample,
  DetailPageTwoColumnExample,
} from "./DetailPageFrameworkExamples";
import {
  ListPageCardGridExample,
  ListPageSlotSpecExample,
  ListPageWithoutTabsExample,
  ListPageWithTabsExample,
} from "./ListPageFrameworkExamples";
import { UiAntFilterExamples } from "./UiAntFilterExamples";
import {
  FormCardSelectionExamples,
  FormCardSelectionReadonlyExamples,
  FormControlExamples,
  FormHintExamples,
  FormReadonlyExamples,
  FormSectionCompositionExample,
  FormUsageGuide,
} from "./FormStyleExamples";
import { UiTableExamples } from "./UiTableExamples";
import { FileUploadClickExample, FileUploadDropzoneExample } from "./FileUploadStyleExamples";
import {
  DocumentLinkBasicExample,
  DocumentSummaryCardExample,
} from "./DocumentLinkStyleExamples";
import {
  MessagesDualAudienceWithPanelExample,
  MessagesListActionExample,
  MessagesSidePanelTriggerExample,
  MessagesSingleSideScrollExample,
  MessagesSingleSideWithPanelExample,
} from "./MessagesStyleExamples";
import { PaginationStyleExamples } from "./PaginationStyleExamples";
import { TabOverflowStyleExamples, TabStyleExamples } from "./TabStyleExamples";

const DETAIL_SPEC_LINK_CLASS =
  "text-13 font-medium text-portal-text-link underline underline-offset-2";

function SpecLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link to={to} className={DETAIL_SPEC_LINK_CLASS}>
      {children}
    </Link>
  );
}

function DetailBlock({
  title,
  description,
  children,
  /** 内容区铺 page-bg，用于展示白卡叠在灰底上的真实效果 */
  surface = "default",
}: {
  title: string;
  description?: ReactNode;
  children: ReactNode;
  surface?: "default" | "page-bg";
}) {
  return (
    <section className="portal-list-card flex flex-col gap-4 border border-gray-border-normal">
      <header>
        <h2 className="text-16 font-semibold text-gray-text-2">{title}</h2>
        {description ? <div className="mt-1.5 text-13 text-gray-text-5">{description}</div> : null}
      </header>
      {surface === "page-bg" ? (
        <div className="-mx-4 -mb-4 rounded-b-card border-t border-gray-border-light bg-page-bg p-4">
          {children}
        </div>
      ) : (
        children
      )}
    </section>
  );
}

/** 各组件卡片对应的详情内容 */
export const COMPONENT_DETAIL_BODY: Record<string, ReactNode> = {
  badge: (
    <DetailBlock
      title="语义档位"
      description={
        <>
          Soft Badge 四档。有用户待办 → <code className="text-13">portal-badge--warning</code>；普通进行中
          → <code className="text-13">--info</code>。
        </>
      }
    >
      <BadgeStyleExamples />
    </DetailBlock>
  ),

  button: <ButtonDetailExamples />,

  filter: (
    <div className="flex flex-col gap-4">
      <DetailBlock
        title="列表筛选条"
        description={
          <>
            <code className="text-13">portal-filter-input</code> /{" "}
            <code className="text-13">portal-filter-select</code> +{" "}
            <code className="text-13">PortalListFilterResetButton</code>
          </>
        }
      >
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-[200px] flex-1">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 portal-filter-icon"
              strokeWidth={1.75}
              aria-hidden
            />
            <input type="search" className="portal-filter-input" placeholder="搜索订单号、询价单号…" />
          </div>
          <div className="relative min-w-[140px]">
            <select className="portal-filter-select portal-filter-select--plain" defaultValue="30">
              <option value="7">最近 7 天</option>
              <option value="30">最近 30 天</option>
            </select>
          </div>
          <PortalListFilterResetButton onReset={() => undefined} />
        </div>
      </DetailBlock>
      <DetailBlock
        title="其他筛选项"
        description={
          <>
            <code className="text-13">PortalAntSelect</code> /{" "}
            <code className="text-13">PortalAntDateRangePicker</code> /{" "}
            <code className="text-13">PortalAntCascader</code>
            ：日期起止、状态单选/多选、地区级联。
          </>
        }
      >
        <UiAntFilterExamples />
      </DetailBlock>
    </div>
  ),

  tab: (
    <div className="flex flex-col gap-4">
      <DetailBlock
        title="Tab 栏"
        description={
          <>
            对齐履约订单列表：待办（图标）+ 分隔线 + 状态 Tab + 右侧「状态说明」。
            <code className="text-13"> portal-tab-bar</code> /{" "}
            <code className="text-13">portal-tab-bar__divider</code> /{" "}
            <code className="text-13">portal-tab-item</code> /{" "}
            <code className="text-13">--active</code>。
          </>
        }
      >
        <TabStyleExamples />
      </DetailBlock>
      <DetailBlock
        title="宽度自适应"
        description={
          <>
            对齐报价记录列表：栏宽不足时按可用宽度将放不下的末尾项收入「更多」。参考{" "}
            <code className="text-13">QuoteOrderListTabBar</code>。
          </>
        }
      >
        <TabOverflowStyleExamples />
      </DetailBlock>
    </div>
  ),

  pagination: (
    <DetailBlock
      title="分页"
      description={
        <>
          <code className="text-13">portal-pagination</code> 变体{" "}
          <code className="text-13">--spacious</code> / <code className="text-13">--compact</code>
          。可切换页码与每页条数。
        </>
      }
    >
      <PaginationStyleExamples />
    </DetailBlock>
  ),

  dropdown: (
    <div className="flex flex-col gap-4">
      <DetailBlock
        title="portal-dropdown-*"
        description={
          <>
            取消类操作用 <code className="text-13">portal-dropdown-item--cancel</code>。
          </>
        }
      >
        <div className="portal-dropdown-menu portal-dropdown-menu--wide max-w-[180px]">
          <div className="portal-dropdown-item">编辑</div>
          <div className="portal-dropdown-item">复制链接</div>
          <div className="portal-dropdown-item portal-dropdown-item--cancel">取消询价</div>
        </div>
      </DetailBlock>
      <DetailBlock
        title="@ss/portal-ui DropdownMenu"
        description={
          <>
            文字触发用 outline Button；列表操作列用 <code className="text-13">MoreVertical</code>{" "}
            图标按钮（size-8、text-gray-text-4、hover:bg-gray-fill-normal）。
          </>
        }
      >
        <div className="flex flex-wrap items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-fit">
                操作
                <ChevronDown className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-[144px]">
              <DropdownMenuItem>编辑</DropdownMenuItem>
              <DropdownMenuItem>复制链接</DropdownMenuItem>
              <DropdownMenuItem variant="destructive">取消询价</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="inline-flex size-8 items-center justify-center rounded-md text-gray-text-4 transition hover:bg-gray-fill-normal"
                aria-label="更多操作"
              >
                <MoreVertical className="size-4" strokeWidth={1.75} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[144px]">
              <DropdownMenuItem>编辑</DropdownMenuItem>
              <DropdownMenuItem>复制链接</DropdownMenuItem>
              <DropdownMenuItem variant="destructive">取消询价</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </DetailBlock>
    </div>
  ),

  form: (
    <div className="flex flex-col gap-4">
      <DetailBlock
        title="1 · 使用说明"
        description="对齐 SSLTLDemo 询价详情「完善需求」表单（基本信息 / 路线 / 货物 / 附加服务备注）。"
      >
        <FormUsageGuide />
      </DetailBlock>
      <DetailBlock
        title="2 · 可编辑控件"
        description={
          <>
            <code className="text-13">portal-detail-form-*</code> +{" "}
            <code className="text-13">PortalFormSearchSelect</code>
            ；focus 为 normal ring（与字段壳一致）。
          </>
        }
      >
        <FormControlExamples />
      </DetailBlock>
      <DetailBlock
        title="2 · 卡片单选 / 多选 · 可编辑"
        description={
          <>
            <code className="text-13">PortalCheckboxCard</code> /{" "}
            <code className="text-13">PortalRadioCard</code> + 紧凑属性多选；卡片{" "}
            <code className="text-13">focus-within</code> 为 normal ring（与字段壳一致）。含附加服务、交货方式、履约结果横排单选（对齐
            TransportExecution ResultRadioField）。
          </>
        }
      >
        <FormCardSelectionExamples />
      </DetailBlock>
      <DetailBlock
        title="3 · 提示样式"
        description={
          <>
            <code className="text-13">PortalDetailFormHint</code>：置于表单项下方；普通 / 注意 / 错误
            三档（无底色；错误时输入框同步红色边框）。
          </>
        }
      >
        <FormHintExamples />
      </DetailBlock>
      <DetailBlock
        title="4 · 只读态"
        description={
          <>
            锁定 / 人工报价处理中：单行{" "}
            <code className="text-13">portal-detail-form-value</code>，多行{" "}
            <code className="text-13">portal-detail-form-readonly</code>。
          </>
        }
      >
        <FormReadonlyExamples />
      </DetailBlock>
      <DetailBlock
        title="4 · 卡片单选 / 多选 · 只读"
        description={
          <>
            选择卡 <code className="text-13">disabled</code>
            已包含勾选（示例仅保留码头预约卡片）；属性紧凑勾选只读；交货方式 / 货柜预提可用
            value 文案展示。组合区「其他」用{" "}
            <code className="text-13">PortalIncludedServiceItem</code>。
          </>
        }
      >
        <FormCardSelectionReadonlyExamples />
      </DetailBlock>
      <DetailBlock
        title="5 · 白卡 Section 组合"
        description={
          <>
            四种白卡模式：标准 Section、带小标题及分组、带底部操作、履约只读信息卡（仓库预约）。白卡叠在{" "}
            <code className="text-13">page-bg</code> 上以体现层级；各模式说明见下方标签。仓库预约含{" "}
            <code className="text-13">@container</code> 信息字段自适应规则。
          </>
        }
        surface="page-bg"
      >
        <FormSectionCompositionExample />
      </DetailBlock>
    </div>
  ),

  table: (
    <DetailBlock
      title="Table 原语"
      description="有待办 → warning Badge + 橙色待办链接；无待办 → info / success / neutral。"
    >
      <UiTableExamples />
    </DetailBlock>
  ),

  "document-link": (
    <div className="flex flex-col gap-4">
      <DetailBlock
        title="文档链接"
        description={
          <>
            <code className="text-13">portal-document-link</code>
            ：默认 <code className="text-13">text-13</code> +{" "}
            <code className="text-13">text-gray-text-2</code>、截断；hover / focus-visible
            下划线 + <code className="text-13">--portal-text-link</code>。点击 toast
            演示「打开文件」（非真实下载）。
            <code className="text-13"> portal-document-action-link</code> 用于下载等操作。
          </>
        }
      >
        <DocumentLinkBasicExample />
      </DetailBlock>

      <DetailBlock
        title="文件单证摘要卡"
        description={
          <>
            对齐履约详情右侧{" "}
            <code className="text-13">FulfillmentDocumentSummaryCard</code>
            ：白卡 + 标题「文件单证」+ 文件名列表（
            <code className="text-13">portal-document-link</code>
            ）。
          </>
        }
      >
        <div className="flex flex-wrap items-start gap-4">
          <DocumentSummaryCardExample />
          <DocumentSummaryCardExample empty />
        </div>
      </DetailBlock>
    </div>
  ),

  "file-upload": (
    <div className="flex flex-col gap-4">
      <DetailBlock
        title="样式一 · 拖拽及批量上传"
        description={
          <>
            对齐履约单证上传字段{" "}
            <code className="text-13">ContainerVesselDocumentsUploadField</code>
            ：虚线拖拽区、多文件选择、已传列表与移除。拖入时边框/底色用 brand token。
          </>
        }
      >
        <FileUploadDropzoneExample />
      </DetailBlock>
      <DetailBlock
        title="样式二 · 点击上传"
        description={
          <>
            对齐运输执行附件字段{" "}
            <code className="text-13">MultiAttachmentUploadField</code>
            ：空态「暂无」、文件行（下载/移除）、回形针「上传文件」按钮 + hint。
          </>
        }
      >
        <FileUploadClickExample />
      </DetailBlock>
    </div>
  ),

  messages: (
    <div className="flex flex-col gap-4">
      <DetailBlock
        title="1 · 列表操作列"
        description={
          <>
            对齐履约列表操作列留言入口（
            <code className="text-13">OrderRowActions</code>
            ）：PortalTable 表头/单元格 + 粘性操作列内 MessageSquare 与「更多」。
          </>
        }
      >
        <MessagesListActionExample />
      </DetailBlock>
      <DetailBlock
        title="2 · 单侧留言"
        description="留言组件通常在页面底部呈现。留言分割线用于区分上方表单内容与下方留言模块。"
      >
        <MessagesSingleSideWithPanelExample />
      </DetailBlock>
      <DetailBlock
        title="2 · 单侧留言 · 列表滚动"
        description="留言过多时，留言信息区（列表）限制高度并在内部滚动，发送区固定在下方。"
      >
        <MessagesSingleSideScrollExample />
      </DetailBlock>
      <DetailBlock
        title="2 · 双端留言"
        description="用于 SS 内部需要同时与客户/承运商联系时，可用该留言样式。承运商留言板块采用橙色区分，避免误发送信息。"
      >
        <MessagesDualAudienceWithPanelExample />
      </DetailBlock>
      <DetailBlock
        title="3 · 留言侧边栏"
        description={
          <>
            对齐 <code className="text-13">PortalOrderMessagesSidePanel</code>
            ：按环节分组、绝对时间、只读列表。可从留言「查看全部」打开，或下方按钮单独打开。
          </>
        }
      >
        <MessagesSidePanelTriggerExample />
      </DetailBlock>
    </div>
  ),

  "list-page": (
    <div className="flex flex-col gap-4">
      <DetailBlock
        title="1 · 标准（带 Tab）"
        description={
          <>
            标题（模块前缀 + 页面名）+{" "}
            <SpecLink to={componentDetailPath("tab")}>
              <code className="text-13">portal-tab-bar</code>
            </SpecLink>{" "}
            + <code className="text-13">portal-list-card</code>（
            <SpecLink to={componentDetailPath("filter")}>筛选</SpecLink>
            {" / "}
            <SpecLink to={componentDetailPath("table")}>表格</SpecLink>
            {" / "}
            <SpecLink to={componentDetailPath("pagination")}>分页</SpecLink>
            ）。
          </>
        }
      >
        <ListPageWithTabsExample />
      </DetailBlock>
      <DetailBlock
        title="2 · 无 Tab"
        description="标题下直接接白卡；Tab 为可选槽位。"
      >
        <ListPageWithoutTabsExample />
      </DetailBlock>
      <DetailBlock
        title="3 · 卡片列表"
        description="白卡内容区用卡片网格替代表格，槽位不变。"
      >
        <ListPageCardGridExample />
      </DetailBlock>
      <DetailBlock
        title="4 · DOM 槽位"
        description={
          <>
            对齐 <code className="text-13">docs/frameworks/list-page.md</code>
            ；完整带数据示例见{" "}
            <SpecLink to="/orders">
              <code className="text-13">/orders</code>
            </SpecLink>
            。
          </>
        }
      >
        <ListPageSlotSpecExample />
      </DetailBlock>
    </div>
  ),

  "detail-page": (
    <div className="flex flex-col gap-4">
      <DetailBlock
        title="1 · 单栏类型 + 底部操作"
        description={
          <>
            顶栏（返回 / 标题 /{" "}
            <SpecLink to={componentDetailPath("badge")}>
              <code className="text-13">portal-badge</code>
            </SpecLink>
            ）+ 主内容{" "}
            <SpecLink to={componentDetailPath("form")}>白卡 Section</SpecLink>
            {" "}纵向堆叠（全宽）+ 页级底栏{" "}
            <SpecLink to={componentDetailPath("button")}>操作按钮</SpecLink>
            。无左导航、无右栏。
          </>
        }
      >
        <DetailPageSingleColumnExample />
      </DetailBlock>
      <DetailBlock
        title="2 · 左右双栏类型 + 底部操作"
        description={
          <>
            顶栏 + 主栏{" "}
            <SpecLink to={componentDetailPath("form")}>白卡</SpecLink>
            {" "}堆叠 + lg 右栏 sticky（预览缩放；定稿 420 / ≥1681 为 540）+ 页级底栏{" "}
            <SpecLink to={componentDetailPath("button")}>操作</SpecLink>
            。窄屏右栏下沉。
          </>
        }
      >
        <DetailPageTwoColumnExample />
      </DetailBlock>
      <DetailBlock
        title="3 · 三栏类型"
        description={
          <>
            顶栏 +{" "}
            <SpecLink to={componentDetailPath("tab")}>
              <code className="text-13">portal-tab-bar</code>
            </SpecLink>
            {" "}Top Tab + 左导航（180–212）+ 主栏{" "}
            <SpecLink to={componentDetailPath("form")}>白卡</SpecLink>
            （
            <SpecLink to={componentDetailPath("button")}>卡底操作</SpecLink>
            ）+ ≥1280 右栏。可切换会话 / 任务 Tab 查看两种分区导航。
          </>
        }
      >
        <DetailPageThreeColumnExample />
      </DetailBlock>
      <DetailBlock
        title="4 · 栅格与槽位"
        description={
          <>
            三种布局的宽度、
            <SpecLink to={componentDetailPath("form")}>白卡</SpecLink>
            {" "}间距（gap-3）与{" "}
            <SpecLink to={componentDetailPath("button")}>操作区</SpecLink>
            {" "}位置对照。
          </>
        }
      >
        <DetailPageGridSpecExample />
      </DetailBlock>
      <DetailBlock
        title="5 · Session/Task 导航"
        description="三栏左导航：类型一扁平小标题；类型二多对象折叠。"
      >
        <DetailPageSessionTaskNavExample />
      </DetailBlock>
    </div>
  ),
};
