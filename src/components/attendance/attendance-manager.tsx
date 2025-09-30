"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";

interface AttendanceRecord {
  id: string;
  name: string;
  className: string;
  status: "present" | "absent" | null;
  notes?: string;
}

const INITIAL_RECORDS: AttendanceRecord[] = [
  {
    id: "ST-101",
    name: "Siti Rahma",
    className: "Grade 7A",
    status: "present",
  },
  {
    id: "ST-102",
    name: "Andi Wijaya",
    className: "Grade 7A",
    status: "absent",
    notes: "Sick",
  },
  { id: "ST-215", name: "Felicia Tan", className: "Grade 8B", status: null },
  {
    id: "ST-310",
    name: "Budi Santoso",
    className: "Grade 9A",
    status: "present",
  },
  { id: "ST-155", name: "Rina Moe", className: "Grade 8A", status: "present" },
  {
    id: "ST-220",
    name: "Samuel Prakoso",
    className: "Grade 9A",
    status: "absent",
    notes: "Family trip",
  },
];

type Filter = "all" | "present" | "absent";

export function AttendanceManager() {
  const tAttendance = useTranslations("attendance");
  const tCommon = useTranslations("common");
  const tStudents = useTranslations("students");
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [records, setRecords] = useState<AttendanceRecord[]>(INITIAL_RECORDS);
  const [notes, setNotes] = useState<string>("");

  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      const matchesSearch = [record.id, record.name, record.className]
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      if (!matchesSearch) {
        return false;
      }

      if (filter === "all") {
        return true;
      }

      return record.status === filter;
    });
  }, [records, searchTerm, filter]);

  function updateStatus(id: string, status: "present" | "absent") {
    setRecords((prev) =>
      prev.map((record) =>
        record.id === id
          ? {
              ...record,
              status,
            }
          : record,
      ),
    );
  }

  function resetForm() {
    setRecords(INITIAL_RECORDS);
    setNotes("");
    setFilter("all");
    setSearchTerm("");
  }

  function submitForm() {
    const presentCount = records.filter(
      (record) => record.status === "present",
    ).length;
    const absentCount = records.filter(
      (record) => record.status === "absent",
    ).length;

    window.alert(
      `${tAttendance("feedback.saved")} : ${presentCount} ${tCommon("present")} / ${absentCount} ${tCommon("absent")}`,
    );
  }

  return (
    <Card className="border border-border">
      <CardContent className="space-y-6 pt-6">
        <div className="space-y-2">
          <Label htmlFor="attendance-date">{tAttendance("dateLabel")}</Label>
          <Input id="attendance-date" type="date" className="max-w-sm" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="attendance-search">{tCommon("search")}</Label>
          <Input
            id="attendance-search"
            placeholder={tAttendance("searchPlaceholder")}
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">
            {tAttendance("filters.label")}
          </span>
          <div className="flex flex-wrap gap-2">
            {(
              [
                ["all", tAttendance("filters.all")],
                ["present", tAttendance("filters.present")],
                ["absent", tAttendance("filters.absent")],
              ] as Array<[Filter, string]>
            ).map(([value, label]) => (
              <Button
                key={value}
                variant={filter === value ? "default" : "ghost"}
                size="sm"
                onClick={() => setFilter(value)}
              >
                {label}
              </Button>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{tAttendance("table.student")}</TableHead>
                <TableHead className="hidden sm:table-cell">
                  {tStudents("table.id")}
                </TableHead>
                <TableHead className="hidden sm:table-cell">
                  {tStudents("table.class")}
                </TableHead>
                <TableHead>{tAttendance("table.status")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((record) => (
                <TableRow key={record.id} className="align-top">
                  <TableCell>
                    <div className="font-medium leading-none">
                      {record.name}
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground sm:hidden">
                      {record.id} - {record.className}
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {record.id}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {record.className}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          record.status === "present" ? "secondary" : "outline"
                        }
                        className="min-w-[72px] justify-center"
                      >
                        {record.status ? tCommon(record.status) : "-"}
                      </Badge>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => updateStatus(record.id, "present")}
                        >
                          {tAttendance("actions.markPresent")}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => updateStatus(record.id, "absent")}
                        >
                          {tAttendance("actions.markAbsent")}
                        </Button>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="space-y-2">
          <Label htmlFor="attendance-notes">{tAttendance("table.notes")}</Label>
          <Textarea
            id="attendance-notes"
            placeholder={tAttendance("table.notes")}
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
          />
        </div>

        <Separator />
      </CardContent>
      <CardFooter className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm text-muted-foreground">
          {records.filter((record) => record.status === "present").length}{" "}
          {tCommon("present")} /{" "}
          {records.filter((record) => record.status === "absent").length}{" "}
          {tCommon("absent")}
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={resetForm}>
            {tCommon("actions.cancel")}
          </Button>
          <Button onClick={submitForm}>{tAttendance("actions.submit")}</Button>
        </div>
      </CardFooter>
    </Card>
  );
}
