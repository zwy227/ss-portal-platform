import { useState } from "react";
import { Search } from "lucide-react";
import {
  PortalAntCascader,
  PortalAntDateRangePicker,
  PortalAntSelect,
  type PortalAntDateRangePickerProps,
} from "@ss/portal-ui";

const STATUS_OPTIONS = [
  { value: "pending", label: "待提交订单" },
  { value: "quoted", label: "已报价" },
  { value: "expired", label: "已失效" },
];

const CASCADER_OPTIONS = [
  {
    value: "ca",
    label: "加拿大",
    children: [
      { value: "montreal", label: "Montreal" },
      { value: "ottawa", label: "Ottawa" },
    ],
  },
  {
    value: "us",
    label: "美国",
    children: [
      { value: "la", label: "Los Angeles" },
      { value: "ny", label: "New York" },
    ],
  },
];

export function UiAntFilterExamples() {
  const [dateRange, setDateRange] = useState<PortalAntDateRangePickerProps["value"]>(null);
  const [status, setStatus] = useState<string | undefined>(undefined);
  const [statuses, setStatuses] = useState<string[]>([]);
  const [location, setLocation] = useState<string[]>([]);

  return (
    <div className="portal-list-card flex flex-wrap items-center gap-3">
      <div className="relative min-w-[200px] flex-1">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 portal-filter-icon"
          strokeWidth={1.75}
          aria-hidden
        />
        <input type="search" className="portal-filter-input" placeholder="搜索订单号…" />
      </div>
      <div className="min-w-[240px]">
        <PortalAntDateRangePicker
          value={dateRange}
          onChange={(next) => setDateRange(next)}
          aria-label="日期范围筛选"
        />
      </div>
      <div className="min-w-[140px]">
        <PortalAntSelect
          placeholder="状态"
          allowClear
          value={status}
          onChange={setStatus}
          options={STATUS_OPTIONS}
          aria-label="状态筛选"
        />
      </div>
      <div className="min-w-[140px]">
        <PortalAntSelect
          mode="multiple"
          placeholder="状态"
          allowClear
          maxTagCount="responsive"
          value={statuses.length ? statuses : undefined}
          onChange={(next) => setStatuses(next as string[])}
          options={STATUS_OPTIONS}
          notFoundContent="暂无匹配状态"
          aria-label="状态多选筛选"
        />
      </div>
      <div className="min-w-[168px]">
        <PortalAntCascader
          placeholder="国家 / 城市"
          allowClear
          value={location.length ? location : undefined}
          onChange={(next) => setLocation((next ?? []) as string[])}
          options={CASCADER_OPTIONS}
          notFoundContent="暂无匹配地区"
          aria-label="国家与城市筛选"
        />
      </div>
    </div>
  );
}
