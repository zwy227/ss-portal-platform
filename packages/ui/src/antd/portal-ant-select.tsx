import { Select } from "antd";
import type { SelectProps } from "antd";
import { cn } from "../lib/utils";
import { PortalAntConfigProvider } from "./portal-ant-config-provider";
import type { PortalAntVariant } from "./portalAntdTheme";

export type PortalAntSelectProps<ValueType = string> = Omit<SelectProps<ValueType>, "variant"> & {
  portalVariant?: PortalAntVariant;
};

function resolveSelectClassNames(portalVariant: PortalAntVariant, className?: string) {
  return cn(
    portalVariant === "form" ? "portal-ant-select--form" : "portal-ant-select--filter",
    className,
  );
}

function resolvePopupClassName(portalVariant: PortalAntVariant, popupClassName?: string) {
  return cn(
    "portal-ant-select-dropdown",
    portalVariant === "form" && "portal-ant-select-dropdown--form",
    popupClassName,
  );
}

export function PortalAntSelect<ValueType = string>({
  portalVariant = "filter",
  className,
  popupClassName,
  ...props
}: PortalAntSelectProps<ValueType>) {
  return (
    <PortalAntConfigProvider variant={portalVariant}>
      <Select<ValueType>
        className={resolveSelectClassNames(portalVariant, className)}
        popupClassName={resolvePopupClassName(portalVariant, popupClassName)}
        {...props}
      />
    </PortalAntConfigProvider>
  );
}
