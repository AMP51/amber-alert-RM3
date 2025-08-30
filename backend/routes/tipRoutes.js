const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { createTip} = require("../controllers/tipController");

router.post("/tips", authMiddleware, createTip);




module.exports = router;
