const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { createTip, getAllTips, getTipById} = require("../controllers/tipController");

router.post("/tips", authMiddleware, createTip);
router.get("/allTips", authMiddleware, getAllTips);  
router.get("/tips/:tipId", authMiddleware, getTipById);  



module.exports = router;
