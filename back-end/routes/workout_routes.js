const express = require('express');
const router = express.Router();
const Workout = require('../models/workouts'),
  bcrypt = require('bcryptjs'),
  jwt = require('jsonwebtoken'),
  authorize = require("../middleware/authorize");
const JWT_SECRET_KEY = 'secretkey'


//Read  ALL existing workouts
router.post('/public', authorize(JWT_SECRET_KEY), (req, res) => {
  console.log(req.decoded)
  Workout.find({
    public: true,
    author: {
      $ne: req.decoded.id
    }
  })
    .then(objectsArray => {
      res.json(objectsArray);
    })
    .catch(err => {
      console.log(err);
      res.status(400)
        .json({
          err
        });
    })
});

//Read  ALL existing workouts
router.post('/personal', authorize(JWT_SECRET_KEY), (req, res) => {
  console.log(req.decoded.id)
  Workout.find({
    author: req.decoded.id
  })
    .then(objectsArray => {
      res.json(objectsArray);
    })
    .catch(err => {
      console.log(err);
      res.status(400)
        .json({
          err
        });
    })
});

//CRUD for workouts
// Create new workout
router.post('/new', authorize(JWT_SECRET_KEY), (req, res) => {
  console.log(req.decoded)
  console.log(req.body)
  let object = {
    exercises: req.body.exercises,
    name: req.body.name,
    public: req.body.public,
    author: req.decoded.id
  }
  let newObject = Workout(object);
  newObject.save()
    .then(savedObject => {
      console.log('New Object hit')
      res.json(savedObject);
    })
    .catch(err => {
      console.log('setting errors');
      res.status(400).json({
        'err': err
      })
    })
});

//Read an existing exercise by equipment or muscle_group
// router.get('/search', (req, res) => {
//   let query = {};
//   for (var prop in req.query) {
//     if (req.query[prop].length > 1) {
//       query[prop] = {
//         $all: req.query[prop].split(',').map((el, i, arr) => {
//           return (el.split('-').join(' '))
//         })
//       }
//     } else {
//       query[prop] = req.query[prop]
//     }
//   }
//   Workout.find(query)
//     .then(objectsArray => {
//       res.json(objectsArray);
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(400)
//         .json({
//           err
//         });
//     })
// });


// Read an workout by ID
router.post('/:objectId', authorize(JWT_SECRET_KEY), (req, res) => {
  Workout.findById(req.params.objectId)
    .then(object => {
      res.json(object);
    })
    .catch(err => {
      console.log(err);
      res.status(400)
        .json({
          err
        });
    })
})

//Update an existing workout
router.put('/:objectId', (req, res) => {
  let __object = req.body;
  let update = {
    name: __object.name,
    author: __object.author,
    description: __object.description,
    exercise_info: __object.exercise_info,
    exercises: __object.exercises,
    tags: __object.tags
  }
  let query = {
    "_id": req.params.objectId
  };
  Workout.findOneAndUpdate(query, update, {
    new: true,
    runValidators: true
  })
    .then(updatedObject => {
      res.json(updatedObject);
    })
    .catch(err => {
      console.log(err)
      res.status(400).json({
        err
      });
    })

});

//Deleting an existing exercise
router.post('/del/:objectId', authorize(JWT_SECRET_KEY), (req, res) => {
  // console.log(req.decoded)
  // console.log(req.body)
  if (req.decoded.id === req.body.id) {
    Workout.findOneAndRemove({
      "_id": req.params.objectId
    })
      .then(object => {
        res.json({
          deleted: true
        });
      })
      .catch(err => {
        console.log(err);
        res.status(400)
          .json({
            err
          });
      })
  } else {
    res.status(400).json('error')
  }
});

module.exports = router;
