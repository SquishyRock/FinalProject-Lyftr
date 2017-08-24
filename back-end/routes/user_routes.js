const express = require('express');
const router = express.Router();
const User = require('../models/users'),
  bcrypt = require('bcryptjs'),
  jwt = require('jsonwebtoken'),
  authorize = require("../middleware/authorize");


const JWT_SECRET_KEY = 'secretkey'
//CRUD for users
//Create new user
router.post('/', (req, res) => {
  console.log(req.body)
  if (req.body.password && req.body.email) {
    let user = req.body;
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err)
          throw err;
        //Store the user's password
        let newObject = User({
          email: user.email,
          password: hash
        });
        newObject.save()
          .then(savedObject => {
            console.log(savedObject)
            //Create a web token
            let token = jwt.sign({
              id: user._id
            }, JWT_SECRET_KEY)

            // console.log(users)
            console.log(token)

            //send token to client
            res.status(200).json({
              token: token
            })
          })
          .catch(err => {
            console.log(err);
            res.status(400).json({
              err
            })
          })
      });
    });
  } else {
    res.status(400)
  }
});

router.post("/login", (req, res) => {
  console.log(req.body)
  User.find({
    email: req.body.email
  })
    .then(object => {
      console.log(object[0]._id)
      bcrypt.compare(req.body.password, object[0].password, (err, result) => {
        if (result == true) {
          let token = jwt.sign({
            id: object[0]._id
          }, JWT_SECRET_KEY)
          res.status(200).json({
            token: token
          })
        } else {
          res.status(403)
            .json({
              error: "Invalid Credentials"
            })
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(400)
        .json({
          err
        });
    })
})

//Read  ALL existing users
router.get('/', (req, res) => {
  User.find({})
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

// Read an user by ID
router.get('/:objectId', authorize(JWT_SECRET_KEY), (req, res) => {
  User.findById(req.params.objectId)
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

//Update an existing user
router.put('/:objectId', authorize(JWT_SECRET_KEY), (req, res) => {
  let __object = req.body;
  let update = {
    email: __object.email,
    password: __object.password,
    preferences: __object.preferences
  }
  let query = {
    "_id": req.params.objectId
  };
  User.findOneAndUpdate(query, update, {
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

//Deleting an existing user
router.delete('/:objectId', authorize(JWT_SECRET_KEY), (req, res) => {
  User.findOneAndRemove({
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
