import { useEffect, useRef, useState } from "react";
import type { RadiusToken } from "./tokenCatalog";

export function RadiusSwatchCard({ token }: { token: RadiusToken }) {
  const previewRef = useRef<HTMLDivElement>(null);
  const [resolved, setResolved] = useState("");

  useEffect(() => {
    if (!previewRef.current) return;
    setResolved(getComputedStyle(previewRef.current).borderRadius);
  }, [token.cssVar, token.tailwind]);

  const isPill = token.name === "radius-full" || token.name === "radius-pill";
  const usesTailwindClass = token.tailwind !== "—";

  return (
    <div className="portal-list-card flex flex-col gap-2 p-3">
      <div className="flex h-16 items-center justify-center bg-page-bg">
        <div
          ref={previewRef}
          className={`border-2 border-brand bg-white ${usesTailwindClass ? token.tailwind : ""} ${isPill ? "h-8 w-20" : "size-14"}`}
          style={usesTailwindClass ? undefined : { borderRadius: `var(${token.cssVar})` }}
        />
      </div>
      <div>
        <p className="text-14 font-medium text-gray-text-2">{token.name}</p>
        <p className="font-mono text-12 text-gray-text-5">{token.cssVar}</p>
        {resolved ? <p className="font-mono text-12 text-gray-text-7">{resolved}</p> : null}
        <p className="text-12 text-gray-text-4">{token.tailwind}</p>
        {token.usage ? <p className="text-12 text-gray-text-5">{token.usage}</p> : null}
      </div>
    </div>
  );
}

export function RadiusGrid({ tokens }: { tokens: RadiusToken[] }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {tokens.map((t) => (
        <RadiusSwatchCard key={t.name} token={t} />
      ))}
    </div>
  );
}
