const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');

const studentShema = mongoose.Schema(
  {
    name: {
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
