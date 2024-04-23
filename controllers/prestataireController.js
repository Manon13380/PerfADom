const prestataireModel = require('../models/prestataireModel')
const bcrypt = require('bcrypt')


exports.getPrestataireSubscribe = (req,res)=>{
    try {
        res.render("prestataireView/prestataireSubscribe/index.html.twig", {
            uri: req.path,
        })
    } catch (error) {
        res.send(error)
    }
}

exports.getPrestataireConnexion= (req, res) => {
    try {
        res.render("prestataireView/prestataireConnexion/index.html.twig", {
            uri: req.path
        })
    } catch (error) {
        res.send(error)
    }
}
exports.getPrestataireDashboard = (req, res) => {
    try {
        res.render("prestataireView/prestataireDashboard/index.html.twig", {
            uri: req.path
        })
    } catch (error) {
        res.send(error)
    }
}

exports.postPrestataire= async (req, res) => {
    try {
        let newPrestataire = new prestataireModel(req.body)
        newPrestataire.validateSync();
        await newPrestataire.save();
        res.redirect("/")
    } catch (error) {
        console.log(error)
        res.render("prestataireView/prestataireSubscribe/index.html.twig",{
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
                req.session.user = prestataire._id
                req.session.userName = prestataire.name
                req.session.userFirstname = prestataire.firstname
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
