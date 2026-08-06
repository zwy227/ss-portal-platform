import {
  useId,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type ReactNode,
} from "react";
import { Link } from "react-router";
import { ChevronRight, Paperclip, X } from "lucide-react";
import * as Tooltip from "@radix-ui/react-tooltip";
import {
  cn,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  PortalTable,
  PortalTableBody,
  PortalTableCell,
  PortalTableHead,
  PortalTableHeadCell,
  PortalTableRoot,
  PortalTableRow,
  PortalTableSortHeader,
  portalTableListCellTextClass,
  portalTableStickyActionTdClass,
  portalTableStickyActionThClass,
  useStickyActionColumn,
} from "@ss/portal-ui";
import { DEMO_ORDERS } from "../demo-orders";
import { OrderListStatusTodoCell } from "./OrderListStatusTodoCell";
import { OrderRowActions } from "./OrderRowActions";

/* ── types & demo data ─────────────────────────────────────────── */

type DemoNoteAttachment = { id: string; name: string; sizeBytes: number };

type DemoNote = {
  id: string;
  content: string;
  attachments: DemoNoteAttachment[];
  authorName: string;
  submittedAt: string;
};

type NotesAudience = "customer" | "carrier";

type StageGroup = { id: string; label: string; notes: DemoNote[] };

const DEMO_AUTHOR = "张文宇";

const FIELD_BORDER = "border border-solid border-gray-border-strong";
const FIELD_HOVER = "hover:border-gray-border-emphasis";
const FIELD_FOCUS_WITHIN =
  "focus-within:border-gray-border-black focus-within:shadow-focus-normal";
const FIELD_FOCUS_VISIBLE =
  "focus-visible:outline-none focus-visible:border-gray-border-black focus-visible:shadow-focus-normal";

const CARRIER_COMPOSER_CLASS = [
  "border-accent-orange",
  "bg-[color-mix(in_srgb,var(--accent-orange)_3%,var(--background))]",
  "hover:border-accent-orange focus-within:border-accent-orange",
].join(" ");

const SEED_CUSTOMER: DemoNote[] = [
  {
    id: "c1",
    content: "已收到，我们按上午窗口预约。请查收仓库时段说明。",
    attachments: [
      {
        id: "a1",
        name: "warehouse-receiving-hours-and-cutoff.pdf",
        sizeBytes: 120_000,
      },
    ],
    authorName: "平台客服",
    submittedAt: "2026-08-05T10:05:00",
  },
];

/** 多条留言：用于演示列表区 max-height 内部滚动 */
const SEED_CUSTOMER_MANY: DemoNote[] = [
  {
    id: "cm1",
    content: "已收到，我们按上午窗口预约。请查收仓库时段说明。",
    attachments: [
      {
        id: "am1",
        name: "warehouse-receiving-hours-and-cutoff.pdf",
        sizeBytes: 120_000,
      },
    ],
    authorName: "平台客服",
    submittedAt: "2026-08-05T10:05:00",
  },
  {
    id: "cm2",
    content: "仓库反馈下午时段已约满，能否改为明天 09:00–11:00？",
    attachments: [],
    authorName: DEMO_AUTHOR,
    submittedAt: "2026-08-05T11:20:00",
  },
  {
    id: "cm3",
    content: "可以，已帮你改约。新时段确认单见附件。",
    attachments: [
      {
        id: "am2",
        name: "appointment-reschedule-confirmation.pdf",
        sizeBytes: 64_000,
      },
    ],
    authorName: "平台客服",
    submittedAt: "2026-08-05T14:08:00",
  },
  {
    id: "cm4",
    content: "货柜铅封号已更新，请同步给仓库安检。",
    attachments: [],
    authorName: DEMO_AUTHOR,
    submittedAt: "2026-08-05T16:42:00",
  },
  {
    id: "cm5",
    content: "已同步。明日到仓请提前 30 分钟报备车牌。",
    attachments: [],
    authorName: "平台客服",
    submittedAt: "2026-08-05T17:15:00",
  },
  {
    id: "cm6",
    content: "收到，司机侧已备注。如有异常我再留言。",
    attachments: [],
    authorName: DEMO_AUTHOR,
    submittedAt: "2026-08-05T18:03:00",
  },
];

const SEED_CARRIER: DemoNote[] = [
  {
    id: "r1",
    content: "司机预计 10:30 到港，请确认 DO 是否齐全。",
    attachments: [
      {
        id: "a2",
        name: "AI-ready Design System Roadmap.pdf",
        sizeBytes: 31_400_000,
      },
    ],
    authorName: "承运调度",
    submittedAt: "2026-08-06T08:40:00",
  },
];

const SIDE_PANEL_STAGES: StageGroup[] = [
  { id: "request", label: "需求确认", notes: SEED_CUSTOMER },
  { id: "pickup", label: "提柜执行", notes: SEED_CARRIER },
  {
    id: "delivery",
    label: "送仓",
    notes: [
      {
        id: "d1",
        content: "仓库拒收需补齐温度证明，稍后上传。",
        attachments: [
          {
            id: "a3",
            name: "temperature-certificate-supplement.pdf",
            sizeBytes: 88_000,
          },
        ],
        authorName: DEMO_AUTHOR,
        submittedAt: "2026-08-06T11:20:00",
      },
    ],
  },
];

/* ── helpers ───────────────────────────────────────────────────── */

function formatSubmittedAt(iso: string, mode: "relative" | "absolute"): string {
  const date = new Date(iso);
  if (mode === "absolute") {
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }
  const time = date.toLocaleTimeString("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const now = new Date();
  if (date.toDateString() === now.toDateString()) return `今天 ${time}`;
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) return `昨天 ${time}`;
  return date.toLocaleString("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function truncateAttachmentName(name: string, max = 10): string {
  const lastDot = name.lastIndexOf(".");
  const hasExt = lastDot > 0 && lastDot < name.length - 1;
  const base = hasExt ? name.slice(0, lastDot) : name;
  const ext = hasExt ? name.slice(lastDot) : "";
  const chars = Array.from(base);
  if (chars.length <= max) return name;
  return `${chars.slice(0, max).join("")}…${ext}`;
}

function sortNewestFirst(notes: DemoNote[]) {
  return [...notes].sort(
    (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime(),
  );
}

function sortOldestFirst(notes: DemoNote[]) {
  return [...notes].sort(
    (a, b) => new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime(),
  );
}

/** 列表操作列 / 留言标题共用图标 */
export function PortalInternalNotesTitleIcon({
  className = "size-5 shrink-0 text-gray-text-5",
}: {
  className?: string;
}) {
  return (
    <svg viewBox="0 0 1024 1024" className={className} aria-hidden focusable="false">
      <path
        d="M767.252986 256.732176 97.190041 256.732176c0 0-31.900547 0-31.900547 31.927153l0 446.708971c0 31.900547 31.900547 31.900547 31.900547 31.900547l95.700619 0 0 159.52832L352.498798 767.267824l414.754189 0c0 0 31.900547 0 31.900547-31.900547L799.153534 288.659329C799.153534 256.732176 767.252986 256.732176 767.252986 256.732176zM272.721847 559.89073c-26.447349 0-47.931662-21.457708-47.931662-47.904033 0-26.393113 21.485337-47.850821 47.931662-47.850821s47.822169 21.457708 47.822169 47.850821C320.545038 538.433022 299.169195 559.89073 272.721847 559.89073zM432.221514 559.89073c-26.447349 0-47.877427-21.457708-47.877427-47.904033 0-26.393113 21.430078-47.850821 47.877427-47.850821 26.501584 0 47.877427 21.457708 47.877427 47.850821C480.099964 538.433022 458.723098 559.89073 432.221514 559.89073zM591.77644 559.89073c-26.446325 0-47.877427-21.457708-47.877427-47.904033 0-26.393113 21.431102-47.850821 47.877427-47.850821 26.448372 0 47.877427 21.457708 47.877427 47.850821C639.653867 538.433022 618.224812 559.89073 591.77644 559.89073z"
        fill="currentColor"
      />
      <path
        d="M926.808936 97.203856 256.743944 97.203856c0 0-31.954783 0-31.954783 31.899524l0 95.727225 63.854307 0 0-63.800072 606.263897 0 0 382.882294-63.854307 0 0 63.826678 95.754854 0c0 0 31.900547 0 31.900547-31.92613L958.70846 129.104403C958.709483 97.203856 926.808936 97.203856 926.808936 97.203856z"
        fill="currentColor"
      />
    </svg>
  );
}

/* ── 1. 列表操作列 ─────────────────────────────────────────────── */

/** 样式一：列表操作列留言入口 — 使用 PortalTable 与列表规范一致 */
export function MessagesListActionExample() {
  const rows = DEMO_ORDERS.slice(0, 3);
  const { scrollRef, hasHorizontalOverflow } = useStickyActionColumn([rows.length]);
  const stickyThClass = portalTableStickyActionThClass(hasHorizontalOverflow);
  const stickyTdClass = portalTableStickyActionTdClass(hasHorizontalOverflow);

  return (
    <div className="flex flex-col gap-4">
      <PortalTableRoot ref={scrollRef}>
        <PortalTable className="min-w-[720px]">
          <PortalTableHead>
            <PortalTableRow className="hover:bg-transparent">
              <PortalTableHeadCell columnAlign="first">
                <PortalTableSortHeader label="订单号" />
              </PortalTableHeadCell>
              <PortalTableHeadCell>
                <PortalTableSortHeader label="订单状态 / 待办" />
              </PortalTableHeadCell>
              <PortalTableHeadCell className={stickyThClass}>操作</PortalTableHeadCell>
            </PortalTableRow>
          </PortalTableHead>
          <PortalTableBody>
            {rows.map((row) => (
              <PortalTableRow key={row.id}>
                <PortalTableCell columnAlign="first" className={portalTableListCellTextClass}>
                  <div className="flex flex-col gap-0.5">
                    <Link
                      to={`/orders/${row.id}`}
                      className="portal-table-id-link w-fit max-w-full"
                    >
                      {row.orderNo}
                    </Link>
                    <span className="text-12 text-gray-text-7">{row.subLabel}</span>
                  </div>
                </PortalTableCell>
                <PortalTableCell>
                  <OrderListStatusTodoCell
                    statusLabel={row.statusLabel}
                    badgeTone={row.badgeTone}
                    todoText={row.todoText}
                  />
                </PortalTableCell>
                <PortalTableCell className={stickyTdClass} withDivider={false}>
                  <OrderRowActions row={row} />
                </PortalTableCell>
              </PortalTableRow>
            ))}
          </PortalTableBody>
        </PortalTable>
      </PortalTableRoot>
      <p className="text-13 text-gray-text-5">
        操作列复用 <code className="text-13">OrderRowActions</code>：
        <code className="text-13">MessageSquare</code> 留言入口 + 数量徽标，与「更多」并列；表头/单元格走{" "}
        <code className="text-13">PortalTable*</code> 与粘性操作列。
      </p>
    </div>
  );
}

/* ── note row / composer / section ─────────────────────────────── */

const ATTACHMENT_TOOLTIP_CLASS =
  "z-[130] max-w-[360px] break-all rounded-md border border-solid border-gray-border-normal bg-popover px-2.5 py-2 text-12 font-medium leading-relaxed text-gray-text-2 shadow-md";

function NoteAttachmentChip({ name }: { name: string }) {
  return (
    <Tooltip.Provider delayDuration={200}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button
            type="button"
            className="inline-flex shrink-0 items-center gap-0.5 border-0 bg-transparent p-0 text-12 text-portal-text-link underline decoration-portal-text-link underline-offset-2 transition-opacity hover:opacity-80"
            aria-label={`查看附件 ${name}`}
          >
            <Paperclip className="size-3 shrink-0" strokeWidth={1.75} aria-hidden />
            <span className="min-w-0">{truncateAttachmentName(name)}</span>
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side="top"
            align="start"
            sideOffset={6}
            className={ATTACHMENT_TOOLTIP_CLASS}
          >
            {name}
            <Tooltip.Arrow className="fill-popover" width={10} height={5} />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

function InternalNoteRow({
  note,
  currentAuthorName,
  submittedAtMode = "relative",
  rowPaddingY = "default",
}: {
  note: DemoNote;
  currentAuthorName: string;
  submittedAtMode?: "relative" | "absolute";
  rowPaddingY?: "default" | "panel";
}) {
  const hasBody = Boolean(note.content) || note.attachments.length > 0;
  const displayAuthor = note.authorName === currentAuthorName ? "你" : note.authorName;
  const padY = rowPaddingY === "panel" ? "py-4" : "py-3";

  return (
    <div
      className={`flex flex-col border-b border-gray-border-normal ${padY} last:border-b-0`}
      data-note-row
    >
      <p className="m-0 flex items-center justify-between gap-2 text-12 leading-snug">
        <span className="min-w-0 truncate font-semibold text-gray-text-2">{displayAuthor}</span>
        <span className="shrink-0 text-gray-text-5">
          {formatSubmittedAt(note.submittedAt, submittedAtMode)}
        </span>
      </p>
      {hasBody ? (
        <p className="m-0 mt-0.5 text-12 leading-relaxed text-gray-text-3">
          {note.content ? <span>{note.content}</span> : null}
          {note.content && note.attachments.length > 0 ? "\u00a0" : null}
          {note.attachments.map((att, i) => (
            <span key={att.id}>
              {i > 0 ? "\u00a0" : null}
              <NoteAttachmentChip name={att.name} />
            </span>
          ))}
        </p>
      ) : null}
    </div>
  );
}

function NotesComposer({
  textareaId,
  onSubmit,
  className,
}: {
  textareaId: string;
  onSubmit: (content: string, attachments: DemoNoteAttachment[]) => void;
  className?: string;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [draft, setDraft] = useState("");
  const [draftAttachments, setDraftAttachments] = useState<DemoNoteAttachment[]>([]);
  const canSubmit = draft.trim().length > 0 || draftAttachments.length > 0;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setDraftAttachments((prev) => [
      ...prev,
      ...files.map((f) => ({
        id: crypto.randomUUID(),
        name: f.name,
        sizeBytes: f.size,
      })),
    ]);
    e.target.value = "";
  };

  const handleSubmit = () => {
    const trimmed = draft.trim();
    if (!trimmed && draftAttachments.length === 0) return;
    onSubmit(trimmed, draftAttachments);
    setDraft("");
    setDraftAttachments([]);
  };

  return (
    <div
      className={cn(
        "relative flex min-h-[80px] w-full flex-col overflow-hidden rounded-md bg-background transition",
        FIELD_BORDER,
        FIELD_HOVER,
        FIELD_FOCUS_WITHIN,
        className,
      )}
    >
      {draftAttachments.length > 0 ? (
        <ul className="m-0 flex list-none flex-wrap gap-1.5 px-2.5 pb-1 pt-2.5" aria-label="待提交附件">
          {draftAttachments.map((att) => (
            <li
              key={att.id}
              className="inline-flex min-w-0 max-w-full items-center gap-1 rounded-sm bg-gray-fill-normal px-1.5 py-0.5 transition-colors hover:bg-gray-fill-strong"
            >
              <span className="inline-flex min-w-0 items-center gap-0.5 text-12 text-portal-text-link">
                <Paperclip className="size-3 shrink-0" strokeWidth={1.75} aria-hidden />
                <span className="min-w-0 truncate">{truncateAttachmentName(att.name)}</span>
              </span>
              <button
                type="button"
                className="inline-flex size-5 shrink-0 items-center justify-center rounded text-gray-text-5 transition hover:text-gray-text-1"
                aria-label={`移除 ${att.name}`}
                onClick={() => setDraftAttachments((p) => p.filter((x) => x.id !== att.id))}
              >
                <X className="size-3" strokeWidth={1.75} aria-hidden />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      <textarea
        id={textareaId}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        placeholder="对本环节有任何疑问或沟通意向，可在此留言或查看答复。支持上传PDF、图片、Excel等附件。"
        rows={2}
        className="block min-h-[56px] w-full resize-y border-0 bg-transparent px-3 py-2 text-14 leading-relaxed text-gray-text-2 shadow-none outline-none placeholder:text-gray-text-7 focus:border-0 focus:shadow-none focus:ring-0"
      />
      <div className="flex items-center justify-between gap-2 px-2.5 pb-2.5 pt-1">
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="sr-only"
          onChange={handleFileChange}
          aria-label="上传附件"
        />
        <button
          type="button"
          className={cn(
            "relative inline-flex size-8 shrink-0 items-center justify-center rounded-md bg-background text-gray-text-4 transition hover:bg-gray-fill-light",
            FIELD_BORDER,
            FIELD_HOVER,
            FIELD_FOCUS_VISIBLE,
          )}
          aria-label="上传附件"
          onClick={() => {
            if (fileInputRef.current) {
              fileInputRef.current.value = "";
              fileInputRef.current.click();
            }
          }}
        >
          <Paperclip className="size-4" strokeWidth={1.75} aria-hidden />
          {draftAttachments.length > 0 ? (
            <span className="absolute -right-1 -top-1 inline-flex min-w-4 items-center justify-center rounded-full bg-gray-text-1 px-1 text-11 font-medium leading-none text-background">
              {draftAttachments.length}
            </span>
          ) : null}
        </button>
        <button
          type="button"
          disabled={!canSubmit}
          onClick={handleSubmit}
          className={cn(
            "inline-flex h-8 shrink-0 items-center rounded-md bg-background px-3 text-13 font-medium text-gray-text-4 transition hover:bg-gray-fill-light disabled:cursor-not-allowed disabled:opacity-50",
            FIELD_BORDER,
            FIELD_HOVER,
            FIELD_FOCUS_VISIBLE,
          )}
        >
          发送
        </button>
      </div>
    </div>
  );
}

function NotesDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 py-1" role="separator" aria-label={label}>
      <div className="h-px flex-1 bg-gray-border-normal" aria-hidden />
      <span className="shrink-0 text-13 text-gray-text-5">{label}</span>
      <div className="h-px flex-1 bg-gray-border-normal" aria-hidden />
    </div>
  );
}

function AudienceNotesTabs({
  value,
  onChange,
  customerCount,
  carrierCount,
}: {
  value: NotesAudience;
  onChange: (next: NotesAudience) => void;
  customerCount: number;
  carrierCount: number;
}) {
  const tabs: { id: NotesAudience; label: string; count: number }[] = [
    { id: "customer", label: "客户侧留言", count: customerCount },
    { id: "carrier", label: "承运商侧留言", count: carrierCount },
  ];

  return (
    <div className="relative z-[1] flex min-w-0 items-center gap-1.5">
      <PortalInternalNotesTitleIcon />
      <div
        className="relative z-[1] flex min-w-0 flex-wrap items-center gap-5"
        role="tablist"
        aria-label="留言对象"
      >
        {tabs.map((tab) => {
          const active = value === tab.id;
          const isCarrier = tab.id === "carrier";
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onChange(tab.id)}
              className={cn(
                "relative z-[1] flex h-7 cursor-pointer items-center border-0 border-b-2 border-solid bg-transparent px-0.5 text-14 transition-colors",
                active
                  ? isCarrier
                    ? "border-accent-orange font-semibold text-accent-orange"
                    : "border-gray-text-1 font-semibold text-gray-text-1"
                  : isCarrier
                    ? "border-transparent font-medium text-accent-orange hover:opacity-80"
                    : "border-transparent font-medium text-gray-text-5 hover:text-gray-text-2",
              )}
            >
              <span className="min-w-0 truncate">
                {tab.label}
                {tab.count > 0 ? `(${tab.count})` : null}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ViewAllLink({ onClick }: { onClick?: () => void }) {
  return (
    <button
      type="button"
      className="relative z-[1] inline-flex cursor-pointer items-center gap-0.5 text-13 text-gray-text-5 transition hover:text-gray-text-2"
      onClick={onClick}
    >
      查看全部
      <ChevronRight className="size-3.5 shrink-0" strokeWidth={1.75} aria-hidden />
    </button>
  );
}

function NotesListAndComposer({
  notes,
  onNotesChange,
  textareaId,
  listAriaLabel,
  composerClassName,
  listScrollable = false,
}: {
  notes: DemoNote[];
  onNotesChange: (next: DemoNote[]) => void;
  textareaId: string;
  listAriaLabel: string;
  composerClassName?: string;
  /** 留言过多时列表区内滚，发送区保持在下方 */
  listScrollable?: boolean;
}) {
  const sorted = useMemo(() => sortNewestFirst(notes), [notes]);

  return (
    <>
      {sorted.length > 0 ? (
        <div
          className={cn(
            "flex w-full flex-col rounded-md px-3 transition",
            FIELD_BORDER,
            FIELD_HOVER,
            listScrollable
              ? "portal-scrollbar max-h-[200px] overflow-y-auto overscroll-contain"
              : "overflow-hidden",
          )}
          aria-label={listAriaLabel}
        >
          {sorted.map((note) => (
            <InternalNoteRow key={note.id} note={note} currentAuthorName={DEMO_AUTHOR} />
          ))}
        </div>
      ) : null}
      <NotesComposer
        textareaId={textareaId}
        className={composerClassName}
        onSubmit={(content, attachments) => {
          onNotesChange([
            ...notes,
            {
              id: crypto.randomUUID(),
              content,
              attachments,
              authorName: DEMO_AUTHOR,
              submittedAt: new Date().toISOString(),
            },
          ]);
        }}
      />
    </>
  );
}

/** 单侧留言：单一标题「留言」+ 列表 + 发送（对齐 PortalInternalNotesSection） */
export function MessagesSingleSideNotesExample({
  onViewAll,
  seedNotes = SEED_CUSTOMER,
  listScrollable = false,
}: {
  onViewAll?: () => void;
  seedNotes?: DemoNote[];
  listScrollable?: boolean;
}) {
  const textareaId = useId();
  const [notes, setNotes] = useState(seedNotes);
  const sorted = useMemo(() => sortNewestFirst(notes), [notes]);

  return (
    <div className="flex flex-col gap-3">
      <NotesDivider label="留言区" />
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-3">
          <h3 className="m-0 flex min-w-0 items-center gap-1.5 text-14 font-semibold leading-snug tracking-[-0.01em] text-gray-text-2">
            <PortalInternalNotesTitleIcon />
            <span className="min-w-0 truncate">
              留言
              {sorted.length > 0 ? `(${sorted.length})` : null}
            </span>
          </h3>
          <ViewAllLink onClick={onViewAll} />
        </div>
        <NotesListAndComposer
          notes={notes}
          onNotesChange={setNotes}
          textareaId={textareaId}
          listAriaLabel="平台留言列表"
          listScrollable={listScrollable}
        />
      </div>
    </div>
  );
}

/** 双端留言：客户 / 承运商 Tab（对齐 TradeDualAudienceInternalNotesSection） */
export function MessagesDualAudienceNotesExample({
  onViewAll,
}: {
  onViewAll?: () => void;
}) {
  const textareaId = useId();
  const [audience, setAudience] = useState<NotesAudience>("customer");
  const [customerNotes, setCustomerNotes] = useState(SEED_CUSTOMER);
  const [carrierNotes, setCarrierNotes] = useState(SEED_CARRIER);

  const notes = audience === "customer" ? customerNotes : carrierNotes;
  const setNotes = audience === "customer" ? setCustomerNotes : setCarrierNotes;
  const isCarrier = audience === "carrier";

  return (
    <div className="flex flex-col gap-3">
      <NotesDivider label="留言区" />
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <AudienceNotesTabs
              value={audience}
              onChange={setAudience}
              customerCount={customerNotes.length}
              carrierCount={carrierNotes.length}
            />
          </div>
          <ViewAllLink onClick={onViewAll} />
        </div>
        <NotesListAndComposer
          notes={notes}
          onNotesChange={setNotes}
          textareaId={textareaId}
          listAriaLabel={isCarrier ? "承运商侧留言列表" : "客户侧留言列表"}
          composerClassName={isCarrier ? CARRIER_COMPOSER_CLASS : undefined}
        />
      </div>
    </div>
  );
}

/** @deprecated 使用 MessagesDualAudienceNotesExample */
export function MessagesNotesCardExample(props: { onViewAll?: () => void }) {
  return <MessagesDualAudienceNotesExample {...props} />;
}

/* ── 3. 侧边栏 ─────────────────────────────────────────────────── */

function StageSection({
  stage,
  authorName,
}: {
  stage: StageGroup;
  authorName: string;
}) {
  const sorted = useMemo(() => sortOldestFirst(stage.notes), [stage.notes]);

  return (
    <section aria-label={`${stage.label}留言`} className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-3 px-0.5">
        <h3 className="m-0 inline-flex shrink-0 items-center gap-2 text-13 font-normal text-gray-text-2">
          <span className="inline-block h-3.5 w-[3px] shrink-0 bg-gray-border-strong" aria-hidden />
          {stage.label}
        </h3>
        <span className="shrink-0 text-12 font-normal text-gray-text-5">{sorted.length} 条</span>
      </div>
      <div className="flex w-full flex-col overflow-hidden rounded-md border border-solid border-gray-border-normal">
        <div className="px-3">
          {sorted.map((note) => (
            <InternalNoteRow
              key={note.id}
              note={note}
              currentAuthorName={authorName}
              submittedAtMode="absolute"
              rowPaddingY="panel"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/** 样式三：全部留言侧栏（对齐 PortalOrderMessagesSidePanel） */
export function MessagesSidePanelExample({
  open,
  onOpenChange,
  orderId = "ORD-20260901-016",
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orderId?: string;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "!fixed !inset-y-0 !right-0 !left-auto !top-0 !translate-x-0 !translate-y-0",
          "flex h-full max-h-none w-[min(580px,calc(100vw-48px))] max-w-none",
          "flex-col gap-0 rounded-none border-0 border-l border-gray-border-normal bg-background p-0 shadow-lg",
          "[&>button]:hidden",
        )}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-gray-border-normal bg-background px-5 py-4">
          <DialogTitle className="m-0 inline-flex min-w-0 items-center gap-2 text-16 font-semibold leading-snug text-gray-text-2">
            <span>全部留言记录</span>
            {orderId ? (
              <span className="text-13 font-normal text-gray-text-5">{orderId}</span>
            ) : null}
          </DialogTitle>
          <DialogClose asChild>
            <button
              type="button"
              className="inline-flex size-8 shrink-0 items-center justify-center rounded-md text-gray-text-5 transition hover:bg-gray-fill-light hover:text-gray-text-2"
              aria-label="关闭全部留言侧面板"
            >
              <X className="size-4" strokeWidth={1.75} aria-hidden />
            </button>
          </DialogClose>
        </div>
        <DialogDescription className="sr-only">按环节汇总展示本订单下的全部留言</DialogDescription>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-5 pt-5">
          <div className="flex flex-col gap-6">
            {SIDE_PANEL_STAGES.map((stage) => (
              <StageSection key={stage.id} stage={stage} authorName={DEMO_AUTHOR} />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/** 单侧留言 + 侧栏 */
export function MessagesSingleSideWithPanelExample() {
  const [panelOpen, setPanelOpen] = useState(false);
  return (
    <>
      <MessagesSingleSideNotesExample onViewAll={() => setPanelOpen(true)} />
      <MessagesSidePanelExample open={panelOpen} onOpenChange={setPanelOpen} />
    </>
  );
}

/** 单侧留言 · 列表过多时区内滚动 */
export function MessagesSingleSideScrollExample() {
  const [panelOpen, setPanelOpen] = useState(false);
  return (
    <>
      <MessagesSingleSideNotesExample
        seedNotes={SEED_CUSTOMER_MANY}
        listScrollable
        onViewAll={() => setPanelOpen(true)}
      />
      <MessagesSidePanelExample open={panelOpen} onOpenChange={setPanelOpen} />
    </>
  );
}

/** 双端留言 + 侧栏 */
export function MessagesDualAudienceWithPanelExample() {
  const [panelOpen, setPanelOpen] = useState(false);
  return (
    <>
      <MessagesDualAudienceNotesExample onViewAll={() => setPanelOpen(true)} />
      <MessagesSidePanelExample open={panelOpen} onOpenChange={setPanelOpen} />
    </>
  );
}

/** @deprecated 使用 MessagesDualAudienceWithPanelExample */
export function MessagesCardWithSidePanelExample() {
  return <MessagesDualAudienceWithPanelExample />;
}

/** 侧栏独立演示入口（可单独打开） */
export function MessagesSidePanelTriggerExample({ children }: { children?: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col gap-3">
      <button type="button" className="portal-brand-btn w-fit" onClick={() => setOpen(true)}>
        打开全部留言侧栏
      </button>
      {children}
      <MessagesSidePanelExample open={open} onOpenChange={setOpen} />
    </div>
  );
}
