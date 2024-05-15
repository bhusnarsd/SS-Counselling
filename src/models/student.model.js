const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');

const studentShema = mongoose.Schema(
  {
    schoolId: {
      type: String,
    },
    firstName: {
      type: String,
      trim: true,
    },
    studentId: {
      type: String,
    },
    lastName: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
    },
    age: {
      type: Number,
    },
    mobNumber: {
      type: Number,
    },
    udiseCode: {
      type: String,
    },
    standard: {
      type: String,
    },
    tenantId: {
      type: Number,
      default: 58,
    },
    packageId: {
      type: Number,
      default: 54,
    },
  },
  {
    timestamps: true,
  }
);
// add plugin that converts mongoose to json
studentShema.plugin(toJSON);
studentShema.plugin(paginate);

/**
 * @typedef Student
 */
const Student = mongoose.model('Student', studentShema);
module.exports = Student;
