import { createClient } from "redis";

const client = createClient({
  socket: {
    host: "localhost",
    port: 6379,
  },
});

client.on("error", (error) => {
  console.error(error);
});

if (!client.isOpen) {
  client.connect();
}

const addCourse = (course: Course) => {
  const { id, title, teacher, summary, level, availableSlots, expirationDate } =
    course;
  const courseKey = `course:${id}`;
  client.set(
    courseKey,
    JSON.stringify({
      title,
      teacher,
      summary,
      level,
      availableSlots,
      expirationDate,
    })
  );
};

const getCourse = (id: number) => {
  const courseKey = `course:${id}`;
  return client.get(courseKey);
};

const addTeacher = (teacher: Teacher): void => {
  const { id, name, courses } = teacher;
  const teacherKey = `teacher:${id}`;
  client.set(teacherKey, JSON.stringify({ name, courses }));
};

const getTeacherById = (id: number) => {
  const teacherKey = `teacher:${id}`;
  return client.get(teacherKey);
};

const add = (key: string, value: string) => {
  client.set(key, value);
};

const addStudent = (student: Student) => {
  const { id, name, enrolledCourses } = student;
  const studentKey = `student:${id}`;
  client.set(studentKey, JSON.stringify({ name, enrolledCourses }));
};

const getStudentById = (id: number) => {
  const studentKey = `student:${id}`;
  return client.get(studentKey);
};

const get = (key: string) => {
  return client.get(key);
};

export {
  add,
  get,
  getStudentById,
  addStudent,
  getTeacherById,
  addTeacher,
  getCourse,
  addCourse,
};
