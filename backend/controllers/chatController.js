const { v4: uuidv4 } = require("uuid");
const { insertRecord, queryRecords } = require("../utils/sqlFunctions");

const getMessages = async (req, res) => {
    try {
        const messages = await queryRecords(`
      SELECT c.*, u.name AS author
      FROM chat_messages c
      LEFT JOIN users u ON c.userId = u.userId
      ORDER BY c.created_at ASC
    `);
        res.json(messages);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch messages" });
    }
};

const sendMessage = async (req, res) => {
    try {
        const { content } = req.body;
        if (!content) return res.status(400).json({ error: "Message cannot be empty" });

        const message = {
            messageId: uuidv4(),
            userId: req.user.userId,
            content
        };

        await insertRecord("chat_messages", message);
        res.status(201).json(message);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to send message" });
    }
};

module.exports = { getMessages, sendMessage };
