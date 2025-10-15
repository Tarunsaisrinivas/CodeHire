const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message)
      return res.status(400).json({ error: "All fields are required" });

    const newContact = new Contact({ name, email, message });
    await newContact.save();

    res.status(201).json({ success: "Contact details saved successfully!" });
  } catch (err) {
    console.error("❌ Error saving contact:", err);
    res.status(500).json({ error: "Failed to save contact details" });
  }
});

module.exports = router;
