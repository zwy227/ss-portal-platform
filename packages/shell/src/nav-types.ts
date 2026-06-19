export type PortalNavNode = {
  id: string;
  label: string;
  /** 有则渲染为可导航链接 */
  to?: string;
  children?: PortalNavNode[];
};

export type ResolveActiveChildId = (
  groupId: string,
  pathname: string,
  search: string,
  children: PortalNavNode[],
) => string | null;

export function getPortalNavNodeLabel(nav: PortalNavNode[], id: string): string | undefined {
  for (const node of nav) {
    if (node.id === id) return node.label;
    const child = node.children?.find((c) => c.id === id);
    if (child) return child.label;
  }
  return undefined;
}

export function formatPortalBackLabel(nav: PortalNavNode[], navNodeId: string, fallback?: string): string {
  const label = getPortalNavNodeLabel(nav, navNodeId) ?? fallback;
  return label ? `返回${label}` : "返回";
}
