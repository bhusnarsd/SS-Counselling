const mongoose = require('mongoose');

const statisticsSchema = new mongoose.Schema({
  event: {
    type: String,
  },
  elementType: {
    type: String,
    // enum: ['careers', 'colleges', 'exams', 'scholarships'],
  },
  userId: {
    type: String,
  },
  schoolId: {
    type: String,
  },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Statistic', statisticsSchema);
