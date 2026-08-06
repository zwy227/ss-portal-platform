import { toast } from "sonner";

/** 对齐 FulfillmentDocumentSummaryCard DOCUMENT_LABEL_CLASS（token 化为 portal-*） */
type DemoDocumentItem = {
  id: string;
  label: string;
  fileName?: string;
};

const DEMO_SUMMARY_ITEMS: readonly DemoDocumentItem[] = [
  { id: "order-confirmation", label: "订单确认书", fileName: "OrderConfirmation-SS260801.pdf" },
  { id: "bl", label: "B/L 提单", fileName: "B/L-20260801.pdf" },
  { id: "do", label: "DO 文件", fileName: "DO-LAX-0812.pdf" },
  { id: "outgate-eir", label: "Outgate EIR / Gate Ticket", fileName: "Outgate-EIR-MSKU783.pdf" },
  { id: "pod", label: "POD", fileName: "POD-MSKU783.pdf" },
];

function openDocumentLink(label: string, fileName?: string) {
  toast.info("打开文件", {
    description: `打开 ${label}${fileName ? `（${fileName}）` : ""}`,
  });
}

/** 基础：文件名链接 + 操作链接 */
export function DocumentLinkBasicExample() {
  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        className="portal-document-link w-fit max-w-full"
        title="提货单 B/L-20260801.pdf"
        onClick={() => openDocumentLink("提货单", "B/L-20260801.pdf")}
      >
        提货单 B/L-20260801.pdf
      </button>
      <button
        type="button"
        className="portal-document-action-link w-fit"
        onClick={() =>
          toast.info("打开文件", {
            description: "演示下载操作（非真实下载）",
          })
        }
      >
        下载
      </button>
    </div>
  );
}

function DocumentSummaryEmptyState() {
  return (
    <ul className="list-none p-0" aria-label="文件单证状态">
      <li className="flex items-center gap-2.5">
        <span className="size-1.5 shrink-0 rounded-full bg-gray-text-7" aria-hidden />
        <span className="text-13 font-medium leading-5 text-gray-text-5">暂无文件单证</span>
      </li>
    </ul>
  );
}

/**
 * 详情右侧「文件单证」摘要卡
 * 对齐 FulfillmentDocumentSummaryCard（边框/标题用 portal token）
 */
export function DocumentSummaryCardExample({ empty = false }: { empty?: boolean }) {
  const items = empty ? [] : DEMO_SUMMARY_ITEMS;

  return (
    <section
      className="max-w-sm rounded-card border border-gray-border-light bg-background px-4 pb-3 pt-4"
      style={{ boxShadow: "var(--elevation-sm)" }}
      aria-label="文件单证"
    >
      <div className="flex items-center justify-between gap-2">
        <h2 className="min-w-0 text-13 font-semibold text-gray-text-2">文件单证</h2>
      </div>
      <div className="mt-2">
        {items.length > 0 ? (
          <ul className="space-y-0">
            {items.map((item, index) => {
              const displayName = item.fileName ?? item.label;
              return (
                <li
                  key={`${item.id}-${displayName}`}
                  className={[
                    "min-w-0 py-1",
                    index < items.length - 1 ? "border-b border-gray-border-light" : "",
                  ].join(" ")}
                >
                  <button
                    type="button"
                    className="portal-document-link"
                    title={displayName}
                    onClick={() => openDocumentLink(item.label, item.fileName)}
                  >
                    {displayName}
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <DocumentSummaryEmptyState />
        )}
      </div>
    </section>
  );
}
