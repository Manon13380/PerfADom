const express = require('express');
const mongoose = require('mongoose');
const session = require ('express-session')
const doctorRouter = require('./routers/doctorRouter');
const patientRouter = require('./routers/patientRouter');
const prestataireRouter = require('./routers/prestataireRouter');


require('dotenv').config();
const app = express();


app.use(express.json())
app.use(express.static("./assets"))
app.use(express.urlencoded({extended : true}))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}))

app.use(doctorRouter)
app.use(patientRouter)
app.use(prestataireRouter)


app.listen(process.env.PORT, (err) => {
    if (!err) { console.log('Connexion au server ok') }
    else { console.log(err); }
})


mongoose.connect(process.env.URIDB)
