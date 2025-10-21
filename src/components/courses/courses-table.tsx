"use client";

import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useRef, useState } from "react";

import { Badge } from "@/components/ui/badge";
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
import { COURSES } from "@/data/courses";
import { GRADES } from "@/data/grades";
import { STUDENTS } from "@/data/students";
import { Link } from "@/i18n/navigation";

const PAGE_SIZE = 5;

interface CourseActionsProps {
  courseId: string;
  labels: {
    addStudent: string;
    edit: string;
    delete: string;
    more: string;
  };
}

function CourseActions({ courseId, labels }: CourseActionsProps) {
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
        <Link href={`/students/new?course=${courseId}`}>
          {labels.addStudent}
        </Link>
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
              href={`/courses/${courseId}/edit`}
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

interface CourseRow {
  id: string;
  name: string;
  gradeNames: string[];
  studentCount: number;
}

export function CoursesTable() {
  const tCourses = useTranslations("courses");

  const labels = {
    addStudent: tCourses("actions.addStudent"),
    edit: tCourses("actions.edit"),
    delete: tCourses("actions.delete"),
    more: tCourses("actions.more"),
  } as const;

  const [page, setPage] = useState(1);

  const rows = useMemo<CourseRow[]>(() => {
    const gradeLookup = new Map(
      GRADES.map((grade) => [grade.id, grade.name] as const),
    );
    const gradeCounts = STUDENTS.reduce((acc, student) => {
      acc.set(student.gradeId, (acc.get(student.gradeId) ?? 0) + 1);
      return acc;
    }, new Map<string, number>());

    return COURSES.map((course) => {
      const gradeNames = course.gradeIds.map(
        (gradeId) => gradeLookup.get(gradeId) ?? gradeId,
      );
      const studentCount = course.gradeIds.reduce(
        (total, gradeId) => total + (gradeCounts.get(gradeId) ?? 0),
        0,
      );

      return {
        id: course.id,
        name: course.name,
        gradeNames,
        studentCount,
      } satisfies CourseRow;
    });
  }, []);

  const totalItems = rows.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const paginatedRows = useMemo(() => {
    const startIndex = (page - 1) * PAGE_SIZE;
    return rows.slice(startIndex, startIndex + PAGE_SIZE);
  }, [rows, page]);

  return (
    <Card>
      <CardContent className="space-y-6 pt-6">
        <div className="rounded-xl border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{tCourses("table.name")}</TableHead>
                <TableHead>{tCourses("table.grades")}</TableHead>
                <TableHead className="text-right">
                  {tCourses("table.students")}
                </TableHead>
                <TableHead className="text-right">
                  {tCourses("table.actions")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedRows.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium">{course.name}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap items-center gap-2">
                      {course.gradeNames.map((name) => (
                        <Badge key={`${course.id}-${name}`} variant="secondary">
                          {name}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    {course.studentCount}
                  </TableCell>
                  <TableCell className="text-right">
                    <CourseActions courseId={course.id} labels={labels} />
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
