const router = require("express").Router();
const db = require("../models");

router.get("/api/workouts", (req, res) => {
    db.Workout.find({}).then(workouts => {
        workouts.forEach(workouts => {
            let totalDuration = 0;
            workouts.exercises.forEach(e => {
                totalDuration += e.duration;
            });
            workouts.totalDuration = totalDuration;

        });
        res.json(workouts);
    })
        .catch(err => {
            res.status(400).json(err);
        });
})

router.get("/api/workouts/range", (req, res) => {
    db.Workout.find({}).then((workouts) => {
        workouts.forEach(workouts => {
            let totalDuration = 0;
            workouts.exercises.forEach(e => {
                totalDuration += e.duration;
            });
            workouts.totalDuration = totalDuration;

        });
        res.json(workouts);
    }).catch(err => {
        res.status(400).json(err);
    });
});

router.put("/api/workouts/:id", (req, res) => {
    db.Workout.findByIdAndUpdate(
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
    db.Workout.create(req.body).then((newWorkout) => {
        res.json(newWorkout);
    }).catch(err => {
        res.status(400).json(err);
    });
});

module.exports = router;