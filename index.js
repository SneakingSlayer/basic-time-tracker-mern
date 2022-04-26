const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
const path = require("path");
const PORT = process.env.PORT || 5000;
dotenv.config();

const computersRoute = require("./routes/computer");
const sessionsRoute = require("./routes/session");
const authRoute = require("./routes/auth");

mongoose.connect(
  process.env.DB_CONNECT || process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Mongo Connected")
);

app.use(express.json());
app.use(cors());

app.use("/api/v1", computersRoute);
app.use("/api/v1", sessionsRoute);
app.use("/api/v1", authRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API running");
  });
}

app.listen(PORT, () => console.log("Server Connected at port ", PORT));
