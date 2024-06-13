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
doctorRouter.get('/deleteTreatment/:patientID/:treatmentID', authguard , doctorController.deleteTreatment)
// doctorRouter.delete('/deleteMedication/:medID', doctorController.deleteMedication)
doctorRouter.get('/get-user-session', authguard, doctorController.getUserId)
// doctorRouter.post('/updateMedication/:medId/:patientID', authguard, doctorController.updateMedication)
doctorRouter.post('/createMedication' , doctorController.createMedication)
doctorRouter.get('/getMedication/:id', authguard, doctorController.getmedicationList )
doctorRouter.post("/doctorDashboard", doctorController.postLogin)
doctorRouter.post("/doctorSubscribe", multer.fields([
    { name: 'signature', maxCount: 1 },
    { name: 'stamp', maxCount: 1 }]), doctorController.postDoctor)
doctorRouter.post("/addPatient", doctorController.postPatient)
doctorRouter.post("/updatePatientD/:patientID", doctorController.updatePatient)
doctorRouter.post("/addTreatment/:patientID", doctorController.AddTreatment)



module.exports = doctorRouter

