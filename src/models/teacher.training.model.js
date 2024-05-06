/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const teacherTraining = mongoose.Schema(
  {
    courseName: {
      type: String,
    },
    courseCode: {
      type: String,
    },
    courseDetails: {
      type: String,
    },
    startDate: {
      type: Date,
    },
    courseTimeLength: {
      type: String,
    },
    professorName: {
      type: String,
    },
    contactNo: {
      type: Number,
    },
    path: {
      type: String,
    },
    image: {
      type: String,
    },
    enrollment: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
// add plugin that converts mongoose to json
teacherTraining.plugin(toJSON);
teacherTraining.plugin(paginate);

/**
 * @typedef TeacherTraining
 */
const TeacherTraining = mongoose.model('TeacherTraining', teacherTraining);
module.exports = TeacherTraining;
