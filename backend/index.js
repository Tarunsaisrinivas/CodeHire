const http = require("http");
const dotenv = require("dotenv");

dotenv.config();

const app = require("./app");

const connectDB = require("./utils/db");

const { Server } = require("socket.io");

const roomSocketHandler = require("./sockets/roomSocket");


// ==========================================
// HTTP SERVER
// ==========================================

const server = http.createServer(app);


// ==========================================
// SOCKET.IO
// ==========================================

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "http://127.0.0.1:5173",
  "https://code-hire-beryl.vercel.app",
  "https://codehire-oaod.onrender.com",
  "https://code-hire-c44s.vercel.app",
  "https://code-hire-xrhe.vercel.app",
];


const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});


roomSocketHandler(io);


// ==========================================
// LOCAL SERVER
// ==========================================

const PORT = process.env.PORT || 5000;


// Only start listen locally.
// Vercel handles the server itself.

if (process.env.NODE_ENV !== "production") {

  server.listen(PORT, async () => {

    try {

      await connectDB();

      console.log(
        `Server running at http://localhost:${PORT}`
      );

    } catch (error) {

      console.error(
        "Database connection failed:",
        error
      );

    }

  });

}


// Export Express app for Vercel

module.exports = app;