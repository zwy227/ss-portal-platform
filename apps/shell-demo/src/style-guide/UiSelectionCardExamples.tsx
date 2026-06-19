import { useState } from "react";
import { PortalCheckboxCard, PortalRadioCard, PortalSelectionFieldset } from "@ss/portal-ui";

export function UiSelectionCardExamples() {
  const [prePull, setPrePull] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState("liveUnload");

  return (
    <div className="grid max-w-2xl gap-8">
      <PortalSelectionFieldset legend="其他服务">
        <PortalCheckboxCard
          title="货柜预提（Pre-Pull）授权"
          description="送货日期晚于码头最后免仓期（LFD）时，可提前将货柜提出并转移至外堆场暂存，以规避高昂的码头超期费。实际履约若发生预提，将执行该服务并收取相应费用。"
          checked={prePull}
          onCheckedChange={setPrePull}
          meta={
            prePull ? (
              <span className="text-13 font-medium text-accent-orange">按实际发生结算</span>
            ) : null
          }
          footer={
            prePull ? (
              <p className="text-13 font-normal leading-relaxed text-gray-text-7">
                预提后将产生外堆场暂存费，按实际天数计费。
              </p>
            ) : undefined
          }
        />
      </PortalSelectionFieldset>

      <PortalSelectionFieldset legend="交货方式">
        <div role="radiogroup" aria-label="派送卸货方式" className="flex flex-col gap-2">
          <PortalRadioCard
            name="delivery-method-demo"
            value="liveUnload"
            title="现场等待卸货 (Live Unload)"
            meta={
              <>
                <span className="text-13 font-medium text-semantic-success-text">1小时免费</span>
                <span className="text-13 font-medium text-accent-orange">
                  超期 +$80/小时（按实际发生结算）
                </span>
              </>
            }
            description="司机在目的地等待卸货，完成后直接带走空柜。收货地需具备即时卸货能力（如卸货月台、叉车及装卸工人）。"
            checked={deliveryMethod === "liveUnload"}
            onChange={() => setDeliveryMethod("liveUnload")}
          />
          <PortalRadioCard
            name="delivery-method-demo"
            value="dropOff"
            title="落箱卸货 (Drop & Pick)"
            description="司机将重柜卸在收货地后离开，空柜由后续安排提走。"
            checked={deliveryMethod === "dropOff"}
            onChange={() => setDeliveryMethod("dropOff")}
          />
        </div>
      </PortalSelectionFieldset>
    </div>
  );
}
