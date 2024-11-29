const express = require("express");
const router = express.Router();
const userService = require("./user.service");

// Create User
router.post("/", async (req, res) => {
  try {
    const userData = req.body;
    const newUser = await userService.createUser(userData);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Get All Users
router.get("/", async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users); // Status 200 dan JSON response
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Get User by ID
router.get("/:userId", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const user = await userService.getUserById(userId);
    res.status(200).json(user); // Status 200 dan JSON response
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Update User
router.patch("/:userId", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const userData = req.body;
    const updatedUser = await userService.editUserById(userId, userData);

    delete updatedUser.password;
    res
      .status(200)
      .send({ data: updatedUser, message: "User updated successfully!" });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Delete User
router.delete("/:userId", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    await userService.deleteUserById(userId);
    res.status(200).json({ message: "User Deleted" });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
