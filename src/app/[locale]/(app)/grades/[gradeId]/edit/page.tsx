import { notFound } from "next/navigation";

import { GradeForm } from "@/components/grades/grade-form";
import { findGradeById } from "@/data/grades";

export default async function EditGradePage({
  params,
}: {
  params: Promise<{ locale: string; gradeId: string }>;
}) {
  const { locale, gradeId } = await params;
  const grade = findGradeById(gradeId);

  if (!grade) {
    notFound();
  }

  return (
    <GradeForm
      locale={locale}
      mode="edit"
      initialValues={{
        id: grade.id,
        name: grade.name,
      }}
    />
  );
}
