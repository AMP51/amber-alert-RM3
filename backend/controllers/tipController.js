const { v4: uuidv4 } = require("uuid");
const { insertRecord } = require("../utils/sqlFunctions");

const createTip = async (req, res) => {
  try {
    const { alertId, message } = req.body;

    if (!alertId || !message) {
      return res.status(400).json({ error: "alertId and message is required" });
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

module.exports = { createTip };
