const prestataireModel = require('../models/prestataireModel')
const patientModel = require('../models/patientModel')
const doctorModel = require('../models/doctorModel')
const treatmentModel = require('../models/treatmentModel')
const bcrypt = require('bcrypt')


exports.getPrestataireSubscribe = (req, res) => {
    try {
        res.render("prestataireView/prestataireSubscribe/index.html.twig", {
            uri: req.path,
        })
    } catch (error) {
        res.send(error)
    }
}

exports.getPrestataireConnexion = (req, res) => {
    try {
        res.render("prestataireView/prestataireConnexion/index.html.twig", {
            uri: req.path
        })
    } catch (error) {
        res.send(error)
    }
}
exports.getPrestataireDashboard = async (req, res) => {
    try {
        const originalUrl = req.originalUrl;
        const detailPath = "/" + originalUrl.split('=')[0];
        if (req.query.search && req.query.search != "") {
            let search = req.query.search.split(' ')
            let patientList = await prestataireModel.findById({ _id: req.session.user }).populate({
                path: "patientList", match: {
                    $or: [
                        { name: { $regex: new RegExp(search[0], 'i') }, firstname: { $regex: new RegExp(search[1], 'i') } },
                        { name: { $regex: new RegExp(search[1], 'i') }, firstname: { $regex: new RegExp(search[0], 'i') } },
                        { name: { $regex: new RegExp(search[0], 'i') } },
                        { firstname: { $regex: new RegExp(search[0], 'i') } },
                    ]
                }
            })
            res.render("dashboard/index.html.twig", {
                uri: detailPath,
                role: req.session.role,
                userID: req.session.user,
                userName: req.session.userName,
                userFirstname: req.session.userFirstname,
                patientList: patientList.patientList
            })
        }
        else {
            let patientList = await prestataireModel.findById({ _id: req.session.user }).populate("patientList")
            res.render("dashboard/index.html.twig", {
                uri: req.path,
                role: req.session.role,
                userID: req.session.user,
                userName: req.session.userName,
                userFirstname: req.session.userFirstname,
                userSociety: req.session.userSociety,
                patientList: patientList.patientList
            })
        }
    } catch (error) {
        res.send(error)
    }
}


exports.getUpdatePatient = async (req, res) => {
    try {
        const originalUrl = req.path;
        const detailPath = "/" + originalUrl.split('/')[1];
        let patient = await patientModel.findOne({ _id: req.params.patientID })
        let prestataire = await prestataireModel.findOne({ _id: patient.prestataire })
        res.render("updatePatient/index.html.twig", {
            uri: detailPath,
            userSociety: req.session.userSociety,
            role: req.session.role,
            userID: req.session.user,
            userName: req.session.userName,
            userFirstname: req.session.userFirstname,
            patient: patient,
            prestataire: prestataire
        })
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}
exports.getDetailPatient = async (req, res) => {
    try {
        const doctor = await doctorModel.findById(req.session.user)
        const originalUrl = req.path;
        const detailPath = "/" + originalUrl.split('/')[1];
        let patient = await patientModel.findOne({ _id: req.params.patientID }).populate({
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
        let prestataire = await prestataireModel.findOne({ _id: patient.prestataire })
        res.render("detailsPatient/index.html.twig", {
            uri: detailPath,
            role: req.session.role,
            userID: req.session.user,
            userName: req.session.userName,
            userFirstname: req.session.userFirstname,
            patient: patient,
            prestataire: prestataire,
            doctor: doctor
        })
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}
exports.updatePatient = async (req, res) => {
    const originalUrl = req.path;
    const detailPath = "/" + originalUrl.split('/')[1];
    let patient = await patientModel.findOne({ _id: req.params.patientID })
    try {
        if (req.body.nurse.trim() == "") {
            req.body.nurse = ""
        }
        if (req.body.pharmacy.trim() == "") {
            req.body.pharmacy = ""
        }
        await patientModel.updateOne({ _id: req.params.patientID }, req.body)
        res.redirect(`/detailPatient/${req.params.patientID}`)

    } catch (error) {
        res.render("doctorView/updatePatient/index.html.twig", {
            errors: error.errors,
            uri: detailPath,
            role: req.session.role,
            userID: req.session.user,
            userName: req.session.userName,
            userFirstname: req.session.userFirstname,
            patient: patient,
            birthday: birthday,
            prestataireList: prestataireList

        })
    }
}
exports.postPrestataire = async (req, res) => {
    try {
        let newPrestataire = new prestataireModel(req.body)
        newPrestataire.validateSync();
        await newPrestataire.save();
        res.redirect("/")
    } catch (error) {
        console.log(error)
        res.render("prestataireView/prestataireSubscribe/index.html.twig", {
            errors: error.errors,
            uri: req.path
        })
    }
}

exports.postLogin = async (req, res) => {
    try {
        let prestataire = await prestataireModel.findOne({ mail: req.body.mail })
        if (prestataire) {
            if (await bcrypt.compare(req.body.password, prestataire.password)) {
                req.session.role = "prestataire"
                req.session.user = prestataire._id
                req.session.userName = prestataire.salesPersonName
                req.session.userFirstname = prestataire.salesPersonFirstname
                req.session.userSociety = prestataire.societyName
                res.redirect("/prestataireDashboard")
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
        res.render('prestataireView/prestataireConnexion/index.html.twig', {
            error: error

        })
    }
}

exports.getDetailsTreatment = async (req, res) => {
    try {
        const doctor = await doctorModel.findById(req.session.user)
        const originalUrl = req.path;
        const detailPath = "/" + originalUrl.split('/')[1];
        let patient = await patientModel.findOne({ _id: req.params.patientID })
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
            doctor: doctor
        })
    } catch (error) {
        res.send(error)
    }
}

