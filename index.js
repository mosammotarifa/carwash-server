require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db");
const serviceRouter = require("./routes/service.routers");
const { seedServices } = require("./utils/seedServices");
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());
app.use("/services", serviceRouter);

//Home Route
app.get("/", (req, res) => {
  res.send({
    success: true,
    message: "Car Wash Server is Running!!",
  });
});
const startServer = async () => {
  try {
    const db = await connectDB();
    app.locals.db = db;
    await seedServices(db);
    app.listen(port, () => {
      console.log(`Car wash server running on the port ${port}`);
    });
  } catch (error) {
    console.error("Server stratUp failed:", error);
  }
};
startServer();
