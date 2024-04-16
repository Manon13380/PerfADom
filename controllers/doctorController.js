const doctorModel = require('../models/doctorModel')


exports.getHomepage = (req, res) => {
    try {
        res.render("homepage/index.html.twig")
    } catch (error) {
        res.send("erreur ici " + error)
    }
}