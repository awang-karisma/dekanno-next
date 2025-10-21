import { GradeForm } from "@/components/grades/grade-form";

export default async function CreateGradePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return <GradeForm locale={locale} mode="create" />;
}
