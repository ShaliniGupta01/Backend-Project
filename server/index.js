require("dotenv").config({quiet:true});
const express = require("express");
const cors = require("cors");
const connectDB = require("./db/connection"); 

const app = express();
const port = process.env.PORT || 4000;

// middlewares — order matters
app.use(cors());
app.use(express.json()); 

// routes
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/workouts", require("./routes/workoutRoutes"));

// connect DB & start
connectDB()
  .then(() => {
    app.listen(port, () => console.log(`Server running on ${port}`));
  })
  .catch((err) => console.error(err));