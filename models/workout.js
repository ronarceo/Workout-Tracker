const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [
        {
            name: {
                type: String,
                trim: true,
                required: true
            },
            type: {
                type: String,
                trim: true,
                required: true
            },
            weight: {
                type: Number
            },
            sets: {
                type: Number
            },
            reps: {
                type: Number
            },
            duration: {
                type: Number,
                required: true
            },
            distance: {
                type: Number
            }
        }
    ]
});

const Workout = mongoose.model("workout", WorkoutSchema);

module.exports = Workout;