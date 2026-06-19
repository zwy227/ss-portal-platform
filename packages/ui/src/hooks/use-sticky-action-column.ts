import { useEffect, useRef, useState } from "react";
import {
  buildStickyActionTdClass,
  buildStickyActionThClass,
} from "../lib/portal-table-styles";

export { buildStickyActionTdClass, buildStickyActionThClass };

export function useStickyActionColumn(deps: unknown[] = []) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hasHorizontalOverflow, setHasHorizontalOverflow] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const checkOverflow = () => {
      setHasHorizontalOverflow(el.scrollWidth > el.clientWidth + 1);
    };

    checkOverflow();

    const observer = new ResizeObserver(checkOverflow);
    observer.observe(el);

    const table = el.querySelector("table");
    if (table) observer.observe(table);

    window.addEventListener("resize", checkOverflow);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", checkOverflow);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- re-check when table content/size inputs change
  }, deps);

  return { scrollRef, hasHorizontalOverflow };
}
