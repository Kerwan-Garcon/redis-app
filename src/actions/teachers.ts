"use server";

import prisma from "../../prisma/singleton";

const createTeacher = async (data: Teacher) => {
  try {
    const teacher = await prisma.teacher.create({
      data: {
        name: data.name,
      },
    });
    return teacher;
  } catch (error) {
    console.error("Error creating teacher:", error);
    throw error;
  }
};

// Fonction pour récupérer tous les étudiants
const getAllTeachers = async () => {
  try {
    const teachers = await prisma.teacher.findMany();
    return teachers;
  } catch (error) {
    console.error("Error getting all teachers:", error);
    throw error;
  }
};

// Fonction pour récupérer un étudiant par son ID
const getTeacherById = async (id: number) => {
  try {
    const teacher = await prisma.teacher.findUnique({ where: { id } });
    return teacher;
  } catch (error) {
    console.error("Error getting teacher by ID:", error);
    throw error;
  }
};

// Fonction pour mettre à jour un étudiant
const updateTeacher = async (id: number, data: Teacher) => {
  try {
    const teacher = await prisma.teacher.update({
      where: { id },
      data: {
        name: data.name,
      },
    });
    return teacher;
  } catch (error) {
    console.error("Error updating teacher:", error);
    throw error;
  }
};

// Fonction pour supprimer un étudiant
const deleteTeacher = async (id: number) => {
  try {
    const teacher = await prisma.teacher.delete({ where: { id } });
    return teacher;
  } catch (error) {
    console.error("Error deleting teacher:", error);
    throw error;
  }
};

export {
  createTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
};
