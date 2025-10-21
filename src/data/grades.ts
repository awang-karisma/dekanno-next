export interface GradeRecord {
  id: string;
  name: string;
  studentCount: number;
  classIds: string[];
}

export const GRADES: GradeRecord[] = [
  {
    id: "grade-7a",
    name: "Grade 7A",
    studentCount: 32,
    classIds: ["class-7"],
  },
  {
    id: "grade-7b",
    name: "Grade 7B",
    studentCount: 29,
    classIds: ["class-7"],
  },
  {
    id: "grade-8a",
    name: "Grade 8A",
    studentCount: 28,
    classIds: ["class-8"],
  },
  {
    id: "grade-8b",
    name: "Grade 8B",
    studentCount: 31,
    classIds: ["class-8", "class-advanced"],
  },
  {
    id: "grade-9a",
    name: "Grade 9A",
    studentCount: 30,
    classIds: ["class-advanced"],
  },
];

export function findGradeById(id: string) {
  return GRADES.find((grade) => grade.id === id) ?? null;
}

export function findGradesByClassId(classId: string) {
  return GRADES.filter((grade) => grade.classIds.includes(classId));
}

export function findClassIdsByGradeId(gradeId: string) {
  const grade = findGradeById(gradeId);
  return grade?.classIds ?? [];
}
