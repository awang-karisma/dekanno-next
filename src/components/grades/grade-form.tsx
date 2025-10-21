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
import { Link } from "@/i18n/navigation";

export interface GradeFormValues {
  id?: string;
  name?: string;
}

interface GradeFormProps {
  locale: string;
  mode: "create" | "edit";
  initialValues?: GradeFormValues;
}

export async function GradeForm({
  locale,
  mode,
  initialValues,
}: GradeFormProps) {
  const tGrades = await getTranslations({ namespace: "grades", locale });
  const tCommon = await getTranslations({ namespace: "common", locale });

  const titleKey = mode === "create" ? "createTitle" : "editTitle";
  const buttonKey = mode === "create" ? "createButton" : "editButton";

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground lg:text-3xl">
            {tGrades(`form.${titleKey}`)}
          </h1>
          <p className="text-sm text-muted-foreground lg:text-base">
            {tGrades("form.description")}
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/grades">{tCommon("actions.cancel")}</Link>
        </Button>
      </section>

      <Card className="border-border/80">
        <CardHeader>
          <CardTitle>{tGrades(`form.${titleKey}`)}</CardTitle>
          <CardDescription>{tGrades("form.description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="grade-id">{tGrades("form.fields.id")}</Label>
              <Input
                id="grade-id"
                name="grade-id"
                autoComplete="off"
                defaultValue={initialValues?.id ?? ""}
                readOnly={mode === "edit"}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="grade-name">{tGrades("form.fields.name")}</Label>
              <Input
                id="grade-name"
                name="grade-name"
                autoComplete="off"
                defaultValue={initialValues?.name ?? ""}
              />
            </div>
            <div className="sm:col-span-2 flex justify-end gap-2">
              <Button type="button" variant="outline" asChild>
                <Link href="/grades">{tCommon("actions.cancel")}</Link>
              </Button>
              <Button type="submit">{tGrades(`form.${buttonKey}`)}</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
