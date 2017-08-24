const express = require('express');
const router = express.Router();
const Result = require('../models/results');

//CRUD for workouts
//Create new workout
router.post('/', (req, res) => {

  let object = req.body;
  let newObject = Result(object);
  newObject.save()
    .then(savedObject => {
      console.log('New Object hit')
      res.json(savedObject);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({
        err
      })
    })
});

//Read  ALL existing exercises
router.get('/', (req, res) => {

  Result.find({})
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

// Read an Exercise by ID
router.get('/:objectId', (req, res) => {
  Result.findById(req.params.objectId)
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

//Update an existing results page
router.put('/:objectId', (req, res) => {
  let __object = req.body;
  let update = {
    workout_template: __object.workout_template,
    description: __object.description,
    author: __object.author,
    exercise_info: __object.exercise_info,
    exercises: __object.exercises,
    tags: __object.tags
  }
  let query = {
    "_id": req.params.objectId
  };
  Result.findOneAndUpdate(query, update, {
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

//Deleting an existing results page
router.delete('/:objectId', (req, res) => {
  Result.findOneAndRemove({
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
});

module.exports = router;
