export interface GradeRecord {
  id: string;
  name: string;
  studentCount: number;
}

export const GRADES: GradeRecord[] = [
  {
    id: "grade-7a",
    name: "Grade 7A",
    studentCount: 32,
  },
  {
    id: "grade-7b",
    name: "Grade 7B",
    studentCount: 29,
  },
  {
    id: "grade-8a",
    name: "Grade 8A",
    studentCount: 28,
  },
  {
    id: "grade-8b",
    name: "Grade 8B",
    studentCount: 31,
  },
  {
    id: "grade-9a",
    name: "Grade 9A",
    studentCount: 30,
  },
];

export function findGradeById(id: string) {
  return GRADES.find((grade) => grade.id === id) ?? null;
}
