const mongoose = require('mongoose')

const medicationShema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Le nom du médicament est requis"],
        validate: {
            validator: function (v) {
                return /^[^\>\<]+$/.test(v)
            }, message: "Entrez un nom valide"
        }
    },
    routeAdministration: {
        type: String,
        required: [true, "La voie d'administration est requise"]
    },
    modeAdministration: {
        type: String,
        required: [true, "Le mode d'administration est requise"]
    },
    dilution : {
        type : String,
        required : [true, "La dilution est requise"]
    },
    infusionTime : {
        type : String, 
        required : [true, "Le temps de perfusion est requis"]
    },
    doctor : {
       
            type: mongoose.Schema.Types.ObjectId,
            ref: "doctors"
      
    }
})

const medicationModel = mongoose.model("medication", medicationShema)
module.exports = medicationModel