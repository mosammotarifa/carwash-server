const { body, validationResult } = require("express-validator");

const validateService = [
  body("name").notEmpty().withMessage("service name is required"),
  body("description").notEmpty().withMessage("description is required"),
  body("price")
    .isFloat({ min: 0.01 })
    .withMessage("Price must be greater then 0"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }
    next();
  },
];
const validateUpdateService = [
  body("name")
    .optional()
    .notEmpty()
    .withMessage("Services name cannot be empty"),
  body("description")
    .optional()
    .notEmpty()
    .withMessage("service description cannot be empty"),
  body("price")
    .optional()
    .isFloat({ min: 0.01 })
    .withMessage("price must be greater than 0"),
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
        message: "validation failed",
        errors: errors.array(),
      });
    }
    next();
  },
];
module.exports = { validateService, validateUpdateService };
