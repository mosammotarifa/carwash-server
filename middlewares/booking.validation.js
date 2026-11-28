const { body, validationResult } = require("express-validator");

const validateBooking = [
  body("customerName")
    .trim()
    .notEmpty()
    .withMessage("Customer name is required"),
  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required")
    .matches(/^01[3-9]\d{8}$/)
    .withMessage("Please provide a valid Bangladesh phone number"),

  body("serviceId")
    .trim()
    .notEmpty()
    .withMessage("Service ID is required")
    .isMongoId()
    .withMessage("Please provide a valid service ID"),

  body("bookingDate")
    .notEmpty()
    .withMessage("Booking date is required")
    .isISO8601()
    .withMessage("Please provide a valid booking date"),

  body("bookingTime").trim().notEmpty().withMessage("Booking time is required"),

  body("address").trim().notEmpty().withMessage("Address is required"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send({
        success: false,
        message: "Booking validation failed",
        errors: errors.array(),
      });
    }

    next();
  },
];

const validateUpdateBooking = [
  body("customerName")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Customer name cannot be empty"),

  body("phone")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Phone number cannot be empty")
    .matches(/^01[3-9]\d{8}$/)
    .withMessage("Please provide a valid Bangladesh phone number"),
  body("serviceId")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Service ID cannot be empty")
    .isMongoId()
    .withMessage("Please provide a valid service ID"),
  body("bookingDate")
    .optional()
    .notEmpty()
    .withMessage("Booking date cannot be empty")
    .isISO8601()
    .withMessage("Please provide a valid booking date"),

  body("bookingTime")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Booking time cannot be empty"),

  body("address")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Address cannot be empty"),

  (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).send({
        success: false,
        message: "Please provide at least one field to update",
      });
    }

    next();
  },
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send({
        success: false,
        message: "Booking update validation failed",
        errors: errors.array(),
      });
    }

    next();
  },
];

module.exports = { validateBooking, validateUpdateBooking };
