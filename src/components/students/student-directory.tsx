"use client";

import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TablePagination } from "@/components/ui/table-pagination";
import { CLASSES } from "@/data/classes";
import { GRADES } from "@/data/grades";
import { STUDENTS } from "@/data/students";
import { Link } from "@/i18n/navigation";

const PAGE_SIZE = 5;

export function StudentDirectory() {
  const tStudents = useTranslations("students");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const studentsWithGrade = useMemo(() => {
    const gradeLookup = new Map(
      GRADES.map((grade) => [grade.id, grade.name] as const),
    );
    const classLookup = new Map(
      CLASSES.map((classItem) => [classItem.id, classItem.name] as const),
    );

    return STUDENTS.map((student) => ({
      ...student,
      gradeName: gradeLookup.get(student.gradeId) ?? student.gradeId,
      className: classLookup.get(student.classId) ?? student.classId,
    }));
  }, []);

  const filteredStudents = useMemo(() => {
    if (!searchTerm) {
      return studentsWithGrade;
    }

    const term = searchTerm.toLowerCase();
    return studentsWithGrade.filter((student) =>
      [student.name, student.id, student.gradeName, student.className].some(
        (value) => value.toLowerCase().includes(term),
      ),
    );
  }, [searchTerm, studentsWithGrade]);

  useEffect(() => {
    const totalPages = Math.max(
      1,
      Math.ceil(filteredStudents.length / PAGE_SIZE),
    );
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [filteredStudents.length, page]);

  const paginatedStudents = useMemo(() => {
    const startIndex = (page - 1) * PAGE_SIZE;
    return filteredStudents.slice(startIndex, startIndex + PAGE_SIZE);
  }, [filteredStudents, page]);

  return (
    <Card>
      <CardContent className="space-y-6 pt-6">
        <div className="space-y-2">
          <Label htmlFor="student-search">
            {tStudents("searchPlaceholder")}
          </Label>
          <Input
            id="student-search"
            placeholder={tStudents("searchPlaceholder")}
            value={searchTerm}
            onChange={(event) => {
              setSearchTerm(event.target.value);
              setPage(1);
            }}
          />
        </div>

        <div className="rounded-xl border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{tStudents("table.id")}</TableHead>
                <TableHead>{tStudents("table.name")}</TableHead>
                <TableHead>{tStudents("table.grade")}</TableHead>
                <TableHead className="hidden lg:table-cell">
                  {tStudents("table.class")}
                </TableHead>
                <TableHead>{tStudents("table.guardian")}</TableHead>
                <TableHead>{tStudents("table.contact")}</TableHead>
                <TableHead className="text-right">
                  {tStudents("table.attendance")}
                </TableHead>
                <TableHead className="hidden text-right lg:table-cell">
                  {tStudents("table.actions")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.id}</TableCell>
                  <TableCell>
                    <div className="font-medium leading-none">
                      {student.name}
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground lg:hidden">
                      {student.gradeName}
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground lg:hidden">
                      {student.className}
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground lg:hidden">
                      {student.guardian}
                    </div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <Badge variant="secondary">{student.gradeName}</Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <Badge variant="outline">{student.className}</Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {student.guardian}
                  </TableCell>
                  <TableCell>
                    <div>{student.contact}</div>
                    <div className="mt-3 flex justify-start lg:hidden">
                      <Button asChild size="sm" variant="outline">
                        <Link href={`/students/${student.id}/edit`}>
                          {tStudents("actions.edit")}
                        </Link>
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant="outline">
                      {tStudents("attendanceRate", {
                        value: student.attendance,
                      })}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden text-right lg:table-cell">
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/students/${student.id}/edit`}>
                        {tStudents("actions.edit")}
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          totalItems={filteredStudents.length}
          pageSize={PAGE_SIZE}
          currentPage={page}
          onPageChange={setPage}
        />
      </CardContent>
    </Card>
  );
}
