const { v4: uuidv4 } = require("uuid");
const { insertRecord, queryRecords } = require("../utils/sqlFunctions");

const createMessage = async (req, res) => {
    try {
        const { content } = req.body;
        if (!content) return res.status(400).json({ error: "Message content is required" });

        const message = {
            messageId: uuidv4(),
            content,
            senderName: req.user.name || "Admin",
            createdBy: req.user.userId
        };

        await insertRecord("messages", message);
        res.status(201).json({ message: "Message created", messageId: message.messageId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create message" });
    }
};

const getMessages = async (req, res) => {
    try {
        const messages = await queryRecords("SELECT * FROM messages ORDER BY created_at DESC");
        res.status(200).json(messages);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch messages" });
    }
};

module.exports = { createMessage, getMessages };
