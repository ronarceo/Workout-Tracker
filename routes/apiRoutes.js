const router = require("express").Router();
const Workout = require("../models/workout.js");

router.get("/api/workouts", (req, res) => {
    Workout.find({}).then(workouts => {
        res.json(workouts);
    })
        .catch(err => {
            res.status(400).json(err);
        });
})

router.get("/api/workouts/range", (req, res) => {
    Workout.find({}).then((workouts) => {
        res.json(workouts);
    }).catch(err => {
        res.status(400).json(err);
    });
});

router.put("/api/workouts/:id", (req, res) => {
    Workout.findByIdAndUpdate(
        { _id: req.params.id },
        { $push: { exercises: req.body } },
        { new: true }
    ).then((workout) => {
        res.json(workout);
    }).catch(err => {
        res.status(400).json(err);
    });
});

router.post("/api/workouts/", (req, res) => {
    Workout.create(req.body).then((newWorkout) => {
        res.json(newWorkout);
    }).catch(err => {
        res.status(400).json(err);
    });
});

module.exports = router;