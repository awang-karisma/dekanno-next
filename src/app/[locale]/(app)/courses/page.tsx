import { getTranslations } from "next-intl/server";

import { CoursesTable } from "@/components/courses/courses-table";

export default async function CoursesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const tCourses = await getTranslations({ namespace: "courses", locale });

  return (
    <div className="space-y-6">
      <section className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground lg:text-3xl">
          {tCourses("title")}
        </h1>
        <p className="text-sm text-muted-foreground lg:text-base">
          {tCourses("subtitle")}
        </p>
      </section>

      <CoursesTable />
    </div>
  );
}
