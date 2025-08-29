const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { createContact, getContacts, getContactById } = require("../controllers/contactController");

router.post("/contact", authMiddleware, createContact);
router.get("/contact", authMiddleware, getContacts);
router.get("/contact/:id", getContactById);

module.exports = router;
