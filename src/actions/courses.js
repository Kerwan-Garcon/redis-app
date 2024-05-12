import { courseClient } from "@/lib/db";
import prisma from "../../prisma/singleton";

export async function createCourse(data) {
  const newCourse = await prisma.course.create({ data });

  await courseClient.set(`course:${newCourse.id}`, JSON.stringify(newCourse));

  return newCourse;
}

export async function getCourseById(courseId) {
  const cachedCourse = await courseClient.get(`course:${courseId}`);

  if (cachedCourse) {
    return JSON.parse(cachedCourse);
  } else {
    const courseFromDB = await prisma.course.findUnique({ where: { id: courseId } });

    await courseClient.set(`course:${courseId}`, JSON.stringify(courseFromDB));

    return courseFromDB;
  }
}

export async function updateCourse(courseId, data) {
  const updatedCourse = await prisma.course.update({
    where: { id: courseId },
    data,
  });

  await courseClient.set(`course:${courseId}`, JSON.stringify(updatedCourse));

  return updatedCourse;
}

export async function deleteCourse(courseId) {
  await prisma.course.delete({ where: { id: courseId } });

  await courseClient.del(`course:${courseId}`);
}

