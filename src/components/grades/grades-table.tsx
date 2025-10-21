"use client";

import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TablePagination } from "@/components/ui/table-pagination";
import { GRADES } from "@/data/grades";
import { Link } from "@/i18n/navigation";

const PAGE_SIZE = 5;

interface GradeActionsProps {
  gradeId: string;
  labels: {
    addStudent: string;
    edit: string;
    delete: string;
    more: string;
  };
}

function GradeActions({ gradeId, labels }: GradeActionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !toggleRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  return (
    <div className="relative flex items-center justify-end gap-1">
      <Button asChild size="sm">
        <Link href={`/students/new?grade=${gradeId}`}>{labels.addStudent}</Link>
      </Button>
      <Button
        ref={toggleRef}
        type="button"
        size="sm"
        variant="outline"
        className="px-2"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((previous) => !previous)}
      >
        <ChevronDown aria-hidden className="h-4 w-4" />
        <span className="sr-only">{labels.more}</span>
      </Button>
      {isOpen ? (
        <div
          ref={menuRef}
          role="menu"
          aria-label={labels.more}
          className="absolute right-0 top-full z-20 mt-2 w-44 rounded-xl border border-border bg-popover p-2 text-sm shadow-lg"
        >
          <div className="space-y-1">
            <Link
              href={`/students/new?grade=${gradeId}`}
              role="menuitem"
              className="block rounded-md px-3 py-2 text-foreground transition hover:bg-muted"
              onClick={() => setIsOpen(false)}
            >
              {labels.addStudent}
            </Link>
            <Link
              href={`/grades/${gradeId}/edit`}
              role="menuitem"
              className="block rounded-md px-3 py-2 text-foreground transition hover:bg-muted"
              onClick={() => setIsOpen(false)}
            >
              {labels.edit}
            </Link>
            <button
              type="button"
              role="menuitem"
              className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-destructive transition hover:bg-destructive/10"
              onClick={() => setIsOpen(false)}
            >
              {labels.delete}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function GradesTable() {
  const tGrades = useTranslations("grades");
  const [page, setPage] = useState(1);

  const labels = {
    addStudent: tGrades("actions.addStudent"),
    edit: tGrades("actions.edit"),
    delete: tGrades("actions.delete"),
    more: tGrades("actions.more"),
  } as const;

  const totalItems = GRADES.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const paginatedGrades = useMemo(() => {
    const startIndex = (page - 1) * PAGE_SIZE;
    return GRADES.slice(startIndex, startIndex + PAGE_SIZE);
  }, [page]);

  return (
    <Card>
      <CardContent className="space-y-6 pt-6">
        <div className="rounded-xl border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{tGrades("table.name")}</TableHead>
                <TableHead className="text-right">
                  {tGrades("table.students")}
                </TableHead>
                <TableHead className="text-right">
                  {tGrades("table.actions")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedGrades.map((grade) => (
                <TableRow key={grade.id}>
                  <TableCell className="font-medium">{grade.name}</TableCell>
                  <TableCell className="text-right">
                    {grade.studentCount}
                  </TableCell>
                  <TableCell className="text-right">
                    <GradeActions gradeId={grade.id} labels={labels} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          totalItems={totalItems}
          pageSize={PAGE_SIZE}
          currentPage={page}
          onPageChange={setPage}
        />
      </CardContent>
    </Card>
  );
}
