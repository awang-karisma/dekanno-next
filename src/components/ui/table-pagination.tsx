"use client";

import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TablePaginationProps {
  totalItems: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function TablePagination({
  totalItems,
  pageSize,
  currentPage,
  onPageChange,
  className,
}: TablePaginationProps) {
  const t = useTranslations("common.pagination");

  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safePage = Math.min(Math.max(currentPage, 1), totalPages);
  const start = totalItems === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const end = totalItems === 0 ? 0 : Math.min(safePage * pageSize, totalItems);

  const goToPage = (page: number) => {
    const nextPage = Math.min(Math.max(page, 1), totalPages);
    if (nextPage !== safePage) {
      onPageChange(nextPage);
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center gap-3 border-t border-border px-4 py-4 text-sm text-muted-foreground sm:flex-row sm:justify-between",
        className,
      )}
    >
      <span>
        {t("summary", {
          start,
          end,
          total: totalItems,
        })}
      </span>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => goToPage(safePage - 1)}
          disabled={safePage <= 1}
        >
          {t("previous")}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => goToPage(safePage + 1)}
          disabled={safePage >= totalPages}
        >
          {t("next")}
        </Button>
      </div>
    </div>
  );
}
