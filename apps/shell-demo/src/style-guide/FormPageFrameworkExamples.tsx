import type { ReactNode } from "react";
import { Link } from "react-router";
import { PortalDetailBackButton } from "@ss/portal-shell";
import { Button } from "@ss/portal-ui";
import { componentDetailPath } from "./ComponentEntryCard";

/* ── 结构常量（去业务语义的框架占位） ── */

const WHITE_CARD_STYLE = { boxShadow: "var(--elevation-sm)" } as const;

/* ── 子件：顶栏 / 白卡 / 字段占位 / 操作区 ── */

function FrameworkHeader({
  title = "表单标题",
  backLabel = "返回列表",
  status = "状态",
}: {
  title?: string;
  backLabel?: string;
  status?: string;
}) {
  return (
    <header className="mb-1">
      <div className="flex min-w-0 flex-wrap items-center gap-3">
        <PortalDetailBackButton label={backLabel} onClick={() => undefined} />
        <h1 className="portal-page-detail-title text-gray-text-1">{title}</h1>
        <span className="portal-badge portal-badge--info">{status}</span>
      </div>
    </header>
  );
}

function FieldRowPlaceholder({ cols = 2 }: { cols?: 1 | 2 }) {
  return (
    <div
      className={cols === 2 ? "grid gap-3 sm:grid-cols-2" : "flex flex-col gap-3"}
      aria-hidden
    >
      {Array.from({ length: cols === 2 ? 2 : 1 }).map((_, i) => (
        <div key={i} className="flex flex-col gap-1.5">
          <span className="h-2 w-12 rounded-sm bg-gray-fill-strong" />
          <span className="h-8 rounded-input bg-page-bg ring-1 ring-gray-border-strong" />
        </div>
      ))}
    </div>
  );
}

function FormWhiteCard({
  title,
  children,
  footer,
}: {
  title?: string;
  children?: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div
      className="flex min-h-0 flex-col rounded-lg bg-background px-5 py-5 sm:px-6"
      style={WHITE_CARD_STYLE}
    >
      {title ? (
        <h2 className="m-0 text-16 font-semibold leading-snug tracking-[-0.01em] text-gray-text-1">
          {title}
        </h2>
      ) : null}
      <div className={title ? "mt-3 flex min-h-0 flex-1 flex-col gap-4" : "flex min-h-0 flex-1 flex-col gap-4"}>
        {children}
      </div>
      {footer ? (
        <div className="mt-auto flex flex-wrap items-center justify-end gap-2 border-t border-gray-border-light pt-4">
          {footer}
        </div>
      ) : null}
    </div>
  );
}

function StackedSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-3 border-t border-gray-border-light pt-5 first:border-t-0 first:pt-0">
      <h2 className="m-0 text-16 font-semibold leading-snug tracking-[-0.01em] text-gray-text-1">
        {title}
      </h2>
      {children}
    </section>
  );
}

function CardFooterActions() {
  return (
    <>
      <Button type="button" variant="outline">
        取消
      </Button>
      <button type="button" className="portal-brand-btn">
        提交
      </button>
    </>
  );
}

function PageBottomActionBar() {
  return (
    <footer
      className="relative z-10 shrink-0 border-t border-gray-border-normal bg-background px-5 py-3"
      role="toolbar"
      aria-label="页级底部操作"
    >
      <div className="mx-auto flex w-full flex-wrap items-center justify-end gap-2">
        <CardFooterActions />
      </div>
    </footer>
  );
}

function FrameworkPreviewShell({
  children,
  footer,
  constrain,
}: {
  children: ReactNode;
  footer?: ReactNode;
  /** 表单页常用 max-w-3xl 居中 */
  constrain?: boolean;
}) {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-gray-border-normal bg-page-bg">
      <div className="w-full px-5 pb-4 pt-5">
        {constrain ? <div className="mx-auto flex max-w-3xl flex-col">{children}</div> : children}
      </div>
      {footer}
    </div>
  );
}

function SlotHint({ children }: { children: ReactNode }) {
  return <p className="m-0 text-13 text-gray-text-5">{children}</p>;
}

function SpecLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link to={to} className="text-brand underline-offset-2 hover:underline">
      {children}
    </Link>
  );
}

/* ── 示例导出 ── */

/** 标准：顶栏 + 多白卡 Section 堆叠 + 页级底栏 */
export function FormPageStandardExample() {
  return (
    <FrameworkPreviewShell constrain footer={<PageBottomActionBar />}>
      <FrameworkHeader title="完善需求" />
      <div className="mt-4 flex flex-col gap-3">
        <FormWhiteCard title="基本信息">
          <SlotHint>PortalDetailCard + PortalDetailSection；字段用 portal-detail-form-*。</SlotHint>
          <FieldRowPlaceholder cols={2} />
          <FieldRowPlaceholder cols={1} />
        </FormWhiteCard>
        <FormWhiteCard title="货物与服务">
          <SlotHint>白卡纵向间距 gap-3；操作在页级底栏，不在卡内。</SlotHint>
          <FieldRowPlaceholder cols={2} />
        </FormWhiteCard>
      </div>
    </FrameworkPreviewShell>
  );
}

/** 同卡多 Section + 卡底操作（局部保存场景） */
export function FormPageStackedCardExample() {
  return (
    <FrameworkPreviewShell constrain>
      <FrameworkHeader title="仓库预约" status="待确认" />
      <div className="mt-4">
        <FormWhiteCard
          footer={
            <>
              <Button type="button" variant="outline">
                取消
              </Button>
              <button type="button" className="portal-brand-btn">
                保存
              </button>
            </>
          }
        >
          <StackedSection title="预约状态">
            <SlotHint>
              同卡多块用 PortalDetailSectionStack；卡底用 PortalDetailCardFooter。
            </SlotHint>
            <FieldRowPlaceholder cols={2} />
          </StackedSection>
          <StackedSection title="送货信息">
            <FieldRowPlaceholder cols={2} />
            <FieldRowPlaceholder cols={1} />
          </StackedSection>
        </FormWhiteCard>
      </div>
    </FrameworkPreviewShell>
  );
}

/** 与详情单栏对照：表单页通常 max-w-3xl 居中 */
export function FormPageWidthExample() {
  return (
    <div className="flex flex-col gap-4">
      <FrameworkPreviewShell constrain footer={<PageBottomActionBar />}>
        <FrameworkHeader title="窄幅表单（max-w-3xl）" />
        <div className="mt-4 flex flex-col gap-3">
          <FormWhiteCard title="分区">
            <SlotHint>完善需求 / 确认等客户端表单：主内容居中限宽。</SlotHint>
            <FieldRowPlaceholder cols={2} />
          </FormWhiteCard>
        </div>
      </FrameworkPreviewShell>
      <FrameworkPreviewShell footer={<PageBottomActionBar />}>
        <FrameworkHeader title="全宽表单" />
        <div className="mt-4 flex flex-col gap-3">
          <FormWhiteCard title="分区">
            <SlotHint>
              与{" "}
              <SpecLink to={componentDetailPath("detail-page")}>详情页单栏</SpecLink>{" "}
              一致时可全宽；字段控件仍见{" "}
              <SpecLink to={componentDetailPath("form")}>表单组件</SpecLink>。
            </SlotHint>
            <FieldRowPlaceholder cols={2} />
          </FormWhiteCard>
        </div>
      </FrameworkPreviewShell>
    </div>
  );
}

/** DOM 槽位说明 */
export function FormPageSlotSpecExample() {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-border-normal bg-background">
      <div className="border-b border-gray-border-light bg-page-bg px-4 py-3">
        <p className="m-0 text-13 text-gray-text-5">
          对齐 <code className="text-13">docs/frameworks/form-page.md</code>
          ；控件与 Section 原子见{" "}
          <SpecLink to={componentDetailPath("form")}>
            <code className="text-13">/blank/form</code>
          </SpecLink>
          。
        </p>
      </div>
      <pre className="m-0 overflow-x-auto p-4 text-12 leading-relaxed text-gray-text-3">{`AppShell
└─ main.portal-page-main--detail
   ├─ 可滚动区
   │  └─ Header（返回 / 标题 / 状态）
   │     └─ 主内容（常 max-w-3xl 居中）
   │        └─ PortalDetailCard × N（gap-3）
   │             ├─ PortalDetailSection | SectionStack
   │             │    └─ portal-detail-form-* 字段
   │             └─ [可选] PortalDetailCardFooter
   └─ [可选] 页级底栏操作（border-t + 右对齐按钮）`}</pre>
    </div>
  );
}
