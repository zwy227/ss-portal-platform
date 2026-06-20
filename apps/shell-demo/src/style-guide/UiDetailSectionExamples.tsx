import { useState, type ReactNode } from "react";
import { Anchor, Info, Warehouse } from "lucide-react";
import {
  PortalCheckboxCard,
  PortalDetailCard,
  PortalDetailFormLabel,
  PortalDetailPanelSurface,
  PortalDetailSection,
  PortalDetailSectionStack,
  PortalDetailSubsectionHeading,
  PortalRadioCard,
  PortalSelectionFieldset,
} from "@ss/portal-ui";

function DemoPlaceCard({
  icon,
  roleLabel,
  typeLabels,
  primary,
  secondary,
}: {
  icon: ReactNode;
  roleLabel: string;
  typeLabels: string[];
  primary: string;
  secondary: string;
}) {
  return (
    <PortalDetailPanelSurface>
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-background text-gray-text-2 ring-1 ring-gray-border-normal">
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-12 font-medium text-gray-text-4">{roleLabel}</span>
            {typeLabels.map((label) => (
              <span key={label} className="text-12 font-normal text-gray-text-7">
                {label}
              </span>
            ))}
          </div>
          <div className="mt-0.5 text-13 leading-snug">
            <span className="font-semibold text-gray-text-2">{primary}</span>
          </div>
          <p className="mt-1 text-13 leading-relaxed text-gray-text-7">{secondary}</p>
        </div>
      </div>
    </PortalDetailPanelSurface>
  );
}

export function UiDetailSectionExamples() {
  const [prePull, setPrePull] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState("liveUnload");

  return (
    <div className="flex max-w-2xl flex-col gap-3">
      <PortalDetailCard>
        <PortalDetailSection title="路线信息" titleId="demo-route-heading">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
            <DemoPlaceCard
              icon={<Anchor className="size-4" strokeWidth={1.75} aria-hidden />}
              roleLabel="提柜地"
              typeLabels={["码头"]}
              primary="Garden City Terminal (GCT)"
              secondary="Vancouver, BC · 100 Centennial Rd"
            />
            <DemoPlaceCard
              icon={<Warehouse className="size-4" strokeWidth={1.75} aria-hidden />}
              roleLabel="派送地"
              typeLabels={["仓库"]}
              primary="Amazon YVR3"
              secondary="Delta, BC · 123 Warehouse Way"
            />
          </div>
        </PortalDetailSection>
      </PortalDetailCard>

      <PortalDetailCard>
        <PortalDetailSection title="货物及运输要求" titleId="demo-cargo-heading">
          <PortalDetailSubsectionHeading>货柜数量</PortalDetailSubsectionHeading>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <PortalDetailFormLabel required>货柜数量</PortalDetailFormLabel>
              <input type="text" className="portal-detail-form-input" defaultValue="1" readOnly />
            </div>
            <div>
              <PortalDetailFormLabel required>货柜尺寸</PortalDetailFormLabel>
              <input type="text" className="portal-detail-form-input" defaultValue="40HQ" readOnly />
            </div>
          </div>
          <p className="flex items-start gap-1.5 portal-detail-form-hint">
            <Info className="mt-0.5 size-3.5 shrink-0 text-gray-text-7" aria-hidden />
            温馨提示：若多个货柜派送地址不同，请按地址拆分下单。
          </p>
        </PortalDetailSection>
      </PortalDetailCard>

      <PortalDetailCard>
        <PortalDetailSectionStack>
          <PortalDetailSection title="提柜服务" titleId="demo-pickup-heading">
            <PortalSelectionFieldset legend="附加服务">
              <PortalCheckboxCard
                title="货柜预提（Pre-Pull）授权"
                description="送货日期晚于码头最后免仓期（LFD）时，可提前将货柜提出并转移至外堆场暂存。"
                checked={prePull}
                onCheckedChange={setPrePull}
                meta={
                  prePull ? (
                    <span className="text-12 font-bold text-accent-orange">按实际发生结算</span>
                  ) : null
                }
              />
            </PortalSelectionFieldset>
          </PortalDetailSection>

          <PortalDetailSection title="派送服务" titleId="demo-delivery-heading">
            <PortalSelectionFieldset legend="交货方式">
              <div role="radiogroup" aria-label="派送卸货方式" className="flex flex-col gap-2">
                <PortalRadioCard
                  name="demo-delivery-method"
                  value="liveUnload"
                  title="现场等待卸货 (Live Unload)"
                  meta={
                    <span className="text-12 font-bold text-brand">1小时免费</span>
                  }
                  description="司机在目的地等待卸货，完成后直接带走空柜。"
                  checked={deliveryMethod === "liveUnload"}
                  onChange={() => setDeliveryMethod("liveUnload")}
                />
                <PortalRadioCard
                  name="demo-delivery-method"
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
    </div>
  );
}
