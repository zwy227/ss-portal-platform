import { StyleGuideCategory, StyleGuidePage, StyleGuideShell } from "../style-guide/StyleGuideShell";
import {
  COMPONENT_GALLERY_ENTRIES,
  ComponentEntryCard,
  PAGE_FRAMEWORK_ENTRIES,
} from "../style-guide/ComponentEntryCard";

function EntryGrid({ entries }: { entries: typeof COMPONENT_GALLERY_ENTRIES }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {entries.map((entry) => (
        <ComponentEntryCard key={entry.id} entry={entry} />
      ))}
    </div>
  );
}

/** 组件入口目录 — 卡片网格，跳转至组件详情 */
export function BlankPage() {
  return (
    <StyleGuideShell>
      <StyleGuidePage
        title="组件预览"
        description="以卡片浏览 portal-* 与 @ss/portal-ui 组件；点击进入该组件的独立详情页。"
      >
        <StyleGuideCategory
          title="页面框架"
          description="列表页与详情页的布局骨架（去业务内容）；对齐 docs/frameworks。"
        >
          <EntryGrid entries={PAGE_FRAMEWORK_ENTRIES} />
        </StyleGuideCategory>

        <StyleGuideCategory
          title="基础组件"
          description="portal-* 组合类与 @ss/portal-ui 组件入口。"
        >
          <EntryGrid entries={COMPONENT_GALLERY_ENTRIES} />
        </StyleGuideCategory>
      </StyleGuidePage>
    </StyleGuideShell>
  );
}
