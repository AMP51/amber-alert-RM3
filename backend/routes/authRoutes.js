
const express = require("express");
const { register, login, logout } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", authMiddleware, (req, res) => {
  res.status(200).json({ userId: req.user.userId, role: req.user.role });
});

module.exports = router;
