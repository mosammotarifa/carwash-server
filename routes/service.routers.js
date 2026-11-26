const express= require("express")
const { getAllSevices } = require("../controllers/service.controllers")
const router= express.Router()
router.get('/',getAllSevices)
module.exports =router