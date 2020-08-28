const routes = require("express").Router()
const path = require('path')
const { fitness } = require("../models/")

// static pages
routes.get(['/', '/index'], (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'))
})

routes.get(['/stats'], (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'stats.html'))
})

routes.get(['/exercise'], (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'exercise.html'))
})

// api routes
routes.get(['/api/workouts'], (req, res) => {
    fitness.find({})
        .then((result) => {
            res.status(200).json(result)
        })
        .catch((err) => {
            res.status(400).json(err)
        })
})

routes.put(['/api/workouts/:id'], async (req, res) => {
    try {
        let workout = await fitness.findById(req.params.id).exec() // what if it doesn't exist?
        workout.exercises.push({
            type: req.body.type,
            name: req.body.name,
            distance: req.body.distance,
            weight: req.body.weight,
            sets: req.body.sets,
            reps: req.body.reps,
            duration: req.body.duration
        })
        workout.day = new Date()
        let result = await workout.save()
        res.status(201).json(result)
    }
    catch (err) {
        res.status(500).json(err)
    }
})

routes.post(['/api/workouts'], (req, res) => { // this only creates null entries; use put to update them
    let data = {
        day: new Date(),
        exercises: []
    }

    fitness.create(data)
        .then((result) => {
            res.status(201).json(result)
        })
        .catch((err) => {
            res.status(400).json(err)
        })
})

routes.get(['/api/workouts/range'], (req, res) => {
    fitness.find({})
        .then((result) => {
            res.status(200).json(result)
        })
        .catch((err) => {
            res.status(400).json(err)
        })
})

module.exports = routes