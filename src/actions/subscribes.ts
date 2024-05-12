"use server";

import { subscriptionClient } from "@/lib/db";
import prisma from "../../prisma/singleton";
import { subscribeStudentToCourseNotifications } from "@/lib/courseNotifications";
import { revalidatePath } from "next/cache";

export async function subscribeToCourse(studentId: number, courseId: number) {
  try {
    const subscribedCourse = await prisma.subscribedCourse.create({
      data: {
        studentId,
        courseId,
      },
    });

    await subscriptionClient.sadd(`student:${studentId}:courses`, courseId);
    await subscribeStudentToCourseNotifications(studentId, courseId);
  } catch (error) {
    console.error("Error subscribing to course:", error);
    throw error;
  }
  revalidatePath("/courses");
  revalidatePath("/profile");
}

export async function  getSubscribedCourses(studentId: number) {
  try {
    const subscribedCourseIds = await subscriptionClient.smembers(
      `student:${studentId}:courses`
    );

    const courses = await prisma.course.findMany({
      where: {
        id: {
          in: subscribedCourseIds.map(Number),
        },
      },
    });

    return courses;
  } catch (error) {
    console.error("Error getting subscribed courses:", error);
    throw error;
  }
}

export async function unsubscribeFromCourse(
  studentId: number,
  courseId: number
) {
  try {
    await subscriptionClient.srem(`student:${studentId}:courses`, courseId);

    await prisma.subscribedCourse.deleteMany({
      where: {
        studentId,
        courseId,
      },
    });
  } catch (error) {
    console.error("Error unsubscribing from course:", error);
    throw error;
  }
  revalidatePath("/courses");
  revalidatePath("/profile");
}
