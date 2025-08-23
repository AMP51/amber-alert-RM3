const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { createAlert } = require("../controllers/alertController");

router.post("/alerts", authMiddleware, createAlert);

module.exports = router;
