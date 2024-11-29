const prisma = require("../db");

async function createTransaction(userId, itemId, quantityBorrowed) {
    try {
        const newTransaction = await prisma.transaction.create({
            data: {
                userId,
                itemId,
                quantityBorrowed,
                status: "PENDING",
            }
        });
        return newTransaction;
    } catch (error) {
        throw new Error("Failed to create transaction");
    }
}

async function findTransactions() {
    try {
        const transactions = await prisma.transaction.findMany({
            include: {
                item: {
                    select: {
                        name: true
                    }
                }
            }
        });
        return transactions;
    } catch (error) {
        throw new Error('Failed to fetch transactions');
    }
}

async function findTransactionsByUserId(userId) {
    try {
        const transactions = await prisma.transaction.findMany({
            where: {
                userId: parseInt(userId),
            },
            include: {
                item: {
                    select: {
                        name: true
                    }
                }
            }
        });
        return transactions;
    } catch (error) {
        throw new Error('Failed to fetch transactions by user ID');
    }
}

async function findTransactionById(transactionId) {
    const transaction = await prisma.transaction.findUnique({
        where: {
            transactionId: parseInt(transactionId),
        },
    });
    return transaction;
}

async function updateTransactionStatus(transactionId, status, timestampField) {
    try {
        const updateData = {
            status,
        }

        if (timestampField) {
            updateData[timestampField] = new Date();
        }

        await prisma.transaction.update({
            where: {
                transactionId: parseInt(transactionId),
            },
            data: updateData,
        });
    } catch (error) {
        throw new Error('Failed to update transaction status');
    }
}

module.exports = {
    createTransaction,
    findTransactions,
    findTransactionsByUserId,
    findTransactionById,
    updateTransactionStatus
};