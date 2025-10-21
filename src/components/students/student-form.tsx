import { getTranslations } from "next-intl/server";

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
import { Link } from "@/i18n/navigation";

export interface StudentFormValues {
  id?: string;
  name?: string;
  grade?: string;
  guardian?: string;
  contact?: string;
  notes?: string;
}

interface StudentFormProps {
  locale: string;
  mode: "create" | "edit";
  initialValues?: StudentFormValues;
}

export async function StudentForm({
  locale,
  mode,
  initialValues,
}: StudentFormProps) {
  const tStudents = await getTranslations({ namespace: "students", locale });
  const tCommon = await getTranslations({ namespace: "common", locale });

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
              <Label htmlFor="student-grade">
                {tStudents("form.fields.grade")}
              </Label>
              <Input
                id="student-grade"
                name="student-grade"
                autoComplete="off"
                defaultValue={initialValues?.grade ?? ""}
              />
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
