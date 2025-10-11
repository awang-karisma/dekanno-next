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

export default async function EditStudentPage({
  params,
}: {
  params: Promise<{ locale: string; studentId: string }>;
}) {
  const { locale, studentId } = await params;
  const tStudents = await getTranslations({ namespace: "students", locale });
  const tCommon = await getTranslations({ namespace: "common", locale });

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground lg:text-3xl">
            {tStudents("form.editTitle")}
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
          <CardTitle>{tStudents("form.editTitle")}</CardTitle>
          <CardDescription>{tStudents("form.description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="student-id">
                {tStudents("form.fields.id")}
              </Label>
              <Input id="student-id" name="student-id" defaultValue={studentId} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="student-name">
                {tStudents("form.fields.name")}
              </Label>
              <Input id="student-name" name="student-name" defaultValue="" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="student-class">
                {tStudents("form.fields.class")}
              </Label>
              <Input id="student-class" name="student-class" defaultValue="" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="student-guardian">
                {tStudents("form.fields.guardian")}
              </Label>
              <Input id="student-guardian" name="student-guardian" defaultValue="" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="student-contact">
                {tStudents("form.fields.contact")}
              </Label>
              <Input id="student-contact" name="student-contact" type="tel" defaultValue="" />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="student-notes">
                {tStudents("form.fields.notes")}
              </Label>
              <Textarea id="student-notes" name="student-notes" rows={4} />
            </div>
            <div className="sm:col-span-2 flex justify-end gap-2">
              <Button type="button" variant="outline" asChild>
                <Link href="/students">{tCommon("actions.cancel")}</Link>
              </Button>
              <Button type="submit">{tStudents("form.editButton")}</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
