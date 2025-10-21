export interface StudentRecord {
  id: string;
  name: string;
  gradeId: string;
  guardian: string;
  contact: string;
  attendance: number;
  notes?: string;
}

export const STUDENTS: StudentRecord[] = [
  {
    id: "ST-101",
    name: "Siti Rahma",
    gradeId: "grade-7a",
    guardian: "Nurhayati",
    contact: "0812-2345-6789",
    attendance: 96,
  },
  {
    id: "ST-102",
    name: "Andi Wijaya",
    gradeId: "grade-7a",
    guardian: "Slamet Wijaya",
    contact: "0813-9876-5432",
    attendance: 92,
  },
  {
    id: "ST-215",
    name: "Felicia Tan",
    gradeId: "grade-8b",
    guardian: "Maria Tan",
    contact: "0814-7755-2266",
    attendance: 88,
  },
  {
    id: "ST-310",
    name: "Budi Santoso",
    gradeId: "grade-9a",
    guardian: "Siti Aisyah",
    contact: "0815-6677-7890",
    attendance: 98,
  },
  {
    id: "ST-155",
    name: "Rina Moe",
    gradeId: "grade-8a",
    guardian: "Liang Moe",
    contact: "0812-7788-3344",
    attendance: 93,
  },
  {
    id: "ST-220",
    name: "Samuel Prakoso",
    gradeId: "grade-9a",
    guardian: "Yohana Prakoso",
    contact: "0813-2233-4455",
    attendance: 85,
  },
];

export function findStudentById(id: string) {
  return STUDENTS.find((student) => student.id === id) ?? null;
}
