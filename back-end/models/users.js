const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  preferences: {
    type: String
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  modifiedAt: {
    type: Date,
    default: new Date()
  }
})

userSchema.pre('save', function(next, done) {
  this.modifiedAt = new Date()
  console.log('date updated')
  next();
})

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
