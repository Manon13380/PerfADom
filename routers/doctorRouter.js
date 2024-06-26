const doctorRouter = require('express').Router()
const doctorController = require('../controllers/doctorController')
const multer = require('../customDepedencies/multer-config')
const authguard = require('../customDepedencies/authguardDoctor')


doctorRouter.get("/", doctorController.getHomepage)
doctorRouter.get("/doctorSubscribe", doctorController.getDoctorSubscribe)
doctorRouter.get("/doctorConnexion", doctorController.getDoctorConnexion)
doctorRouter.get("/doctorDashboard",authguard, doctorController.getDoctorDashboard)
doctorRouter.get("/createPatient",authguard, doctorController.getAddPatient)
doctorRouter.get("/deletePatient/:patientID",authguard, doctorController.deletePatient)
doctorRouter.get("/detailPatient/:patientID",authguard, doctorController.getDetailPatient)
doctorRouter.get("/updatePatientD/:patientID",authguard, doctorController.getUpdatePatient)
doctorRouter.get('/addPatient/:patientID',authguard, doctorController.addPatient)
doctorRouter.get('/addTreatment/:patientID', authguard, doctorController.getAddTreatment)
doctorRouter.get("/detailTreatment/:patientID/:treatmentID",authguard, doctorController.getDetailsTreatment)
doctorRouter.get("/updateTreatment/:patientID/:treatmentID", authguard, doctorController.getAddTreatment)
doctorRouter.get('/deleteTreatment/:patientID/:treatmentID', authguard , doctorController.deleteTreatment)
doctorRouter.get('/get-user-session', authguard, doctorController.getUserId)
doctorRouter.post('/createMedication' , doctorController.createMedication)
doctorRouter.get('/getMedication/:id', authguard, doctorController.getmedicationList )
doctorRouter.post("/doctorDashboard", doctorController.postLogin)
doctorRouter.post("/doctorSubscribe", multer.fields([
    { name: 'signature', maxCount: 1 },
    { name: 'stamp', maxCount: 1 }]), doctorController.postDoctor)
doctorRouter.post("/createPatient", doctorController.postPatient)
doctorRouter.post("/updatePatientD/:patientID", doctorController.updatePatient)
doctorRouter.post("/updateTreatment/:patientID/:treatmentID", authguard , doctorController.updateTreatment )
doctorRouter.post("/addTreatment/:patientID", doctorController.AddTreatment)



module.exports = doctorRouter

