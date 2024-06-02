const prestataireModel = require('../models/prestataireModel')
const session = require('express-session')

const authguard = async (req, res, next) => {
    try {
        if (req.session.user) {
            let user = await prestataireModel.findOne({ _id: req.session.user });
            if (user) {
                return next()
            }
        }
        throw new Error("utilisateur non connecté");
    } catch (error) {
        res.status(401).render('prestataireView/prestataireConnexion/index.html.twig', {
            errorAuth: error.message
        })
    }
}

module.exports = authguard