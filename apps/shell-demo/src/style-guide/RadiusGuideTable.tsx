import { useEffect, useRef, useState } from "react";
import type { RadiusToken } from "./tokenCatalog";

function useCssVarValue(cssVar: string) {
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(getComputedStyle(document.documentElement).getPropertyValue(cssVar).trim());
  }, [cssVar]);

  return value;
}

function RadiusPreview({ token }: { token: RadiusToken }) {
  const previewRef = useRef<HTMLDivElement>(null);
  const [resolved, setResolved] = useState("");
  const isPill = token.name === "radius-full" || token.name === "radius-pill";
  const usesTailwindClass = token.tailwind !== "—";

  useEffect(() => {
    if (!previewRef.current) return;
    setResolved(getComputedStyle(previewRef.current).borderRadius);
  }, [token.cssVar, token.tailwind]);

  return (
    <div className="flex items-center gap-2">
      <div
        ref={previewRef}
        className={`shrink-0 border-2 border-brand bg-white ${usesTailwindClass ? token.tailwind : ""} ${isPill ? "h-6 w-12" : "size-10"}`}
        style={usesTailwindClass ? undefined : { borderRadius: `var(${token.cssVar})` }}
        aria-hidden
      />
      {resolved ? <span className="font-mono text-12 text-gray-text-7">{resolved}</span> : null}
    </div>
  );
}

function RadiusValueCell({ cssVar }: { cssVar: string }) {
  const value = useCssVarValue(cssVar);
  return <span className="font-mono text-13 text-gray-text-3">{value || "—"}</span>;
}

export function RadiusGuideTable({ tokens }: { tokens: RadiusToken[] }) {
  return (
    <div className="portal-list-card overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse text-left">
        <thead>
          <tr className="border-b border-gray-border-light">
            <th className="px-4 py-3 text-13 font-medium text-gray-text-4">Token 名称</th>
            <th className="px-4 py-3 text-13 font-medium text-gray-text-4">适用场景</th>
            <th className="px-4 py-3 text-13 font-medium text-gray-text-4">值（参考）*</th>
            <th className="px-4 py-3 text-13 font-medium text-gray-text-4">Tailwind</th>
            <th className="px-4 py-3 text-13 font-medium text-gray-text-4">视觉预览</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-border-light">
          {tokens.map((token) => (
            <tr key={token.name}>
              <td className="px-4 py-3 align-top">
                <code className="text-13 text-gray-text-2">{token.name}</code>
                <p className="mt-1 font-mono text-12 text-gray-text-7">{token.cssVar}</p>
              </td>
              <td className="px-4 py-3 align-top text-13 text-gray-text-4">
                {token.suitableFor ?? token.usage ?? "—"}
              </td>
              <td className="px-4 py-3 align-top">
                <RadiusValueCell cssVar={token.cssVar} />
              </td>
              <td className="px-4 py-3 align-top">
                <code className="text-13 text-gray-text-5">{token.tailwind}</code>
              </td>
              <td className="px-4 py-3 align-top">
                <RadiusPreview token={token} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function RadiusAliasTable({ tokens }: { tokens: RadiusToken[] }) {
  return (
    <div className="portal-list-card overflow-x-auto">
      <table className="w-full min-w-[560px] border-collapse text-left">
        <thead>
          <tr className="border-b border-gray-border-light">
            <th className="px-4 py-3 text-13 font-medium text-gray-text-4">语义别名</th>
            <th className="px-4 py-3 text-13 font-medium text-gray-text-4">适用场景</th>
            <th className="px-4 py-3 text-13 font-medium text-gray-text-4">指向阶梯</th>
            <th className="px-4 py-3 text-13 font-medium text-gray-text-4">Tailwind</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-border-light">
          {tokens.map((token) => (
            <tr key={token.name}>
              <td className="px-4 py-3 align-top">
                <code className="text-13 text-gray-text-2">{token.name}</code>
                <p className="mt-1 font-mono text-12 text-gray-text-7">{token.cssVar}</p>
              </td>
              <td className="px-4 py-3 align-top text-13 text-gray-text-4">
                {token.suitableFor ?? token.usage ?? "—"}
              </td>
              <td className="px-4 py-3 align-top text-13 text-gray-text-5">
                {token.pointsTo ? (
                  <>
                    <code className="text-gray-text-3">{token.pointsTo}</code>
                    {token.usage ? <span className="text-gray-text-7"> · {token.usage}</span> : null}
                  </>
                ) : (
                  (token.usage ?? "—")
                )}
              </td>
              <td className="px-4 py-3 align-top">
                <code className="text-13 text-gray-text-5">{token.tailwind}</code>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
