import { createClient } from "redis";
import prisma from "../../prisma/singleton";

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

const addCourse = async (course: Course) => {
  const {
    id,
    title,
    teacherId,
    summary,
    level,
    availableSlots,
    expirationDate,
  } = course;
  const courseKey = `course:${id}`;

  try {
    await add(
      courseKey,
      JSON.stringify({
        title,
        teacherId,
        summary,
        level,
        availableSlots,
        expirationDate,
      })
    );

    await prisma.course.create({
      data: {
        id,
        title,
        teacherId,
        summary,
        level,
        availableSlots,
        expirationDate,
      },
    });
  } catch (error) {
    console.error(error);
  }
  add(
    courseKey,
    JSON.stringify({
      title,
      teacherId,
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
  add(teacherKey, JSON.stringify({ name, courses }));
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
  add(studentKey, JSON.stringify({ name, enrolledCourses }));
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
