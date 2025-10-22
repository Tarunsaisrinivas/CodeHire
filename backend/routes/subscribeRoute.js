const express = require("express");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const Subscriber = require("../models/Subscribe");
const connectDB = require("../utils/db");
require("dotenv").config();

const router = express.Router();



router.post("/", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !email.includes("@")) {
      return res.status(400).json({ error: "Invalid email address" });
    }

    if (!process.env.MONGODB_URI) {
      return res.status(500).json({ error: "Database not configured" });
    }

    await connectDB();

    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return res.status(409).json({ error: "Email already subscribed" });
    }

    await Subscriber.create({ email });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "🎉 Thanks for subscribing to CODE HIRE",
      html: `
        <div style="font-family: sans-serif; text-align: center; background: #f9f9f9; padding: 30px;">
            
            <h2 style="color: #1b30b7ff;">Thanks for subscribing to <strong>CODE HIRE</strong>!</h2>
            <p style="font-size: 16px; color: #333;">A unified web application that combines <strong>live collaborative coding</strong> and
          <strong>multi-platform job search</strong> into one platform.</p>
            <p style="font-size: 14px; color: #555; max-width: 600px; margin: auto;">
                CodeHire enables multiple users to write and compile code together in real time within a
          shared workspace, supported by a built-in chat for seamless communication and debugging.
          Alongside collaboration, it offers centralized job search by aggregating listings from
          platforms like LinkedIn, Naukri, Glassdoor, and Indeed — helping developers collaborate,
          code, and find jobs all in one place.
            </p>

            <br/>
            <p style="font-size: 14px; color: #aaa;">You're receiving this email because you subscribed on our website.</p>
        </div>
      `,
    });

    res.status(200).json({ message: "Subscribed successfully" });
  } catch (err) {
    console.error("❌ Error in /api/subscribe:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
