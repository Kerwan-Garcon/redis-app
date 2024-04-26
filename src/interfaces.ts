interface Course {
  id: number;
  title: string;
  teacher: string;
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
