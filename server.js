const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "./config/.env" });
const authRoute = require("./routes/Auth");
const organizations = require("./routes/organization");
const projectRoute = require("./routes/Project");
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
app.use("/api", organizations);
app.use("/api", projectRoute);

DBconnect();

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Your app is running port on: ${PORT}`));
