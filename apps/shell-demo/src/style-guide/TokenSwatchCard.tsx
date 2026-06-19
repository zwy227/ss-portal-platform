import { useEffect, useState, type CSSProperties } from "react";
import type { TokenSwatch } from "./tokenCatalog";

function readCssVar(name: string): string {
  if (typeof document === "undefined") return "";
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
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

export function TokenSwatchCard({ token }: { token: TokenSwatch }) {
  const [resolved, setResolved] = useState("");

  useEffect(() => {
    setResolved(readCssVar(token.cssVar));
  }, [token.cssVar]);

  const isTextSwatch =
    token.name.startsWith("gray-text") ||
    token.name === "portal-text-link" ||
    token.name === "semantic-warning-text";

  if (token.preview === "badge" && token.badgeVariant) {
    return (
      <div className="portal-list-card flex flex-col gap-2 p-3">
        <div className="flex h-14 w-full items-center justify-center rounded-md border border-gray-border-normal bg-background">
          <span className={`portal-badge portal-badge--${token.badgeVariant}`}>
            {token.badgeLabel ?? "示例"}
          </span>
        </div>
        <div>
          <p className="text-14 font-medium text-gray-text-2">{token.name}</p>
          <p className="font-mono text-12 text-gray-text-5">{token.cssVar}</p>
          {resolved ? <p className="font-mono text-12 text-gray-text-7">{resolved}</p> : null}
          {token.tailwind ? <p className="text-12 text-gray-text-4">{token.tailwind}</p> : null}
          {token.usage ? <p className="text-12 text-gray-text-5">{token.usage}</p> : null}
        </div>
      </div>
    );
  }

  return (
    <div className="portal-list-card flex flex-col gap-2 p-3">
      <div className="h-14 w-full rounded-md border border-gray-border-normal" style={swatchStyle(token)}>
        {isTextSwatch ? <span className="text-16 font-medium">Aa 正文</span> : null}
      </div>
      <div>
        <p className="text-14 font-medium text-gray-text-2">{token.name}</p>
        <p className="font-mono text-12 text-gray-text-5">{token.cssVar}</p>
        {resolved ? <p className="font-mono text-12 text-gray-text-7">{resolved}</p> : null}
        {token.tailwind ? <p className="text-12 text-gray-text-4">{token.tailwind}</p> : null}
        {token.usage ? <p className="text-12 text-gray-text-5">{token.usage}</p> : null}
      </div>
    </div>
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
