import type { ComponentPropsWithoutRef, CSSProperties, ReactNode } from "react";
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

/** 路线卡 / 只读面板浅灰表面 */
export const portalDetailPanelSurfaceClass = "portal-detail-panel-surface";

export const portalDetailFormLabelClass = "portal-detail-form-label";

export const portalDetailFormLegendClass = "portal-detail-form-legend";

export const portalDetailFormHintClass = "portal-detail-form-hint";

export const portalDetailSubsectionHeadingClass = "portal-detail-subsection-heading";

export const portalDetailFormInputClass = "portal-detail-form-input";

export const portalDetailFormTextareaClass = "portal-detail-form-textarea";

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
