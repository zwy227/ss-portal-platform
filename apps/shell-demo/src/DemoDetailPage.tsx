import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { Navigate, useParams } from "react-router";
import {
  Check,
  ChevronDown,
  ChevronRight,
  CircleAlert,
  Container,
  Copy,
  Info,
  Loader2,
  Paperclip,
  Pencil,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { formatPortalBackLabel, PortalDetailBackLink } from "@ss/portal-shell";
import {
  Button,
  cn,
  PortalDetailCard,
  PortalDetailCardFooter,
  PortalDetailFormLabel,
  PortalRadioCard,
  PortalSelectionFieldset,
  PortalTodoMessage,
  portalDetailFormTextareaClass,
  portalDetailGroupHeadingClass,
  portalDetailInfoFieldItemClass,
  portalDetailInfoFieldsClass,
  portalDetailSectionTitleClass,
} from "@ss/portal-ui";
import { getDemoOrder, type DemoOrder } from "./demo-orders";
import { DEMO_LIST_NAV_ID, DEMO_NAV } from "./demoNav";
import { DocumentSummaryCardExample } from "./style-guide/DocumentLinkStyleExamples";
import { MessagesSingleSideWithPanelExample } from "./style-guide/MessagesStyleExamples";
import { StyleGuideShell } from "./style-guide/StyleGuideShell";

/**
 * 典型详情页 — 对齐 SS 履约跟踪（TradeDetailThreeColumnBodyContent）呈现。
 * 从列表点击订单号 /「查看详情」进入。
 */

const DETAIL_TABS = [
  { id: "order", label: "订单" },
  { id: "fulfillment", label: "履约" },
  { id: "workorder", label: "工单" },
  { id: "bill", label: "账单" },
  { id: "audit", label: "审计" },
] as const;

type DetailTabId = (typeof DETAIL_TABS)[number]["id"];

const FULFILLMENT_STEPS = [
  { id: "WarehouseAppointment", label: "仓库预约" },
  { id: "TerminalPickup", label: "承运商确认" },
  { id: "ContainerPickup", label: "提柜" },
  { id: "Delivery", label: "派送" },
  { id: "ContainerReturn", label: "还柜" },
  { id: "FulfillmentCompletionConfirm", label: "履约结项" },
] as const;

type FulfillmentStepId = (typeof FULFILLMENT_STEPS)[number]["id"];

const WHITE_CARD_STYLE = { boxShadow: "var(--elevation-sm)" } as const;
const NAV_FOCUS =
  "focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--brand)_35%,transparent)]";
const SECTION_NAV_SHELL =
  "portal-card-bg-glass order-1 flex min-w-0 flex-col gap-1 rounded-lg px-1.5 py-4 lg:sticky lg:top-6 lg:self-start";
const SECTION_NAV_ITEM =
  "flex w-full min-w-[140px] items-start gap-2.5 rounded-md border border-solid py-2 pl-2 pr-2 text-left outline-none transition-colors lg:min-w-0";
const SECTION_NAV_ITEM_ACTIVE = "border-gray-border-light bg-background";
const SECTION_NAV_ITEM_IDLE = "border-transparent hover:bg-gray-fill-light/60";

/** 与 SS TradeDetail 标题旁状态徽章一致（token 化） */
const DETAIL_HEADER_STATUS_BADGE_CLASS =
  "portal-badge box-border rounded-sm border border-solid border-[0.5px] text-14 font-bold " +
  "portal-badge--info border-semantic-info-text bg-semantic-info-light";

const FULFILLMENT_TWO_COL =
  "min-[1280px]:grid min-[1280px]:min-h-0 min-[1280px]:min-w-0 min-[1280px]:grid-cols-[minmax(0,1fr)_320px] min-[1440px]:grid-cols-[minmax(0,1fr)_360px] min-[1680px]:grid-cols-[minmax(0,1fr)_480px] min-[1280px]:items-stretch min-[1280px]:gap-2";

function resolveDemoContainerNo(order: DemoOrder): string {
  return order.containerNo;
}

function resolveHeaderStatusLabel(order: DemoOrder): string {
  if (order.statusLabel === "已取消") return "已取消";
  if (order.statusLabel === "已完成") return "已完成";
  return "执行中";
}

function SectionNavStepIcon({
  done,
  alert,
  loading,
}: {
  done?: boolean;
  alert?: boolean;
  loading?: boolean;
}) {
  if (alert) {
    return (
      <span
        className="mt-0.5 inline-flex size-4 shrink-0 items-center justify-center rounded-full ring-1 ring-semantic-warning-default"
        aria-hidden
      >
        <CircleAlert
          className="size-4 fill-semantic-warning-default text-white"
          strokeWidth={2}
        />
      </span>
    );
  }
  if (loading) {
    return (
      <span
        className="mt-0.5 inline-flex size-4 shrink-0 items-center justify-center"
        aria-hidden
      >
        <Loader2 className="size-4 animate-spin text-brand" strokeWidth={2.25} />
      </span>
    );
  }
  if (done) {
    return (
      <span
        className="mt-0.5 inline-flex size-4 shrink-0 items-center justify-center rounded-full bg-semantic-success-default"
        aria-hidden
      >
        <Check className="size-2.5 text-white" strokeWidth={3} />
      </span>
    );
  }
  return (
    <span
      className="mt-0.5 size-4 shrink-0 rounded-full border-2 border-gray-text-7 bg-background"
      aria-hidden
    />
  );
}

function DemoDetailHeader({
  order,
  backLabel,
}: {
  order: DemoOrder;
  backLabel: string;
}) {
  return (
    <header className="mb-1">
      <div className="flex min-w-0 flex-wrap items-center gap-3">
        <PortalDetailBackLink to="/orders" label={backLabel} />
        <h1 className="portal-page-detail-title text-gray-text-1">
          拖柜运输：{order.orderNo}
        </h1>
        <span className={DETAIL_HEADER_STATUS_BADGE_CLASS}>
          当前状态：{resolveHeaderStatusLabel(order)}
        </span>
      </div>
    </header>
  );
}

function DemoDetailTopTabs({
  activeTab,
  onChange,
}: {
  activeTab: DetailTabId;
  onChange: (id: DetailTabId) => void;
}) {
  return (
    <div className="portal-tab-bar" role="tablist" aria-label="详情顶部分区">
      {DETAIL_TABS.map((tab) => {
        const active = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(tab.id)}
            className={cn("portal-tab-item", active && "portal-tab-item--active")}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

function FulfillmentContainerNav({
  containerNos,
  activeContainerNo,
  activeSection,
  completedSteps,
  loadingSteps,
  onContainerChange,
  onSectionChange,
}: {
  containerNos: readonly string[];
  activeContainerNo: string;
  activeSection: FulfillmentStepId;
  completedSteps: ReadonlySet<string>;
  loadingSteps: ReadonlySet<string>;
  onContainerChange: (containerNo: string) => void;
  onSectionChange: (sectionId: FulfillmentStepId) => void;
}) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(containerNos.map((c) => [c, true])),
  );

  return (
    <nav className={SECTION_NAV_SHELL} style={WHITE_CARD_STYLE} aria-label="履约货柜分区导航">
      <ul className="m-0 flex list-none flex-col gap-1 p-0">
        {containerNos.map((containerNo, index) => {
          const isExpanded = expanded[containerNo] ?? false;
          const isActiveContainer = containerNo === activeContainerNo;
          const ChevronIcon = isExpanded ? ChevronDown : ChevronRight;

          return (
            <li
              key={containerNo}
              className={cn(
                "min-w-0",
                index > 0 && "mt-3 border-t border-solid border-gray-border-normal pt-4",
              )}
            >
              <div className="flex min-w-0 flex-col gap-1.5">
                <button
                  type="button"
                  aria-expanded={isExpanded}
                  onClick={() =>
                    setExpanded((prev) => ({ ...prev, [containerNo]: !prev[containerNo] }))
                  }
                  className={cn(
                    "flex w-full min-w-0 items-center gap-1.5 rounded-md py-1 pl-1.5 pr-2 text-left outline-none transition-colors",
                    "hover:bg-gray-fill-light/60",
                    NAV_FOCUS,
                  )}
                >
                  <ChevronIcon className="size-3.5 shrink-0 text-gray-text-5" strokeWidth={2} aria-hidden />
                  <Container className="size-3.5 shrink-0 text-gray-text-4" strokeWidth={1.75} aria-hidden />
                  <span
                    className="min-w-0 flex-1 truncate text-14 font-semibold leading-snug text-gray-text-1"
                    title={containerNo}
                  >
                    {containerNo}
                  </span>
                </button>

                {isExpanded ? (
                  <ol className="m-0 flex list-none flex-col gap-1 p-0">
                    {FULFILLMENT_STEPS.map((section) => {
                      const stepKey = `${containerNo}:${section.id}`;
                      const current = isActiveContainer && section.id === activeSection;
                      const done = completedSteps.has(stepKey);
                      const loading = loadingSteps.has(stepKey);
                      const alert = section.id === "TerminalPickup" && !done && !loading;
                      return (
                        <li key={`${containerNo}-${section.id}`} className="min-w-0">
                          <button
                            type="button"
                            aria-current={current ? "true" : undefined}
                            onClick={() => {
                              onContainerChange(containerNo);
                              onSectionChange(section.id);
                              setExpanded((prev) =>
                                prev[containerNo] ? prev : { ...prev, [containerNo]: true },
                              );
                            }}
                            className={cn(
                              SECTION_NAV_ITEM,
                              NAV_FOCUS,
                              current ? SECTION_NAV_ITEM_ACTIVE : SECTION_NAV_ITEM_IDLE,
                            )}
                            style={current ? WHITE_CARD_STYLE : undefined}
                          >
                            <SectionNavStepIcon done={done} alert={alert} loading={loading} />
                            <span
                              className={cn(
                                "min-w-0 flex-1 text-14 leading-snug",
                                current
                                  ? "font-semibold text-gray-text-1"
                                  : "font-medium text-gray-text-5",
                              )}
                            >
                              {section.label}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ol>
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function DemoInfoFields({
  fields,
}: {
  fields: readonly { label: string; value: ReactNode; span?: boolean }[];
}) {
  return (
    <dl className={portalDetailInfoFieldsClass}>
      {fields.map((field) => (
        <div
          key={field.label}
          className={cn(portalDetailInfoFieldItemClass, field.span && "col-span-full")}
        >
          <dt className="m-0 text-13 leading-5 text-gray-text-5">{field.label}</dt>
          <dd className="m-0 min-w-0 text-13 leading-5 text-gray-text-2">{field.value}</dd>
        </div>
      ))}
    </dl>
  );
}

const CARRIER_CONFIRM_CODE = "CAR-US-PORT-01";
const CARRIER_CONFIRM_ETA_ISO = "2026-08-07";
const CARRIER_CONFIRM_UPLOAD_HINT =
  "支持 PDF、图片、Excel 等常见格式，单个文件不超过 20MB。";
const CARRIER_CONFIRM_UPLOAD_BTN_CLASS = [
  "inline-flex h-9 shrink-0 items-center gap-1.5 rounded-md",
  "border border-solid border-gray-border-strong bg-background px-3",
  "text-13 font-medium text-gray-text-4 transition",
  "hover:border-gray-border-emphasis hover:bg-gray-fill-light",
  "focus-visible:outline-none focus-visible:shadow-focus-normal",
].join(" ");

type CarrierConfirmFeedback = "confirmed" | "rejected";

type CarrierConfirmAttachment = {
  id: string;
  name: string;
  sizeBytes: number;
};

type CarrierConfirmDraft = {
  status: CarrierConfirmFeedback;
  remarks: string;
  attachments: CarrierConfirmAttachment[];
};

const CARRIER_CONFIRM_FEEDBACK_OPTIONS: ReadonlyArray<{
  value: CarrierConfirmFeedback;
  label: string;
}> = [
  { value: "confirmed", label: "接受" },
  { value: "rejected", label: "拒绝" },
];

const CARRIER_CONFIRM_REJECTED_SEED: CarrierConfirmDraft = {
  status: "rejected",
  remarks: "当前运力不足，无法承接该柜提柜任务",
  attachments: [],
};

const CARRIER_CONFIRM_SYSTEM_RECORDS = [
  { text: "系统已向承运商下发Job Order", time: "07-28 08:20" },
  { text: "承运商已拒绝接单", time: "07-28 11:05" },
  { text: "系统已同步承运商拒绝结果", time: "07-28 11:06" },
] as const;

function formatCarrierAttachmentSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** 对齐 SS CarrierConfirmSection：只读拒绝态 / 手动录入编辑态 */
function CarrierConfirmMainCard({
  containerNo,
  editNonce = 0,
  done,
  loading,
  onComplete,
}: {
  containerNo: string;
  /** 「去处理」每次点击递增，进入手动录入态 */
  editNonce?: number;
  done: boolean;
  loading: boolean;
  onComplete: () => void;
}) {
  const fieldIdPrefix = useId();
  const attachmentInputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [confirmationInfo, setConfirmationInfo] =
    useState<CarrierConfirmDraft>(CARRIER_CONFIRM_REJECTED_SEED);
  const [draft, setDraft] = useState<CarrierConfirmDraft>(CARRIER_CONFIRM_REJECTED_SEED);
  const [systemRecords, setSystemRecords] =
    useState<ReadonlyArray<{ text: string; time: string }>>(CARRIER_CONFIRM_SYSTEM_RECORDS);

  useEffect(() => {
    if (editNonce <= 0) return;
    setDraft(confirmationInfo);
    setIsEditing(true);
    // 仅响应 editNonce；draft 取触发时的 confirmationInfo
    // eslint-disable-next-line react-hooks/exhaustive-deps -- confirmationInfo 故意不入依赖
  }, [editNonce]);

  const feedbackResult = draft.status;
  const remarksFieldLabel = feedbackResult === "rejected" ? "拒绝原因" : "备注说明";
  const remarksPlaceholder =
    feedbackResult === "rejected"
      ? "请填写承运商拒绝接单的原因"
      : "请补充确认来源、沟通记录或其他必要说明";
  const canSave =
    draft.attachments.length > 0 &&
    (feedbackResult !== "rejected" || draft.remarks.trim().length > 0);

  const statusFields = [
    {
      label: "确认状态",
      value: (
        <span
          className={
            confirmationInfo.status === "confirmed"
              ? "portal-badge portal-badge--success"
              : "portal-badge portal-badge--warning"
          }
        >
          {confirmationInfo.status === "confirmed" ? "已确认" : "已拒绝"}
        </span>
      ),
    },
    {
      label: "进展说明",
      value:
        confirmationInfo.status === "rejected" ? (
          <span className="text-accent-orange">承运商已拒绝接单</span>
        ) : (
          "承运商已确认接单"
        ),
    },
    {
      label: "承运商代码",
      value: <span className="font-mono">{CARRIER_CONFIRM_CODE}</span>,
    },
    ...(confirmationInfo.remarks.trim()
      ? [
          {
            label: confirmationInfo.status === "rejected" ? "拒绝原因" : "备注说明",
            value: confirmationInfo.remarks.trim(),
            span: true as const,
          },
        ]
      : []),
  ];

  const handleStartEdit = () => {
    setDraft(confirmationInfo);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setDraft(confirmationInfo);
    setIsEditing(false);
  };

  const handleSaveEdit = () => {
    if (!canSave) return;
    setConfirmationInfo(draft);
    const now = new Date();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    const hh = String(now.getHours()).padStart(2, "0");
    const mi = String(now.getMinutes()).padStart(2, "0");
    setSystemRecords((prev) => [
      ...prev,
      {
        text:
          draft.status === "confirmed"
            ? `演示账号手动录入承运商确认结果：接受（${CARRIER_CONFIRM_CODE}）`
            : `演示账号手动录入承运商确认结果：拒绝（${CARRIER_CONFIRM_CODE}）`,
        time: `${mm}-${dd} ${hh}:${mi}`,
      },
    ]);
    setIsEditing(false);
    if (draft.status === "confirmed" && !done && !loading) {
      onComplete();
    }
    toast.success("已保存修改");
  };

  const handleAttachmentUpload = (files: FileList | null) => {
    if (!files?.length) return;
    const next = Array.from(files).map((file) => ({
      id: `${file.name}-${file.size}-${file.lastModified}-${crypto.randomUUID()}`,
      name: file.name,
      sizeBytes: file.size,
    }));
    setDraft((prev) => ({ ...prev, attachments: [...prev.attachments, ...next] }));
  };

  return (
    <PortalDetailCard className="px-5 py-4 sm:px-5 sm:py-4">
      <section aria-label="承运商确认">
        <div className="flex w-full min-w-0 flex-col items-start gap-0.5">
          <h3 className={portalDetailSectionTitleClass}>承运商确认</h3>
          <p className="inline-flex items-center gap-1.5 text-12 text-gray-text-4">
            <span>集装箱：{containerNo}</span>
            <button
              type="button"
              className="inline-flex shrink-0 rounded-md p-0.5 text-gray-text-5 transition hover:bg-gray-fill-light hover:text-gray-text-2"
              aria-label="复制集装箱号"
              title="复制"
              onClick={() => {
                void navigator.clipboard.writeText(containerNo).then(() => toast.success("已复制"));
              }}
            >
              <Copy className="size-3" strokeWidth={1.75} aria-hidden />
            </button>
          </p>
        </div>

        <div className="mt-4 flex flex-col">
          <section className="@container" aria-label="确认状态概览">
            <div
              role="status"
              className="mb-4 flex items-start gap-1.5 rounded-md bg-gray-fill-light px-3 py-2.5 text-13 leading-5"
            >
              <Info
                className="mt-0.5 size-4 shrink-0 text-gray-text-5"
                strokeWidth={2}
                aria-hidden
              />
              <p className="m-0 min-w-0">
                <span className="text-gray-text-5">距预计到港时间(ETA)</span>{" "}
                <span className="font-semibold tabular-nums text-gray-text-1">
                  {CARRIER_CONFIRM_ETA_ISO}
                </span>{" "}
                <span className="text-gray-text-5">还有</span>{" "}
                <span className="font-semibold tabular-nums text-gray-text-1">1</span>{" "}
                <span className="text-gray-text-5">天</span>
              </p>
            </div>

            {isEditing ? (
              <div className="flex flex-col gap-6">
                <div className="min-w-0">
                  <PortalDetailFormLabel id={`${fieldIdPrefix}-carrier-code`}>
                    承运商代码
                  </PortalDetailFormLabel>
                  <p
                    className="m-0 font-mono text-13 leading-5 text-gray-text-2"
                    aria-labelledby={`${fieldIdPrefix}-carrier-code`}
                  >
                    {CARRIER_CONFIRM_CODE}
                  </p>
                </div>

                <PortalSelectionFieldset legend="承运商反馈结果">
                  <div
                    role="radiogroup"
                    aria-label="承运商反馈结果"
                    className="flex flex-col gap-2 sm:flex-row sm:gap-3"
                  >
                    {CARRIER_CONFIRM_FEEDBACK_OPTIONS.map((option) => (
                      <PortalRadioCard
                        key={option.value}
                        name={`${fieldIdPrefix}-feedback`}
                        value={option.value}
                        title={option.label}
                        checked={feedbackResult === option.value}
                        onChange={() =>
                          setDraft((prev) => ({ ...prev, status: option.value }))
                        }
                        className="min-w-0 flex-1 py-2"
                      />
                    ))}
                  </div>
                </PortalSelectionFieldset>

                <div className="min-w-0">
                  <PortalDetailFormLabel id={`${fieldIdPrefix}-credential`} required>
                    凭证说明
                  </PortalDetailFormLabel>
                  <div className="flex flex-wrap items-center gap-3">
                    <input
                      ref={attachmentInputRef}
                      type="file"
                      className="sr-only"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx"
                      aria-labelledby={`${fieldIdPrefix}-credential`}
                      aria-required
                      onChange={(event) => {
                        handleAttachmentUpload(event.target.files);
                        event.target.value = "";
                      }}
                    />
                    <button
                      type="button"
                      className={CARRIER_CONFIRM_UPLOAD_BTN_CLASS}
                      onClick={() => attachmentInputRef.current?.click()}
                    >
                      <Paperclip className="size-3.5" strokeWidth={1.75} aria-hidden />
                      上传附件
                    </button>
                    <p className="m-0 min-w-0 portal-detail-form-hint">
                      {CARRIER_CONFIRM_UPLOAD_HINT}
                    </p>
                  </div>
                  {draft.attachments.length > 0 ? (
                    <ul className="mt-2 space-y-1.5" aria-label="凭证说明附件">
                      {draft.attachments.map((attachment) => (
                        <li key={attachment.id}>
                          <div className="flex min-w-0 items-center gap-2 rounded-md border border-dashed border-gray-border-normal px-3 py-2">
                            <div className="min-w-0 flex-1">
                              <p className="m-0 truncate text-13 font-medium text-gray-text-2">
                                {attachment.name}
                              </p>
                              <p className="m-0 text-12 text-gray-text-5">
                                {formatCarrierAttachmentSize(attachment.sizeBytes)}
                              </p>
                            </div>
                            <button
                              type="button"
                              className="inline-flex shrink-0 rounded-md p-1 text-gray-text-5 transition hover:bg-gray-fill-light hover:text-gray-text-2"
                              aria-label={`移除附件 ${attachment.name}`}
                              onClick={() =>
                                setDraft((prev) => ({
                                  ...prev,
                                  attachments: prev.attachments.filter(
                                    (item) => item.id !== attachment.id,
                                  ),
                                }))
                              }
                            >
                              <X className="size-3.5" strokeWidth={2} aria-hidden />
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>

                <div className="min-w-0">
                  <PortalDetailFormLabel
                    id={`${fieldIdPrefix}-remarks`}
                    required={feedbackResult === "rejected"}
                  >
                    {remarksFieldLabel}
                  </PortalDetailFormLabel>
                  <textarea
                    id={`${fieldIdPrefix}-remarks-input`}
                    value={draft.remarks}
                    onChange={(event) =>
                      setDraft((prev) => ({ ...prev, remarks: event.target.value }))
                    }
                    className={portalDetailFormTextareaClass}
                    placeholder={remarksPlaceholder}
                    rows={3}
                    aria-labelledby={`${fieldIdPrefix}-remarks`}
                    aria-required={feedbackResult === "rejected"}
                  />
                </div>
              </div>
            ) : (
              <DemoInfoFields fields={statusFields} />
            )}
          </section>

          {!isEditing ? (
            <>
              <div className="my-5 h-px w-full bg-gray-border-normal" role="separator" aria-hidden />
              <section className="@container" aria-labelledby={`${fieldIdPrefix}-records-heading`}>
                <div className="mb-2">
                  <h3
                    id={`${fieldIdPrefix}-records-heading`}
                    className={portalDetailGroupHeadingClass}
                  >
                    系统记录
                  </h3>
                </div>
                <ol className="relative m-0 list-none space-y-3 p-0">
                  {systemRecords.map((record, index) => (
                    <li key={`${record.text}-${record.time}-${index}`} className="relative pl-4">
                      {index < systemRecords.length - 1 ? (
                        <span
                          className="absolute left-[3px] top-[10px] z-0 h-[calc(100%+12px)] w-px -translate-x-1/2 bg-gray-border-normal"
                          aria-hidden
                        />
                      ) : null}
                      <span
                        className="absolute left-[3px] top-1.5 z-[1] size-1.5 -translate-x-1/2 rounded-full bg-gray-text-1"
                        aria-hidden
                      />
                      <div className="flex min-w-0 items-start justify-between gap-3">
                        <p className="m-0 min-w-0 break-words text-13 leading-5 text-gray-text-2">
                          {record.text}
                        </p>
                        <time className="shrink-0 tabular-nums text-12 leading-5 text-gray-text-5">
                          {record.time}
                        </time>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            </>
          ) : null}
        </div>

        <PortalDetailCardFooter>
          {isEditing ? (
            <>
              <Button type="button" variant="outline" onClick={handleCancelEdit}>
                取消
              </Button>
              <Button type="button" disabled={!canSave} onClick={handleSaveEdit}>
                保存修改
              </Button>
            </>
          ) : (
            <>
              <Button
                type="button"
                variant="outline"
                disabled={loading}
                onClick={() => toast.info("变更承运商（示例，无弹窗）")}
              >
                变更承运商
              </Button>
              <Button type="button" variant="outline" disabled={loading} onClick={handleStartEdit}>
                <Pencil className="size-3.5 shrink-0" strokeWidth={2} aria-hidden />
                手动录入
              </Button>
            </>
          )}
        </PortalDetailCardFooter>
      </section>
    </PortalDetailCard>
  );
}

/** 对齐 SS TRD-2025-000072 / TCLU100004 仓库预约演示态 */
function WarehouseAppointmentMainCard({
  order,
  containerNo,
  done,
  loading,
  onComplete,
}: {
  order: DemoOrder;
  containerNo: string;
  done: boolean;
  loading: boolean;
  onComplete: () => void;
}) {
  const appointmentFields = [
    {
      label: "预约状态",
      value: <span className="portal-badge portal-badge--warning">未预约</span>,
    },
    {
      label: "进展说明",
      value: <span className="text-accent-orange">ETA不足3天，仓库未确认</span>,
    },
    {
      label: "预约时间",
      value: <span className="font-semibold tabular-nums text-gray-text-2">—</span>,
    },
  ] as const;

  const deliveryFields = [
    {
      label: "仓库代码",
      value: (
        <span className="inline-flex min-w-0 max-w-full items-center gap-1.5">
          <span className="min-w-0 truncate">{order.routeDelivery}</span>
          <span className="shrink-0 text-gray-text-4">（普通仓库）</span>
        </span>
      ),
    },
    {
      label: "地址",
      value: order.routeDeliverySecondary.replace(/^Warehouse ·\s*/, ""),
    },
    { label: "交货方式", value: "现场等卸" },
    { label: "仓库邮箱", value: "—" },
    { label: "联系人", value: "—" },
    { label: "电话号码", value: "—" },
    { label: "备注", value: "—", span: true },
  ] as const;

  const systemRecords = [
    { text: "系统已发送预约请求至仓库邮箱", time: "07-28 08:30" },
  ] as const;

  return (
    <PortalDetailCard className="px-5 py-4 sm:px-5 sm:py-4">
      <section aria-label="仓库预约">
        <div className="flex w-full min-w-0 flex-col items-start gap-0.5">
          <h3 className={portalDetailSectionTitleClass}>仓库预约</h3>
          <p className="inline-flex items-center gap-1.5 text-12 text-gray-text-4">
            <span>集装箱：{containerNo}</span>
            <button
              type="button"
              className="inline-flex shrink-0 rounded-md p-0.5 text-gray-text-5 transition hover:bg-gray-fill-light hover:text-gray-text-2"
              aria-label="复制集装箱号"
              title="复制"
              onClick={() => {
                void navigator.clipboard.writeText(containerNo).then(() => toast.success("已复制"));
              }}
            >
              <Copy className="size-3" strokeWidth={1.75} aria-hidden />
            </button>
          </p>
        </div>

        <div className="mt-4 flex flex-col">
          <section className="@container" aria-label="预约状态概览">
            <div
              role="status"
              className="mb-4 flex items-start gap-1.5 rounded-md bg-gray-fill-light px-3 py-2.5 text-13 leading-5"
            >
              <Info
                className="mt-0.5 size-4 shrink-0 text-gray-text-5"
                strokeWidth={2}
                aria-hidden
              />
              <p className="m-0 min-w-0">
                <span className="text-gray-text-5">距预计到港时间(ETA)</span>{" "}
                <span className="font-semibold tabular-nums text-gray-text-1">2026-08-07</span>{" "}
                <span className="text-gray-text-5">还有</span>{" "}
                <span className="font-semibold tabular-nums text-gray-text-1">1</span>{" "}
                <span className="text-gray-text-5">天</span>
              </p>
            </div>
            <DemoInfoFields fields={appointmentFields} />
          </section>

          <div className="my-5 h-px w-full bg-gray-border-normal" role="separator" aria-hidden />

          <section className="@container" aria-labelledby="demo-wh-delivery-heading">
            <div className="mb-2">
              <h3 id="demo-wh-delivery-heading" className={portalDetailGroupHeadingClass}>
                送货信息
              </h3>
            </div>
            <DemoInfoFields fields={deliveryFields} />
          </section>

          <div className="my-5 h-px w-full bg-gray-border-normal" role="separator" aria-hidden />

          <section className="@container" aria-labelledby="demo-wh-records-heading">
            <div className="mb-2">
              <h3 id="demo-wh-records-heading" className={portalDetailGroupHeadingClass}>
                系统记录
              </h3>
            </div>
            <ol className="relative m-0 list-none space-y-3 p-0">
              {systemRecords.map((record, index) => (
                <li key={`${record.text}-${record.time}`} className="relative pl-4">
                  {index < systemRecords.length - 1 ? (
                    <span
                      className="absolute left-[3px] top-[10px] z-0 h-[calc(100%+12px)] w-px -translate-x-1/2 bg-gray-border-normal"
                      aria-hidden
                    />
                  ) : null}
                  <span
                    className="absolute left-[3px] top-1.5 z-[1] size-1.5 -translate-x-1/2 rounded-full bg-gray-text-1"
                    aria-hidden
                  />
                  <div className="flex min-w-0 items-start justify-between gap-3">
                    <p className="m-0 min-w-0 break-words text-13 leading-5 text-gray-text-2">
                      {record.text}
                    </p>
                    <time className="shrink-0 tabular-nums text-12 leading-5 text-gray-text-5">
                      {record.time}
                    </time>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <PortalDetailCardFooter>
          <Button
            type="button"
            variant="outline"
            disabled={loading}
            onClick={() => toast.info("手动录入（示例）")}
          >
            <Pencil className="size-3.5 shrink-0" strokeWidth={2} aria-hidden />
            手动录入
          </Button>
          <Button type="button" disabled={done || loading} onClick={onComplete}>
            {loading ? (
              <>
                <Loader2 className="size-3.5 shrink-0 animate-spin" strokeWidth={2} aria-hidden />
                完成中
              </>
            ) : (
              "确认环节完成"
            )}
          </Button>
        </PortalDetailCardFooter>
      </section>
    </PortalDetailCard>
  );
}

function FulfillmentSectionPlaceholder({ title }: { title: string }) {
  return (
    <PortalDetailCard className="px-5 py-4 sm:px-5 sm:py-4">
      <section aria-label={title}>
        <h3 className={portalDetailSectionTitleClass}>{title}</h3>
        <p className="m-0 mt-3 text-13 text-gray-text-5">演示占位：该分区内容与 SS 履约跟踪同源结构，此处仅展示框架。</p>
      </section>
    </PortalDetailCard>
  );
}

function SummaryCopyButton({ value, label }: { value: string; label: string }) {
  const trimmed = value.trim();
  if (!trimmed) return null;
  return (
    <button
      type="button"
      className="inline-flex shrink-0 rounded-md p-0.5 text-gray-text-5 transition hover:bg-gray-fill-light hover:text-gray-text-2"
      aria-label={`复制${label}`}
      title="复制"
      onClick={() => {
        void navigator.clipboard.writeText(trimmed).then(() => toast.success("已复制"));
      }}
    >
      <Copy className="size-3" strokeWidth={1.75} aria-hidden />
    </button>
  );
}

/** 对齐 OrderDetailRightPanel「订单摘要」 */
function OrderSummaryCard({ order }: { order: DemoOrder }) {
  const rows: { label: string; value: string; copyable?: boolean }[] = [
    { label: "提货", value: order.routePickup },
    {
      label: "派送",
      value: `${order.routeDelivery} · ${order.routeDeliverySecondary.replace(/^Warehouse ·\s*/, "")}`,
    },
    { label: "客户ID", value: order.customerId, copyable: true },
    { label: "订单号", value: order.orderNo, copyable: true },
    { label: "提单号", value: order.billOfLadingNo, copyable: true },
    { label: "交货方式", value: "现场等卸" },
  ];

  return (
    <section
      className="rounded-card border border-gray-border-light bg-background px-4 pb-3 pt-4"
      style={WHITE_CARD_STYLE}
      aria-label={`订单摘要 ${order.orderNo}`}
    >
      <h2 className="min-w-0 text-13 font-semibold text-gray-text-2">订单摘要</h2>
      <dl className="mt-2 space-y-0">
        {rows.map((row, index) => (
          <div
            key={row.label}
            className={cn(
              "flex min-w-0 items-center gap-3 py-1.5",
              index < rows.length - 1 && "border-b border-gray-border-light",
            )}
          >
            <dt className="w-[84px] shrink-0 text-13 leading-5 text-gray-text-5">{row.label}</dt>
            <dd className="m-0 flex min-w-0 flex-1 items-center justify-start gap-1.5">
              <span
                className="max-w-full truncate text-left text-13 font-normal leading-5 text-gray-text-1"
                title={row.value}
              >
                {row.value}
              </span>
              {row.copyable ? <SummaryCopyButton value={row.value} label={row.label} /> : null}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function FulfillmentRightPanel({ order }: { order: DemoOrder }) {
  return (
    <div className="flex flex-col gap-3">
      <OrderSummaryCard order={order} />
      <DocumentSummaryCardExample />
    </div>
  );
}

function TabPlaceholder({ label }: { label: string }) {
  return (
    <div className="mt-4 portal-list-card" role="tabpanel" aria-label={label}>
      <p className="text-14 text-gray-text-4">当前流程尚未开始，暂无内容可展示。</p>
    </div>
  );
}

function FulfillmentTrackingBody({
  order,
  containerNos,
  activeContainerNo,
  activeSection,
  completedSteps,
  loadingSteps,
  onContainerChange,
  onSectionChange,
  onStepComplete,
}: {
  order: DemoOrder;
  containerNos: readonly string[];
  activeContainerNo: string;
  activeSection: FulfillmentStepId;
  completedSteps: ReadonlySet<string>;
  loadingSteps: ReadonlySet<string>;
  onContainerChange: (containerNo: string) => void;
  onSectionChange: (sectionId: FulfillmentStepId) => void;
  onStepComplete: (containerNo: string, sectionId: FulfillmentStepId) => void;
}) {
  const sectionLabel =
    FULFILLMENT_STEPS.find((s) => s.id === activeSection)?.label ?? activeSection;
  const warehouseStepKey = `${activeContainerNo}:WarehouseAppointment`;
  const warehouseDone = completedSteps.has(warehouseStepKey);
  const warehouseLoading = loadingSteps.has(warehouseStepKey);
  const carrierStepKey = `${activeContainerNo}:TerminalPickup`;
  const carrierDone = completedSteps.has(carrierStepKey);
  const carrierLoading = loadingSteps.has(carrierStepKey);
  /** 「去处理」每次点击递增，驱动承运商确认进入手动录入态 */
  const [carrierConfirmEditNonce, setCarrierConfirmEditNonce] = useState(0);

  const handleGoCarrierConfirm = () => {
    setCarrierConfirmEditNonce((n) => n + 1);
    onSectionChange("TerminalPickup");
  };

  const mainContent =
    activeSection === "WarehouseAppointment" ? (
      <div className="flex min-w-0 flex-col gap-3">
        <WarehouseAppointmentMainCard
          order={order}
          containerNo={activeContainerNo}
          done={warehouseDone}
          loading={warehouseLoading}
          onComplete={() => onStepComplete(activeContainerNo, "WarehouseAppointment")}
        />
        <MessagesSingleSideWithPanelExample />
      </div>
    ) : activeSection === "TerminalPickup" ? (
      <CarrierConfirmMainCard
        containerNo={activeContainerNo}
        editNonce={carrierConfirmEditNonce}
        done={carrierDone}
        loading={carrierLoading}
        onComplete={() => onStepComplete(activeContainerNo, "TerminalPickup")}
      />
    ) : (
      <FulfillmentSectionPlaceholder title={sectionLabel} />
    );

  const rightPanel = <FulfillmentRightPanel order={order} />;

  return (
    <div className="mt-4 flex flex-col gap-4">
      <div className={cn("min-w-0", FULFILLMENT_TWO_COL)}>
        <div className="flex flex-col gap-4 lg:grid lg:grid-cols-[minmax(180px,212px)_minmax(0,1fr)] lg:items-start lg:gap-x-0 lg:gap-y-0">
          <FulfillmentContainerNav
            containerNos={containerNos}
            activeContainerNo={activeContainerNo}
            activeSection={activeSection}
            completedSteps={completedSteps}
            loadingSteps={loadingSteps}
            onContainerChange={onContainerChange}
            onSectionChange={onSectionChange}
          />
          <div className="order-2 flex min-w-0 flex-col gap-3 lg:pl-2">
            <PortalTodoMessage
              title="1项待办，请尽快处理"
              items={[
                {
                  key: "carrier-confirm",
                  label: "承运商拒绝派送，请变更承运商",
                  onAction: handleGoCarrierConfirm,
                },
              ]}
              aria-label="履约待办"
            />
            <div className="min-w-0 bg-transparent p-0 shadow-none">{mainContent}</div>
          </div>
        </div>

        <aside className="hidden min-w-0 min-[1280px]:block" aria-label="订单辅助信息">
          <div className="portal-scrollbar sticky top-6 z-10 max-h-[calc(100vh-8rem)] overflow-y-auto overscroll-contain">
            {rightPanel}
          </div>
        </aside>
      </div>

      <aside className="mt-5 min-w-0 min-[1280px]:hidden" aria-label="订单辅助信息">
        {rightPanel}
      </aside>
    </div>
  );
}

export function DemoDetailPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const order = getDemoOrder(orderId);
  const [activeTab, setActiveTab] = useState<DetailTabId>("fulfillment");
  const [activeSection, setActiveSection] = useState<FulfillmentStepId>("WarehouseAppointment");
  const [activeContainerNo, setActiveContainerNo] = useState("");
  const [completedSteps, setCompletedSteps] = useState<ReadonlySet<string>>(() => new Set());
  const [loadingSteps, setLoadingSteps] = useState<ReadonlySet<string>>(() => new Set());

  if (!order) {
    return <Navigate to="/orders" replace />;
  }

  const backLabel = formatPortalBackLabel(DEMO_NAV, DEMO_LIST_NAV_ID, "订单管理");
  const containerNos = [resolveDemoContainerNo(order)];
  const currentContainer = containerNos.includes(activeContainerNo)
    ? activeContainerNo
    : containerNos[0];

  const handleStepComplete = (containerNo: string, sectionId: FulfillmentStepId) => {
    const stepKey = `${containerNo}:${sectionId}`;
    if (completedSteps.has(stepKey) || loadingSteps.has(stepKey)) return;

    setLoadingSteps((prev) => {
      const next = new Set(prev);
      next.add(stepKey);
      return next;
    });

    window.setTimeout(() => {
      setLoadingSteps((prev) => {
        const next = new Set(prev);
        next.delete(stepKey);
        return next;
      });
      setCompletedSteps((prev) => {
        const next = new Set(prev);
        next.add(stepKey);
        return next;
      });
    }, 900);
  };

  return (
    <StyleGuideShell>
      <main className="portal-page-main--detail">
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain pb-2">
            <div className="portal-page-content pt-5 pb-2">
              <DemoDetailHeader order={order} backLabel={backLabel} />
              <DemoDetailTopTabs activeTab={activeTab} onChange={setActiveTab} />

              {activeTab === "fulfillment" ? (
                <FulfillmentTrackingBody
                  order={order}
                  containerNos={containerNos}
                  activeContainerNo={currentContainer}
                  activeSection={activeSection}
                  completedSteps={completedSteps}
                  loadingSteps={loadingSteps}
                  onContainerChange={setActiveContainerNo}
                  onSectionChange={setActiveSection}
                  onStepComplete={handleStepComplete}
                />
              ) : (
                <TabPlaceholder
                  label={DETAIL_TABS.find((t) => t.id === activeTab)?.label ?? activeTab}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </StyleGuideShell>
  );
}
