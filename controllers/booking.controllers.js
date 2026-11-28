const { ObjectId } = require("mongodb");
const { getBookingCollection } = require("../models/booking.models");

const createBooking = async (req, res, next) => {
  try {
    const db = req.app.locals.db;
    const bookingCollection = getBookingCollection(db);
    const bookingData = {
      ...req.body,
      userId: req.user.userId,
    };
    const result = await bookingCollection.insertOne(bookingData);
    res.status(201).send({
      success: true,
      message: "booking created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const getAllBookings = async (req, res, next) => {
  try {
    const db = req.app.locals.db;
    const bookingCollection = getBookingCollection(db);

    const result = await bookingCollection
      .find({ userId: req.user.userId })
      .toArray();
    res.status(200).send({
      success: true,
      message: "Get all Booking",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const getAllBookingById = async (req, res, next) => {
  try {
    const db = req.app.locals.db;
    const bookingCollection = getBookingCollection(db);
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid booking ID",
      });
    }
    const result = await bookingCollection.findOne({
      _id: new ObjectId(id),
      userId: req.user.userId,
    });
    if (!result) {
      return res.status(404).send({
        success: false,
        message: "booking not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Booking single ",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const updateBooking = async (req, res, next) => {
  try {
    const db = req.app.locals.db;
    const bookingCollection = getBookingCollection(db);
    const { userId, ...bookingData } = req.body;
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid booking ID",
      });
    }
    const result = await bookingCollection.updateOne(
      {
        _id: new ObjectId(id),
        userId: req.user.userId,
      },
      { $set: bookingData },
    );
    if (result.matchedCount === 0) {
      return res.status(404).send({
        success: false,
        message: "booking update not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "booking update successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const deletedBooking = async (req, res, next) => {
  try {
    const db = req.app.locals.db;
    const bookingCollection = getBookingCollection(db);
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid booking ID",
      });
    }
    const result = await bookingCollection.deleteOne({
      _id: new ObjectId(id),
      userId: req.user.userId,
    });
    if (result.deletedCount === 0) {
      return res.status(404).send({
        success: false,
        message: "Booking not deleted",
      });
    }
    res.status(200).send({
      success: true,
      message: "deleted successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  createBooking,
  getAllBookings,
  getAllBookingById,
  updateBooking,
  deletedBooking,
};
