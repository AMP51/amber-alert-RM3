const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { createAlert, getAlerts, getAlertById } = require("../controllers/alertController");
const { updateRecord } = require("../utils/sqlFunctions");

router.post("/alerts", authMiddleware, createAlert);
router.get("/alerts", authMiddleware, getAlerts);
router.get("/alerts/:id", authMiddleware, getAlertById);

router.put("/alerts/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    await updateRecord("admin_alerts", updates, { column: "alertId", value: id });
    res.status(200).json({ message: "Alert updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
