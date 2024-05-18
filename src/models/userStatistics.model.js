const mongoose = require('mongoose');

const statisticsSchema = new mongoose.Schema({
  event: {
    String,
  },
  elementType: {
    String,
    enum: ['careers', 'colleges', 'exams', 'scholarships'],
  },
  userId: {
    String,
  },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Statistic', statisticsSchema);
