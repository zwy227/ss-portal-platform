import type { ComponentPropsWithoutRef, CSSProperties, ReactNode } from "react";
import { CircleX, Info, TriangleAlert } from "lucide-react";
import { cn } from "../lib/utils";

/** 客户端详情白卡 */
export const portalDetailCardClass = "portal-detail-card";

/** Section 主标题（16px semibold，无底部分割线） */
export const portalDetailSectionTitleClass = "portal-detail-section-title";

export const portalDetailSectionTitleWrapClass = "portal-detail-section-title-wrap";

/** Section 内容区纵向栈 */
export const portalDetailSectionBodyClass = "portal-detail-section-body";

/** 同卡多 Section 分割线容器 */
export const portalDetailSectionStackClass = "portal-detail-section-stack";

/** 卡内小标题（14px semibold） */
export const portalDetailBlockTitleClass = "portal-detail-block-title";

/** 卡内分块：顶部分割线栈 */
export const portalDetailDividedStackClass = "portal-detail-divided-stack";

/** 白卡底部操作区 */
export const portalDetailCardFooterClass = "portal-detail-card-footer";

/** 路线卡 / 只读面板浅灰表面 */
export const portalDetailPanelSurfaceClass = "portal-detail-panel-surface";

export const portalDetailFormLabelClass = "portal-detail-form-label";

export const portalDetailFormLegendClass = "portal-detail-form-legend";

export const portalDetailFormHintClass = "portal-detail-form-hint";

export const portalDetailFormHintWarningClass = "portal-detail-form-hint--warning";

export const portalDetailFormHintErrorClass = "portal-detail-form-hint--error";

export const portalDetailSubsectionHeadingClass = "portal-detail-subsection-heading";

export const portalDetailFormInputClass = "portal-detail-form-input";

export const portalDetailFormInputErrorClass = "portal-detail-form-input--error";

export const portalDetailFormTextareaClass = "portal-detail-form-textarea";

export const portalDetailFormTextareaErrorClass = "portal-detail-form-textarea--error";

/** 只读多行展示 */
export const portalDetailFormReadonlyClass = "portal-detail-form-readonly";

/** 只读单行展示（无边框） */
export const portalDetailFormValueClass = "portal-detail-form-value";

/**
 * 履约只读信息字段网格（label 上 / value 下）。
 * 父级区块须加 `@container`，以便按容器宽度切 1/2/3/4 列。
 *
 * 自适应规则：
 * - `<1440` 视口：列宽 200px、列间距 `gap-x-6`（24）
 * - `≥1440` 视口：列宽 260px、`justify-between`、列间距 0（由两端对齐吃掉剩余空间）
 * - 容器宽：`<1440` 时 `@[424px]`→2 列、`@[648px]`→3 列、`@[872px]`→4 列；
 *   `≥1440` 时 `@[520px]`→2 列、`@[780px]`→3 列、`@[1040px]`→4 列
 * - 通栏字段（备注等）给子项加 `col-span-full`
 */
export const portalDetailInfoFieldsClass =
  "m-0 grid grid-cols-[200px] gap-x-6 gap-y-4 @[424px]:grid-cols-[repeat(2,200px)] @[648px]:grid-cols-[repeat(3,200px)] @[872px]:grid-cols-[repeat(4,200px)] min-[1440px]:grid-cols-[260px] min-[1440px]:justify-between min-[1440px]:gap-x-0 min-[1440px]:@[520px]:grid-cols-[repeat(2,260px)] min-[1440px]:@[780px]:grid-cols-[repeat(3,260px)] min-[1440px]:@[1040px]:grid-cols-[repeat(4,260px)]";

/** 信息字段单项：label + value 纵向 */
export const portalDetailInfoFieldItemClass = "flex min-w-0 flex-col gap-0.5";

/** 卡内分组小标题（如「送货信息 / 系统记录」，对齐履约详情 text-13 medium） */
export const portalDetailGroupHeadingClass =
  "m-0 min-w-0 text-13 font-medium leading-5 text-gray-text-2";

export type PortalDetailCardProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export function PortalDetailCard({ children, className, style }: PortalDetailCardProps) {
  return (
    <div className={cn(portalDetailCardClass, className)} style={style}>
      {children}
    </div>
  );
}

export type PortalDetailSectionTitleProps = {
  title: string;
  titleId?: string;
  action?: ReactNode;
  className?: string;
};

export function PortalDetailSectionTitle({
  title,
  titleId,
  action,
  className,
}: PortalDetailSectionTitleProps) {
  return (
    <div className={cn(portalDetailSectionTitleWrapClass, className)}>
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
        <h3 id={titleId} className={portalDetailSectionTitleClass}>
          {title}
        </h3>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
    </div>
  );
}

export type PortalDetailSectionProps = {
  title: string;
  titleId: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
};

export function PortalDetailSection({
  title,
  titleId,
  action,
  children,
  className,
  bodyClassName,
}: PortalDetailSectionProps) {
  return (
    <section className={className} aria-labelledby={titleId}>
      <PortalDetailSectionTitle title={title} titleId={titleId} action={action} />
      <div className={cn(portalDetailSectionBodyClass, bodyClassName)}>{children}</div>
    </section>
  );
}

export type PortalDetailSectionStackProps = ComponentPropsWithoutRef<"div">;

export function PortalDetailSectionStack({
  children,
  className,
  ...props
}: PortalDetailSectionStackProps) {
  return (
    <div className={cn(portalDetailSectionStackClass, className)} {...props}>
      {children}
    </div>
  );
}

export type PortalDetailBlockTitleProps = ComponentPropsWithoutRef<"h4"> & {
  titleId?: string;
};

/** 卡内小标题：text-14 · 无底部分割线（分割线由 PortalDetailDividedStack 提供） */
export function PortalDetailBlockTitle({
  children,
  titleId,
  className,
  ...props
}: PortalDetailBlockTitleProps) {
  return (
    <h4 id={titleId} className={cn(portalDetailBlockTitleClass, className)} {...props}>
      {children}
    </h4>
  );
}

export type PortalDetailDividedStackProps = ComponentPropsWithoutRef<"div">;

/** 卡内多块：非首块 `border-t border-gray-border-strong`（对齐 Proposal 服务信息 / 供应商信息） */
export function PortalDetailDividedStack({
  children,
  className,
  ...props
}: PortalDetailDividedStackProps) {
  return (
    <div className={cn(portalDetailDividedStackClass, className)} {...props}>
      {children}
    </div>
  );
}

export type PortalDetailCardFooterProps = ComponentPropsWithoutRef<"div">;

/** 白卡底部操作：顶部分割线 + 右对齐按钮槽（保存 / 修改等） */
export function PortalDetailCardFooter({
  children,
  className,
  ...props
}: PortalDetailCardFooterProps) {
  return (
    <div className={cn(portalDetailCardFooterClass, className)} {...props}>
      {children}
    </div>
  );
}

export type PortalDetailPanelSurfaceProps = ComponentPropsWithoutRef<"div">;

export function PortalDetailPanelSurface({
  children,
  className,
  ...props
}: PortalDetailPanelSurfaceProps) {
  return (
    <div className={cn(portalDetailPanelSurfaceClass, className)} {...props}>
      {children}
    </div>
  );
}

export type PortalDetailFormLabelProps = ComponentPropsWithoutRef<"span"> & {
  required?: boolean;
};

export function PortalDetailFormLabel({
  children,
  required,
  className,
  ...props
}: PortalDetailFormLabelProps) {
  return (
    <span className={cn(portalDetailFormLabelClass, className)} {...props}>
      {children}
      {required ? <span className="text-semantic-error-default"> *</span> : null}
    </span>
  );
}

export type PortalDetailSubsectionHeadingProps = {
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
};

export function PortalDetailSubsectionHeading({
  children,
  icon,
  className,
}: PortalDetailSubsectionHeadingProps) {
  return (
    <h4 className={cn(portalDetailSubsectionHeadingClass, className)}>
      {icon ? <span className="flex shrink-0 items-center justify-center">{icon}</span> : null}
      {children}
    </h4>
  );
}

export type PortalDetailFormHintVariant = "default" | "warning" | "error";

const FORM_HINT_VARIANT_ICON = {
  default: Info,
  warning: TriangleAlert,
  error: CircleX,
} as const;

const FORM_HINT_VARIANT_CLASS: Record<
  Exclude<PortalDetailFormHintVariant, "default">,
  string
> = {
  warning: portalDetailFormHintWarningClass,
  error: portalDetailFormHintErrorClass,
};

export type PortalDetailFormHintProps = Omit<ComponentPropsWithoutRef<"div">, "title"> & {
  /** 小标题（与图标、正文同一行） */
  title?: ReactNode;
  /** default = Info 灰字；warning / error = 语义字色 + 对应图标（无底色） */
  variant?: PortalDetailFormHintVariant;
  /** 自定义图标；传 `null` 隐藏默认图标 */
  icon?: ReactNode | null;
};

/** 详情表单提示：放在表单项下方；图标 + 小标题 + 正文一行对齐 */
export function PortalDetailFormHint({
  title,
  children,
  variant = "default",
  icon,
  className,
  ...props
}: PortalDetailFormHintProps) {
  const DefaultIcon = FORM_HINT_VARIANT_ICON[variant];
  const showIcon = icon !== null;
  const resolvedIcon =
    icon === undefined ? (
      <DefaultIcon className="portal-detail-form-hint-icon" strokeWidth={2} aria-hidden />
    ) : (
      icon
    );
  const variantClass = variant === "default" ? undefined : FORM_HINT_VARIANT_CLASS[variant];

  return (
    <div
      role={variant === "error" ? "alert" : "note"}
      className={cn(portalDetailFormHintClass, variantClass, className)}
      {...props}
    >
      {showIcon ? resolvedIcon : null}
      {title ? <p className="portal-detail-form-hint-title">{title}</p> : null}
      {children != null ? (
        <div className="portal-detail-form-hint-desc">{children}</div>
      ) : null}
    </div>
  );
}
