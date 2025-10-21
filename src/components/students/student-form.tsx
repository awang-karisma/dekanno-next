"use client";

import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CLASSES } from "@/data/classes";
import { GRADES } from "@/data/grades";
import { Link } from "@/i18n/navigation";

export interface StudentFormValues {
  id?: string;
  name?: string;
  classId?: string;
  gradeId?: string;
  guardian?: string;
  contact?: string;
  notes?: string;
}

interface StudentFormProps {
  mode: "create" | "edit";
  initialValues?: StudentFormValues;
}

export function StudentForm({ mode, initialValues }: StudentFormProps) {
  const tStudents = useTranslations("students");
  const tCommon = useTranslations("common");

  const [classValue, setClassValue] = useState(() => {
    const classId = initialValues?.classId;
    if (!classId) {
      return "";
    }
    const matchedClass = CLASSES.find((classItem) => classItem.id === classId);
    return matchedClass?.name ?? classId;
  });

  const [gradeValue, setGradeValue] = useState(() => {
    const gradeId = initialValues?.gradeId;
    if (!gradeId) {
      return "";
    }
    const matchedGrade = GRADES.find((grade) => grade.id === gradeId);
    return matchedGrade?.name ?? gradeId;
  });

  const matchedClass = useMemo(() => {
    const normalized = classValue.trim().toLowerCase();
    if (!normalized) {
      return null;
    }

    return (
      CLASSES.find(
        (classItem) =>
          classItem.id.toLowerCase() === normalized ||
          classItem.name.toLowerCase() === normalized,
      ) ?? null
    );
  }, [classValue]);

  const gradeSuggestions = useMemo(() => {
    if (!matchedClass) {
      return GRADES;
    }

    const allowed = new Set(matchedClass.gradeIds);
    return GRADES.filter((grade) => allowed.has(grade.id));
  }, [matchedClass]);

  useEffect(() => {
    if (!matchedClass || !gradeValue) {
      return;
    }

    const normalized = gradeValue.trim().toLowerCase();
    const isValid = gradeSuggestions.some(
      (grade) =>
        grade.id.toLowerCase() === normalized ||
        grade.name.toLowerCase() === normalized,
    );

    if (!isValid) {
      setGradeValue("");
    }
  }, [gradeSuggestions, gradeValue, matchedClass]);

  const titleKey = mode === "create" ? "createTitle" : "editTitle";
  const buttonKey = mode === "create" ? "createButton" : "editButton";

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground lg:text-3xl">
            {tStudents(`form.${titleKey}`)}
          </h1>
          <p className="text-sm text-muted-foreground lg:text-base">
            {tStudents("form.description")}
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/students">{tCommon("actions.cancel")}</Link>
        </Button>
      </section>

      <Card className="border-border/80">
        <CardHeader>
          <CardTitle>{tStudents(`form.${titleKey}`)}</CardTitle>
          <CardDescription>{tStudents("form.description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="student-id">{tStudents("form.fields.id")}</Label>
              <Input
                id="student-id"
                name="student-id"
                autoComplete="off"
                defaultValue={initialValues?.id ?? ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="student-name">
                {tStudents("form.fields.name")}
              </Label>
              <Input
                id="student-name"
                name="student-name"
                autoComplete="off"
                defaultValue={initialValues?.name ?? ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="student-class">
                {tStudents("form.fields.class")}
              </Label>
              <Input
                id="student-class"
                name="student-class"
                list="student-class-options"
                autoComplete="off"
                value={classValue}
                onChange={(event) => setClassValue(event.target.value)}
              />
              <datalist id="student-class-options">
                {CLASSES.map((classItem) => (
                  <option key={classItem.id} value={classItem.name}>
                    {classItem.name}
                  </option>
                ))}
              </datalist>
            </div>
            <div className="space-y-2">
              <Label htmlFor="student-grade">
                {tStudents("form.fields.grade")}
              </Label>
              <Input
                id="student-grade"
                name="student-grade"
                autoComplete="off"
                list="student-grade-options"
                value={gradeValue}
                onChange={(event) => setGradeValue(event.target.value)}
              />
              <datalist id="student-grade-options">
                {gradeSuggestions.map((grade) => (
                  <option
                    key={grade.id}
                    value={grade.name}
                    label={`${grade.name} (${grade.id})`}
                  >
                    {grade.id}
                  </option>
                ))}
              </datalist>
            </div>
            <div className="space-y-2">
              <Label htmlFor="student-guardian">
                {tStudents("form.fields.guardian")}
              </Label>
              <Input
                id="student-guardian"
                name="student-guardian"
                autoComplete="off"
                defaultValue={initialValues?.guardian ?? ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="student-contact">
                {tStudents("form.fields.contact")}
              </Label>
              <Input
                id="student-contact"
                name="student-contact"
                type="tel"
                defaultValue={initialValues?.contact ?? ""}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="student-notes">
                {tStudents("form.fields.notes")}
              </Label>
              <Textarea
                id="student-notes"
                name="student-notes"
                rows={4}
                defaultValue={initialValues?.notes ?? ""}
              />
            </div>
            <div className="sm:col-span-2 flex justify-end gap-2">
              <Button type="button" variant="outline" asChild>
                <Link href="/students">{tCommon("actions.cancel")}</Link>
              </Button>
              <Button type="submit">{tStudents(`form.${buttonKey}`)}</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
