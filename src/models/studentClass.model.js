/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');

const studentClassSchema = mongoose.Schema(
  {
        total_student:{
            type: String,
        },
        male: {
        type: String,
        },
        female:{
            type: String,
        },
        class: {
            type: String,
        },
        section:{
            type: String,
        },
        class_id: {
            type: String,
        },
        section_id:{
            type: String,
        },
        boys_girls_ratio: {
            type: String,
        },
      },
  {
    timestamps: true,
  }
);
// add plugin that converts mongoose to json
studentClassSchema.plugin(toJSON);
studentClassSchema.plugin(paginate);

/**
 * @typedef StudentClass
 */
const StudentClass = mongoose.model('StudentClass', studentClassSchema);
module.exports = StudentClass;
