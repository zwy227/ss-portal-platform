import { ChevronRight } from "lucide-react";
import {
  PortalTodoMessage,
  portalTodoMessageActionClass,
  portalTodoMessageDotClass,
  type PortalTodoMessageItem,
} from "@ss/portal-ui";

const DEMO_ITEMS: PortalTodoMessageItem[] = [
  {
    key: "pod",
    label: "MSKU100003：请于08.07前完成上传客户版本POD",
    onAction: () => undefined,
  },
  {
    key: "buck-slip",
    label: "MSKU100003：请于08.07前完成上传客户版本Buck Slip",
    onAction: () => undefined,
  },
  {
    key: "reassign",
    label: "MSKU100004：请于08.12前完成改派",
    onAction: () => undefined,
  },
];

/** 样式一：多项待办 +「去处理」（对齐 FulfillmentRiskCollaborationCard banner） */
export function TodoMessageBannerExample() {
  return (
    <PortalTodoMessage
      title={`${DEMO_ITEMS.length}项待办，请尽快处理`}
      items={DEMO_ITEMS}
      aria-label="待办事项"
    />
  );
}

const MISSING_MATERIAL_ITEMS: PortalTodoMessageItem[] = [
  {
    key: "docs",
    label: "单证文件：缺少 DO (Delivery Order) 文件",
    actionLabel: null,
  },
  {
    key: "fulfillment",
    label: "履约信息：缺少 提单号 BOL No.、货柜号",
    actionLabel: null,
  },
  {
    key: "warehouse",
    label: "仓库预约：缺少 FBA Shipment ID、Amazon Reference ID",
    actionLabel: null,
  },
];

/**
 * 样式二：单提示 + 多项内容
 * 对齐 ClientDrayageQuoteOrderDetailPage「完善履约材料」缺失清单横幅
 */
export function TodoMessageMultiContentExample() {
  return (
    <PortalTodoMessage
      title="3项履约材料缺失，请于2026.07.02 12:00前完成。"
      items={MISSING_MATERIAL_ITEMS}
      listAriaLabel="缺失材料清单"
      aria-label="履约材料缺失"
    />
  );
}

/**
 * 样式二 · 单行：圆点 + 橙前缀 + 黑说明 + 右侧「去处理」（无清单）
 */
export function TodoMessageSingleLineExample() {
  return (
    <PortalTodoMessage
      title={
        <span className="inline-flex min-w-0 items-center gap-2">
          <span className={portalTodoMessageDotClass} aria-hidden />
          <span className="min-w-0">
            待上传DO：
            <span className="font-normal text-gray-text-1">
              请尽快上传 DO 文件，以免影响履约执行。
            </span>
          </span>
        </span>
      }
      headerAction={
        <button
          type="button"
          className={portalTodoMessageActionClass}
          onClick={() => undefined}
        >
          去处理
          <ChevronRight className="size-3.5 shrink-0" strokeWidth={2} aria-hidden />
        </button>
      }
      aria-label="待上传DO"
    />
  );
}
