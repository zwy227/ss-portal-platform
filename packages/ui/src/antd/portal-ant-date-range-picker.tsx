import { DatePicker } from "antd";
import type { RangePickerProps } from "antd/es/date-picker";
import { cn } from "../lib/utils";
import { PortalAntConfigProvider } from "./portal-ant-config-provider";
import type { PortalAntVariant } from "./portalAntdTheme";

const { RangePicker } = DatePicker;

export type PortalAntDateRangePickerProps = Omit<RangePickerProps, "variant"> & {
  portalVariant?: PortalAntVariant;
};

export function PortalAntDateRangePicker({
  portalVariant = "filter",
  className,
  popupClassName,
  allowClear = true,
  placeholder = ["开始日期", "结束日期"],
  ...props
}: PortalAntDateRangePickerProps) {
  return (
    <PortalAntConfigProvider variant={portalVariant}>
      <RangePicker
        className={cn(
          portalVariant === "form" ? "portal-ant-picker--form" : "portal-ant-picker--filter",
          className,
        )}
        popupClassName={cn("portal-ant-picker-dropdown", popupClassName)}
        allowClear={allowClear}
        placeholder={placeholder}
        {...props}
      />
    </PortalAntConfigProvider>
  );
}
