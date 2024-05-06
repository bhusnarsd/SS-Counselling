/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const selfAssessmentSchema = mongoose.Schema(
  {
    scode: {
      type: String,
    },
    trainingName: {
      type: String,
    },
    trainingId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'CourseEnrollement',
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
    },
    block: {
      type: String,
    },
    district: {
      type: String,
    },
    division: {
      type: String,
    },
    status: {
      type: String,
      enum: ['pending', 'approve', 'rejected'],
      default: 'pending',
    },
    teacherId: {
      type: String,
    },
    teacherName: {
      type: String,
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
selfAssessmentSchema.plugin(toJSON);
selfAssessmentSchema.plugin(paginate);

/**
 * @typedef SelfAssessment
 */
const SelfAssessment = mongoose.model('SelfAssessment', selfAssessmentSchema);
module.exports = SelfAssessment;
