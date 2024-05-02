const doctorModel = require('../models/doctorModel')
const prestataireModel = require('../models/prestataireModel')
const patientModel = require('../models/patientModel')
const medicationModel = require('../models/medicationModel')
const timeMedicationModel = require('../models/time_medicationModel')
const treatmentModel = require('../models/treatmentModel')
const transporter = require('../customDepedencies/transporternodemailer');
const bcrypt = require('bcrypt')
const genererMotDePasse = require('../customDepedencies/generatePassword')



exports.getHomepage = (req, res) => {
    try {
        req.session.destroy();
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

exports.getAddTreatment = async (req, res) => {
    try {
        const doctor = await doctorModel.findById(req.session.user)
        const originalUrl = req.path;
        const detailPath = "/" + originalUrl.split('/')[1];
        let patient = await patientModel.findOne({ _id: req.params.patientID })
        const medicationList = await medicationModel.find();
        let prestataire = await prestataireModel.findOne({ _id: patient.prestataire })
        res.render("doctorView/addTreatment/index.html.twig", {
            uri: detailPath,
            role: req.session.role,
            userID: req.session.user,
            userName: req.session.userName,
            userFirstname: req.session.userFirstname,
            patient: patient,
            prestataire: prestataire,
            medicationList: medicationList,
            doctor: doctor
        }
        )
    } catch (error) {
        res.send(error)
    }
}

exports.getmedicationList = async (req, res) => {
    try {
        const med = await medicationModel.findById(req.params.id)
        res.json(med)
    } catch (error) {
        res.send(error)
    }
}

exports.getDoctorDashboard = async (req, res) => {
    try {
        const originalUrl = req.originalUrl;
        const detailPath = "/" + originalUrl.split('=')[0];
        if (req.query.search && req.query.search != "") {
            let search = req.query.search.split(' ')
            let patientList = await doctorModel.findById({ _id: req.session.user }).populate({
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
        else if (req.query.searchPatient && req.query.searchPatient != "") {
            let search = req.query.searchPatient.split(' ')
            let patientList = await patientModel.find({
                $or: [
                    { name: { $regex: new RegExp(search[0], 'i') }, firstname: { $regex: new RegExp(search[1], 'i') } },
                    { name: { $regex: new RegExp(search[1], 'i') }, firstname: { $regex: new RegExp(search[0], 'i') } },
                    { name: { $regex: new RegExp(search[0], 'i') } },
                    { firstname: { $regex: new RegExp(search[0], 'i') } },
                ]
            })
            res.render("dashboard/index.html.twig", {
                uri: detailPath,
                role: req.session.role,
                userID: req.session.user,
                userName: req.session.userName,
                userFirstname: req.session.userFirstname,
                patientList: patientList
            })
        } else {
            let patientList = await doctorModel.findById({ _id: req.session.user }).populate("patientList")
            res.render("dashboard/index.html.twig", {
                uri: req.path,
                role: req.session.role,
                userID: req.session.user,
                userName: req.session.userName,
                userFirstname: req.session.userFirstname,
                patientList: patientList.patientList
            })

        }
    } catch (error) {
        res.send(error.message)
    }
}
exports.getAddPatient = async (req, res) => {
    try {
        let prestataireList = await prestataireModel.find()
        res.render("doctorView/addPatient/index.html.twig", {
            uri: req.path,
            role: req.session.role,
            userID: req.session.user,
            userName: req.session.userName,
            userFirstname: req.session.userFirstname,
            prestataireList: prestataireList
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
        let patient = await patientModel.findOne({ _id: req.params.patientID })
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
        res.send(error)
    }
}

exports.getUpdatePatient = async (req, res) => {
    try {
        const originalUrl = req.path;
        const detailPath = "/" + originalUrl.split('/')[1];
        let prestataireList = await prestataireModel.find()
        const doctor = await doctorModel.findById(req.session.user)
        let patient = await patientModel.findOne({ _id: req.params.patientID })
        let newBirthday = new Date(patient.birthday);
        let birthday = newBirthday.toISOString().slice(0, 10);
        res.render("updatePatient/index.html.twig", {
            uri: detailPath,
            role: req.session.role,
            userID: req.session.user,
            userName: req.session.userName,
            userFirstname: req.session.userFirstname,
            patient: patient,
            birthday: birthday,
            prestataireList: prestataireList,
            doctor: doctor
        })
    } catch (error) {
        console.log(error);
        res.send(error.mesage)
    }
}

exports.deletePatient = async (req, res) => {
    try {
        let patientList = await doctorModel.findById({ _id: req.session.user }).populate("patientList")
        await doctorModel.updateOne({ _id: req.session.user }, { $pull: { patientList: req.params.patientID } })
        res.redirect("/doctorDashboard")
    } catch (error) {
        res.render("dashboard/index.html.twig", {
            uri: req.path,
            role: req.session.role,
            userID: req.session.user,
            userName: req.session.userName,
            userFirstname: req.session.userFirstname,
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
        let password = genererMotDePasse()
        newPatient.password = password
        newPatient.validateSync();
        await newPatient.save();
        await prestataireModel.updateOne({ _id: req.body.prestataire }, { $push: { patientList: newPatient._id } });
        await doctorModel.updateOne({ _id: req.session.user }, { $push: { patientList: newPatient._id } });
        const mailOptions = {
            from: process.env.USER_MAIL,
            to: process.env.USER_PERSO_MAIL,
            subject: "PerfADom : Identifiants de connexion",
            text: "Bonjour " + newPatient.gender + " " + newPatient.name + " " + newPatient.firstname + ",\n\n"
                + "Votre médecin vous a créé un compte sur PerfADom. \n\n"
                + "Voici vos identifants pour vos connecter : \n\n"
                + "Identifiant : " + newPatient.mail + "\n"
                + "Mot de passe : " + password + "\n\n"
                + "Cordialement \n\n L'équipe PerfADom"
        };
        await transporter.sendMail(mailOptions);
        res.redirect("/doctorDashboard")
    } catch (error) {
        console.log(error);
        res.render("doctorview/addPatient/index.html.twig", {
            errors: error.errors,
            role: req.session.role,
            userID: req.session.user,
            userName: req.session.userName,
            userFirstname: req.session.userFirstname,
            errors: error.errors,
            uri: req.path,
            prestataireList: prestataireList,
        })
    }
}

exports.addPatient = async (req, res) => {
    try {
        let patientList = await doctorModel.findById({ _id: req.session.user }).populate("patientList")
        await doctorModel.updateOne({ _id: req.session.user }, { $push: { patientList: req.params.patientID } })
        res.redirect("/doctorDashboard")
    } catch (error) {
        res.render("dashboard/index.html.twig", {
            uri: req.path,
            role: req.session.role,
            userID: req.session.user,
            userName: req.session.userName,
            userFirstname: req.session.userFirstname,
            patientList: patientList.patientList
        })
    }
}

exports.updatePatient = async (req, res) => {
    const originalUrl = req.path;
    const detailPath = "/" + originalUrl.split('/')[1];
    let prestataireList = await prestataireModel.find()
    let patient = await patientModel.findOne({ _id: req.params.patientID })
    let newBirthday = new Date(patient.birthday)
    let birthday = newBirthday.toISOString().slice(0, 10);
    try {
        if (req.body.nurse.trim() == "") {
            req.body.nurse = ""
        }
        if (req.body.pharmacy.trim() == "") {
            req.body.pharmacy = ""
        }
        if (req.body.prestataire == "") {
            delete req.body.prestataire
            if (patient.prestataire.length != 0) {
                await prestataireModel.updateOne({ _id: patient.prestataire[0] }, { $pull: { patientList: req.params.patientID } });
                await patientModel.updateOne({ _id: req.params.patientID }, { $pull: { prestataire: patient.prestataire[0] } });
            }
        }
        else if (req.body.prestataire != patient.prestataire) {
            await prestataireModel.updateOne({ _id: patient.prestataire[0] }, { $pull: { patientList: req.params.patientID } });
            await prestataireModel.updateOne({ _id: req.body.prestataire }, { $push: { patientList: req.params.patientID } });
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
                req.session.role = "doctor",
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
        res.render('doctorView/doctorConnexion/index.html.twig', {
            error: error
        })
    }
}

exports.getMyPatient = async (req, res) => {
    try {
        if (req.query.search) {
            const originalUrl = req.path;
            const detailPath = "/" + originalUrl.split('/')[1];
            let search = req.query.search.split(' ')
            let patientList = await doctorModel.findById({ _id: req.session.user }).populate({
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
    } catch (error) {
        console.log(error)
        let patientList = await doctorModel.findById({ _id: req.session.user }).populate("patientList")
        res.render("dashboard/index.html.twig", {
            uri: req.path,
            role: req.session.role,
            userID: req.session.user,
            userName: req.session.userName,
            userFirstname: req.session.userFirstname,
            patientList: patientList.patientList
        })
    }
}

exports.AddTreatment = async (req, res) => {
    try {
        const medicationIds = []
        for (let i = 0; i < req.body.medication.length; i++) {
            const newTimeMedication = new timeMedicationModel({
                medication: req.body.medication[i],
                quantityAmpoule: req.body.quantityAmpoule[i],
                quantity: req.body.quantity[i],
                periodQuantity: req.body.periodQuantity[i],
                duration: req.body.duration[i],
                periodDuration: req.body.periodDuration[i]
            })
            newTimeMedication.validateSync();
            await newTimeMedication.save();
            medicationIds.push(newTimeMedication._id);
        }
        const newTreatment = new treatmentModel({
            name: "Traitement du " + new Date(),
            medicationList: medicationIds,
            startDate: req.body.startDate,
            prescriptionDate: new Date(),
            doctor: req.session.userID,
            patient: req.params.patientID,
            model: false
        })
        newTreatment.validateSync()
        await newTreatment.save()
        await patientModel.updateOne({ _id: req.params.patientID }, { $push: { treatmentList: newTreatment._id } });
        res.redirect(`/detailPatient/${req.params.patientID}`)
    } catch (error) {
        console.log(error.message)
        res.send(error)
    }
}
exports.getUserId = (req, res) => {
    res.json({ userID: req.session.user });
};
// exports.createMedication = async (req, res) => {
//     try {
//         const newMedication = new medicationModel({
//             name: "doliprane",
//             doctor: "662b6543af4717d9350c9689",
//             routeAdministration: "IV",
//             modeAdministration: "gravitée",
//             dilution: "100 ml",
//             infusionTime: "30 min"
//         })
//         newMedication.validateSync()
//         newMedication.save()
//         res.send('dsdskdnksd');
//     } catch (error) {
//         console.log(error)
//         res.send(error)
//     }
// }
