import { notFound } from "next/navigation";

import { StudentForm } from "@/components/students/student-form";
import { findStudentById } from "@/data/students";

export default async function EditStudentPage({
  params,
}: {
  params: Promise<{ locale: string; studentId: string }>;
}) {
  const { locale, studentId } = await params;
  const student = findStudentById(studentId);

  if (!student) {
    notFound();
  }

  return (
    <StudentForm
      locale={locale}
      mode="edit"
      initialValues={{
        id: student.id,
        name: student.name,
        grade: student.gradeId,
        guardian: student.guardian,
        contact: student.contact,
        notes: student.notes,
      }}
    />
  );
}
