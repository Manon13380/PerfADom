const doctorRouter = require('express').Router()
const doctorController = require('../controllers/doctorController')
const multer = require('../customDepedencies/multer-config')


doctorRouter.get("/", doctorController.getHomepage)
doctorRouter.get("/doctorSubscribe", doctorController.getDoctorSubscribe)
doctorRouter.get("/doctorConnexion", doctorController.getDoctorConnexion)
doctorRouter.get("/doctorDashboard", doctorController.getDoctorDashboard)
doctorRouter.get("/addPatient", doctorController.getAddPatient)
doctorRouter.get("/deletePatient/:patientID", doctorController.deletePatient)
doctorRouter.get("/detailPatient/:patientID", doctorController.getDetailPatient)
doctorRouter.get("/updatePatientD/:patientID", doctorController.getUpdatePatient)
doctorRouter.post("/doctorDashboard", doctorController.postLogin)
doctorRouter.post("/doctorSubscribe", multer.fields([
    { name: 'signature', maxCount: 1 },
    { name: 'stamp', maxCount: 1 }]), doctorController.postDoctor)
doctorRouter.post("/addPatient", doctorController.postPatient)
doctorRouter.post("/updatePatientD/:patientID", doctorController.updatePatient)



module.exports = doctorRouter

