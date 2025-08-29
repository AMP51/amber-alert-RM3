const { v4: uuidv4 } = require("uuid");
const { insertRecord, queryRecords } = require("../utils/sqlFunctions");

const createContact = async (req, res) => {
    try {
        const { full_name, email, phone_number, location, description } = req.body;

        if (!full_name || !email || !phone_number || !location || !description) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const contact = {
            contactId: uuidv4(),
            full_name,
            email,
            phone_number,
            location,
            description,
        };

        await insertRecord("contact", contact);

        res.status(201).json({ message: "Report submitted successfully" });
    } catch (err) {
        console.error("Error creating contact:", err);
        res.status(500).json({ error: "Failed to submit report" });
    }
};

const getContacts = async (req, res) => {
    try {
        const reports = await queryRecords(
            "SELECT * FROM contact ORDER BY created_at DESC"
        );
        res.status(200).json(reports);
    } catch (err) {
        console.error("Error fetching contacts:", err);
        res.status(500).json({ error: "Failed to fetch reports" });
    }
};

const getContactById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await queryRecords("SELECT * FROM contact WHERE contactId = ?", [id]);

        if (result.length === 0) {
            return res.status(404).json({ error: "Contact not found" });
        }

        res.status(200).json(result[0]);
    } catch (err) {
        console.error("Error fetching contact by ID:", err);
        res.status(500).json({ error: "Failed to fetch contact details" });
    }
};

module.exports = { createContact, getContacts, getContactById };
