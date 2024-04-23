const doctorModel = require('../models/doctorModel')
const prestataireModel = require('../models/prestataireModel')
const patientModel = require('../models/patientModel')
const bcrypt = require('bcrypt')



exports.getHomepage = (req, res) => {
    try {
        res.render("homepage/index.html.twig", {
            uri: req.path,
        })
    } catch (error) {
        res.send(error)
    }
}

exports.getDoctorConnexion = (req, res) => {
    try {
        res.render("doctorView/doctorConnexion/index.html.twig", {
            uri: req.path,
        })
    } catch (error) {
        res.send(error)
    }
}

exports.getDoctorSubscribe = (req, res) => {
    try {
        res.render("doctorView/doctorSubscribe/index.html.twig", {
            uri: req.path
        })
    } catch (error) {
        res.send(error)
    }
}

exports.getDoctorDashboard = async (req, res) => {
    try {
        let patientList = await doctorModel.findById({ _id: req.session.user }).populate("patientList")
        res.render("doctorView/doctorDashboard/index.html.twig", {
            uri: req.path,
            doctorID: req.session.user,
            doctorName: req.session.userName,
            doctorFirstname: req.session.userFirstname,
            patientList: patientList.patientList
        })
    } catch (error) {
        res.send(error)
    }
}
exports.getAddPatient = async (req, res) => {
    try {
        let prestataireList = await prestataireModel.find()
        res.render("doctorView/addPatient/index.html.twig", {
            uri: req.path,
            doctorID: req.session.user,
            doctorName: req.session.userName,
            doctorFirstname: req.session.userFirstname,
            prestataireList : prestataireList
        })
    } catch (error) {
        res.send(error)
    }
}

exports.getDetailPatient = async (req, res) => {
    try {
        const originalUrl = req.path;
        const detailPath = "/" + originalUrl.split('/')[1];
        let patient = await patientModel.findOne({_id : req.params.patientID})
        res.render("doctorView/detailsPatient/index.html.twig", {
            uri: detailPath,
            doctorID: req.session.user,
            doctorName: req.session.userName,
            doctorFirstname: req.session.userFirstname,
            patient : patient
        })
    } catch (error) {
        res.send(error)
    }
}

exports.deletePatient = async (req,res) => {
try {
    patientList = await doctorModel.findById({ _id: req.session.user }).populate("patientList")
    await doctorModel.updateOne({_id: req.session.user}, { $pull: { patientList: req.params.patientID} })
    res.redirect("/doctorDashboard")
} catch (error) {
    console.log(error)
    res.render("doctorView/doctorDashboard/index.html.twig", {
        uri: req.path,
        doctorID: req.session.user,
        doctorName: req.session.userName,
        doctorFirstname: req.session.userFirstname,
        patientList: patientList.patientList
    })
}
}

exports.postPatient = async (req, res) => {
    try {
        prestataireList = await prestataireModel.find()
        if (req.body.prestataire === "") {
            delete req.body.prestataire
        }
        let newPatient = new patientModel(req.body)
        newPatient.validateSync();
        await newPatient.save();
        await prestataireModel.updateOne({ _id: req.body.prestataire}, { $push: { patientList: newPatient._id } }); 
        await doctorModel.updateOne({ _id: req.session.user}, { $push: { patientList: newPatient._id } }); 
        res.redirect("/doctorDashboard")
    } catch (error) {
        res.render("doctorview/addPatient/index.html.twig",{
            doctorID: req.session.user,
            doctorName: req.session.userName,
            doctorFirstname: req.session.userFirstname,
            errors: error.errors,
            uri: req.path,
            prestataireList : prestataireList
        })
    }
}

exports.postDoctor = async (req, res) => {
    try {
        let newDoctor = new doctorModel(req.body)
        if (req.files) {
            if (req.multerError) {
                throw { errorUpload: "Le fichier n'est pas valide" };
            }
            req.body.signature = req.files['signature'][0].filename;
            newDoctor.signature = req.files['signature'][0].filename;
            req.body.stamp = req.files['stamp'][0].filename;
            newDoctor.stamp = req.files['stamp'][0].filename;
        }

        newDoctor.validateSync();
        await newDoctor.save();
        res.redirect("/")
    } catch (error) {
        res.render("doctorView/doctorSubscribe/index.html.twig", {
            errors: error.errors,
            uri: req.path
        })
    }
}

exports.postLogin = async (req, res) => {
    try {
        let doctor = await doctorModel.findOne({ mail: req.body.mail })
        if (doctor) {
            if (await bcrypt.compare(req.body.password, doctor.password)) {
                req.session.user = doctor._id
                req.session.userName = doctor.name
                req.session.userFirstname = doctor.firstname
                res.redirect("/doctorDashboard")
            }
            else {
                throw { password: "Mauvais mot de passe" }
            }
        }
        else {
            throw { mail: "Cet utilisateur n'est pas enregistré" }
        }
    } catch (error) {
        console.log(error)
        res.render('doctorView/doctorConnexion/index.html.twig', {
            error: error

        })
    }
}