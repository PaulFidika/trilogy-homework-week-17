const mongoose = require('mongoose')
const Schema = mongoose.Schema

const exerciseSchema = new Schema({
    type: String,
    name: String,
    distance: Number,
    weight: Number,
    sets: Number,
    reps: Number,
    duration: Number
})

const fitnessSchema = new Schema({
    day: Date,
    exercises: [exerciseSchema]
})

module.exports = mongoose.model("fitness", fitnessSchema)
