const express=require('express')
const { getAllServices, getServiceById, createService, updateService, deleteService } = require('../controllers/service.controllers')
const serviceRouter= express.Router()
serviceRouter.get('/',getAllServices)
serviceRouter.get('/:id',getServiceById)
serviceRouter.post('/',createService)
serviceRouter.patch('/:id',updateService)
serviceRouter.delete('/:id',deleteService)
module.exports={serviceRouter}
