const patientModel = require("../models/patientModel")
const prestataireModel = require('../models/prestataireModel')
const bcrypt = require('bcrypt')

exports.getPatientSubscribe = async (req, res) => {
    try {
        let prestataireList = await prestataireModel.find()
        res.render('patientView/patientSubscribe/index.html.twig', {
            uri: req.path,
            prestataireList: prestataireList
        })
    } catch (error) {
        res.send(error)
    }
}
exports.getPatientConnexion = (req, res) => {
    try {
        res.render("patientView/patientConnexion/index.html.twig", {
            uri: req.path
        })
    } catch (error) {
        res.send(error)
    }
}
exports.getPatientDashboard = (req, res) => {
    try {
        res.render("patientView/patientDashboard/index.html.twig", {
            uri: req.path
        })
    } catch (error) {
        res.send(error)
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
        await prestataireModel.updateOne({ _id: req.body.prestataire }, { $push: { patientList: newPatient._id } });
        res.redirect("/")
    } catch (error) {
        res.render("patientView/patientSubscribe/index.html.twig", {
            errors: error.errors,
            uri: req.path,
            prestataireList: prestataireList
        })
    }
}

exports.postLogin = async (req, res) => {
    try {
        let patient = await patientModel.findOne({ mail: req.body.mail })
        if (patient) {
            if (await bcrypt.compare(req.body.password, patient.password)) {
                req.session.user = patient._id
                req.session.userName = patient.name
                req.session.userFirstname = patient.firstname
                res.redirect("/patientDashboard")
            }
            else {
                throw { password: "Mauvais mot de passe" }
            }
        }
        else {
            throw { mail: "Cet utilisateur n'est pas enregistré" }
        }
    } catch (error) {
        res.render('patientView/patientConnexion/index.html.twig', {
            error: error

        })
    }
}

