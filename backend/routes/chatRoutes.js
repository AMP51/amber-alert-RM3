const express = require("express");
const router = express.Router();
const { getMessages, sendMessage } = require("../controllers/chatController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/threads", authMiddleware, getMessages);
router.post("/threads", authMiddleware, sendMessage);

module.exports = router;
