const { getServiceCollection } = require("../models/service.models")
const servicesData=require('../data/services.json')

const seedServices=async(db)=>{
  try{
const serviceCollection= getServiceCollection(db)
const existingServices = await serviceCollection.countDocuments()
if(existingServices>0){
  console.log('Services already exit.Skipping seeding')
  return;
}
await serviceCollection.insertMany(servicesData)
console.log('initial sevices inserted successfully!')
  }
  catch(error){
    console.log('Services Seeding Failed',error)
    throw error
  }
}
module.exports={seedServices}