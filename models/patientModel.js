const mongoose = require('mongoose');
const nameFormat = require('../customDepedencies/nameFormat')
const bcrypt = require('bcrypt')


const patientSchema = new mongoose.Schema({
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
    slug: {
        type:String,
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
    number: {
        type: String,
        validate: {
            validator: function (v) {
                return v.trim().length === 0 || /^0[1-9][0-9]{8}$/.test(v)
            }, message: "Entrez un numéro de téléphone valide"
        }
    },
    numberSS: {
        type: Number,
        validate: {
            validator: function (v) {
                return /^(1|2)\d{14,15}$/.test(v)
            }, message: "Entrez un numéro de sécurité social valide"
        }
    },
    ALD: {
        type: Boolean,
    },
    nurse: {
        type: String,
        validate: {
            validator: function (v) {
                return /^[^<>]*$/
            }, message: "Coordonnées infirmier non valide"
        }
    },
    pharmacy: {
        type: String,
        validate: {
            validator: function (v) {
                return /^[^<>]*$/
            }, message: "Coordonnées pharmacie non valide"
        }
    },
    prestataire: {
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
            }, message: "Entrez un mot de passe valide :<br> il faut min 8 caractère, une majuscule,<br> une minuscule et un caractère spécial sauf < ou >"
        }
    },
    treatmentList: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "treatment"
        }]

    }
})

patientSchema.pre("validate", async function (next) {
    try {
        const existingUser = await this.constructor.findOne({ mail: this.mail });
        if (existingUser) {
            this.invalidate("mail", "Cet email est déjà enregistré.")
        }
        next()
    } catch (error) {
        next(error)
    }
})
patientSchema.pre("save", function (next) {
    this.slug = this.name + "_" + this.firstname
    this.name = nameFormat(this.name);
    this.firstname = nameFormat(this.firstname);
    next()
})

patientSchema.pre("save", function (next) {
    if (!this.isModified("password")) {
        return next();
    }

    bcrypt.hash(this.password, 10, (error, hash) => {
        if (error) {
            return next(error);
        }
        this.password = hash;
        next()
    })
})

const patientModel = mongoose.model("patient", patientSchema)
module.exports = patientModel