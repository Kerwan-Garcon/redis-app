"use server";

import prisma from "../../prisma/singleton";

export async function getStudents() {
  return prisma.student.findMany();
}

export async function getStudentById(id: number) {
  return prisma.student.findUnique({
    where: {
      id,
    },
  });
}

export async function createStudent(name: string) {
  return prisma.student.create({
    data: {
      name,
    },
  });
}

export async function updateStudent(id: number, name: string) {
  return prisma.student.update({
    where: {
      id,
    },
    data: {
      name,
    },
  });
}

export async function deleteStudent(id: number) {
  return prisma.student.delete({
    where: {
      id,
    },
  });
}
