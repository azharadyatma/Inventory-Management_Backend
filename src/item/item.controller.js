const express = require("express");
const {
  createItem,
  getAllItems,
  getItemById,
  editItemById,
  deleteItemById,
} = require("./item.service");
const authorizeJWT = require("../middleware/authorizeJWT");
const adminAuthorization = require("../middleware/adminAuthorization");

const router = express.Router();

// Create Item
router.post("/", adminAuthorization, async (req, res) => {
  try {
    const newItemData = req.body;
    const newItem = await createItem(newItemData);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Get All Items
router.get("/", authorizeJWT, async (req, res) => {
  try {
    const items = await getAllItems();
    res.status(200).send(items);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Get Item by ID
router.get("/:itemId", authorizeJWT, async (req, res) => {
  try {
    const itemId = parseInt(req.params.itemId);
    const item = await getItemById(itemId);
    res.status(200).send(item);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Edit Item by ID
router.put("/:itemId", adminAuthorization, async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const itemData = req.body;
    const updatedItem = await editItemById(itemId, itemData);
    res.send(updatedItem);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Delete Item
router.delete("/:itemId", adminAuthorization, async (req, res) => {
  try {
    const itemId = req.params.itemId;
    await deleteItemById(itemId);
    res.status(204).json({ message: "Item Deleted" });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
