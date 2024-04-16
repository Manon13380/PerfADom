const express = require('express');
const mongoose = require('mongoose');
const doctorRouter = require('./routers/doctorRouter')


require('dotenv').config();
const app = express();

app.use(express.json())
app.use(express.static("./assets"))

app.use(doctorRouter)


app.listen(process.env.PORT, (err) => {
    if (!err) { console.log('Connexion au server ok') }
    else { console.log(err); }
})

mongoose.connect(process.env.URIDB)
