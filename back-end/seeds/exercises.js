const mongoose = require('mongoose');
const Exercise = require('../models/exercises');
const exercisesToSeed = [
  {
    name: 'Back Squat',
    equipment: 0,
    muscle_group: [1, 2, 3, 4, 5],
    external_link: "http://www.exrx.net/WeightExercises/Quadriceps/BBSquat.html",
    alternative_exercises: []
  },
  {
    name: 'Deadlift',
    equipment: 0,
    muscle_group: [1, 2, 3, 4, 5],
    external_link: "http://www.exrx.net/WeightExercises/GluteusMaximus/BBDeadlift.html",
    alternative_exercises: []
  },
  {
    name: 'Front Squat',
    equipment: 0,
    muscle_group: [2, 3, 4, 5],
    external_link: "http://www.exrx.net/WeightExercises/GluteusMaximus/BBFrontSquat.html",
    alternative_exercises: []
  },
  {
    name: 'Walking Lunge',
    equipment: 0,
    muscle_group: [2, 3, 4, 5],
    external_link: "http://www.exrx.net/WeightExercises/GluteusMaximus/BBWalkingLunge.html",
    alternative_exercises: []
  },
  {
    name: 'Bench Press',
    equipment: 0,
    muscle_group: [9, 10],
    external_link: "http://www.exrx.net/WeightExercises/PectoralSternal/BBBenchPress.html",
    alternative_exercises: []
  },
  {
    name: 'Preacher Curl',
    equipment: 0,
    muscle_group: [11, 12],
    external_link: "http://www.exrx.net/WeightExercises/Brachialis/BBPreacherCurl.html",
    alternative_exercises: []
  },
  {
    name: 'Shoulder Press',
    equipment: 0,
    muscle_group: [8, 10],
    external_link: "http://www.exrx.net/WeightExercises/DeltoidAnterior/BBShoulderPress.html",
    alternative_exercises: []
  },
  {
    name: 'Pull Up',
    equipment: 3,
    muscle_group: [6, 7],
    external_link: "http://www.exrx.net/WeightExercises/LatissimusDorsi/BWPullup.html",
    alternative_exercises: []
  },
  {
    name: 'Tricep Extensions',
    equipment: 0,
    muscle_group: [10, 12],
    external_link: "http://www.exrx.net/WeightExercises/Triceps/BBLyingTriExt.html",
    alternative_exercises: []
  },
  {
    name: 'Abdominal Crunch',
    equipment: 3,
    muscle_group: [4, 5],
    external_link: "http://www.exrx.net/WeightExercises/RectusAbdominis/BWCrunch.html",
    alternative_exercises: []
  },
  {
    name: 'Chest Fly',
    equipment: 2,
    muscle_group: [9],
    external_link: "http://www.exrx.net/WeightExercises/PectoralSternal/LVSeatedFly.html",
    alternative_exercises: []
  },
  {
    name: 'Standing Calf Raise',
    equipment: 1,
    muscle_group: [0],
    external_link: "http://www.exrx.net/WeightExercises/Gastrocnemius/DBStandingCalfRaise.html",
    alternative_exercises: []
  },
  {
    name: 'Oblique Side Bend',
    equipment: 1,
    muscle_group: [4],
    external_link: "http://www.exrx.net/WeightExercises/Obliques/DBSideBend.html",
    alternative_exercises: []
  },
  {
    name: 'Seated Cable Crunch',
    equipment: 2,
    muscle_group: [4],
    external_link: "http://www.exrx.net/WeightExercises/RectusAbdominis/CBSeatedCrunch.html",
    alternative_exercises: []
  },
  {
    name: 'Lat Pulldown',
    equipment: 2,
    muscle_group: [6, 7],
    external_link: "http://www.exrx.net/WeightExercises/LatissimusDorsi/CBFrontPulldown.html",
    alternative_exercises: []
  },
  {
    name: 'Wrist Curl',
    equipment: 0,
    muscle_group: [12],
    external_link: "http://www.exrx.net/WeightExercises/WristFlexors/BBWristCurl.html",
    alternative_exercises: []
  },
  {
    name: 'Bicep Cable Curl',
    equipment: 2,
    muscle_group: [11],
    external_link: "http://www.exrx.net/WeightExercises/Biceps/CBCurl.html",
    alternative_exercises: []
  },
  {
    name: 'Tricep Cable Pushdowns',
    equipment: 2,
    muscle_group: [10],
    external_link: "http://www.exrx.net/WeightExercises/Triceps/CBPushdown.html",
    alternative_exercises: []
  },
  {
    name: 'Seated Leg Curl',
    equipment: 2,
    muscle_group: [1, 3,],
    external_link: "http://www.exrx.net/WeightExercises/Hamstrings/LVSeatedLegCurlH.html",
    alternative_exercises: []
  },
  {
    name: 'Bent-over Row',
    equipment: 0,
    muscle_group: [4, 5, 6],
    external_link: "http://www.exrx.net/WeightExercises/BackGeneral/BBBentOverRow.html",
    alternative_exercises: []
  },
  {
    name: 'Single Leg Split Squat',
    equipment: 0,
    muscle_group: [2, 3,],
    external_link: "http://www.exrx.net/WeightExercises/Quadriceps/DBSingleLegSplitSquat.html",
    alternative_exercises: []
  },
  {
    name: 'V-Up',
    equipment: 3,
    muscle_group: [4],
    external_link: "http://www.exrx.net/WeightExercises/RectusAbdominis/WtVUp.html",
    alternative_exercises: []
  },
  {
    name: 'Plank',
    equipment: 3,
    muscle_group: [4, 5],
    external_link: "http://www.exrx.net/WeightExercises/RectusAbdominis/BWFrontPlank.html",
    alternative_exercises: []
  },
  {
    name: 'Hip Thrusts',
    equipment: 0,
    muscle_group: [1, 3, 4, 5],
    external_link: "http://www.exrx.net/WeightExercises/GluteusMaximus/BBHipThrust.html",
    alternative_exercises: []
  },
  {
    name: 'Seated Calf Press',
    equipment: 2,
    muscle_group: [0],
    external_link: "http://www.exrx.net/WeightExercises/Gastrocnemius/LVSeatedCalfPress.html",
    alternative_exercises: []
  },
  {
    name: 'Tricep Dips',
    equipment: 3,
    muscle_group: [10],
    external_link: "http://www.exrx.net/WeightExercises/Triceps/BWTriDip.html",
    alternative_exercises: []
  }
]

module.exports = () => {
  Exercise.find({}, (err, exercises) => {
    if (err) {
      console.log("here" + err)
    } else {
      if (exercises.length === 0) {
        Exercise.collection.insert(exercisesToSeed, (err, exercises) => {
          console.log(exercises)
        })
      }
    }
  })
}
