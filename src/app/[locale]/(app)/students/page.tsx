import { Users } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { StudentDirectory } from "@/components/students/student-directory";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";

export default async function StudentsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const tStudents = await getTranslations({
    namespace: "students",
    locale,
  });

  const highlights = [
    {
      label: tStudents("stats.total"),
      value: "138",
    },
    {
      label: tStudents("stats.new"),
      value: "12",
    },
    {
      label: tStudents("stats.guardian"),
      value: "128",
    },
  ];

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground lg:text-3xl">
            {tStudents("title")}
          </h1>
          <p className="text-sm text-muted-foreground lg:text-base">
            {tStudents("subtitle")}
          </p>
        </div>
        <Button asChild>
          <Link href="/students/new" className="w-full sm:w-auto">
            {tStudents("actions.add")}
          </Link>
        </Button>
      </section>

      <div className="grid gap-4 sm:grid-cols-3">
        {highlights.map((item) => (
          <Card key={item.label} className="border-border/80">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between text-sm font-medium text-muted-foreground">
                {item.label}
                <Users className="h-4 w-4" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold text-foreground">
                {item.value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <StudentDirectory />
    </div>
  );
}
