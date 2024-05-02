const patientRouter = require('express').Router()
const patientController = require ('../controllers/patientController')
const authguard = require('../customDepedencies/authguardPatient')

patientRouter.get('/patientSubscribe', patientController.getPatientSubscribe)
patientRouter.get('/patientDashboard',authguard, patientController.getPatientDashboard)
patientRouter.get('/patientConnexion', patientController.getPatientConnexion)
patientRouter.post('/patientSubscribe', patientController.postPatient)
patientRouter.post('/patientDashboard', patientController.postLogin)








module.exports = patientRouter