import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, GitBranch, Loader } from "lucide-react";

/** 安装 / 接入步骤序列 — 对齐 /guide */
const TASK_SEQUENCES = [
  {
    status: "从 GitHub 接入",
    lines: [
      "clone ss-portal-platform 仓库…",
      "pnpm install 安装依赖…",
      "全局 link @ss/portal-tokens…",
      "全局 link @ss/portal-shell…",
      "全局 link @ss/portal-ui…",
      "业务 App 链上三个包…",
    ],
  },
  {
    status: "配置样式与 Tailwind",
    lines: [
      "引入 @ss/portal-tokens/globals.css…",
      "配置 @source 扫描 shell / ui…",
      "挂上 portal Tailwind preset…",
      "校验 text-gray-text-* 生效…",
      "校验 portal-* 组合类…",
    ],
  },
  {
    status: "对照画廊落地",
    lines: [
      "用 AppShell 包一层业务页…",
      "对照列表页框架…",
      "对照详情页框架…",
      "对照表单页框架…",
      "进入组件预览核对用法…",
    ],
  },
] as const;

const LINE_HEIGHT = 28;
const VISIBLE_WINDOW = 5;

/** One-flow 风格：动态滚动展示安装使用步骤 */
export function InstallFlowProcess() {
  const [sequenceIndex, setSequenceIndex] = useState(0);
  const [visibleLines, setVisibleLines] = useState<Array<{ text: string; number: number }>>([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const codeContainerRef = useRef<HTMLDivElement>(null);

  const currentSequence = TASK_SEQUENCES[sequenceIndex]!;
  const totalLines = currentSequence.lines.length;

  useEffect(() => {
    const initialLines = [];
    for (let i = 0; i < Math.min(VISIBLE_WINDOW, totalLines); i++) {
      initialLines.push({
        text: currentSequence.lines[i]!,
        number: i + 1,
      });
    }
    setVisibleLines(initialLines);
    setScrollPosition(0);
  }, [sequenceIndex, currentSequence.lines, totalLines]);

  useEffect(() => {
    const advanceTimer = setInterval(() => {
      const firstVisibleLineIndex = Math.floor(scrollPosition / LINE_HEIGHT);
      const nextLineIndex = (firstVisibleLineIndex + 3) % totalLines;

      if (nextLineIndex < firstVisibleLineIndex && nextLineIndex !== 0) {
        setSequenceIndex((prev) => (prev + 1) % TASK_SEQUENCES.length);
        return;
      }

      if (nextLineIndex >= visibleLines.length && nextLineIndex < totalLines) {
        setVisibleLines((prev) => [
          ...prev,
          {
            text: currentSequence.lines[nextLineIndex]!,
            number: nextLineIndex + 1,
          },
        ]);
      }

      setScrollPosition((prev) => prev + LINE_HEIGHT);
    }, 1800);

    return () => clearInterval(advanceTimer);
  }, [scrollPosition, visibleLines, totalLines, currentSequence.lines]);

  useEffect(() => {
    if (codeContainerRef.current) {
      codeContainerRef.current.scrollTop = scrollPosition;
    }
  }, [scrollPosition]);

  return (
    <div className="flex h-full w-full flex-col gap-4">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <GitBranch className="size-4 text-brand" strokeWidth={1.5} aria-hidden />
          <h2 className="text-16 font-semibold text-gray-text-1 transition group-hover:text-brand">接入流程</h2>
        </div>
        <ArrowUpRight
          className="size-4 shrink-0 text-gray-text-7 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand"
          strokeWidth={1.5}
          aria-hidden
        />
      </div>

      <div className="flex items-center gap-1.5 text-gray-text-1">
        <Loader className="size-4 animate-spin text-brand" strokeWidth={1.75} aria-hidden />
        <span className="text-14 font-semibold">{currentSequence.status}…</span>
      </div>

      <div className="relative overflow-hidden rounded-md border border-gray-border-exlight bg-brand-xlight/50">
        <div
          ref={codeContainerRef}
          className="relative flex h-[140px] w-full flex-col gap-0 overflow-hidden px-3 py-3"
          style={{ scrollBehavior: "smooth" }}
        >
          {visibleLines.map((line) => (
            <div
              key={`${line.number}-${line.text}`}
              className="flex h-7 shrink-0 items-center text-13 font-medium text-gray-text-2"
            >
              <div className="w-6 shrink-0 pr-2 tabular-nums text-gray-text-7 select-none">{line.number}.</div>
              <div className="line-clamp-1 flex-1">{line.text}</div>
            </div>
          ))}
        </div>
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-brand-xlight to-transparent"
          aria-hidden
        />
      </div>
    </div>
  );
}
