import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * SS Portal 字号 token（text-11 … text-32）与 text-white / text-gray-text-* 共用 `text-` 前缀。
 * 默认 twMerge 会把 text-14 当成文字色删掉，导致字号回退为 Radix Themes 的 16px。
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["11", "12", "13", "14", "15", "16", "18", "20", "22", "24", "32"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
