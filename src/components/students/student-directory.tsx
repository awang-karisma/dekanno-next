"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

import { Badge } from "@/components/ui/badge";
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

interface StudentRecord {
  id: string;
  name: string;
  className: string;
  guardian: string;
  contact: string;
  attendance: number;
}

const STUDENTS: StudentRecord[] = [
  {
    id: "ST-101",
    name: "Siti Rahma",
    className: "Grade 7A",
    guardian: "Nurhayati",
    contact: "0812-2345-6789",
    attendance: 96,
  },
  {
    id: "ST-102",
    name: "Andi Wijaya",
    className: "Grade 7A",
    guardian: "Slamet Wijaya",
    contact: "0813-9876-5432",
    attendance: 92,
  },
  {
    id: "ST-215",
    name: "Felicia Tan",
    className: "Grade 8B",
    guardian: "Maria Tan",
    contact: "0814-7755-2266",
    attendance: 88,
  },
  {
    id: "ST-310",
    name: "Budi Santoso",
    className: "Grade 9A",
    guardian: "Siti Aisyah",
    contact: "0815-6677-7890",
    attendance: 98,
  },
  {
    id: "ST-155",
    name: "Rina Moe",
    className: "Grade 8A",
    guardian: "Liang Moe",
    contact: "0812-7788-3344",
    attendance: 93,
  },
  {
    id: "ST-220",
    name: "Samuel Prakoso",
    className: "Grade 9A",
    guardian: "Yohana Prakoso",
    contact: "0813-2233-4455",
    attendance: 85,
  },
];

export function StudentDirectory() {
  const tStudents = useTranslations("students");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudents = useMemo(() => {
    if (!searchTerm) {
      return STUDENTS;
    }

    const term = searchTerm.toLowerCase();
    return STUDENTS.filter((student) =>
      [student.name, student.id, student.className].some((value) =>
        value.toLowerCase().includes(term),
      ),
    );
  }, [searchTerm]);

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
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>

        <div className="rounded-xl border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{tStudents("table.id")}</TableHead>
                <TableHead>{tStudents("table.name")}</TableHead>
                <TableHead>{tStudents("table.class")}</TableHead>
                <TableHead>{tStudents("table.guardian")}</TableHead>
                <TableHead>{tStudents("table.contact")}</TableHead>
                <TableHead className="text-right">
                  {tStudents("table.attendance")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.id}</TableCell>
                  <TableCell>
                    <div className="font-medium leading-none">
                      {student.name}
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground lg:hidden">
                      {student.className} - {student.guardian}
                    </div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {student.className}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {student.guardian}
                  </TableCell>
                  <TableCell>{student.contact}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant="outline">
                      {tStudents("attendanceRate", {
                        value: student.attendance,
                      })}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
