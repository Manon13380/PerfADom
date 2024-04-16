const mongoose = require('mongoose')

const prestataireShema = new mongoose.Schema({
    societyName : {
        type: String,
        required : [true, "Le nom de votre société est requis"],
        validate : {
            validator : function (v){
                return /^[^\>\<]+$/.test(v)
            }, message: "Entrez un nom de société valide"
        }
    },
    salesPersonName : {
        type : String,
        required : [true, "Le nom du commercial est requis"],
        validate: {
            validator: function (v) {
                return /^[^\>\<]+$/.test(v)
            }, message: "Entrez un nom valide"
        }
    },
    salesPersonFirstname : {
        type : String,
        required : [true, "Le prénom ducommercial est requis"],
        validate: {
            validator: function (v) {
                return /^[^\>\<]+$/.test(v)
            }, message: "Entrez un prénom valide"
        }
    },
    mail: {
        type: String,
        required: [true, "Votre mail est requis"],
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9_%+-][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v)
            }, message: "Entrez un mail valide"
        }
    },
    number : {
        type : String,
        validate : {
            validator : function(v){
                return /^0[1-9][0-9]{8}$/.test(v)
            }, message : "Entrez un numéro valide"
        }
    },
    password: {
        type: String,
        required: [true, "Le mot de passe est requis"],
        validate: {
            validator: function (v) {
                return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-/]).{8,}$/.test(v)
            }, message: "Entrez un mot de passe valide : il faut min 8 caractère, une majuscule, une minuscule et un caractère spécial sauf < ou >"
        }
    },
    patientList: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "patient"
        }]
    },
})

const prestataireModel = mongoose.model("prestataire", prestataireShema)
module.exports = prestataireModel