const prisma = require("../db");

async function insertUser(userData) {
  const newUser = await prisma.user.create({
    data: {
      username: userData.username,
      email: userData.email,
      password: userData.password,
      role: userData.role,
    },
  });
  return newUser;
}

async function findUsers() {
  const users = await prisma.user.findMany({
    select: {
      userId: true,
      username: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });
  return users;
}

async function findUserById(userId) {
  const user = await prisma.user.findUnique({
    where: {
      userId: parseInt(userId),
    },
    select: {
      userId: true,
      username: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });
  return user;
}

async function editUser(userId, userData) {
  const updatedUser = await prisma.user.update({
    where: {
      userId: parseInt(userId),
    },
    data: {
      username: userData.username,
      email: userData.email,
      password: userData.password,
      role: userData.role,
    },
  });
  return updatedUser;
}

async function deleteUser(userId) {
  await prisma.user.delete({
    where: {
      userId: parseInt(userId),
    },
  });
}

module.exports = {
  insertUser,
  findUsers,
  findUserById,
  editUser,
  deleteUser,
};
