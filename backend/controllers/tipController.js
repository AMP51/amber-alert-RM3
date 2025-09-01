const { v4: uuidv4 } = require("uuid");
const { insertRecord, queryRecords } = require("../utils/sqlFunctions");

const createTip = async (req, res) => {
  try {
    const { alertId, message } = req.body;

    if (!alertId || !message) {
      return res.status(400).json({ error: "alertId and message are required" });
    }

    const tip = {
      tipId: uuidv4(),
      alertId,
      userId: req.user.userId,
      message,
    };

    await insertRecord("tips", tip);
    res.status(201).json({ message: "Tip submitted successfully", tipId: tip.tipId });
  } catch (err) {
    console.error("Error creating tip:", err);
    res.status(500).json({ error: "Failed to submit tip" });
  }
};

const getAllTips = async (req, res) => {
  try {
    const tips = await queryRecords(
      `SELECT t.tipId, t.message, t.created_at, 
              u.name AS userName, a.name AS alertName, a.category AS alertCategory
       FROM tips t
       JOIN users u ON t.userId = u.userId
       JOIN admin_alerts a ON t.alertId = a.alertId
       ORDER BY t.created_at DESC`
    );
    res.json(tips);
  } catch (err) {
    console.error("Error fetching tips:", err);
    res.status(500).json({ error: "Failed to fetch tips" });
  }
};

const getTipById = async (req, res) => {
  try {
    const { tipId } = req.params;
    const tip = await queryRecords(
      `SELECT t.tipId, t.message, t.created_at,
              u.name AS userName, u.email AS userEmail, u.phone AS userPhone,
              a.name AS alertName, a.description AS alertDescription
       FROM tips t
       JOIN users u ON t.userId = u.userId
       JOIN admin_alerts a ON t.alertId = a.alertId
       WHERE t.tipId = ?`,
      [tipId]
    );

    if (tip.length === 0) {
      return res.status(404).json({ error: "Tip not found" });
    }

    res.json(tip[0]);
  } catch (err) {
    console.error("Error fetching tip:", err);
    res.status(500).json({ error: "Failed to fetch tip" });
  }
};

module.exports = { createTip, getAllTips, getTipById };
