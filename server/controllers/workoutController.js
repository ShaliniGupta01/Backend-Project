const Workout = require("../models/workoutModel");

// Get all workouts
const getWorkouts = async (req, res) => {
  try {
    const user_id = req.user._id;
    const workoutData = await Workout.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json(workoutData);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get single workout
const getWorkout = async (req, res) => {
  try {
    const workoutData = await Workout.findById(req.params.id);
    res.status(200).json(workoutData);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Create workout
const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;

  try {
    const user_id = req.user._id;
    const workout = await Workout.create({ title, reps, load, user_id });
    res.status(201).json(workout);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update workout
const editWorkout = async (req, res) => {
  try {
    const workoutData = await Workout.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(workoutData);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete workout
const deleteWorkout = async (req, res) => {
  try {
    const workoutData = await Workout.findByIdAndDelete(req.params.id);
    res.status(200).json(workoutData);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { getWorkouts, getWorkout, createWorkout, editWorkout, deleteWorkout };
