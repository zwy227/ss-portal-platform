import { Cascader } from "antd";
import type { CascaderProps, DefaultOptionType } from "antd/es/cascader";
import { cn } from "../lib/utils";
import { PortalAntConfigProvider } from "./portal-ant-config-provider";
import type { PortalAntVariant } from "./portalAntdTheme";

export type PortalAntCascaderProps = Omit<CascaderProps<DefaultOptionType>, "variant" | "multiple"> & {
  portalVariant?: PortalAntVariant;
};

export function PortalAntCascader({
  portalVariant = "filter",
  className,
  popupClassName,
  changeOnSelect = true,
  expandTrigger = "hover",
  showSearch = {
    filter: (input, path) =>
      path.some((option) =>
        String(option.label ?? "")
          .toLowerCase()
          .includes(input.trim().toLowerCase()),
      ),
  },
  displayRender = (labels) => labels.join(" / "),
  ...props
}: PortalAntCascaderProps) {
  return (
    <PortalAntConfigProvider variant={portalVariant}>
      <Cascader
        className={cn("portal-ant-cascader--filter", className)}
        popupClassName={cn("portal-ant-cascader-dropdown", popupClassName)}
        changeOnSelect={changeOnSelect}
        expandTrigger={expandTrigger}
        showSearch={showSearch}
        displayRender={displayRender}
        {...props}
      />
    </PortalAntConfigProvider>
  );
}
