const mongoose = require('mongoose')

const treatmentShema = new mongoose.Schema({
    name: {
        type: String
    },
    medicationList : {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "time_medication"
        }]
    },
    startDate: {
        type: Date,
    },
    prescriptionDate : {
        type : Date,
    },
    doctor : {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "doctor"
        }]
    },
    patient: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "patient"
        }]
    },
    model : {
        type : Boolean,
    }
})

const treatmentModel = mongoose.model("treatment", treatmentShema)
module.exports = treatmentModel