import { useState, type ReactNode } from "react";
import { Copy, Info, Pencil } from "lucide-react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { toast } from "sonner";
import {
  Button,
  PortalAntDateRangePicker,
  PortalCheckboxCard,
  PortalDetailCard,
  PortalDetailCardFooter,
  PortalDetailFormHint,
  PortalDetailFormLabel,
  PortalDetailSection,
  PortalDetailSectionStack,
  PortalDetailServicePriceLabel,
  PortalFormSearchSelect,
  PortalIncludedServiceItem,
  PortalRadioCard,
  PortalSelectionFieldset,
  portalDetailGroupHeadingClass,
  portalDetailInfoFieldItemClass,
  portalDetailInfoFieldsClass,
  portalDetailSectionTitleClass,
  portalSelectionCardInteractionClass,
  portalSelectionCardRadiusClass,
  portalSelectionCardSelectedClass,
  type PortalAntDateRangePickerProps,
} from "@ss/portal-ui";
import { ClickAttachmentUploadField } from "./FileUploadStyleExamples";

const CUSTOMER_OPTIONS = [
  { value: "CUST-1001", label: "CUST-1001" },
  { value: "CUST-2048", label: "CUST-2048" },
  { value: "CUST-3390", label: "CUST-3390" },
  { value: "ACME-88", label: "ACME-88" },
] as const;

const CARGO_ATTR_OPTIONS = [
  {
    id: "hazmat",
    label: "危险品",
    tipTitle: "危险品 (Hazmat)",
    tip: "含易燃、易爆、有毒等物质，海运订舱需按危险品申报（通常需 MSDS）。",
  },
  {
    id: "overweight",
    label: "超重柜",
    tipTitle: "超重柜 (Overweight)",
    tip: "货柜总重超过常规路运限制时需额外协调车架与路线。",
  },
  {
    id: "other",
    label: "其他",
    tipTitle: "其他属性",
    tip: "非标柜、冷藏等特殊要求，可在需求备注中补充说明。",
  },
] as const;

const PICKUP_RESULT_OPTIONS = [
  { value: "pending", label: "待提柜" },
  { value: "picked_up", label: "已提柜" },
  { value: "exception", label: "异常" },
] as const;
function UsageList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="m-0 list-disc space-y-1.5 pl-5 text-13 leading-relaxed text-gray-text-5">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

function CargoAttrInfoTip({ title, tip }: { title: string; tip: string }) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <button
          type="button"
          className="inline-flex shrink-0 rounded-full p-0.5 text-gray-text-5 transition hover:text-gray-text-3 focus-visible:outline-none focus-visible:shadow-focus-normal"
          aria-label={`${title}说明`}
          onMouseDown={(event) => event.stopPropagation()}
          onClick={(event) => event.stopPropagation()}
        >
          <Info className="size-3.5" strokeWidth={2} aria-hidden />
        </button>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          side="top"
          sideOffset={6}
          className="z-50 max-w-[280px] rounded-md border border-gray-border-light bg-white px-3 py-2 text-12 leading-5 text-gray-text-2 shadow-lg"
        >
          <p className="m-0 text-13 font-semibold text-gray-text-2">{title}</p>
          <p className="mt-1 m-0 text-12 leading-relaxed text-gray-text-5">{tip}</p>
          <Tooltip.Arrow className="fill-white" width={10} height={5} />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}

/** 紧凑属性多选：对齐货品及货柜属性横排勾选 */
function CompactCargoAttrCheckboxes({
  selected,
  onToggle,
  readOnly = false,
}: {
  selected: ReadonlySet<string>;
  onToggle?: (id: string) => void;
  readOnly?: boolean;
}) {
  return (
    <Tooltip.Provider delayDuration={200}>
      <div
        className="grid grid-cols-1 gap-2 sm:grid-cols-3"
        role="group"
        aria-label="货品及货柜属性"
      >
        {CARGO_ATTR_OPTIONS.map((opt) => {
          const checked = selected.has(opt.id);
          return (
            <label
              key={opt.id}
              className={[
                `flex h-12 min-w-0 w-full items-center justify-start gap-1.5 ${portalSelectionCardRadiusClass} border border-solid px-3 text-14 font-medium transition`,
                readOnly
                  ? checked
                    ? "cursor-default border-transparent bg-gray-fill-light text-gray-text-2"
                    : "cursor-default border-gray-border-light bg-gray-fill-light text-gray-text-7"
                  : checked
                    ? `${portalSelectionCardSelectedClass} cursor-pointer text-gray-text-2 ${portalSelectionCardInteractionClass}`
                    : `cursor-pointer border-gray-border-normal bg-white text-gray-text-4 ${portalSelectionCardInteractionClass}`,
              ].join(" ")}
            >
              <input
                type="checkbox"
                checked={checked}
                disabled={readOnly}
                readOnly={readOnly}
                onChange={() => onToggle?.(opt.id)}
                className="size-4 shrink-0 rounded border-gray-border-strong accent-gray-text-1 disabled:checked:opacity-95"
              />
              <span className="min-w-0 truncate whitespace-nowrap">{opt.label}</span>
              <CargoAttrInfoTip title={opt.tipTitle} tip={opt.tip} />
            </label>
          );
        })}
      </div>
    </Tooltip.Provider>
  );
}

/** 表单控件原子：Label / Input / Textarea / SearchSelect */
export function FormControlExamples() {
  const [customerCode, setCustomerCode] = useState("CUST-1001");
  const [note, setNote] = useState("");

  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="min-w-0">
          <PortalDetailFormLabel id="demo-form-qty-label" required>
            货柜数量
          </PortalDetailFormLabel>
          <input
            id="demo-form-qty"
            type="text"
            className="portal-detail-form-input"
            defaultValue="1"
            aria-labelledby="demo-form-qty-label"
          />
        </div>
        <div className="min-w-0">
          <PortalDetailFormLabel id="demo-form-size-label" required>
            货柜尺寸
          </PortalDetailFormLabel>
          <input
            id="demo-form-size"
            type="text"
            className="portal-detail-form-input"
            defaultValue="40'ST"
            aria-labelledby="demo-form-size-label"
          />
        </div>
      </div>

      <div className="min-w-0 max-w-sm">
        <label id="demo-form-customer-label" className="portal-detail-form-label">
          客户账号
        </label>
        <PortalFormSearchSelect
          id="demo-form-customer"
          value={customerCode}
          onValueChange={setCustomerCode}
          options={CUSTOMER_OPTIONS}
          searchPlaceholder="搜索客户账号"
          aria-labelledby="demo-form-customer-label"
        />
      </div>

      <div className="min-w-0">
        <PortalDetailFormLabel id="demo-form-note-label">需求备注</PortalDetailFormLabel>
        <textarea
          id="demo-form-note"
          className="portal-detail-form-textarea"
          rows={4}
          placeholder="特殊卸货要求、预约窗口等（选填）"
          value={note}
          onChange={(event) => setNote(event.target.value)}
          aria-labelledby="demo-form-note-label"
        />
      </div>
    </div>
  );
}

/**
 * 卡片单选 / 多选可编辑态：紧凑属性、附加服务、交货方式、履约结果横排单选。
 * Focus：卡片 focus-within → --focus-border-normal + --focus-ring-normal（与字段壳一致）。
 */
export function FormCardSelectionExamples() {
  const [cargoAttrs, setCargoAttrs] = useState<Set<string>>(() => new Set());
  const [prePull, setPrePull] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState("liveUnload");
  const [pickupResult, setPickupResult] = useState("pending");

  const toggleAttr = (id: string) => {
    setCargoAttrs((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="flex max-w-2xl flex-col gap-8">
      <div className="flex flex-col gap-3">
        <p className="m-0 text-14 font-semibold text-gray-text-2">Focus ring</p>
        <p className="m-0 text-13 leading-relaxed text-gray-text-5">
          选择卡可编辑态与 <code className="text-13">portal-detail-form-input</code> /{" "}
          <code className="text-13">portal-field-shell</code> 一致：键盘聚焦内部 checkbox /
          radio 时，卡片 <code className="text-13">focus-within</code> 使用{" "}
          <code className="text-13">--focus-border-normal</code>（黑边）+{" "}
          <code className="text-13">--focus-ring-normal</code>
          （4px gray-fill-normal 外环），非品牌 ring。实现类：{" "}
          <code className="text-13">portalSelectionCardInteractionClass</code>。
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <PortalDetailFormLabel>货品及货柜属性</PortalDetailFormLabel>
        <CompactCargoAttrCheckboxes selected={cargoAttrs} onToggle={toggleAttr} />
      </div>

      <PortalSelectionFieldset legend="提柜服务 · 附加">
        <PortalCheckboxCard
          title="货柜预提"
          description="送货日期晚于码头最后免仓期（LFD）时，可提前将货柜提出并转移至外堆场暂存，以规避码头超期费。实际履约若发生预提，将按实结算。"
          checked={prePull}
          onCheckedChange={setPrePull}
          meta={prePull ? <PortalDetailServicePriceLabel text="按实际发生结算" /> : null}
        />
      </PortalSelectionFieldset>

      <PortalSelectionFieldset legend="交货方式">
        <div role="radiogroup" aria-label="交货方式" className="flex flex-col gap-2">
          <PortalRadioCard
            name="demo-form-delivery-method"
            value="liveUnload"
            title="现场等卸"
            meta={
              deliveryMethod === "liveUnload" ? (
                <PortalDetailServicePriceLabel text="1小时免费，超期+$80/小时（按实结算）" />
              ) : null
            }
            description="司机在目的地等待卸货，完成后直接带走空柜。收货地需具备即时卸货能力（如卸货月台、叉车及装卸工人）。"
            checked={deliveryMethod === "liveUnload"}
            onChange={() => setDeliveryMethod("liveUnload")}
          />
          <PortalRadioCard
            name="demo-form-delivery-method"
            value="dropOff"
            title="甩柜还空"
            description="司机将重柜卸下即离开，后续另排车提取空柜，适用于卸货较慢或无预约的仓库。"
            checked={deliveryMethod === "dropOff"}
            onChange={() => setDeliveryMethod("dropOff")}
          />
        </div>
      </PortalSelectionFieldset>

      <PortalSelectionFieldset
        legend="履约结果（横排单选）"
        hint="对齐运输执行手动录入 ResultRadioField：同组 PortalRadioCard + sm:flex-row。"
      >
        <div
          role="radiogroup"
          aria-label="提柜结果"
          className="flex flex-col gap-2 sm:flex-row sm:gap-3"
        >
          {PICKUP_RESULT_OPTIONS.map((option) => (
            <PortalRadioCard
              key={option.value}
              name="demo-form-pickup-result"
              value={option.value}
              title={option.label}
              checked={pickupResult === option.value}
              onChange={() => setPickupResult(option.value)}
              className="min-w-0 flex-1 py-2"
            />
          ))}
        </div>
      </PortalSelectionFieldset>
    </div>
  );
}

/** 表单提示：置于表单项下方；普通 / 注意 / 错误三档（错误时输入框边框同步） */
export function FormHintExamples() {
  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <div className="flex flex-col gap-5">
        <p className="m-0 text-14 font-semibold text-gray-text-2">置于表单项下方 · 三档</p>

        <div className="min-w-0 max-w-sm">
          <PortalDetailFormLabel id="demo-hint-default-label" required>
            派送地址
          </PortalDetailFormLabel>
          <input
            id="demo-hint-default"
            type="text"
            className="portal-detail-form-input"
            defaultValue="CA 91746"
            aria-labelledby="demo-hint-default-label"
            aria-describedby="demo-hint-default-msg"
          />
          <div className="mt-2" id="demo-hint-default-msg">
            <PortalDetailFormHint title="温馨提示">
              若多个货柜派送地址不同，请按地址拆分下单。
            </PortalDetailFormHint>
          </div>
        </div>

        <div className="min-w-0 max-w-sm">
          <PortalDetailFormLabel id="demo-hint-warning-label" required>
            派送地址
          </PortalDetailFormLabel>
          <input
            id="demo-hint-warning"
            type="text"
            className="portal-detail-form-input"
            defaultValue="CA 91746"
            aria-labelledby="demo-hint-warning-label"
            aria-describedby="demo-hint-warning-msg"
          />
          <div className="mt-2" id="demo-hint-warning-msg">
            <PortalDetailFormHint variant="warning" title="注意">
              派送地址变更后需重新确认报价，已锁定的运价可能失效。
            </PortalDetailFormHint>
          </div>
        </div>

        <div className="min-w-0 max-w-sm">
          <PortalDetailFormLabel id="demo-hint-error-label" required>
            派送地址
          </PortalDetailFormLabel>
          <input
            id="demo-hint-error"
            type="text"
            className="portal-detail-form-input portal-detail-form-input--error"
            defaultValue="CA XXXXX"
            aria-invalid="true"
            aria-labelledby="demo-hint-error-label"
            aria-describedby="demo-hint-error-msg"
          />
          <div className="mt-2" id="demo-hint-error-msg">
            <PortalDetailFormHint variant="error" title="错误">
              派送邮编无效，请核对后重新填写。
            </PortalDetailFormHint>
          </div>
        </div>
      </div>
    </div>
  );
}

/** 只读态：锁定 / 人工报价处理中 */
export function FormReadonlyExamples() {
  return (
    <div className="flex max-w-2xl flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="min-w-0">
          <span className="portal-detail-form-label">客户账号</span>
          <p className="portal-detail-form-value">CUST-1001</p>
        </div>
        <div className="min-w-0">
          <span className="portal-detail-form-label">货柜数量</span>
          <p className="portal-detail-form-value">2</p>
        </div>
      </div>
      <div className="min-w-0">
        <span className="portal-detail-form-label">需求备注</span>
        <p className="portal-detail-form-readonly">请预约工作日上午卸货窗口；现场需尾板。</p>
      </div>
    </div>
  );
}

/** 卡片选择只读：disabled 已包含勾选 + 属性只读 + value 文案 */
export function FormCardSelectionReadonlyExamples() {
  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <div className="flex flex-col gap-1">
        <span className="portal-detail-form-label">表单项</span>
        <CompactCargoAttrCheckboxes selected={new Set(["hazmat"])} readOnly />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="min-w-0">
          <span className="portal-detail-form-label">交货方式</span>
          <p className="portal-detail-form-value">现场等卸</p>
        </div>
        <div className="min-w-0">
          <span className="portal-detail-form-label">货柜预提</span>
          <p className="portal-detail-form-value">未开通</p>
        </div>
      </div>

      <PortalSelectionFieldset legend="其他 · 已包含（禁用勾选）">
        <div className="flex flex-col gap-2">
          <PortalCheckboxCard
            title="码头预约"
            description="已包含码头提柜预约协调。"
            checked
            disabled
            meta={<PortalDetailServicePriceLabel text="+$65/柜" />}
          />
        </div>
      </PortalSelectionFieldset>
    </div>
  );
}

/** 组合示例内各模式的说明标签（对齐详情页框架示意） */
function CompositionPatternLabel({
  title,
  hint,
}: {
  title: string;
  hint?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <p className="m-0 text-12 font-medium text-gray-text-3">{title}</p>
      {hint ? <p className="m-0 text-12 leading-relaxed text-gray-text-7">{hint}</p> : null}
    </div>
  );
}

type DemoInfoField = {
  label: string;
  value: ReactNode;
  /** 通栏（备注等） */
  span?: boolean;
};

function DemoInfoFields({ fields }: { fields: ReadonlyArray<DemoInfoField> }) {
  return (
    <dl className={portalDetailInfoFieldsClass}>
      {fields.map((field) => (
        <div
          key={field.label}
          className={[portalDetailInfoFieldItemClass, field.span ? "col-span-full" : ""]
            .filter(Boolean)
            .join(" ")}
        >
          <dt className="m-0 text-13 leading-5 text-gray-text-5">{field.label}</dt>
          <dd
            className={[
              "m-0 min-w-0 text-13 leading-5 text-gray-text-2",
              field.span ? "whitespace-pre-wrap break-words" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {field.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

const WAREHOUSE_APPOINTMENT_DEMO_CONTAINER = "COSU100007";
const WAREHOUSE_APPOINTMENT_DEMO_ETA = "2026-08-16";
const WAREHOUSE_APPOINTMENT_DEMO_ETA_DAYS = 10;

/** 履约「仓库预约」：对齐 Drayage TradeDetailBlankSectionCard + DrayDetailWhiteCard */
function WarehouseAppointmentCompositionExample() {
  const [editing, setEditing] = useState(false);
  const [appointmentRange, setAppointmentRange] =
    useState<PortalAntDateRangePickerProps["value"]>(null);
  const [confirmationNumber, setConfirmationNumber] = useState("");
  const [remarks, setRemarks] = useState("");

  const appointmentFields: DemoInfoField[] = [
    {
      label: "预约状态",
      value: <span className="portal-badge portal-badge--warning">待预约</span>,
    },
    {
      label: "进展说明",
      value: <span className="text-accent-orange">仓库需人工预约</span>,
    },
    {
      label: "预约时间",
      value: <span className="font-semibold tabular-nums text-gray-text-2">—</span>,
    },
  ];

  const deliveryFields: DemoInfoField[] = [
    {
      label: "仓库代码",
      value: (
        <span className="inline-flex min-w-0 max-w-full items-center gap-1.5">
          <span className="min-w-0 truncate">ONT8</span>
          <span className="shrink-0 text-gray-text-4">（FBA）</span>
        </span>
      ),
    },
    {
      label: "地址",
      value: "24300 Nandina Ave, Moreno Valley, CA 92551",
    },
    { label: "交货方式", value: "现场等卸" },
    { label: "FBA Shipment ID", value: "FBA15ABCDE" },
    { label: "Amazon Reference ID", value: "ARID-90210" },
    { label: "备注", value: "卸货需预约窗口；超时按仓规计费。", span: true },
  ];

  const systemRecords = [
    { text: "系统识别该仓库需人工预约", time: "07-28 08:30" },
    { text: "已进入预约窗口，系统生成人工预约仓库待办", time: "07-28 08:30" },
  ] as const;

  return (
    <PortalDetailCard className="px-5 py-4 sm:px-5 sm:py-4">
      <section aria-label="仓库预约">
        <div className="flex w-full min-w-0 flex-col items-start gap-0.5">
          <h3 className={portalDetailSectionTitleClass}>仓库预约</h3>
          <p className="inline-flex items-center gap-1.5 text-12 text-gray-text-4">
            <span>集装箱：{WAREHOUSE_APPOINTMENT_DEMO_CONTAINER}</span>
            <button
              type="button"
              className="inline-flex shrink-0 rounded-md p-0.5 text-gray-text-5 transition hover:bg-gray-fill-light hover:text-gray-text-2"
              aria-label="复制集装箱号"
              title="复制"
              onClick={() => {
                void navigator.clipboard
                  .writeText(WAREHOUSE_APPOINTMENT_DEMO_CONTAINER)
                  .then(() => toast.success("已复制"));
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
                <span className="font-semibold tabular-nums text-gray-text-1">
                  {WAREHOUSE_APPOINTMENT_DEMO_ETA}
                </span>{" "}
                <span className="text-gray-text-5">还有</span>{" "}
                <span className="font-semibold tabular-nums text-gray-text-1">
                  {WAREHOUSE_APPOINTMENT_DEMO_ETA_DAYS}
                </span>{" "}
                <span className="text-gray-text-5">天</span>
              </p>
            </div>

            {editing ? (
              <div className="flex flex-col gap-6">
                <div className="min-w-0 max-w-md">
                  <PortalDetailFormLabel id="demo-wh-appt-time-label" required>
                    预约时间
                  </PortalDetailFormLabel>
                  <PortalAntDateRangePicker
                    portalVariant="form"
                    showTime={{ format: "HH:mm" }}
                    format="YYYY-MM-DD HH:mm"
                    value={appointmentRange}
                    onChange={(next) => setAppointmentRange(next)}
                    className="w-full"
                    placeholder={["开始时间", "结束时间"]}
                    aria-labelledby="demo-wh-appt-time-label"
                  />
                </div>
                <div className="min-w-0 w-[200px] min-[1440px]:w-[260px]">
                  <PortalDetailFormLabel id="demo-wh-isa-label">预约确认码/ISA</PortalDetailFormLabel>
                  <input
                    id="demo-wh-isa"
                    type="text"
                    className="portal-detail-form-input"
                    value={confirmationNumber}
                    onChange={(event) => setConfirmationNumber(event.target.value)}
                    placeholder="请输入预约确认码/ISA"
                    autoComplete="off"
                    aria-labelledby="demo-wh-isa-label"
                  />
                </div>
                <div className="flex min-w-0 max-w-xl flex-col gap-4">
                  <div className="min-w-0">
                    <PortalDetailFormLabel id="demo-wh-remark-label">备注</PortalDetailFormLabel>
                    <textarea
                      id="demo-wh-remark"
                      className="portal-detail-form-textarea"
                      rows={3}
                      value={remarks}
                      onChange={(event) => setRemarks(event.target.value)}
                      placeholder="请补充凭证来源、确认内容或其他必要说明"
                      aria-labelledby="demo-wh-remark-label"
                    />
                  </div>
                  <ClickAttachmentUploadField label="上传附件" />
                </div>
              </div>
            ) : (
              <DemoInfoFields fields={appointmentFields} />
            )}
          </section>

          {!editing ? (
            <>
              <div
                className="my-5 h-px w-full bg-gray-border-normal"
                role="separator"
                aria-hidden
              />
              <section className="@container" aria-labelledby="demo-wh-delivery-heading">
                <div className="mb-2">
                  <h3 id="demo-wh-delivery-heading" className={portalDetailGroupHeadingClass}>
                    送货信息
                  </h3>
                </div>
                <DemoInfoFields fields={deliveryFields} />
              </section>
              <div
                className="my-5 h-px w-full bg-gray-border-normal"
                role="separator"
                aria-hidden
              />
              <section className="@container" aria-labelledby="demo-wh-records-heading">
                <div className="mb-2">
                  <h3 id="demo-wh-records-heading" className={portalDetailGroupHeadingClass}>
                    系统记录
                  </h3>
                </div>
                <ol className="relative m-0 list-none space-y-3">
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
            </>
          ) : null}
        </div>

        <PortalDetailCardFooter>
          {editing ? (
            <>
              <Button type="button" variant="outline" onClick={() => setEditing(false)}>
                取消
              </Button>
              <button
                type="button"
                className="portal-brand-btn"
                onClick={() => {
                  setEditing(false);
                  toast.success("预约信息已保存（示例）");
                }}
              >
                保存修改
              </button>
            </>
          ) : (
            <>
              <Button
                type="button"
                variant="outline"
                onClick={() => toast.info("变更送货地址（示例，无弹窗）")}
              >
                变更送货地址
              </Button>
              <Button type="button" variant="outline" onClick={() => setEditing(true)}>
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

/** 白卡 + Section：标准表单卡 / 大标题·子标题·底部操作（仓库预约） */
export function FormSectionCompositionExample() {
  const [cargoAttrs, setCargoAttrs] = useState<Set<string>>(() => new Set());
  const [prePull, setPrePull] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState("liveUnload");

  const toggleAttr = (id: string) => {
    setCargoAttrs((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex max-w-2xl flex-col gap-5">
        {/* 标准 Section 白卡 */}
        <div className="flex flex-col gap-2">
          <CompositionPatternLabel
            title="标准 Section 白卡"
            hint={
              <>
                <code className="text-12">PortalDetailCard</code> +{" "}
                <code className="text-12">PortalDetailSection</code>
                ；同卡多 Section 用 <code className="text-12">PortalDetailSectionStack</code>
              </>
            }
          />
          <div className="flex flex-col gap-3">
            <PortalDetailCard>
              <PortalDetailSection title="货柜及运输服务" titleId="demo-form-cargo-heading">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <PortalDetailFormLabel required>货柜数量</PortalDetailFormLabel>
                    <input type="text" className="portal-detail-form-input" defaultValue="1" />
                  </div>
                  <div>
                    <PortalDetailFormLabel required>货柜尺寸</PortalDetailFormLabel>
                    <input type="text" className="portal-detail-form-input" defaultValue="40'ST" />
                  </div>
                </div>
                <div>
                  <PortalDetailFormLabel>货品及货柜属性</PortalDetailFormLabel>
                  <CompactCargoAttrCheckboxes selected={cargoAttrs} onToggle={toggleAttr} />
                </div>
              </PortalDetailSection>
            </PortalDetailCard>

            <PortalDetailCard>
              <PortalDetailSectionStack>
                <PortalDetailSection title="附加服务" titleId="demo-form-addon-heading">
                  <PortalSelectionFieldset legend="提柜服务">
                    <PortalCheckboxCard
                      title="货柜预提"
                      description="送货日期晚于码头最后免仓期（LFD）时，可提前将货柜提出并转移至外堆场暂存。"
                      checked={prePull}
                      onCheckedChange={setPrePull}
                      meta={
                        prePull ? <PortalDetailServicePriceLabel text="按实际发生结算" /> : null
                      }
                    />
                  </PortalSelectionFieldset>

                  <PortalSelectionFieldset legend="交货方式">
                    <div role="radiogroup" aria-label="交货方式" className="flex flex-col gap-2">
                      <PortalRadioCard
                        name="demo-form-compose-delivery"
                        value="liveUnload"
                        title="现场等卸"
                        meta={
                          deliveryMethod === "liveUnload" ? (
                            <PortalDetailServicePriceLabel text="1小时免费，超期+$80/小时（按实结算）" />
                          ) : null
                        }
                        description="司机在目的地等待卸货，完成后直接带走空柜。收货地需具备即时卸货能力。"
                        checked={deliveryMethod === "liveUnload"}
                        onChange={() => setDeliveryMethod("liveUnload")}
                      />
                      <PortalRadioCard
                        name="demo-form-compose-delivery"
                        value="dropOff"
                        title="甩柜还空"
                        description="司机将重柜卸下即离开，后续另排车提取空柜。"
                        checked={deliveryMethod === "dropOff"}
                        onChange={() => setDeliveryMethod("dropOff")}
                      />
                    </div>
                  </PortalSelectionFieldset>

                  <PortalSelectionFieldset legend="其他" contentClassName="flex flex-col gap-2.5">
                    <PortalIncludedServiceItem
                      title="码头预约"
                      tip="已包含码头提柜预约协调。"
                      price="+$55/柜"
                    />
                    <PortalIncludedServiceItem
                      title="车架使用"
                      tip="已包含标准车架使用时长，超期按天收取附加费。"
                      price="3天免费，超期+$45/天 (按实结算)"
                    />
                    <PortalIncludedServiceItem
                      title="派送预约"
                      tip="已包含派送预约协调与收货方提前通知。"
                      price="免费"
                    />
                  </PortalSelectionFieldset>
                </PortalDetailSection>
              </PortalDetailSectionStack>
            </PortalDetailCard>
          </div>
        </div>
      </div>

      {/* 带大标题、子标题，及底部操作按钮（全宽以演示 @container 1/2/3 列） */}
      <div className="flex flex-col gap-2">
        <CompositionPatternLabel title="带大标题、子标题，及底部操作按钮" />
        <WarehouseAppointmentCompositionExample />
        <div className="rounded-md border border-gray-border-light bg-background px-3 py-2.5 text-12 leading-relaxed text-gray-text-5">
          <p className="m-0 mb-1 font-medium text-gray-text-3">信息字段自适应规则</p>
          <ul className="m-0 list-disc space-y-0.5 pl-4">
            <li>
              父级加 <code className="text-12">@container</code>；网格类{" "}
              <code className="text-12">portalDetailInfoFieldsClass</code>
            </li>
            <li>
              视口 <code className="text-12">&lt;1440</code>：列宽 200px、列间距 24（
              <code className="text-12">gap-x-6</code>
              ）；容器宽 ≥424 → 2 列、≥648 → 3 列
            </li>
            <li>
              视口 <code className="text-12">≥1440</code>：列宽 260px、
              <code className="text-12">justify-between</code>
              、列间距 0；容器宽 ≥520 → 2 列、≥780 → 3 列
            </li>
            <li>
              通栏字段（备注等）子项加 <code className="text-12">col-span-full</code>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export function FormUsageGuide() {
  return (
    <div className="flex flex-col gap-4 text-13 leading-relaxed text-gray-text-5">
      <div>
        <p className="mb-1.5 text-14 font-semibold text-gray-text-2">何时用哪一类控件</p>
        <UsageList
          items={[
            <>
              单行/多行文本 → <code className="text-13">portal-detail-form-input</code> /{" "}
              <code className="text-13">portal-detail-form-textarea</code>
              （详情页 42px / min-h 88px）
            </>,
            <>
              可搜索枚举（客户账号等）→ <code className="text-13">PortalFormSearchSelect</code>
            </>,
            <>
              带图标的复合地点搜索 → <code className="text-13">portal-field-shell</code> +{" "}
              <code className="text-13">portal-field-shell-input</code>（边框在壳上；Focus 对照见组件预览 /blank/filter）
            </>,
            <>
              卡片多选 / 单选（附加服务、交货方式、履约结果）→{" "}
              <code className="text-13">PortalCheckboxCard</code> /{" "}
              <code className="text-13">PortalRadioCard</code> +{" "}
              <code className="text-13">PortalSelectionFieldset</code>
            </>,
            <>
              紧凑属性多选（危险品 / 超重柜等）→ 横排勾选条，复用{" "}
              <code className="text-13">portalSelectionCardInteractionClass</code>
            </>,
            <>
              列表筛选条 → <code className="text-13">portal-filter-input</code> /{" "}
              <code className="text-13">PortalAntSelect</code>（见「筛选器」），勿与详情表单混用高度
            </>,
          ]}
        />
      </div>
      <div>
        <p className="mb-1.5 text-14 font-semibold text-gray-text-2">标签与提示</p>
        <UsageList
          items={[
            <>
              字段 label：<code className="text-13">PortalDetailFormLabel</code> 或{" "}
              <code className="text-13">portal-detail-form-label</code>（13px · medium · gray-text-4）
            </>,
            <>
              Fieldset legend：<code className="text-13">portal-detail-form-legend</code>（与
              PortalSelectionFieldset 共用）
            </>,
            <>
              辅助说明：放在表单项下方，用 <code className="text-13">PortalDetailFormHint</code> /
              <code className="text-13"> portal-detail-form-hint</code>（一行：图标 + 小标题
              text-12 + 正文 text-13）
            </>,
            <>
              普通提示：默认 <code className="text-13">variant</code>（Info · gray-text）
            </>,
            <>
              注意提示：<code className="text-13">variant=&quot;warning&quot;</code>（
              <code className="text-13">portal-detail-form-hint--warning</code> · 无底色 ·
              告警字色 · TriangleAlert）
            </>,
            <>
              错误提示：<code className="text-13">variant=&quot;error&quot;</code>（
              <code className="text-13">portal-detail-form-hint--error</code> · 无底色 ·
              错误字色 · CircleX）+ 输入框{" "}
              <code className="text-13">portal-detail-form-input--error</code> 或{" "}
              <code className="text-13">aria-invalid=&quot;true&quot;</code>
            </>,
            <>
              服务价签：<code className="text-13">PortalDetailServicePriceLabel</code>（免费 →
              brand；加价 → accent-orange；支持混合文案分色）
            </>,
            <>
              已包含只读行：<code className="text-13">PortalIncludedServiceItem</code>（✓ 标题 ⓘ
              价签，无边框；置于 PortalSelectionFieldset）
            </>,
          ]}
        />
      </div>
      <div>
        <p className="mb-1.5 text-14 font-semibold text-gray-text-2">只读与 Focus</p>
        <UsageList
          items={[
            <>
              单行只读：<code className="text-13">portal-detail-form-value</code>（无边框
              medium）
            </>,
            <>
              多行只读：<code className="text-13">portal-detail-form-readonly</code>（浅底 + light
              边线）
            </>,
            <>
              选择卡只读：<code className="text-13">disabled</code>
              ；选中保持灰底，未选中浅底弱化。已包含项优先{" "}
              <code className="text-13">PortalIncludedServiceItem</code>
            </>,
            <>
              Focus（input / textarea / SearchSelect / 字段壳 / 选择卡 focus-within）：统一{" "}
              <code className="text-13">--focus-border-normal</code> +{" "}
              <code className="text-13">--focus-ring-normal</code>（黑边 + 浅灰外环），非品牌 ring
            </>,
          ]}
        />
      </div>
      <div>
        <p className="mb-1.5 text-14 font-semibold text-gray-text-2">页面结构</p>
        <UsageList
          items={[
            <>
              白卡：<code className="text-13">PortalDetailCard</code>（
              <code className="text-13">portal-detail-card</code>）
            </>,
            <>
              Section：<code className="text-13">PortalDetailSection</code>；同卡多块用{" "}
              <code className="text-13">PortalDetailSectionStack</code>
            </>,
            <>
              卡内小标题 + 分割线：<code className="text-13">PortalDetailBlockTitle</code> +{" "}
              <code className="text-13">PortalDetailDividedStack</code>
            </>,
            <>
              底部操作：<code className="text-13">PortalDetailCardFooter</code>（取消 /
              保存 / 修改）
            </>,
            <>
              组合示例 →「白卡 Section 组合」：标准 Section 白卡 / 带大标题、子标题，及底部操作按钮；原子对照也可看组件预览「卡片选择」
            </>,
            <>
              履约只读字段网格：<code className="text-13">portalDetailInfoFieldsClass</code>
              （父级 <code className="text-13">@container</code>
              ）。&lt;1440：列宽 200 / gap-x-6，容器 ≥424→2 列、≥648→3 列；≥1440：列宽 260 /
              justify-between，容器 ≥520→2 列、≥780→3 列。通栏字段加{" "}
              <code className="text-13">col-span-full</code>
              。页级骨架见 docs/frameworks/form-page.md；字段网格细则见 detail-page.md
            </>,
          ]}
        />
      </div>
      <pre className="overflow-x-auto rounded-md bg-page-bg p-3 text-12 text-gray-text-3">{`import {
  PortalCheckboxCard,
  PortalDetailCard,
  PortalDetailFormLabel,
  PortalDetailSection,
  PortalRadioCard,
  PortalSelectionFieldset,
} from "@ss/portal-ui";

<PortalDetailCard>
  <PortalDetailSection title="附加服务" titleId="addon">
    <PortalSelectionFieldset legend="交货方式">
      <PortalRadioCard name="unload" value="live" title="现场等卸" checked onChange={…} />
    </PortalSelectionFieldset>
    <PortalCheckboxCard title="货柜预提" checked={prePull} onCheckedChange={setPrePull} />
  </PortalDetailSection>
</PortalDetailCard>`}</pre>
    </div>
  );
}
