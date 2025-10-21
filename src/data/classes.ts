export interface ClassRecord {
  id: string;
  name: string;
  gradeIds: string[];
}

export const CLASSES: ClassRecord[] = [
  {
    id: "class-7",
    name: "Junior High - Year 7",
    gradeIds: ["grade-7a", "grade-7b"],
  },
  {
    id: "class-8",
    name: "Junior High - Year 8",
    gradeIds: ["grade-8a", "grade-8b"],
  },
  {
    id: "class-advanced",
    name: "Advanced Enrichment",
    gradeIds: ["grade-8b", "grade-9a"],
  },
];

export function findClassById(id: string) {
  return CLASSES.find((classItem) => classItem.id === id) ?? null;
}

export function findClassesByGradeId(gradeId: string) {
  return CLASSES.filter((classItem) => classItem.gradeIds.includes(gradeId));
}
