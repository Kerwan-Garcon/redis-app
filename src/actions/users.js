"use server";

import prisma from "../../prisma/singleton";

export const createUser = async (email, password, role) => {
  const user = await prisma.user.create({
    data: {
      email,
      password,
      role,
    },
  });
  return user;
};

export const getUserById = async (userId) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  return user;
};

export const updateUser = async (userId, newData) => {
  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: newData,
  });
  return updatedUser;
};

export const deleteUser = async (userId) => {
  const deletedUser = await prisma.user.delete({
    where: {
      id: userId,
    },
  });
  return deletedUser;
};
