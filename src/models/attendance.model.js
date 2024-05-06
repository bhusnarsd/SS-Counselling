const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const attendanceSchema = mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  resultlist: [
    {
      _id: {
        type: false,
      },
      classSection: {
        type: String,
      },
      totalPresent: {
        type: Number,
      },
      totalAbsent: {
        type: Number,
      },
      presentPercent: {
        type: String,
      },
      absentPercent: {
        type: String,
      },
    },
  ],
  allStudent: {
    type: Number,
  },
  allPresent: {
    type: Number,
  },
  allAbsent: {
    type: Number,
  },
  allPresentPercent: {
    type: String,
  },
  allAbsentPercent: {
    type: String,
  },
  block: {
    type: String,
    default: '',
  },
  district: {
    type: String,
    default: '',
  },
  division: {
    type: String,
    default: '',
  },
  schoolname: {
    type: String,
    default: '',
  },
  scode: {
    type: String,
    required: true,
  },
});

// Add plugins
attendanceSchema.plugin(toJSON);
attendanceSchema.plugin(paginate);

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
