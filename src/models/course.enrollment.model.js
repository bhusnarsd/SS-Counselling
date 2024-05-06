/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const courseEnrollement = mongoose.Schema(
  {
    courseName: {
      type: String,
    },
    courseObjectId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'TeacherTraining',
      required: true,
      trim: true,
    },
    teacherName: {
      type: String,
    },
    teacherId: {
        type: String,
    },
    scode: {
        type: String,
    },
    feedback: {
      type: String,
  },
    contactNo: {
        type: Number,
    },
    status: {
      type: String,
      enum: ['pending', 'approve', 'rejected'],
      default: 'pending',
    },
    schoolName: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
// add plugin that converts mongoose to json
courseEnrollement.plugin(toJSON);
courseEnrollement.plugin(paginate);

/**
 * @typedef CourseEnrollement
 */

const CourseEnrollement = mongoose.model('CourseEnrollement', courseEnrollement);
module.exports = CourseEnrollement;
