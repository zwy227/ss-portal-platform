import CheckOutlined from "@ant-design/icons/CheckOutlined";
import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
import type { ReactNode } from "react";
import { resolvePortalAntdTheme, type PortalAntVariant } from "./portalAntdTheme";

export type PortalAntConfigProviderProps = {
  children: ReactNode;
  /** 筛选区 filter（默认）或表单 form */
  variant?: PortalAntVariant;
};

export function PortalAntConfigProvider({
  children,
  variant = "filter",
}: PortalAntConfigProviderProps) {
  return (
    <ConfigProvider
      locale={zhCN}
      theme={resolvePortalAntdTheme(variant)}
      select={{ menuItemSelectedIcon: <CheckOutlined /> }}
    >
      {children}
    </ConfigProvider>
  );
}
