"use server";

import prisma from "../../prisma/singleton";

export const createCourse = async (data) => {
  const course = await prisma.course.create({ data });
  return course;
};

export const getCourseById = async (courseId) => {
  const course = await prisma.course.findUnique({ where: { id: courseId } });
  return course;
};

export const updateCourse = async (courseId, data) => {
  const updatedCourse = await prisma.course.update({
    where: { id: courseId },
    data,
  });
  return updatedCourse;
};

export const deleteCourse = async (courseId) => {
  const deletedCourse = await prisma.course.delete({ where: { id: courseId } });
  return deletedCourse;
};


export const coursesByTitle = await prisma.course.findMany({
  where: {
    title: {
      contains: searchString,
    },
  },
});

export const coursesByTeacher = await prisma.course.findMany({
  where: {
    teacher: {
      name: {
        contains: searchString,
      },
    },
  },
});