const express = require("express");
const cors = require("cors");
require("dotenv").config();

const subscribeRoute = require("./routes/Subscribe")

const app = express();

app.use(cors());
app.use(express.json());

// Register the route
app.use("/api/subscribe", subscribeRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
