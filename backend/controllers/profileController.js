const bcrypt = require("bcryptjs");
const { checkRecordExists, updateRecord } = require("../utils/sqlFunctions");

const getProfile = async (req, res) => {
  const userId = req.user.userId;
  try {
    const user = await checkRecordExists("users", "userId", userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json({
      name: user.name,
      email: user.email,
      phone: user.phone || "",
      role: user.role
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateProfile = async (req, res) => {
  const userId = req.user.userId;
  const { email, phone, password } = req.body;

  try {
    const existingUser = await checkRecordExists("users", "userId", userId);
    if (!existingUser) return res.status(404).json({ error: "User not found" });

    const updates = {};
    if (email) updates.email = email;
    if (phone) updates.phone = phone;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(password, salt);
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: "No fields to update" });
    }

    await updateRecord("users", updates, { column: "userId", value: userId });

    res.status(200).json({ message: "Profile updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getProfile, updateProfile };
