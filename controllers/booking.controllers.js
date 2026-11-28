const { ObjectId } = require("mongodb");
const { getBookingCollection } = require("../models/booking.models");

const createBooking = async (req, res, next) => {
  try {
    const db = req.app.locals.db;
    const bookingCollection = getBookingCollection(db);
    const bookingData = {
      ...req.body,
      userId: req.user.userId,
      createdAt: new Date(),
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
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 10));
    const skip = (page - 1) * limit;

    const search = req.query.search;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    const filter = {
      ...(req.user.role === "admin" ? {} : { userId: req.user.userId }),
      ...(req.query.status && {
        status: req.query.status,
      }),

      ...(search && {
        $or: [
          { serviceName: { $regex: search, $options: "i" } },
          { customerName: { $regex: search, $options: "i" } },
        ],
      }),
      ...(startDate || endDate
        ? {
            createdAt: {
              ...(startDate && { $gte: new Date(startDate) }),
              ...(endDate && {
                $lt: new Date(
                  new Date(endDate).setDate(new Date(endDate).getDate() + 1),
                ),
              }),
            },
          }
        : {}),
    };

    const totalBookings = await bookingCollection.countDocuments(filter);

    const totalPages = Math.ceil(totalBookings / limit);
    const sort = req.query.sort === "oldest" ? 1 : -1;
    const sortBy = ["price", "customerName", "serviceName"].includes(
      req.query.sortBy,
    )
      ? req.query.sortBy
      : "createdAt";
    const sortOptions =
      sortBy === "createdAt"
        ? { createdAt: sort }
        : { [sortBy]: sort, createdAt: -1 };
    const result = await bookingCollection
      .find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .toArray();
    res.status(200).send({
      success: true,
      message: "Bookings retrieved successfully",
      currentPage: page,
      totalPages,
      totalBookings,
      hasPreviousPage: page > 1,
      hasNextPage: page < totalPages,
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
    const filter =
      req.user.role === "admin"
        ? { _id: new ObjectId(id) }
        : { _id: new ObjectId(id), userId: req.user.userId };

    const result = await bookingCollection.findOne(filter);
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
    const filter =
      req.user.role === "admin"
        ? { _id: new ObjectId(id) }
        : { _id: new ObjectId(id), userId: req.user.userId };

    const result = await bookingCollection.updateOne(filter, {
      $set: bookingData,
    });
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
    const filter =
      req.user.role === "admin"
        ? { _id: new ObjectId(id) }
        : { _id: new ObjectId(id), userId: req.user.userId };

    const result = await bookingCollection.deleteOne(filter);
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
const getBookingStats = async (req, res, next) => {
  try {
    const db = req.app.locals.db;
    const bookingCollection = getBookingCollection(db);

    const filter = req.user.role === "admin" ? {} : { userId: req.user.userId };

    const totalBookings = await bookingCollection.countDocuments(filter);

    const pendingBookings = await bookingCollection.countDocuments({
      ...filter,
      status: "pending",
    });

    const completedBookings = await bookingCollection.countDocuments({
      ...filter,
      status: "completed",
    });

    const cancelledBookings = await bookingCollection.countDocuments({
      ...filter,
      status: "cancelled",
    });
    const totalRevenue = await bookingCollection
      .aggregate([
        {
          $match: {
            ...filter,
            status: "completed",
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$price" },
          },
        },
      ])
      .toArray();
    const revenue = totalRevenue[0]?.total || 0;
    const averageBookingValue =
      completedBookings > 0 ? revenue / completedBookings : 0;
    res.status(200).send({
      success: true,
      message: "Booking statistics retrieved successfully",
      data: {
        totalBookings,
        pendingBookings,
        completedBookings,
        cancelledBookings,
        totalRevenue: revenue,
        averageBookingValue,
      },
    });
  } catch (error) {
    next(error);
  }
};
const getServiceBookingStats = async (req, res, next) => {
  try {
    const db = req.app.locals.db;
    const bookingCollection = getBookingCollection(db);
    const filter = req.user.role === "admin" ? {} : { userId: req.user.userId };
    const stats = await bookingCollection
      .aggregate([
        {
          $match: filter,
        },
        {
          $group: {
            _id: "$serviceName",
            totalBookings: { $sum: 1 },
            totalRevenue: { $sum: "$price" },
          },
        },
      ])
      .toArray();
    res.status(200).send({
      success: true,
      message: "Service booking statistics retrieved successfully",
      data: stats,
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
  getBookingStats,
  getServiceBookingStats,
};
