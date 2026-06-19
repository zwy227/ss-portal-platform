type BadgeVariant = "neutral" | "success" | "warning" | "info";

const BADGE_VARIANTS: {
  variant: BadgeVariant;
  label: string;
  className: string;
  bgToken: string;
  textToken: string;
}[] = [
  {
    variant: "neutral",
    label: "灰色",
    className: "portal-badge portal-badge--neutral",
    bgToken: "semantic-neutral-light → gray-fill-normal",
    textToken: "semantic-neutral-text → gray-text-5",
  },
  {
    variant: "success",
    label: "成功",
    className: "portal-badge portal-badge--success",
    bgToken: "semantic-success-light",
    textToken: "semantic-success-text",
  },
  {
    variant: "warning",
    label: "待办",
    className: "portal-badge portal-badge--warning",
    bgToken: "semantic-warning-bg",
    textToken: "semantic-warning-text",
  },
  {
    variant: "info",
    label: "普通",
    className: "portal-badge portal-badge--info",
    bgToken: "semantic-info-bg",
    textToken: "semantic-info-text",
  },
];

/** 拖柜报价单列表常见状态 — 对齐 SSLTLDemo DrayageQuoteOrderStatusBadge */
const STATUS_BADGE_EXAMPLES: { label: string; variant: BadgeVariant }[] = [
  { label: "人工报价中", variant: "info" },
  { label: "待下单", variant: "warning" },
  { label: "已下单", variant: "success" },
  { label: "已取消", variant: "neutral" },
  { label: "已失效", variant: "neutral" },
];

function badgeClass(variant: BadgeVariant) {
  return `portal-badge portal-badge--${variant}`;
}

export function BadgeStyleExamples() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-3 text-13 text-gray-text-5">
          基础类 <code className="text-13">portal-badge</code> · 圆角{" "}
          <code className="text-13">rounded-badge</code>（2px / radius-xs）· 修饰符：{" "}
          <code className="text-13">portal-badge--neutral | --success | --warning | --info</code>
        </p>
        <div className="portal-list-card overflow-x-auto">
          <table className="w-full min-w-[36rem] border-collapse text-left text-13">
            <thead>
              <tr className="border-b border-gray-border-light text-12 text-gray-text-5">
                <th className="px-4 py-2 font-medium">档位</th>
                <th className="px-4 py-2 font-medium">组合类</th>
                <th className="px-4 py-2 font-medium">Token（底 · 字）</th>
                <th className="px-4 py-2 font-medium">预览</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-border-light">
              {BADGE_VARIANTS.map((row) => (
                <tr key={row.variant}>
                  <td className="px-4 py-3 font-medium text-gray-text-2">{row.label}</td>
                  <td className="px-4 py-3 font-mono text-12 text-gray-text-4">{row.className}</td>
                  <td className="px-4 py-3 font-mono text-12 text-gray-text-5">
                    {row.bgToken} · {row.textToken}
                  </td>
                  <td className="px-4 py-3">
                    <span className={row.className}>示例</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <p className="mb-3 text-13 text-gray-text-5">
          业务状态示例（报价单列表）：有待办 → warning（橙）；普通进行中 → info（蓝）
        </p>
        <div className="portal-list-card max-w-xs divide-y divide-gray-border-light p-0">
          {STATUS_BADGE_EXAMPLES.map((item) => (
            <div key={item.label} className="flex items-center px-4 py-3">
              <span className={badgeClass(item.variant)}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
