const doctorRouter = require('express').Router()
const doctorController = require('../controllers/doctorController')


doctorRouter.get("/", doctorController.getHomepage)


module.exports = doctorRouter

