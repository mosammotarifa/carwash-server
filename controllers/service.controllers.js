const { getServicesCollection } = require("../models/service.models");

const getAllSevices = async (req, res) => {
  try {
    const db = req.app.locals.db;
    const ServicesCollection = getServicesCollection(db);
    const services = await ServicesCollection.find().toArray();
    res.status(200).send({
      success: true,
      message: "Serviecs retrieved successfully",
      data: services,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Failed to retrieve services",
      error: error.message,
    });
  }
};
module.exports = { getAllSevices };
