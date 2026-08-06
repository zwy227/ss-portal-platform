import * as Popover from "@radix-ui/react-popover";
import { Check, ChevronDown, X } from "lucide-react";
import { useMemo, useState } from "react";
import { cn } from "../lib/utils";

export type PortalFormSelectOption = {
  value: string;
  label: string;
};

const TRIGGER_CLASS = [
  "flex h-[42px] w-full min-w-0 items-center justify-between gap-2 rounded-input bg-background px-3 text-left text-14 outline-none transition",
  "border border-solid border-gray-border-strong",
  "hover:border-gray-border-emphasis",
  "focus:border-gray-border-black focus:shadow-focus-normal",
  "data-[state=open]:border-gray-border-black data-[state=open]:shadow-focus-normal",
  "disabled:cursor-not-allowed disabled:opacity-60",
].join(" ");

const SEARCH_INPUT_CLASS = [
  "mb-1 h-9 w-full rounded-input border border-solid border-gray-border-strong bg-background px-3 text-14 text-gray-text-2 outline-none transition",
  "hover:border-gray-border-emphasis",
  "focus:border-gray-border-black focus:shadow-focus-normal",
  "placeholder:font-medium placeholder:text-gray-text-7",
].join(" ");

const ITEM_CLASS = [
  "portal-dropdown-item relative flex w-full cursor-pointer select-none items-center rounded-md py-2 pl-8 pr-3 text-left text-14 outline-none",
  "data-[highlighted]:bg-gray-fill-normal data-[selected]:font-medium",
].join(" ");

export type PortalFormSearchSelectProps = {
  id?: string;
  value: string;
  onValueChange: (value: string) => void;
  options: readonly PortalFormSelectOption[];
  placeholder?: string;
  searchPlaceholder?: string;
  disabled?: boolean;
  allowClear?: boolean;
  "aria-labelledby"?: string;
  "aria-required"?: boolean;
  className?: string;
};

/** 详情表单可搜索下拉（对齐 SSLTLDemo PortalFormSearchSelect · 客户账号等） */
export function PortalFormSearchSelect({
  id,
  value,
  onValueChange,
  options,
  placeholder = "请选择",
  searchPlaceholder = "搜索",
  disabled = false,
  allowClear = true,
  "aria-labelledby": ariaLabelledby,
  "aria-required": ariaRequired,
  className,
}: PortalFormSearchSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlighted, setHighlighted] = useState<string | null>(null);

  const filteredOptions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return options;
    return options.filter(
      (option) =>
        option.label.toLowerCase().includes(normalizedQuery) ||
        option.value.toLowerCase().includes(normalizedQuery),
    );
  }, [options, query]);

  const selectedLabel = options.find((option) => option.value === value)?.label ?? value;

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      setQuery("");
      setHighlighted(null);
    }
  };

  const handleClear = (event: { preventDefault: () => void; stopPropagation: () => void }) => {
    event.preventDefault();
    event.stopPropagation();
    onValueChange("");
    setQuery("");
  };

  const handleSelect = (nextValue: string) => {
    onValueChange(nextValue);
    setOpen(false);
    setQuery("");
    setHighlighted(null);
  };

  return (
    <Popover.Root open={open} onOpenChange={handleOpenChange}>
      <Popover.Trigger asChild disabled={disabled}>
        <button
          id={id}
          type="button"
          className={cn(TRIGGER_CLASS, className)}
          aria-labelledby={ariaLabelledby}
          aria-required={ariaRequired}
          data-state={open ? "open" : "closed"}
        >
          <span
            className={cn(
              "min-w-0 flex-1 truncate",
              value ? "font-medium text-gray-text-2" : "font-medium text-gray-text-7",
            )}
          >
            {value ? selectedLabel : placeholder}
          </span>
          <span className="flex shrink-0 items-center gap-1">
            {allowClear && value ? (
              <span
                role="button"
                tabIndex={0}
                className="inline-flex size-5 items-center justify-center rounded text-gray-text-7 transition hover:bg-gray-fill-light hover:text-gray-text-4"
                aria-label="清除选择"
                onClick={handleClear}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    handleClear(event);
                  }
                }}
              >
                <X className="size-3.5" strokeWidth={1.75} aria-hidden />
              </span>
            ) : null}
            <ChevronDown className="size-4 shrink-0 text-gray-text-7" strokeWidth={1.75} aria-hidden />
          </span>
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          align="start"
          sideOffset={4}
          className="portal-dropdown-menu z-[100] w-[var(--radix-popover-trigger-width)] overflow-hidden p-1"
          onOpenAutoFocus={(event) => event.preventDefault()}
        >
          <div className="p-1">
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={searchPlaceholder}
              className={SEARCH_INPUT_CLASS}
              aria-label={searchPlaceholder}
              autoFocus
            />
          </div>
          <div className="max-h-[220px] overflow-y-auto p-1">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => {
                const selected = option.value === value;
                const isHighlighted = highlighted === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    className={ITEM_CLASS}
                    data-selected={selected ? "" : undefined}
                    data-highlighted={isHighlighted ? "" : undefined}
                    onMouseEnter={() => setHighlighted(option.value)}
                    onMouseLeave={() => setHighlighted(null)}
                    onClick={() => handleSelect(option.value)}
                  >
                    {selected ? (
                      <span className="absolute left-2 inline-flex items-center">
                        <Check className="size-4 text-brand" strokeWidth={2} aria-hidden />
                      </span>
                    ) : null}
                    {option.label}
                  </button>
                );
              })
            ) : (
              <p className="m-0 px-3 py-2 text-13 text-gray-text-5">暂无匹配项</p>
            )}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
