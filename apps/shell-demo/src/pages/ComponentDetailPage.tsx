import { Navigate, useParams } from "react-router";
import { formatPortalBackLabel, PortalDetailBackLink } from "@ss/portal-shell";
import { COMPONENT_PREVIEW_NAV_ID, DEMO_NAV } from "../demoNav";
import { getComponentEntry } from "../style-guide/ComponentEntryCard";
import { COMPONENT_DETAIL_BODY } from "../style-guide/componentDetailBody";
import { StyleGuideShell } from "../style-guide/StyleGuideShell";

/** 组件预览卡片 → 独立详情页（/blank/:componentId） */
export function ComponentDetailPage() {
  const { componentId } = useParams<{ componentId: string }>();
  const entry = getComponentEntry(componentId);
  const bodyId = componentId === "detail" ? "form" : componentId;
  const body = bodyId ? COMPONENT_DETAIL_BODY[bodyId] : undefined;

  if (!entry || !body) {
    return <Navigate to="/blank" replace />;
  }

  const backLabel = formatPortalBackLabel(DEMO_NAV, COMPONENT_PREVIEW_NAV_ID, "组件预览");
  const Icon = entry.icon;

  return (
    <StyleGuideShell>
      <main className="portal-page-main--detail">
        <header className="flex shrink-0 items-start gap-3 border-b border-gray-border-light bg-background px-8 py-4">
          <PortalDetailBackLink to="/blank" label={backLabel} />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <Icon className="size-5 shrink-0 text-gray-text-5" strokeWidth={1.75} aria-hidden />
              <h1 className="portal-page-detail-title text-gray-text-1">{entry.title}</h1>
              <span className="rounded-md bg-gray-fill-normal px-2 py-0.5 text-12 text-gray-text-5">
                {entry.source}
              </span>
            </div>
            <p className="mt-1.5 max-w-3xl text-14 text-gray-text-5">{entry.description}</p>
          </div>
        </header>

        <div className="portal-page-detail-scroll px-8 py-6">
          <div className="flex flex-col gap-4">{body}</div>
        </div>
      </main>
    </StyleGuideShell>
  );
}
