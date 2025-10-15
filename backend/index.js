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
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "http://localhost:5000",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ["websocket", "polling"], // Add this line
});

app.use(cors());
app.use(express.json());

app.use("/jobs", jobRoute);
app.use("/api/subscribe", subscribeRoute);
app.use("/contact", contactRoute);
roomSocketHandler(io);

const port = process.env.PORT || 5000;
server.listen(port, () => {
  connectDB();
  console.log(`Server is running on port ${port}`);
});
