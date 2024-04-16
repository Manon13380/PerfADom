const mongoose = require('mongoose')

const time_medicationShema = new mongoose.Schema({
    medication : {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "medication"
        }]
    },
    treatment : {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "medication"
        }]
    },
})