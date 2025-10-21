export interface CourseRecord {
  id: string;
  name: string;
  gradeIds: string[];
}

export const COURSES: CourseRecord[] = [
  {
    id: "math-middle",
    name: "Mathematics",
    gradeIds: ["grade-7a", "grade-7b"],
  },
  {
    id: "science-middle",
    name: "Science",
    gradeIds: ["grade-7a", "grade-7b"],
  },
  {
    id: "history-8a",
    name: "History",
    gradeIds: ["grade-8a"],
  },
  {
    id: "biology-8b",
    name: "Biology",
    gradeIds: ["grade-8a", "grade-8b"],
  },
  {
    id: "algebra-9a",
    name: "Advanced Algebra",
    gradeIds: ["grade-9a"],
  },
];
