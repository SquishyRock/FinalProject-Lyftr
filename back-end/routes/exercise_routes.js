const express = require('express');
const router = express.Router();
const Exercise = require('../models/exercises'),
  bcrypt = require('bcryptjs'),
  jwt = require('jsonwebtoken'),
  authorize = require("../middleware/authorize");
const JWT_SECRET_KEY = 'secretkey'

// //CRUD for exercises
// //Create new exercise
router.post('/', (req, res) => {
  let object = req.body;
  let newObject = Exercise(object);
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

//Read an existing exercise by equipment or muscle_group
// Splits search url into type of query and value of query pairs and creats object for Exercise.find to search on
router.post('/search', authorize(JWT_SECRET_KEY), (req, res) => {
  // console.log(Object.keys(req.query))
  // console.log(req.query)
  let query = {};
  for (var prop in req.body.params) {
    console.log(prop, req.body.params[prop])
    if (req.body.params[prop]) { //Checks if query is empty (ex search?exercise=)
      if (req.body.params[prop].length > 1) {
        query[prop] = {
          $all: req.body.params[prop].split('-').map((el, i, arr) => {
            return Number(el)
          })
        }
      } else {
        query[prop] = Number(req.body.params[prop])
      }
    }
  }
  Exercise.find(query)
    .then(objectsArray => {
      console.log(objectsArray)
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

//Read an exercise by query of equipment or muscle group
router.get('/', (req, res) => {
  Exercise.find({})
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
  Exercise.findById(req.params.objectId)
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

//Update an existing exercise
router.put('/exercises/:objectId', (req, res) => {
  let __object = req.body;
  let update = {
    name: __object.name,
    description: __object.description,
    equipment: __object.equipment,
    external_link: __object.external_link,
    muscle_group: __object.muscle_group,
    alternative_exercises: __object.alternative_exercises
  }
  let query = {
    "_id": req.params.objectId
  };
  Exercise.findOneAndUpdate(query, update, {
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
router.delete('/:objectId', (req, res) => {
  Exercise.findOneAndRemove({
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
