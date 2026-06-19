import {
  BRAND_TOKENS,
  GRAY_BORDER_TOKENS,
  GRAY_FILL_TOKENS,
  GRAY_TEXT_TOKENS,
  PAGE_BG_TOKENS,
  SEMANTIC_TOKENS,
} from "../style-guide/tokenCatalog";
import { StyleGuidePage, StyleGuideSection, StyleGuideShell } from "../style-guide/StyleGuideShell";
import { TokenGrid } from "../style-guide/TokenSwatchCard";

export function TokensPage() {
  return (
    <StyleGuideShell>
      <StyleGuidePage
        title="Token 色板"
        description="与 packages/tokens/theme.css 同步。圆角见侧栏「圆角规范」，可与 SSLTLDemo (5173) 拖柜页并排对比。"
      >
        <StyleGuideSection title="品牌色 Brand">
          <TokenGrid tokens={BRAND_TOKENS} />
        </StyleGuideSection>

        <StyleGuideSection title="文字灰阶 Gray Text">
          <TokenGrid tokens={GRAY_TEXT_TOKENS} />
        </StyleGuideSection>

        <StyleGuideSection title="边框 Gray Border">
          <TokenGrid tokens={GRAY_BORDER_TOKENS} />
        </StyleGuideSection>

        <StyleGuideSection title="填充 Gray Fill">
          <TokenGrid tokens={GRAY_FILL_TOKENS} />
        </StyleGuideSection>

        <StyleGuideSection title="页面背景">
          <TokenGrid tokens={PAGE_BG_TOKENS} />
        </StyleGuideSection>

        <StyleGuideSection title="语义色 · 强调色">
          <TokenGrid tokens={SEMANTIC_TOKENS} />
        </StyleGuideSection>

        <StyleGuideSection title="侧栏导航（on brand）">
          <div className="overflow-hidden rounded-lg" style={{ background: "var(--brand)" }}>
            <div className="flex max-w-xs flex-col gap-1 p-2">
              <button type="button" className="portal-nav-row portal-nav-row--primary">
                <span className="flex-1 text-left">拖柜运输</span>
              </button>
              <button type="button" className="portal-nav-row portal-nav-row--sub portal-nav-row--active">
                报价记录
              </button>
              <button type="button" className="portal-nav-row portal-nav-row--sub">
                订单管理
              </button>
            </div>
          </div>
          <p className="mt-2 text-12 text-gray-text-5">
            hover: <code className="text-13">--sidebar-nav-hover</code> · active:{" "}
            <code className="text-13">--sidebar-nav-active</code> /{" "}
            <code className="text-13">--sidebar-nav-sub-active</code>
          </p>
        </StyleGuideSection>
      </StyleGuidePage>
    </StyleGuideShell>
  );
}
