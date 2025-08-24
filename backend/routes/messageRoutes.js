const express = require("express");
const router = express.Router();
const { createMessage, getMessages } = require("../controllers/messageController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/message", authMiddleware, createMessage);
router.get("/messages", getMessages);

module.exports = router;
