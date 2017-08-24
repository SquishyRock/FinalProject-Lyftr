const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId

const workoutSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  author: {
    type: ObjectId,
    ref: 'User',
  },
  description: {
    type: String
  },
  public: {
    type: Boolean,
    required: true
  },
  exercises: [{
    exercise_id: {
      type: ObjectId,
      ref: "Exercise"
    },
    sets: Number,
    name: String,
    reps: Number,
    weight: Number
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

workoutSchema.pre('save', function(next, done) {
  this.modifiedAt = new Date()
  console.log('date updated')
  next();
})

const WorkoutModel = mongoose.model('Workout', workoutSchema);
module.exports = WorkoutModel;
