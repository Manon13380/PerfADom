const mongoose = require('mongoose')

const time_medicationShema = new mongoose.Schema({
    medication: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "medication"
    },
    quantityAmpoule: {
        type: Number,
        required: [true, "Le nombre d'ampoule est requis"]
    },
    quantity: {
        type: Number,
        required: [true, "Le nombre par jour/mois/an est requis"]
    },
    periodQuantity: {
        type: String,
        required: [true, "La période est requise"]
    },
    duration: {
        type: Number,
        required: [true, "La durée est requise"]
    },
    periodDuration: {
        type: String,
        required : [true, "La période est requise "]
    }
})

const timeMedicationModel = mongoose.model("time_medications", time_medicationShema )
module.exports = timeMedicationModel