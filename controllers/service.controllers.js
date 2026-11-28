const { ObjectId } = require("mongodb");
const { getServiceCollection } = require("../models/service.models");

const getAllServices = async (req, res, next) => {
  try {
    const db = req.app.locals.db;
    const ServiceCollection = getServiceCollection(db);
    // throw new Error("Testing centralized error handler");
    const services = await ServiceCollection.find().toArray();
    res.status(200).send({
      success: true,
      message: "Services retrieved Successfully",
      data: services,
    });
  } catch (error) {
    next(error);
  }
};
const getServiceById = async (req, res, next) => {
  try {
    const db = req.app.locals.db;
    const ServiceCollection = getServiceCollection(db);
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid service ID",
      });
    }
    const service = await ServiceCollection.findOne({ _id: new ObjectId(id) });
    if (!service) {
      return res.status(404).send({
        success: false,
        message: "service not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "server retrieved successfully",
      data: service,
    });
  } catch (error) {
    next(error);
  }
};
const createService = async (req, res, next) => {
  try {
    const db = req.app.locals.db;
    const ServiceCollection = getServiceCollection(db);
    const serviceData = req.body;
    const result = await ServiceCollection.insertOne(serviceData);
    res.status(201).send({
      success: true,
      message: "Service create successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const updateService = async (req, res, next) => {
  try {
    const db = req.app.locals.db;
    const ServiceCollection = getServiceCollection(db);
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid service ID",
      });
    }
    const updateData = req.body;
    const service = await ServiceCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData },
    );
    if (service.matchedCount === 0) {
      return res.status(404).send({
        success: false,
        message: "Service not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Successfully  service service",
      data: service,
    });
  } catch (error) {
    next(error);
  }
};
const deleteService = async (req, res, next) => {
  try {
    const db = req.app.locals.db;
    const serviceCollection = getServiceCollection(db);
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid service ID",
      });
    }
    const result = await serviceCollection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).send({
        success: false,
        message: "service not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Successfully deleted sercice",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
};
