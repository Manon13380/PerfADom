const mongoose = require('mongoose')

const treatmentShema = new mongoose.Schema({
    name: {
        type: String
    },
    medicationList : {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "time_medications",
            
        }],
        required: [true, "Il faut au moins un médicament dans le traitement"]
    },
    startDate: {
        type: Date,
    },
    prescriptionDate : {
        type : Date,
    },
    doctor : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "doctor"
    },
    patient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "patient"
        
    },
    model : {
        type : Boolean,
    }
})

const treatmentModel = mongoose.model("treatment", treatmentShema)
module.exports = treatmentModel