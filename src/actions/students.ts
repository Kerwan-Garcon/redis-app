"use server";

import prisma from "../../prisma/singleton";
import { studentClient } from "@/lib/db";

export async function getStudents() {
  const cachedStudents = await studentClient.get("students");

  if (cachedStudents) {
    return JSON.parse(cachedStudents);
  } else {
    const studentsFromDB = await prisma.student.findMany();

    await studentClient.set("students", JSON.stringify(studentsFromDB));

    return studentsFromDB;
  }
}

export async function getStudentById(id: number) {
  const cachedStudent = await studentClient.get(`student:${id}`);

  if (cachedStudent) {
    return JSON.parse(cachedStudent);
  } else {
    const studentFromDB = await prisma.student.findUnique({
      where: {
        id,
      },
    });

    await studentClient.set(`student:${id}`, JSON.stringify(studentFromDB));

    return studentFromDB;
  }
}

export async function createStudent(name: string) {
  const newStudent = await prisma.student.create({
    data: {
      name,
    },
  });

  await studentClient.set(
    `student:${newStudent.id}`,
    JSON.stringify(newStudent)
  );

  await refreshStudentCache();

  return newStudent;
}

export async function updateStudent(id: number, name: string) {
  const updatedStudent = await prisma.student.update({
    where: {
      id,
    },
    data: {
      name,
    },
  });

  await studentClient.set(`student:${id}`, JSON.stringify(updatedStudent));

  await refreshStudentCache();

  return updatedStudent;
}

export async function deleteStudent(id: number) {
  try {
    await prisma.subscribedCourse.deleteMany({
      where: {
        studentId: id,
      },
    });

    await prisma.student.deleteMany({
      where: {
        id: id,
      },
    });

    await studentClient.del(`student:${id}`);

    await refreshStudentCache();

    console.log("Student and associated subscriptions deleted successfully.");
  } catch (error) {
    console.error("Error deleting student:", error);
    throw error;
  }
}

async function refreshStudentCache() {
  const studentsFromDB = await prisma.student.findMany();

  await studentClient.set("students", JSON.stringify(studentsFromDB));
}
