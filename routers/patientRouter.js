const patientRouter = require('express').Router()
const patientController = require ('../controllers/patientController')

patientRouter.get('/patientSubscribe', patientController.getPatientSubscribe)
patientRouter.get('/patientDashboard', patientController.getPatientDashboard)
patientRouter.get('/patientConnexion', patientController.getPatientConnexion)
patientRouter.post('/patientSubscribe', patientController.postPatient)
patientRouter.post('/patientDashboard', patientController.postLogin)








module.exports = patientRouter