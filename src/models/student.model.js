const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');

const studentShema = mongoose.Schema(
  {
    firtstName: {
      type: String,
      trim: true,
    },
    studentId: {
      type: String,
      index: true,
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
    class: {
      type: String,
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
