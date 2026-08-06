import * as Tooltip from "@radix-ui/react-tooltip";
import { BookMarked, CircleX, Search } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "../lib/utils";
import {
  PortalAddressCompactSummary,
  type PortalAddressCompactSummaryParts,
} from "./portal-address-compact-summary";

export type PortalAddressSearchResult = {
  id: string;
  badge?: string;
  summary: PortalAddressCompactSummaryParts;
};

export type PortalAddressSearchSelected = {
  badge?: string;
  summary: PortalAddressCompactSummaryParts;
  /** 左侧类型图标（仓库 / 城市 / 港口等） */
  icon?: ReactNode;
  /** 已选区域 aria-label */
  ariaLabel?: string;
};

export type PortalAddressSearchFieldProps = {
  label?: string;
  value: string;
  placeholder: string;
  selected: PortalAddressSearchSelected | null;
  results: readonly PortalAddressSearchResult[];
  error?: boolean;
  errorMessage?: string;
  readOnly?: boolean;
  open: boolean;
  addressBookOpen?: boolean;
  addressBookTitle?: string;
  addressBookTooltip?: string;
  /** 下拉底部「自定义录入」 */
  customEntryFooter?: boolean;
  customEntryPrompt?: string;
  customEntryActionLabel?: string;
  emptyMessage?: string;
  emptyHints?: readonly string[];
  className?: string;
  onChange: (value: string) => void;
  onFocus?: () => void;
  onClear: () => void;
  onSelect: (id: string) => void;
  onAddressBookOpen?: () => void;
  onAddressBookClose?: () => void;
  onCustomEntryStart?: () => void;
  onDismiss?: () => void;
};

function CustomEntryFooter({
  prompt,
  actionLabel,
  onStart,
}: {
  prompt: string;
  actionLabel: string;
  onStart: () => void;
}) {
  return (
    <div className="border-t border-gray-border-light bg-gray-fill-light/80 px-4 py-3 text-center text-14 text-gray-text-5">
      {prompt}{" "}
      <button
        type="button"
        className="font-semibold text-accent-orange transition hover:text-semantic-warning-text"
        onMouseDown={(event) => event.preventDefault()}
        onClick={onStart}
      >
        {actionLabel}
      </button>
    </div>
  );
}

function ResultRow({
  result,
  onSelect,
}: {
  result: PortalAddressSearchResult;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      className="flex w-full items-center gap-2 border-b border-gray-border-light px-4 py-3 text-left transition last:border-b-0 hover:bg-gray-fill-light"
      onMouseDown={(event) => event.preventDefault()}
      onClick={onSelect}
      title={result.summary.fullTitle}
    >
      {result.badge ? (
        <span className="inline-flex shrink-0 rounded-sm bg-gray-fill-normal px-2 py-0.5 text-12 font-semibold text-gray-text-5">
          {result.badge}
        </span>
      ) : null}
      <div className="min-w-0 flex-1 truncate text-13 leading-snug">
        <PortalAddressCompactSummary parts={result.summary} />
      </div>
    </button>
  );
}

/**
 * 地址搜索字段（对齐 SSLTLDemo `DestinationPlaceSearchField`）
 * — `portal-field-shell` focus-within · 已选摘要 · 下拉结果 · 可选地址簿 / 自定义录入
 */
export function PortalAddressSearchField({
  label,
  value,
  placeholder,
  selected,
  results,
  error = false,
  errorMessage,
  readOnly = false,
  open,
  addressBookOpen = false,
  addressBookTitle = "地址簿",
  addressBookTooltip,
  customEntryFooter = false,
  customEntryPrompt = "没有我需要的地址？",
  customEntryActionLabel = "自定义录入",
  emptyMessage = "暂无匹配结果，请尝试输入城市、邮编或地址。",
  emptyHints = [],
  className,
  onChange,
  onFocus,
  onClear,
  onSelect,
  onAddressBookOpen,
  onAddressBookClose,
  onCustomEntryStart,
  onDismiss,
}: PortalAddressSearchFieldProps) {
  const catalogResults = value.trim() ? results : [];
  const showDropdown = open && Boolean(value.trim()) && !selected;
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showDropdown || !onDismiss) return;

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (rootRef.current?.contains(target)) return;
      onDismiss();
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [showDropdown, onDismiss]);

  const shellClass = cn(
    "portal-field-shell relative h-12",
    selected && "portal-field-shell--static",
    error && "portal-field-shell--error",
  );

  const selectedContent = selected ? (
    <div
      className="flex h-full items-center gap-2 pl-12 pr-12"
      title={selected.summary.fullTitle}
      aria-label={selected.ariaLabel ?? "已选地址"}
    >
      {selected.badge ? (
        <span className="inline-flex shrink-0 rounded-sm bg-gray-fill-normal px-2 py-0.5 text-12 font-semibold text-gray-text-5">
          {selected.badge}
        </span>
      ) : null}
      <div className="min-w-0 flex-1 truncate text-13 leading-snug">
        <PortalAddressCompactSummary parts={selected.summary} />
      </div>
    </div>
  ) : null;

  if (readOnly) {
    return (
      <div className={cn("space-y-2", className)}>
        {label ? (
          <label className="block text-15 font-semibold text-gray-text-3">{label}</label>
        ) : null}
        <div className="relative">
          <div className="flex items-stretch gap-2">
            <div className="min-w-0 flex-1">
              <div className="relative h-12 rounded-input border-0 bg-gray-fill-light transition">
                {selected ? (
                  <>
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-text-7">
                      {selected.icon ?? <Search className="size-5" aria-hidden />}
                    </div>
                    <div
                      className="flex h-full items-center gap-2 pl-12 pr-4"
                      title={selected.summary.fullTitle}
                      aria-label={selected.ariaLabel ?? "已选地址"}
                    >
                      {selected.badge ? (
                        <span className="inline-flex shrink-0 rounded-sm bg-background px-2 py-0.5 text-12 font-semibold text-gray-text-4">
                          {selected.badge}
                        </span>
                      ) : null}
                      <div className="min-w-0 flex-1 truncate text-13 leading-snug">
                        <PortalAddressCompactSummary parts={selected.summary} />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex h-full items-center gap-2 pl-12 pr-4">
                    <Search className="size-5 shrink-0 text-gray-text-7" aria-hidden />
                    <span className="text-14 font-medium text-gray-text-7">{placeholder}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={rootRef} className={cn("space-y-2", className)}>
      {label ? (
        <label className="block text-15 font-semibold text-gray-text-3">{label}</label>
      ) : null}

      <div className="relative">
        <div className="flex items-stretch gap-2">
          <div className="min-w-0 flex-1">
            <div className={shellClass}>
              {selected ? (
                <>
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-text-7">
                    {selected.icon ?? <Search className="size-5" aria-hidden />}
                  </div>
                  {selectedContent}
                  <button
                    type="button"
                    onClick={onClear}
                    className="absolute right-3 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-md bg-gray-fill-normal text-gray-text-5 transition hover:bg-gray-fill-strong hover:text-gray-text-2"
                    aria-label="清除"
                  >
                    <CircleX className="size-4" />
                  </button>
                </>
              ) : (
                <>
                  <Search
                    className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-gray-text-7"
                    aria-hidden
                  />
                  <input
                    type="text"
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    onFocus={onFocus}
                    placeholder={placeholder}
                    aria-label={label ?? placeholder}
                    className="portal-field-shell-input h-full rounded-input pl-12 pr-12 font-semibold"
                  />
                  {value ? (
                    <button
                      type="button"
                      onClick={onClear}
                      className="absolute right-4 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-md bg-gray-fill-normal text-gray-text-5 transition hover:bg-gray-fill-strong hover:text-gray-text-3"
                      aria-label="清除"
                    >
                      <CircleX className="size-4" />
                    </button>
                  ) : null}
                </>
              )}
            </div>
          </div>

          {onAddressBookOpen ? (
            <Tooltip.Provider delayDuration={200}>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <button
                    type="button"
                    onClick={() => {
                      if (addressBookOpen) onAddressBookClose?.();
                      else onAddressBookOpen();
                    }}
                    className={cn(
                      "flex size-12 shrink-0 items-center justify-center rounded-input border transition",
                      addressBookOpen
                        ? "border-gray-text-1 bg-gray-text-1 text-white"
                        : "border-gray-border-strong bg-background text-gray-text-1 hover:border-gray-border-emphasis hover:bg-gray-fill-light",
                    )}
                    aria-label={addressBookTitle}
                    aria-expanded={addressBookOpen}
                  >
                    <BookMarked className="size-5" aria-hidden />
                  </button>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    side="top"
                    sideOffset={6}
                    className="z-50 rounded-md border border-gray-border-light bg-background px-2.5 py-1.5 text-13 font-medium text-gray-text-4 shadow-md"
                  >
                    {addressBookTooltip ?? "地址簿"}
                    <Tooltip.Arrow className="fill-background" width={10} height={5} />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </Tooltip.Provider>
          ) : null}
        </div>

        {showDropdown ? (
          <div className="absolute left-0 right-0 top-[64px] z-30 overflow-hidden rounded-input border border-gray-border-light bg-background shadow-lg">
            {catalogResults.length > 0 ? (
              catalogResults.map((result) => (
                <ResultRow key={result.id} result={result} onSelect={() => onSelect(result.id)} />
              ))
            ) : (
              <div className="px-4 py-5 text-14 text-gray-text-5">
                <p className="m-0">{emptyMessage}</p>
                {emptyHints.length > 0 ? (
                  <p className="mt-2 m-0 text-12 text-gray-text-7">
                    演示可试：{emptyHints.join(" · ")}
                  </p>
                ) : null}
              </div>
            )}
            {customEntryFooter && onCustomEntryStart ? (
              <CustomEntryFooter
                prompt={customEntryPrompt}
                actionLabel={customEntryActionLabel}
                onStart={onCustomEntryStart}
              />
            ) : null}
          </div>
        ) : null}
      </div>

      {error && errorMessage ? (
        <p className="m-0 text-14 text-semantic-error-default" role="alert">
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
}
