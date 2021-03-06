const router = require("express").Router();
const db = require("../models");

router.get("/api/workouts", (req, res) => {
    db.Workout.aggregate([
        {
            $addFields: {
                totalDuration: { $sum: `$exercises.duration` }
            }
        }
    ])
        .then(workouts => {
            res.json(workouts);
        })
        .catch(err => {
            res.status(400).json(err);
        });
})

router.get("/api/workouts/range", (req, res) => {
    db.Workout.aggregate([
        {
            $addFields: {
                totalDuration: { $sum: `$exercises.duration` }
            }
        }
    ])
        .sort({ day: -1 }).limit(7)
        .then((workouts) => {
            res.json(workouts.reverse());
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