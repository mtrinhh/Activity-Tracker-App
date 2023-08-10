const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  username: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: Date, required: true },
}, {
  timestamps: true,
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;