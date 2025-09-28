const express = require("express");
const authUser = require("../middleware/userMiddleware");
const {
  getWorkouts,
  getWorkout,
  createWorkout,
  editWorkout,
  deleteWorkout,
} = require("../controllers/workoutController");

const router = express.Router();

// Protect all workout routes
router.use(authUser);

router.get("/", getWorkouts);
router.get("/:id", getWorkout);
router.post("/", createWorkout);
router.patch("/:id", editWorkout);
router.delete("/:id", deleteWorkout);

module.exports = router;

