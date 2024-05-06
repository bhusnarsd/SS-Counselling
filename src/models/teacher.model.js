const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');

const teacherShema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    caste: {
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
      required: true,
    },
    email: {
      type: String,
      unique: true,
    },
    address: {
      type: String,
    },
    pinCode: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);
// add plugin that converts mongoose to json
teacherShema.plugin(toJSON);
teacherShema.plugin(paginate);

/**
 * @typedef Teacher
 */
const Teacher = mongoose.model('Teacher', teacherShema);
module.exports = Teacher;
