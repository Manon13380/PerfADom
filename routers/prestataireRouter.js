const prestataireRouter = require('express').Router();
const prestataireController = require('../controllers/prestataireController')

prestataireRouter.get('/prestataireSubscribe', prestataireController.getPrestataireSubscribe)
prestataireRouter.get('/prestataireDashboard', prestataireController.getPrestataireDashboard)
prestataireRouter.get('/prestataireConnexion', prestataireController.getPrestataireConnexion)
prestataireRouter.get("/updatePatientP/:patientID", prestataireController.getUpdatePatient)
prestataireRouter.post('/prestataireSubscribe', prestataireController.postPrestataire)
prestataireRouter.post('/prestataireDashboard', prestataireController.postLogin)
prestataireRouter.post("/updatePatientP/:patientID", prestataireController.updatePatient)

module.exports = prestataireRouter