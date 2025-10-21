"use client";

import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

type AttendanceStatus = "present" | "absent" | "sick" | "leave";

const ABSENT_STATUSES = new Set<AttendanceStatus>(["absent", "sick", "leave"]);

interface AttendanceRecord {
  id: string;
  name: string;
  className: string;
  status: AttendanceStatus | null;
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
    status: "sick",
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
    status: "leave",
    notes: "Family trip",
  },
];

type Filter = "all" | "present" | "absent";

interface AttendanceMenuLabels {
  open: string;
  markSick: string;
  markLeave: string;
}

interface AttendanceRowMenuProps {
  labels: AttendanceMenuLabels;
  onMarkSick: () => void;
  onMarkLeave: () => void;
}

function AttendanceRowMenu({
  labels,
  onMarkSick,
  onMarkLeave,
}: AttendanceRowMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
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
    <div className="relative">
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
        <span className="sr-only">{labels.open}</span>
      </Button>
      {isOpen ? (
        <div
          ref={menuRef}
          role="menu"
          aria-label={labels.open}
          className="absolute right-0 z-20 mt-2 w-44 rounded-xl border border-border bg-popover p-2 text-sm shadow-lg"
        >
          <div className="space-y-1">
            <button
              type="button"
              role="menuitem"
              className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left transition hover:bg-muted"
              onClick={() => {
                onMarkSick();
                setIsOpen(false);
              }}
            >
              {labels.markSick}
            </button>
            <button
              type="button"
              role="menuitem"
              className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left transition hover:bg-muted"
              onClick={() => {
                onMarkLeave();
                setIsOpen(false);
              }}
            >
              {labels.markLeave}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function AttendanceManager() {
  const tAttendance = useTranslations("attendance");
  const tCommon = useTranslations("common");
  const tStudents = useTranslations("students");
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [records, setRecords] = useState<AttendanceRecord[]>(INITIAL_RECORDS);
  const [leaveDialog, setLeaveDialog] = useState<{
    id: string;
    name: string;
    reason: string;
  } | null>(null);
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

      if (filter === "present") {
        return record.status === "present";
      }

      return record.status != null && ABSENT_STATUSES.has(record.status);
    });
  }, [records, searchTerm, filter]);

  const menuLabels: AttendanceMenuLabels = {
    open: tAttendance("table.actions"),
    markSick: tAttendance("actions.markSick"),
    markLeave: tAttendance("actions.markLeave"),
  };

  function updateStatus(id: string, status: AttendanceStatus, note?: string) {
    setRecords((prev) =>
      prev.map((record) =>
        record.id === id
          ? {
              ...record,
              status,
              notes: note?.trim() ? note.trim() : undefined,
            }
          : record,
      ),
    );
  }

  function openLeaveDialog(record: AttendanceRecord) {
    setLeaveDialog({
      id: record.id,
      name: record.name,
      reason: record.status === "leave" && record.notes ? record.notes : "",
    });
  }

  function closeLeaveDialog() {
    setLeaveDialog(null);
  }

  function confirmLeave() {
    if (!leaveDialog) {
      return;
    }

    updateStatus(leaveDialog.id, "leave", leaveDialog.reason);
    closeLeaveDialog();
  }

  function getStatusLabel(status: AttendanceStatus | null) {
    if (status === "present") {
      return tCommon("present");
    }

    if (status === "absent") {
      return tCommon("absent");
    }

    if (status === "sick") {
      return tAttendance("statuses.sick");
    }

    if (status === "leave") {
      return tAttendance("statuses.leave");
    }

    return "-";
  }

  function resetForm() {
    setRecords(INITIAL_RECORDS);
    setNotes("");
    setFilter("all");
    setSearchTerm("");
    setLeaveDialog(null);
  }

  function submitForm() {
    const presentCount = records.filter(
      (record) => record.status === "present",
    ).length;
    const absentCount = records.filter(
      (record) => record.status != null && ABSENT_STATUSES.has(record.status),
    ).length;

    window.alert(
      `${tAttendance("feedback.saved")} : ${presentCount} ${tCommon("present")} / ${absentCount} ${tCommon("absent")}`,
    );
  }

  return (
    <>
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
                  <TableHead className="text-right">
                    {tAttendance("table.actions")}
                  </TableHead>
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
                      <div className="space-y-1">
                        <Badge
                          variant={
                            record.status === "present"
                              ? "secondary"
                              : "outline"
                          }
                          className="min-w-[84px] justify-center"
                        >
                          {getStatusLabel(record.status)}
                        </Badge>
                        {record.status === "leave" && record.notes ? (
                          <p className="text-xs text-muted-foreground">
                            {record.notes}
                          </p>
                        ) : null}
                      </div>
                    </TableCell>
                    <TableCell className="w-[280px] text-right">
                      <div className="flex flex-wrap justify-end gap-2">
                        <Button
                          size="sm"
                          variant={
                            record.status === "present"
                              ? "outline"
                              : "secondary"
                          }
                          onClick={() =>
                            updateStatus(
                              record.id,
                              record.status === "present"
                                ? "absent"
                                : "present",
                            )
                          }
                        >
                          {record.status === "present"
                            ? tAttendance("actions.markAbsent")
                            : tAttendance("actions.markPresent")}
                        </Button>
                        <AttendanceRowMenu
                          labels={menuLabels}
                          onMarkSick={() => updateStatus(record.id, "sick")}
                          onMarkLeave={() => openLeaveDialog(record)}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="space-y-2">
            <Label htmlFor="attendance-notes">
              {tAttendance("table.notes")}
            </Label>
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
            {
              records.filter(
                (record) =>
                  record.status != null && ABSENT_STATUSES.has(record.status),
              ).length
            }{" "}
            {tCommon("absent")}
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={resetForm}>
              {tCommon("actions.cancel")}
            </Button>
            <Button onClick={submitForm}>
              {tAttendance("actions.submit")}
            </Button>
          </div>
        </CardFooter>
      </Card>

      {leaveDialog ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm">
          <Card
            className="w-full max-w-md"
            role="dialog"
            aria-modal="true"
            aria-labelledby="leave-dialog-title"
            aria-describedby="leave-dialog-description"
          >
            <CardHeader className="space-y-2">
              <CardTitle id="leave-dialog-title">
                {tAttendance("leaveDialog.title")}
              </CardTitle>
              <CardDescription id="leave-dialog-description">
                {tAttendance("leaveDialog.description")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm font-medium text-foreground">
                  {leaveDialog.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {leaveDialog.id}
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="leave-reason">
                  {tAttendance("leaveDialog.reasonLabel")}
                </Label>
                <Textarea
                  id="leave-reason"
                  placeholder={tAttendance("leaveDialog.reasonPlaceholder")}
                  value={leaveDialog.reason}
                  onChange={(event) =>
                    setLeaveDialog((current) =>
                      current
                        ? {
                            ...current,
                            reason: event.target.value,
                          }
                        : current,
                    )
                  }
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="ghost" onClick={closeLeaveDialog}>
                {tCommon("actions.cancel")}
              </Button>
              <Button onClick={confirmLeave}>
                {tAttendance("leaveDialog.confirm")}
              </Button>
            </CardFooter>
          </Card>
        </div>
      ) : null}
    </>
  );
}
