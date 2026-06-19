import type { ThemeConfig } from "antd";

/** 筛选区 Ant Select / Cascader — 对齐 portal-filter-select（h-9） */
export const portalAntdFilterTheme: ThemeConfig = {
  token: {
    colorPrimary: "var(--brand)",
    colorBorder: "var(--gray-border-strong)",
    colorTextPlaceholder: "var(--gray-text-7)",
    colorText: "var(--gray-text-2)",
    colorBgContainer: "var(--background)",
    borderRadius: 8,
    fontSize: 14,
    controlHeight: 36,
    controlOutlineWidth: 3,
  },
  components: {
    Select: {
      controlHeight: 36,
      fontSize: 14,
    },
    Cascader: {
      controlHeight: 36,
      fontSize: 14,
    },
  },
};

/** 表单 Ant Select — 对齐 h-12 字段 */
export const portalAntdFormTheme: ThemeConfig = {
  token: {
    colorPrimary: "var(--brand)",
    colorBorder: "var(--gray-border-strong)",
    colorTextPlaceholder: "var(--gray-text-7)",
    colorText: "var(--gray-text-2)",
    colorBgContainer: "var(--background)",
    borderRadius: 8,
    fontSize: 14,
    controlHeight: 48,
    controlOutlineWidth: 4,
  },
  components: {
    Select: {
      controlHeight: 48,
      fontSize: 14,
    },
  },
};

export type PortalAntVariant = "filter" | "form";

export function resolvePortalAntdTheme(variant: PortalAntVariant): ThemeConfig {
  return variant === "form" ? portalAntdFormTheme : portalAntdFilterTheme;
}
