const patientModel = require("../models/patientModel")
const prestataireModel = require('../models/prestataireModel')
const treatmentModel = require('../models/treatmentModel')
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
exports.getPatientDashboard = async (req, res) => {
    try {
        const originalUrl = req.originalUrl;
        const detailPath = "/" + originalUrl.split('=')[0];
        let patient = await patientModel.findOne({ _id: req.session.user}).populate({
            path: 'treatmentList',
            populate: [
                {
                    path: 'medicationList',
                    populate: {
                        path: 'medication'
                    }    
                },
                {
                    path: 'doctor', 
                     select: 'name firstname'
                }
            ]
        });
        res.render("patientView/patientDashboard/index.html.twig", {
            uri: detailPath,
            role: req.session.role,
            userID: req.session.user,
            userName: req.session.userName,
            userFirstname: req.session.userFirstname,
            patient : patient
        })
    } catch (error) {
        res.send(error)
    }
}


exports.getDetailsTreatment = async (req, res) => {
    try {
        const originalUrl = req.path;
        const detailPath = "/" + originalUrl.split('/')[1];
        let patient = await patientModel.findOne({ _id: req.session.user})
        let treatment = await treatmentModel.findOne({_id : req.params.treatmentID}).populate({
            path: 'medicationList',
            populate: {
                path: 'medication'
            }
        }).populate({
            path: 'doctor',
            select: 'name firstname'
        });
        res.render("detailsTreatment/index.html.twig", {
            uri: detailPath,
            role: req.session.role,
            userID: req.session.user,
            userName: req.session.userName,
            userFirstname: req.session.userFirstname,
            patient: patient,
            treatment : treatment,
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

