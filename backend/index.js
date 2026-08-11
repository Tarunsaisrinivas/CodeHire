const http = require("http");
const dotenv = require("dotenv");

dotenv.config();

const app = require("./app");

const connectDB = require("./utils/db");
const { Server } = require("socket.io");
const roomSocketHandler = require("./sockets/roomSocket");

const server = http.createServer(app);

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "http://127.0.0.1:5173",

  "https://codehire-oaod.onrender.com",
  "https://code-hire-c44s.vercel.app",
  "https://code-hire-xrhe.vercel.app",
  "https://code-hire-xrhe.vercel.app/jobs",
];

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

roomSocketHandler(io);

const port = process.env.PORT || 5000;

// Only start traditional server locally
if (process.env.NODE_ENV !== "production") {
  server.listen(port, async () => {
    await connectDB();

    console.log(`Server running on port ${port}`);
  });
}

module.exports = app;