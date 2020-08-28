const express = require("express")
const path = require("path")
const mongoose = require('mongoose')
const db = require('./models/index')
require('dotenv').config()

const PORT = process.env.PORT || 3000

const app = express()
app.use(express.urlencoded({ extended: true })); // express middleware
app.use(express.json());
app.use(express.static("public"));
app.use('/', require('./routes/index.js')) // where our routes are defined

// database
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

app.listen(PORT, () => {
    console.log(`🌎 ==> server now running at http://localhost:${PORT}!`);
});

