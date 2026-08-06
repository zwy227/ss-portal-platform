import { useEffect, useState, type CSSProperties } from "react";
import type { TokenSwatch } from "./tokenCatalog";

function readCssVar(name: string): string {
  if (typeof document === "undefined") return "";
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function copyText(value: string): Promise<void> {
  if (navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(value);
  }
  const el = document.createElement("textarea");
  el.value = value;
  el.setAttribute("readonly", "");
  el.style.position = "fixed";
  el.style.left = "-9999px";
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
  return Promise.resolve();
}

/** 业务优先复制 Tailwind 类；无则复制 CSS 变量名 */
function copyValueFor(token: TokenSwatch): string {
  return token.tailwind ?? token.cssVar;
}

function swatchStyle(token: TokenSwatch): CSSProperties {
  if (
    token.name.startsWith("gray-text") ||
    token.name === "portal-text-link" ||
    token.name === "semantic-warning-text"
  ) {
    return {
      color: `var(${token.cssVar})`,
      background: "var(--background)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    };
  }
  if (token.name.startsWith("gray-border")) {
    return {
      borderWidth: 3,
      borderStyle: "solid",
      borderColor: `var(${token.cssVar})`,
      background: "var(--background)",
    };
  }
  if (token.name.startsWith("focus-ring")) {
    return {
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: token.name.includes("brand") ? "var(--brand)" : "var(--gray-border-black)",
      background: "var(--background)",
      boxShadow: `var(${token.cssVar})`,
    };
  }
  return { background: `var(${token.cssVar})` };
}

function TokenMeta({
  token,
  resolved,
  copied,
}: {
  token: TokenSwatch;
  resolved: string;
  copied: boolean;
}) {
  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <p className="text-14 font-medium text-gray-text-2">{token.name}</p>
        <span
          className={`shrink-0 text-12 ${copied ? "text-brand" : "text-gray-text-7"}`}
          aria-live="polite"
        >
          {copied ? "已复制" : "点击复制"}
        </span>
      </div>
      <p className="font-mono text-12 text-gray-text-5">{token.cssVar}</p>
      {resolved ? <p className="font-mono text-12 text-gray-text-7">{resolved}</p> : null}
      {token.tailwind ? <p className="text-12 text-gray-text-4">{token.tailwind}</p> : null}
      {token.usage ? <p className="text-12 text-gray-text-5">{token.usage}</p> : null}
    </div>
  );
}

export function TokenSwatchCard({ token }: { token: TokenSwatch }) {
  const [resolved, setResolved] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setResolved(readCssVar(token.cssVar));
  }, [token.cssVar]);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 1500);
    return () => window.clearTimeout(id);
  }, [copied]);

  const isTextSwatch =
    token.name.startsWith("gray-text") ||
    token.name === "portal-text-link" ||
    token.name === "semantic-warning-text";

  const value = copyValueFor(token);

  async function handleCopy() {
    try {
      await copyText(value);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      title={`复制 ${value}`}
      aria-label={`复制 ${value}`}
      className="portal-list-card flex w-full cursor-pointer flex-col gap-2 p-3 text-left transition-colors hover:border-gray-border-strong focus-visible:outline-none focus-visible:shadow-focus-brand"
    >
      {token.preview === "badge" && token.badgeVariant ? (
        <div className="flex h-14 w-full items-center justify-center rounded-md border border-gray-border-normal bg-background">
          <span className={`portal-badge portal-badge--${token.badgeVariant}`}>
            {token.badgeLabel ?? "示例"}
          </span>
        </div>
      ) : token.preview === "glass" ? (
        <div
          className="relative h-14 w-full overflow-hidden rounded-md border border-gray-border-normal"
          style={{ background: "var(--page-bg)" }}
        >
          <div
            className="absolute inset-2 rounded-sm border border-gray-border-light"
            style={{
              background: `var(${token.cssVar})`,
              backdropFilter: "blur(var(--blur-card))",
              WebkitBackdropFilter: "blur(var(--blur-card))",
            }}
          />
        </div>
      ) : (
        <div className="h-14 w-full rounded-md border border-gray-border-normal" style={swatchStyle(token)}>
          {isTextSwatch ? <span className="text-16 font-medium">Aa 正文</span> : null}
        </div>
      )}
      <TokenMeta token={token} resolved={resolved} copied={copied} />
    </button>
  );
}

export function TokenGrid({ tokens }: { tokens: TokenSwatch[] }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {tokens.map((t) => (
        <TokenSwatchCard key={t.name} token={t} />
      ))}
    </div>
  );
}
