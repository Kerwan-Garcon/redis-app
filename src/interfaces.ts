interface Course {
  id: number;
  title: string;
  teacherId: number;
  summary: string;
  level: string;
  availableSlots: number;
  expirationDate: string;
}

interface Teacher {
  id: number;
  name: string;
  courses: number[];
}

interface Student {
  id: number;
  name: string;
  enrolledCourses: number[];
}

enum Role {
  STUDENT,
  TEACHER,
}
