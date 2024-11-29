const {
  insertItem,
  findItemById,
  findItems,
  editItem,
  deleteItem,
} = require("./item.repository");

async function createItem(newItemData) {
  const newItem = await insertItem(newItemData);
  return newItem;
}

async function getAllItems() {
  const items = await findItems();
  return items;
}

async function getItemById(itemId) {
  const item = await findItemById(itemId);
  if (!item) {
    throw Error("Item not found");
  }
  return item;
}

async function editItemById(itemId, itemData) {
  await getItemById(itemId);
  const updatedItem = await editItem(itemId, itemData);
  return updatedItem;
}

async function deleteItemById(itemId) {
  await getItemById(itemId);
  await deleteItem(itemId);
}

module.exports = {
  createItem,
  getAllItems,
  getItemById,
  editItemById,
  deleteItemById,
};
