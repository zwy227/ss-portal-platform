import { useState } from "react";
import { Navigate, useParams } from "react-router";
import { Anchor, Warehouse } from "lucide-react";
import { formatPortalBackLabel, PortalDetailBackLink } from "@ss/portal-shell";
import {
  PortalCheckboxCard,
  PortalDetailCard,
  PortalDetailFormHint,
  PortalDetailFormLabel,
  PortalDetailPanelSurface,
  PortalDetailSection,
  PortalDetailSectionStack,
  PortalDetailServicePriceLabel,
  PortalDetailSubsectionHeading,
  PortalRadioCard,
  PortalSelectionFieldset,
} from "@ss/portal-ui";
import { getDemoOrder } from "./demo-orders";
import { DEMO_LIST_NAV_ID, DEMO_NAV } from "./demoNav";
import { OrderListStatusTodoCell } from "./style-guide/OrderListStatusTodoCell";
import { StyleGuideShell } from "./style-guide/StyleGuideShell";

/**
 * 典型详情页 — 对齐 docs/frameworks/detail-page.md
 * 从列表点击订单号 /「查看详情」进入。
 */
export function DemoDetailPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const order = getDemoOrder(orderId);
  const [prePull, setPrePull] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState("liveUnload");

  if (!order) {
    return <Navigate to="/orders" replace />;
  }

  const backLabel = formatPortalBackLabel(DEMO_NAV, DEMO_LIST_NAV_ID, "订单管理");

  return (
    <StyleGuideShell>
      <main className="portal-page-main--detail">
        <header className="flex shrink-0 items-center gap-3 border-b border-gray-border-light bg-background px-5 py-4">
          <PortalDetailBackLink to="/orders" label={backLabel} />
          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-3">
            <h1 className="portal-page-detail-title text-gray-text-1">{order.orderNo}</h1>
            <OrderListStatusTodoCell
              statusLabel={order.statusLabel}
              badgeTone={order.badgeTone}
              todoText={order.todoText}
            />
          </div>
        </header>

        <div className="portal-page-detail-scroll px-5 py-6">
          <div className="mx-auto flex max-w-3xl flex-col gap-3">
            <PortalDetailCard>
              <PortalDetailSection title="路线信息" titleId="demo-order-route">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
                  <PortalDetailPanelSurface className="flex-1">
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-background text-gray-text-2 ring-1 ring-gray-border-normal">
                        <Anchor className="size-4" strokeWidth={1.75} aria-hidden />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-12 font-medium text-gray-text-4">提柜地</span>
                          <span className="text-12 font-normal text-gray-text-7">码头</span>
                        </div>
                        <div className="mt-0.5 text-13 leading-snug">
                          <span className="font-semibold text-gray-text-2">{order.routePickup}</span>
                        </div>
                        <p className="mt-1 text-13 leading-relaxed text-gray-text-7">
                          {order.routePickupSecondary}
                        </p>
                      </div>
                    </div>
                  </PortalDetailPanelSurface>
                  <PortalDetailPanelSurface className="flex-1">
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-background text-gray-text-2 ring-1 ring-gray-border-normal">
                        <Warehouse className="size-4" strokeWidth={1.75} aria-hidden />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-12 font-medium text-gray-text-4">派送地</span>
                          <span className="text-12 font-normal text-gray-text-7">仓库</span>
                        </div>
                        <div className="mt-0.5 text-13 leading-snug">
                          <span className="font-semibold text-gray-text-2">{order.routeDelivery}</span>
                        </div>
                        <p className="mt-1 text-13 leading-relaxed text-gray-text-7">
                          {order.routeDeliverySecondary}
                        </p>
                      </div>
                    </div>
                  </PortalDetailPanelSurface>
                </div>
              </PortalDetailSection>
            </PortalDetailCard>

            <PortalDetailCard>
              <PortalDetailSection title="货物及运输要求" titleId="demo-order-cargo">
                <PortalDetailSubsectionHeading>货柜数量</PortalDetailSubsectionHeading>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <PortalDetailFormLabel required>货柜数量</PortalDetailFormLabel>
                    <input
                      type="text"
                      className="portal-detail-form-input"
                      value={order.containerCount}
                      readOnly
                    />
                  </div>
                  <div>
                    <PortalDetailFormLabel required>货柜尺寸</PortalDetailFormLabel>
                    <input
                      type="text"
                      className="portal-detail-form-input"
                      value={order.containerSize}
                      readOnly
                    />
                  </div>
                </div>
                <PortalDetailFormHint title="温馨提示">
                  若多个货柜派送地址不同，请按地址拆分下单。
                </PortalDetailFormHint>
              </PortalDetailSection>
            </PortalDetailCard>

            <PortalDetailCard>
              <PortalDetailSectionStack>
                <PortalDetailSection title="提柜服务" titleId="demo-order-pickup">
                  <PortalSelectionFieldset legend="附加服务">
                    <PortalCheckboxCard
                      title="货柜预提（Pre-Pull）授权"
                      description="送货日期晚于码头最后免仓期（LFD）时，可提前将货柜提出并转移至外堆场暂存。"
                      checked={prePull}
                      onCheckedChange={setPrePull}
                      meta={
                        prePull ? (
                          <PortalDetailServicePriceLabel text="按实际发生结算" />
                        ) : null
                      }
                    />
                  </PortalSelectionFieldset>
                </PortalDetailSection>

                <PortalDetailSection title="派送服务" titleId="demo-order-delivery">
                  <PortalSelectionFieldset legend="交货方式">
                    <div role="radiogroup" aria-label="派送卸货方式" className="flex flex-col gap-2">
                      <PortalRadioCard
                        name="demo-order-delivery-method"
                        value="liveUnload"
                        title="现场等待卸货 (Live Unload)"
                        meta={
                          deliveryMethod === "liveUnload" ? (
                            <PortalDetailServicePriceLabel text="1小时免费" />
                          ) : null
                        }
                        description="司机在目的地等待卸货，完成后直接带走空柜。"
                        checked={deliveryMethod === "liveUnload"}
                        onChange={() => setDeliveryMethod("liveUnload")}
                      />
                      <PortalRadioCard
                        name="demo-order-delivery-method"
                        value="dropOff"
                        title="落箱卸货 (Drop & Pick)"
                        description="司机将重柜卸在收货地后离开，空柜由后续安排提走。"
                        checked={deliveryMethod === "dropOff"}
                        onChange={() => setDeliveryMethod("dropOff")}
                      />
                    </div>
                  </PortalSelectionFieldset>
                </PortalDetailSection>
              </PortalDetailSectionStack>
            </PortalDetailCard>

            <p className="text-12 text-gray-text-7">
              下单时间 {order.orderTime} · {order.subLabel}
            </p>
          </div>
        </div>
      </main>
    </StyleGuideShell>
  );
}
