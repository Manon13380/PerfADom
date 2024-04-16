const mongoose = require('mongoose');


const patientShema = new mongoose.Schema({
    gender: {
        type: String,
        required: [true, "Le choix du genre est requis"]
    },
    name: {
        type: String,
        required: [true, "Votre nom est requis"],
        validate: {
            validator: function (v) {
                return /^[^\>\<]+$/.test(v)
            }, message: "Entrez un nom valide"
        }
    },
    firstname: {
        type: String,
        required: [true, "Votre prénom est requis"],
        validate: {
            validator: function (v) {
                return /^[^\>\<]+$/.test(v)
            }, message: "Entrez un prénom valide"
        }
    },
    birthday: {
        type: Date,
        required: [true, "votre date de naissance est requise"]
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
    numberSS : {
        type : Number,
        validate : {
            validator : function(v){
                return /^(1|2)\d{14,15}$/.test(v)
            }, message : "Entrez un numéro de sécurité social valide"
        }
    },
    ALD : {
        type : Boolean,
    },
    nurse : {
        type : String,
        validate : {
            validator : function (v){
                return /^[^<>]*$/
            }, message : "Coordonnées infirmier non valide"
        }
    },
    pharmacy : {
        type : String,
        validate : {
            validator : function (v){
                return /^[^<>]*$/
            }, message : "Coordonnées pharmacie non valide"
        }
    },
    prestataire : {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "prestataire"
        }]
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
    treatmentList :{
            type: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "treatment"
            }]
      
    }
})

const patientModel = mongoose.model("patient", patientShema)
module.exports = patientModel