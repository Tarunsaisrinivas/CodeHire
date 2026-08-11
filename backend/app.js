const express = require("express");
const cors = require("cors");

const jobRoute = require("./routes/jobRoute");
const subscribeRoute = require("./routes/subscribeRoute");
const contactRoute = require("./routes/contactRoute");

const app = express();


// ==========================================
// CORS
// ==========================================

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "http://127.0.0.1:5173",

  "https://codehire-oaod.onrender.com",
  "https://code-hire-c44s.vercel.app",
  "https://code-hire-xrhe.vercel.app",
];

const corsOptions = {
  origin: function (origin, callback) {

    // Allow requests without Origin
    // e.g. Postman, curl, server-to-server
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    console.log("CORS blocked:", origin);

    // Don't throw an error.
    // Simply don't allow the origin.
    return callback(null, false);
  },

  methods: [
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
    "OPTIONS",
  ],

  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Accept",
  ],

  credentials: true,

  optionsSuccessStatus: 204,
};


// ==========================================
// CORS MUST COME BEFORE ROUTES
// ==========================================

app.use(cors(corsOptions));


// ==========================================
// BODY PARSER
// ==========================================

app.use(express.json());


// ==========================================
// HEALTH CHECK
// ==========================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Code Hire API is running",
  });
});


// ==========================================
// API ROUTES
// ==========================================

app.use("/jobs", jobRoute);

app.use("/api/subscribe", subscribeRoute);

app.use("/contact", contactRoute);


// ==========================================
// ERROR HANDLER
// ==========================================

app.use((err, req, res, next) => {

  console.error("SERVER ERROR:", err);

  res.status(500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});


module.exports = app;