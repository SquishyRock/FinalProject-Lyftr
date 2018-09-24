const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authorize = require("./middleware/authorize");

// Bring in 4 DB models
const Exercise = require('./models/exercises');
const User = require('./models/users');
const Workout = require('./models/workouts');
const Result = require('./models/results');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose.connect('mongodb://localhost/data/db/');
const db = mongoose.connection;
mongoose.Promise = global.Promise;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log("Connected to db at /data/db/")
});

const JWT_SECRET_KEY = 'secretkey'

// ROUTES //
var userRoutes = require('./routes/user_routes');
var workoutRoutes = require('./routes/workout_routes');
var exerciseRoutes = require('./routes/exercise_routes');
var resultRoutes = require('./routes/result_routes');

// //ENDPOINTS
app.use('/users', userRoutes);
app.use('/exercises', exerciseRoutes);
app.use('/workouts', workoutRoutes);
app.use('/results', resultRoutes);

// ---SEEDS----//
const seedExercises = require('./seeds/exercises');
seedExercises();
const seedWorkouts = require('./seeds/workouts');
seedWorkouts();

app.listen(8080, () => {
  console.log('SERVER RUNNING ON 8080');
})
