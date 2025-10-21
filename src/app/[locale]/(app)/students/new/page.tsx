import { StudentForm } from "@/components/students/student-form";

export default async function CreateStudentPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;
  return <StudentForm mode="create" />;
}
