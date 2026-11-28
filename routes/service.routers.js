const { verifyToken, verifyRole } = require("../middlewares/auth.middleware");
const express = require("express");
const {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} = require("../controllers/service.controllers");
const {
  validateService,
  validateUpdateService,
} = require("../middlewares/service.validation");
const serviceRouter = express.Router();
serviceRouter.get("/", getAllServices);
serviceRouter.get("/:id", getServiceById);
serviceRouter.post(
  "/",
  verifyToken,
  verifyRole("admin"),
  validateService,
  createService,
);
serviceRouter.patch(
  "/:id",
  verifyToken,
  verifyRole("admin"),
  validateUpdateService,
  updateService,
);

serviceRouter.delete("/:id",
     verifyToken, 
     verifyRole("admin"), 
     deleteService);
module.exports = { serviceRouter };
