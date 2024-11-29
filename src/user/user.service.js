const bcrypt = require("bcrypt");
const {
  insertUser,
  findUsers,
  findUserById,
  editUser,
  deleteUser,
} = require("./user.repository");

async function createUser(newUserData) {
  const hashedPassword = await bcrypt.hash(newUserData.password, 10);
  newUserData.password = hashedPassword;
  const newUser = await insertUser(newUserData);
  return newUser;
}

async function getAllUsers() {
  const users = await findUsers();
  return users;
}

async function getUserById(userId) {
  const user = await findUserById(userId);
  if (!user) {
    throw Error("User not found");
  }
  return user;
}

async function editUserById(userId, userData) {
  if (userData.password) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;
  }
  await getUserById(userId);
  const updatedUser = await editUser(userId, userData);
  return updatedUser;
}

async function deleteUserById(userId) {
  await getUserById(userId);
  await deleteUser(userId);
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  editUserById,
  deleteUserById,
};
