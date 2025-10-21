import { getTranslations } from "next-intl/server";

import { GradesTable } from "@/components/grades/grades-table";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export default async function GradesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const tGrades = await getTranslations({ namespace: "grades", locale });

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground lg:text-3xl">
            {tGrades("title")}
          </h1>
          <p className="text-sm text-muted-foreground lg:text-base">
            {tGrades("subtitle")}
          </p>
        </div>
        <Button asChild>
          <Link href="/grades/new" className="w-full sm:w-auto">
            {tGrades("actions.add")}
          </Link>
        </Button>
      </section>

      <GradesTable />
    </div>
  );
}
