import { StudentForm } from "@/components/students/student-form";

export default async function CreateStudentPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <StudentForm locale={locale} mode="create" />;
}
