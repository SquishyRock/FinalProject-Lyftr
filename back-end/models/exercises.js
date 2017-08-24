const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId

const exerciseSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  equipment: {
    type: Number,
    required: true,
    min: 0,
    max: 3
  },
  muscle_group: [{
    type: Number,
    required: true,
    min: 0,
    max: 12
  }],
  external_link: {
    type: String,
    required: true
  },
  alternative_exercises: [{
    type: ObjectId,
    ref: "Exercise"
  }],
  createdAt: {
    type: Date,
    default: new Date()
  },
  modifiedAt: {
    type: Date,
    default: new Date()
  }
})

exerciseSchema.pre('save', function(next, done) {
  this.modifiedAt = new Date()
  console.log('date updated')
  next();
})

const ExerciseModel = mongoose.model('Exercise', exerciseSchema);
module.exports = ExerciseModel;
