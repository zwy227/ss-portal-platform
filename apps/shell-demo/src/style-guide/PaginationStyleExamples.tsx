import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TOTAL_ITEMS = 238;
const PAGE_SIZE_OPTIONS = [10, 20] as const;

/** 生成页码按钮序列：首尾 + 当前邻页，空隙用省略号 */
function getVisiblePages(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 0) return [];
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages = new Set<number>();
  pages.add(1);
  pages.add(total);
  for (let p = current - 1; p <= current + 1; p++) {
    if (p >= 1 && p <= total) pages.add(p);
  }

  const sorted = [...pages].sort((a, b) => a - b);
  const result: (number | "ellipsis")[] = [];
  for (let i = 0; i < sorted.length; i++) {
    const page = sorted[i]!;
    if (i > 0) {
      const prev = sorted[i - 1]!;
      if (page - prev > 1) result.push("ellipsis");
    }
    result.push(page);
  }
  return result;
}

export function PaginationStyleExamples() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<(typeof PAGE_SIZE_OPTIONS)[number]>(10);

  const totalPages = Math.max(1, Math.ceil(TOTAL_ITEMS / pageSize));
  const currentPage = Math.min(page, totalPages);
  const rangeStart = (currentPage - 1) * pageSize + 1;
  const rangeEnd = Math.min(currentPage * pageSize, TOTAL_ITEMS);
  const visiblePages = getVisiblePages(currentPage, totalPages);
  const canPrev = currentPage > 1;
  const canNext = currentPage < totalPages;

  function goTo(next: number) {
    setPage(Math.min(Math.max(1, next), totalPages));
  }

  function onPageSizeChange(nextSize: (typeof PAGE_SIZE_OPTIONS)[number]) {
    const firstItemIndex = (currentPage - 1) * pageSize;
    const nextPage = Math.floor(firstItemIndex / nextSize) + 1;
    setPageSize(nextSize);
    setPage(nextPage);
  }

  return (
    <div className="portal-pagination portal-pagination--spacious">
      <p className="portal-pagination-summary">
        显示 {rangeStart} - {rangeEnd} / {TOTAL_ITEMS} 条
      </p>
      <div className="flex flex-wrap items-center gap-4">
        <label className="portal-pagination-label">
          每页
          <select
            className="portal-pagination-size-select"
            value={pageSize}
            onChange={(e) =>
              onPageSizeChange(Number(e.target.value) as (typeof PAGE_SIZE_OPTIONS)[number])
            }
          >
            {PAGE_SIZE_OPTIONS.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          条
        </label>
        <div className="flex items-center gap-1" role="navigation" aria-label="分页">
          <button
            type="button"
            className="portal-pagination-nav-btn"
            disabled={!canPrev}
            aria-label="上一页"
            onClick={() => goTo(currentPage - 1)}
          >
            <ChevronLeft className="size-4" />
          </button>
          {visiblePages.map((item, index) =>
            item === "ellipsis" ? (
              <span key={`ellipsis-${index}`} className="portal-pagination-ellipsis">
                …
              </span>
            ) : (
              <button
                key={item}
                type="button"
                className={
                  item === currentPage
                    ? "portal-pagination-page portal-pagination-page--active"
                    : "portal-pagination-page"
                }
                aria-current={item === currentPage ? "page" : undefined}
                aria-label={`第 ${item} 页`}
                onClick={() => goTo(item)}
              >
                {item}
              </button>
            ),
          )}
          <button
            type="button"
            className="portal-pagination-nav-btn"
            disabled={!canNext}
            aria-label="下一页"
            onClick={() => goTo(currentPage + 1)}
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
