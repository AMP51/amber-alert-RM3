const { v4: uuidv4 } = require("uuid");
const { insertRecord, queryRecords } = require("../utils/sqlFunctions");

const createAlert = async (req, res) => {
  try {
    const { category, name, timeOfDisappearance, description, image, location, address } = req.body;

    if (!category || !name || !timeOfDisappearance || !description) {
      return res.status(400).json({ error: "All required fields must be filled" });
    }

    const alert = {
      alertId: uuidv4(),
      category,
      name,
      timeOfDisappearance,
      description,
      image: image || null,
      location: location ? `${location.lat},${location.lng}` : null,
      address: address || null,
      createdBy: req.user.userId
    };

    await insertRecord("admin_alerts", alert);
    res.status(201).json({ message: "Alert created", alertId: alert.alertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAlerts = async (req, res) => {
  try {
    const alerts = await queryRecords("SELECT * FROM admin_alerts ORDER BY created_at DESC");
    res.status(200).json(alerts);
  } catch (err) {
    console.error("Error fetching alerts:", err);
    res.status(500).json({ error: "Failed to fetch alerts" });
  }
};

const getAlertById = async (req, res) => {
  try {
    const { id } = req.params;
    const results = await queryRecords(
      "SELECT * FROM admin_alerts WHERE alertId = ?",
      [id]
    );

    if (!results.length) return res.status(404).json({ error: "Alert not found" });

    res.status(200).json(results[0]);
  } catch (err) {
    console.error("Error fetching alert:", err);
    res.status(500).json({ error: "Failed to fetch alert" });
  }
};

module.exports = { createAlert, getAlerts, getAlertById };
