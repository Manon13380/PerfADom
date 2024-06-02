const prestataireRouter = require('express').Router();
const prestataireController = require('../controllers/prestataireController')
const authguard = require('../customDepedencies/authguardPresta')

prestataireRouter.get('/prestataireSubscribe', prestataireController.getPrestataireSubscribe)
prestataireRouter.get('/prestataireDashboard',authguard, prestataireController.getPrestataireDashboard)
prestataireRouter.get('/prestataireConnexion', prestataireController.getPrestataireConnexion)
prestataireRouter.get("/updatePatientP/:patientID",authguard, prestataireController.getUpdatePatient)
prestataireRouter.get("/detailPatientP/:patientID",authguard,prestataireController.getDetailPatient)
prestataireRouter.get("/detailTreatmentP/:patientID/:treatmentID",authguard, prestataireController.getDetailsTreatment)
prestataireRouter.post('/prestataireSubscribe', prestataireController.postPrestataire)
prestataireRouter.post('/prestataireDashboard', prestataireController.postLogin)
prestataireRouter.post("/updatePatientP/:patientID", prestataireController.updatePatient)

module.exports = prestataireRouter