const { v4: uuidv4 } = require("uuid");
const { insertRecord } = require("../utils/sqlFunctions");

const createAlert = async (req, res) => {
    try {
        const { category, name, timeOfDisappearance, description, image } = req.body;

        if (!category || !name || !timeOfDisappearance || !description) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const alert = {
            category,
            alertId: uuidv4(),
            name,
            timeOfDisappearance,
            description,
            image: image || null,
            createdBy: req.user.userId
        };

        await insertRecord("admin_alerts", alert);
        res.status(201).json({ message: "Alert created", alertId: alert.alertId });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { createAlert };
