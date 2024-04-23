const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const doctorSchema = new mongoose.Schema({
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
    mail: {
        type: String,
        required: [true, "Votre mail est requis"],
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9_%+-][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v)
            }, message: "Entrez un mail valide"
        }
    },
    speciality: {
        type: String,
        required: [true, "Votre spécialité est requise"],
    },
    institution: {
        type: String,
        validate: {
            validator: function (v) {
                return /^[A-Za-zÀ-ÖØ-öø-ÿ\s\-]*$/.test(v)
            }, message: "Entrez un nom de spécialité valide"
        }
    },
    numberFINESS: {
        type: String,
        validate: {
            validator: function (v) {
                return /^[0-9]{0,9}$/.test(v)
            }, message: "Entrez un numéro composé de 9 chiffres",
            required: function () {
                return this.institution ? true : false;
            }
        }
    },
    numberADELI: {
        type: String,
        required: [true, "Votre numéro ADELI est requis"],
        validate: {
            validator: function (v) {
                return /^[0-9]{9}$/.test(v)
            }, message: "ADELI : Entrez un numéro composé de 9 chiffres"
        }
    },
    numberRPPS: {
        type: String,
        required: [true, "Votre numéro RPSS est requis"],
        validate: {
            validator: function (v) {
                return /^[0-9]{11}$/.test(v)
            }, message: "RPPS : Entrez un numéro composé de 11 chiffres"
        }
    },
    signature: {
        type: String,
        required: [true, "Votre signature est require"]
    },
    stamp: {
        type: String,
        required: [true, "Votre tampon est requis"]
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
    patientList: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "patient"
        }]
    },
    treatmentModel: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "treatment_model"
        }]
    },
    medicationList: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "medication"
        }]
    },
})

doctorSchema.pre("validate", async function (next) {
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

doctorSchema.pre("save", function ( next) {
    if (!this.isModified("password")) {
        return next();
    }

    bcrypt.hash(this.password, 10, (error, hash)=>{
        if(error){
            return next(error);
        }
        this.password = hash;
        next()
    })
})

const doctorModel = mongoose.model("doctor", doctorSchema)
module.exports = doctorModel