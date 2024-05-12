import { teacherClient } from "@/lib/db";
import prisma from "../../prisma/singleton";

export async function createTeacher(data) {
  try {
    const newTeacher = await prisma.teacher.create({
      data: {
        name: data.name,
      },
    });

    await teacherClient.set(`teacher:${newTeacher.id}`, JSON.stringify(newTeacher));

    return newTeacher;
  } catch (error) {
    console.error("Error creating teacher:", error);
    throw error;
  }
}

export async function getAllTeachers() {
  try {
    const cachedTeachers = await teacherClient.get('teachers');

    if (cachedTeachers) {
      return JSON.parse(cachedTeachers);
    } else {
      const teachersFromDB = await prisma.teacher.findMany();

      await teacherClient.set('teachers', JSON.stringify(teachersFromDB));

      return teachersFromDB;
    }
  } catch (error) {
    console.error("Error getting all teachers:", error);
    throw error;
  }
}

export async function getTeacherById(id) {
  try {
    const cachedTeacher = await teacherClient.get(`teacher:${id}`);

    if (cachedTeacher) {
      return JSON.parse(cachedTeacher);
    } else {
      const teacherFromDB = await prisma.teacher.findUnique({ where: { id } });

      await teacherClient.set(`teacher:${id}`, JSON.stringify(teacherFromDB));

      return teacherFromDB;
    }
  } catch (error) {
    console.error("Error getting teacher by ID:", error);
    throw error;
  }
}

export async function updateTeacher(id, data) {
  try {
    const updatedTeacher = await prisma.teacher.update({
      where: { id },
      data: {
        name: data.name,
      },
    });

    await teacherClient.set(`teacher:${id}`, JSON.stringify(updatedTeacher));

    return updatedTeacher;
  } catch (error) {
    console.error("Error updating teacher:", error);
    throw error;
  }
}

export async function deleteTeacher(id) {
  try {
    await prisma.teacher.delete({ where: { id } });

    await teacherClient.del(`teacher:${id}`);
  } catch (error) {
    console.error("Error deleting teacher:", error);
    throw error;
  }
}
