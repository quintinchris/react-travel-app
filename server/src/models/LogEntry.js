/* eslint-disable linebreak-style */
const mongoose = require('mongoose');

const { Schema } = mongoose;

const LogSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  description: String,
  comments: String,
  image: String,
  rating: {
    type: Number,
    min: 0,
    max: 10,
    default: 0,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  visitDate: {
    type: Date,
    required: true,
  },
}, {
  timestamps: true,
  runValidators: true,
});

module.exports = mongoose.model('LogEntry', LogSchema);
