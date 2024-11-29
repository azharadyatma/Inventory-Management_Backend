const prisma = require("../db");

async function insertItem(itemData) {
  const newItem = await prisma.item.create({
    data: {
      name: itemData.name,
      description: itemData.description,
      quantity: parseInt(itemData.quantity), // Harus Integer, pastikan tidak berupa String
      createdAt: new Date(), // Harus DateTime
    },
  });
  return newItem;
}

async function findItems() {
  const items = await prisma.item.findMany();
  return items;
}

async function findItemById(itemId) {
  const item = await prisma.item.findUnique({
    where: {
      itemId: parseInt(itemId),
    },
  });
  return item;
}

async function editItem(itemId, itemData) {
  const updatedItem = await prisma.item.update({
    where: {
      itemId: parseInt(itemId),
    },

    data: {
      name: itemData.name,
      description: itemData.description,
      quantity: parseInt(itemData.quantity),
    },
  });
  return updatedItem;
}

async function deleteItem(itemId) {
  await prisma.item.delete({
    where: {
      itemId: parseInt(itemId),
    },
  });
}

async function updateItemQuantity(itemId, newQuantity) {
  await prisma.item.update({
    where: {
      itemId: parseInt(itemId),
    },
    data: {
      quantity: newQuantity,
    },
  });
}

module.exports = {
  insertItem,
  findItems,
  findItemById,
  editItem,
  deleteItem,
  updateItemQuantity,
};
