const { verifyToken } = require("../middlewares/auth.middleware");
const express = require("express");
const {
  createBooking,
  getAllBookings,
  getAllBookingById,
  updateBooking,
  deletedBooking,
  getBookingStats,
  getServiceBookingStats,
} = require("../controllers/booking.controllers");
const {
  validateBooking,
  validateUpdateBooking,
} = require("../middlewares/booking.validation");
const bookingRouter = express.Router();
bookingRouter.post("/", verifyToken, validateBooking, createBooking);
bookingRouter.get("/", verifyToken, getAllBookings);
bookingRouter.get("/stats", verifyToken, getBookingStats);
bookingRouter.get("/service-stats", verifyToken, getServiceBookingStats);
bookingRouter.get("/:id", verifyToken, getAllBookingById);
bookingRouter.patch("/:id", verifyToken, validateUpdateBooking, updateBooking);
bookingRouter.delete("/:id", verifyToken, deletedBooking);
module.exports = { bookingRouter };
