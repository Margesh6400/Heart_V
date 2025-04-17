const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  userId: { 
    type: String, 
    required: true,
    unique: true
  },
  gender: { type: String },
  age: { type: Number },
  familyHistory: { type: String },
  bloodPressure: { type: String },
  diabetes: { type: String },
  physicalActivity: { type: String },
  stress: { type: String },
  smoking: { type: String },
  alcohol: { type: String },
  sleep: { type: String },
  screenTime: { type: String },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update timestamp on save
profileSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;