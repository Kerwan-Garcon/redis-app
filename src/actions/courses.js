"use server";
import { courseClient } from "@/lib/db";
import prisma from "../../prisma/singleton";
import { publishCourseNotification } from "@/lib/courseNotifications";

export async function createCourse(data) {
  const newCourse = await prisma.course.create({ data });

  await courseClient.set(`course:${newCourse.id}`, JSON.stringify(newCourse));

  await publishCourseNotification(
    newCourse.id,
    "Course created",
    "A new course has been created"
  );

  return newCourse;
}

export async function getAllCourses() {
  const cachedCourses = await courseClient.get("courses");

  if (cachedCourses) {
    return JSON.parse(cachedCourses);
  } else {
    const coursesFromDB = await prisma.course.findMany();

    await courseClient.set("courses", JSON.stringify(coursesFromDB));

    return coursesFromDB;
  }
}

export async function getCourseById(courseId) {
  const cachedCourse = await courseClient.get(`course:${courseId}`);

  if (cachedCourse) {
    return JSON.parse(cachedCourse);
  } else {
    const courseFromDB = await prisma.course.findUnique({
      where: { id: courseId },
    });

    await courseClient.set(`course:${courseId}`, JSON.stringify(courseFromDB));

    return courseFromDB;
  }
}

export async function searchCourses(searchQuery) {
  try {
    const courses = await prisma.course.findMany({
      where: {
        OR: [
          {
            title: {
              contains: searchQuery,
            },
          },
          {
            teacher: {
              name: {
                contains: searchQuery,
              },
            },
          },
          {
            level: {
              equals: searchQuery,
            },
          },
        ],
      },
      include: {
        teacher: true,
      },
    });
    return courses;
  } catch (error) {
    console.error("Error searching courses:", error);
    throw error;
  }
}

export async function getCourseByTeacher(teacherId) {
  const courses = await prisma.course.findMany({
    where: { teacherId },
  });

  return courses;
}

export async function updateCourse(courseId, data) {
  const updatedCourse = await prisma.course.update({
    where: { id: courseId },
    data,
  });

  await courseClient.set(`course:${courseId}`, JSON.stringify(updatedCourse));

  await publishCourseNotification(
    courseId,
    "Course updated",
    "A course has been updated"
  );

  return updatedCourse;
}

export async function deleteCourse(courseId) {
  await prisma.course.delete({ where: { id: courseId } });

  await courseClient.del(`course:${courseId}`);

  await publishCourseNotification(
    courseId,
    "Course deleted",
    "A course has been deleted"
  );
}

export async function refreshCourseExpiration(courseId) {
  try {
    const course = await prisma.course.findUnique({ where: { id: courseId } });

    const newExpirationDate = new Date();
    newExpirationDate.setDate(newExpirationDate.getDate() + 30);

    await prisma.course.update({
      where: { id: course.id },
      data: { expirationDate: newExpirationDate },
    });
  } catch (error) {
    console.error("Error refreshing course expiration:", error);
    throw error;
  }
}

export async function expireCourses() {
  try {
    const allCourses = await prisma.course.findMany();

    const currentDate = new Date();

    for (const course of allCourses) {
      if (currentDate > course.expirationDate) {
        await prisma.course.delete({ where: { id: course.id } });

        await courseClient.del(`course:${course.id}`);
      }
    }
  } catch (error) {
    console.error("Error expiring courses:", error);
    throw error;
  }
}
