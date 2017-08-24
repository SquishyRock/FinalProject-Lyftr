const mongoose = require('mongoose');
const Workout = require('../models/workouts');
const Exercise = require('../models/exercises');


module.exports = () => {
  Workout.find({}, (err, cars) => {
    if (err) {
      console.log(err);
    } else if (cars.length === 0) {
      Exercise.find({}, (err, exercises) => {
        if (err) {
          console.log(err);
        } else {
          if (exercises.length < 20) {
            console.log('Not enough exercises to use for seeding workouts');
          } else {
            const workoutsToSeed = [
              {
                name: 'Ice Cream Fitness Day A',
                public: true,
                exercises: [{
                  _id: exercises[0]._id,
                  name: 'Back Squat',
                  sets: 5,
                  reps: 5
                }, {
                  _id: exercises[4]._id,
                  name: 'Bench Press',
                  sets: 5,
                  reps: 5
                }, {
                  _id: exercises[19]._id,
                  name: 'Bent-over Row',
                  sets: 5,
                  reps: 5
                }, {
                  _id: exercises[7]._id,
                  name: 'Pull Up',
                  sets: 3,
                  reps: 8
                }, {
                  _id: exercises[8]._id,
                  name: 'Tricep Extensions',
                  sets: 3,
                  reps: 8
                }, {
                  _id: exercises[16]._id,
                  name: 'Bicep Cable Curl',
                  sets: 3,
                  reps: 8
                }, {
                  _id: exercises[9]._id,
                  name: 'Abdominal Crunch',
                  sets: 3,
                  reps: 10
                }]
              },
              {
                name: 'Ice Cream Fitness Day B',
                public: true,
                exercises: [{
                  _id: exercises[0]._id,
                  name: 'Back Squat',
                  sets: 5,
                  reps: 5
                }, {
                  _id: exercises[1]._id,
                  name: 'Deadlift',
                  sets: 1,
                  reps: 5
                }, {
                  _id: exercises[6]._id,
                  name: 'Shoulder Press',
                  sets: 5,
                  reps: 5
                }, {
                  _id: exercises[19]._id,
                  name: 'Bent-over Row',
                  sets: 5,
                  reps: 5
                }, {
                  _id: exercises[17]._id,
                  name: 'Tricep Cable Push Down',
                  sets: 3,
                  reps: 8
                }, {
                  _id: exercises[5]._id,
                  name: 'Preacher Curl',
                  sets: 3,
                  reps: 8
                }, {
                  _id: exercises[22]._id,
                  name: 'Plank',
                  sets: 3,
                  reps: 30
                }]
              }
            ];
            Workout.collection.insert(workoutsToSeed, (err, workouts) => {
              console.log(workouts)
            })
          }
        }
      })
    }
  })
}
