const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "./config/.env" });
const authRoute = require("./routes/Auth");
const DBconnect = require("./config/db");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use("/api", authRoute);

DBconnect();

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Your app is running port on: ${PORT}`));
