require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db");

const { seedServices } = require("./utils/seedServices");
const { serviceRouter } = require("./routes/service.routers");
const { errorHandler } = require("./middlewares/error.middleware");
const { bookingRouter } = require("./routes/booking.routes");
const { userRouter } = require("./routes/user.router");
const app = express();
const port = process.env.PORT || 5000;
//middlewase
app.use(cors());
app.use(express.json());
//routes
app.use("/service", serviceRouter);
app.use("/booking", bookingRouter);
app.use("/users", userRouter);

//home
app.get("/", async (req, res) => {
  res.send({
    success: true,
    message: "Server successfully running",
  });
});
//centralized error handler(always after router)
app.use(errorHandler);
//startServer
const startServer = async () => {
  try {
    const db = await connectDB();
    app.locals.db = db;
    await seedServices(db);
    app.listen(port, () => {
      console.log("server successfull connected");
    });
  } catch (error) {
    console.error("Failed to setup Server", error);
    process.exit(1);
  }
};
startServer();
