import { useEffect, useRef, useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { CircleHelp } from "lucide-react";

export type ListTabStatusGuideItem = {
  label: string;
  description: string;
};

type ListTabStatusGuidePopoverProps = {
  items: readonly ListTabStatusGuideItem[];
};

const OPEN_DELAY_MS = 120;
const CLOSE_DELAY_MS = 160;

/** 列表 Tab 栏右侧 — 状态说明（悬停展示，对齐履约订单列表） */
export function ListTabStatusGuidePopover({ items }: ListTabStatusGuidePopoverProps) {
  const [open, setOpen] = useState(false);
  const openTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = () => {
    if (openTimerRef.current) {
      clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  useEffect(() => () => clearTimers(), []);

  const scheduleOpen = () => {
    clearTimers();
    openTimerRef.current = setTimeout(() => setOpen(true), OPEN_DELAY_MS);
  };

  const scheduleClose = () => {
    clearTimers();
    closeTimerRef.current = setTimeout(() => setOpen(false), CLOSE_DELAY_MS);
  };

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button
          type="button"
          className="inline-flex shrink-0 items-center gap-1 border-0 bg-transparent py-2 text-12 font-normal text-gray-text-5 transition-colors hover:font-semibold hover:text-gray-text-1 data-[state=open]:font-semibold data-[state=open]:text-gray-text-1"
          aria-label="状态说明"
          onMouseEnter={scheduleOpen}
          onMouseLeave={scheduleClose}
          onFocus={scheduleOpen}
          onBlur={scheduleClose}
        >
          <CircleHelp className="size-3 shrink-0" strokeWidth={1.75} aria-hidden />
          <span>状态说明</span>
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          side="bottom"
          align="end"
          sideOffset={6}
          alignOffset={0}
          collisionPadding={16}
          className="z-50 w-[min(100vw-32px,340px)] max-h-[min(70vh,440px)] overflow-y-auto rounded-lg border border-gray-border-normal bg-background p-3.5 shadow-lg outline-none"
          onOpenAutoFocus={(e) => e.preventDefault()}
          onCloseAutoFocus={(e) => e.preventDefault()}
          onMouseEnter={scheduleOpen}
          onMouseLeave={scheduleClose}
        >
          <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
            {items.map((item) => (
              <li key={item.label} className="min-w-0">
                <p className="m-0 text-13 font-medium text-gray-text-1">{item.label}</p>
                <p className="m-0 mt-0.5 text-12 leading-5 text-gray-text-4">{item.description}</p>
              </li>
            ))}
          </ul>
          <Popover.Arrow className="fill-background" width={12} height={6} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
