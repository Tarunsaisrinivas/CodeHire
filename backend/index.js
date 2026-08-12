const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const http = require("http");
const dotenv = require("dotenv");
const jobRoute = require("./routes/jobRoute");
const connectDB = require("./utils/db");
const roomSocketHandler = require("./sockets/roomSocket");
const subscribeRoute = require("./routes/subscribeRoute");
const contactRoute = require("./routes/contactRoute");

dotenv.config();
const app = express();
const server = http.createServer(app);

// ✅ Define CORS options
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:5000",
    "https://codehire-oaod.onrender.com",
    "https://code-hire-c44s.vercel.app",
    "https://code-hire-beryl.vercel.app",
    "https://code-hire-xrhe.vercel.app",
    "https://codehire-oaod.onrender.com",
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

// ✅ Apply CORS middleware to Express
app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));

// ✅ Socket.IO with CORS
const io = new Server(server, {
  cors: corsOptions,
  transports: ["websocket", "polling"],
});

app.use(express.json());

// ✅ Routes
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Code Hire API is running",
  });
});

app.use("/jobs", jobRoute);
app.use("/api/subscribe", subscribeRoute);
app.use("/contact", contactRoute);

// ✅ Socket handler
roomSocketHandler(io);

const port = process.env.PORT || 5000;
server.listen(port, () => {
  connectDB();
  console.log(`Server is running on port ${port}`);
});
