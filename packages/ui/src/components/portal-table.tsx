import { ArrowUpDown } from "lucide-react";
import * as React from "react";
import { cn } from "../lib/utils";
import {
  portalTableListCellTextClass,
  portalTableTdFirstClass,
  portalTableTdMidClass,
  portalTableTdRowDividerClass,
  portalTableThFirstClass,
  portalTableThMidClass,
} from "../lib/portal-table-styles";

export type PortalTableRootProps = React.HTMLAttributes<HTMLDivElement>;

export const PortalTableRoot = React.forwardRef<HTMLDivElement, PortalTableRootProps>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn("overflow-x-auto", className)} {...props} />;
  },
);

PortalTableRoot.displayName = "PortalTableRoot";

export type PortalTableProps = React.TableHTMLAttributes<HTMLTableElement>;

export function PortalTable({ className, ...props }: PortalTableProps) {
  return <table className={cn("w-full min-w-[960px]", className)} {...props} />;
}

export type PortalTableHeadProps = React.HTMLAttributes<HTMLTableSectionElement>;

export function PortalTableHead(props: PortalTableHeadProps) {
  return <thead {...props} />;
}

export type PortalTableBodyProps = React.HTMLAttributes<HTMLTableSectionElement>;

export function PortalTableBody(props: PortalTableBodyProps) {
  return <tbody {...props} />;
}

export type PortalTableRowProps = React.HTMLAttributes<HTMLTableRowElement>;

export function PortalTableRow({ className, ...props }: PortalTableRowProps) {
  return (
    <tr
      className={cn(
        "group transition-colors last:[&_td]:border-b-0 hover:bg-gray-fill-light",
        className,
      )}
      {...props}
    />
  );
}

export type PortalTableHeadCellProps = React.ThHTMLAttributes<HTMLTableCellElement> & {
  columnAlign?: "first" | "mid";
};

export function PortalTableHeadCell({
  columnAlign = "mid",
  className,
  ...props
}: PortalTableHeadCellProps) {
  return (
    <th
      className={cn(
        columnAlign === "first" ? portalTableThFirstClass : portalTableThMidClass,
        className,
      )}
      {...props}
    />
  );
}

export type PortalTableCellProps = React.TdHTMLAttributes<HTMLTableCellElement> & {
  columnAlign?: "first" | "mid";
  withDivider?: boolean;
};

export function PortalTableCell({
  columnAlign = "mid",
  withDivider = true,
  className,
  ...props
}: PortalTableCellProps) {
  return (
    <td
      className={cn(
        columnAlign === "first" ? portalTableTdFirstClass : portalTableTdMidClass,
        withDivider && portalTableTdRowDividerClass,
        className,
      )}
      {...props}
    />
  );
}

export function PortalTableSortHeader({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1">
      {label}
      <ArrowUpDown className="size-3.5 opacity-40" strokeWidth={1.75} aria-hidden />
    </span>
  );
}

export function PortalTableEmptyCell() {
  return <span className={portalTableListCellTextClass}>—</span>;
}
