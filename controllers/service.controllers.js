const { ObjectId } = require("mongodb");
const { getServiceCollection } = require("../models/service.models");

const getAllServices = async (req, res, next) => {
  try {
    const db = req.app.locals.db;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;
    const ServiceCollection = getServiceCollection(db);

    const search = req.query.search;
    const minPrice = Number(req.query.minPrice);
    const maxPrice = Number(req.query.maxPrice);

    const filter = {
      ...(search && {
        name: { $regex: search, $options: "i" },
      }),
      ...(req.query.minPrice || req.query.maxPrice
        ? {
            price: {
              ...(req.query.minPrice && { $gte: minPrice }),
              ...(req.query.maxPrice && { $lte: maxPrice }),
            },
          }
        : {}),
    };
    const totalServices = await ServiceCollection.countDocuments(filter);
    const totalPages = Math.ceil(totalServices / limit);
    const services = await ServiceCollection.find(filter)
      .skip(skip)
      .limit(limit)
      .toArray();

    res.status(200).send({
      success: true,
      message: "Services retrieved successfully",
      currentPage: page,
      totalPages,
      totalServices,
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
