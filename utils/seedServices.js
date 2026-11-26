
const servicesData = require("../data/services.json");
const { getServicesCollection } = require("../models/service.models");

const seedServices = async (db) => {
  try {
    const servicesCollection = getServicesCollection(db);

    const existingServices = await servicesCollection.countDocuments();

    if (existingServices > 0) {
      console.log("Services already exist. Skipping seeding.");
      return;
    }

    await servicesCollection.insertMany(servicesData);

    console.log("Initial services inserted successfully!");
  } catch (error) {
    console.error("Services seeding failed:", error);
    throw error;
  }
};

module.exports = { seedServices };
