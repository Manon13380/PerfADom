const doctorModel = require('../models/doctorModel')
const session = require('express-session')

const authguard = async (req, res, next) => {
    try {
        if (req.session.user) {
            let user = await doctorModel.findOne({ _id: req.session.user });
            if (user) {
                return next()
            }
        }
        throw new Error("utilisateur non connecté");
    } catch (error) {
        res.status(401).render('doctorView/doctorConnexion/index.html.twig', {
            errorAuth: error.message
        })
    }
}

module.exports = authguard