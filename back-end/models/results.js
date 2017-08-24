const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId

const resultsSchema = new Schema({
  workout_template: {
    type: ObjectId,
    ref: 'Workout',
    required: true
  },
  author: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  description: {
    type: String
  },
  tags: [{
    type: String
  }],
  exercises: [{
    exercise_id: {
      type: ObjectId,
      ref: "Exercise"
    },
    name: String,
    sets: Number,
    reps: Number,
    weight: Number
  }],
  createdAt: {
    type: Date,
    default: new Date()
  }
})

const ResultsModel = mongoose.model('Results', resultsSchema);
module.exports = ResultsModel;
