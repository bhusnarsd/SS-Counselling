/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const middayMeal = mongoose.Schema(
  {
    receipeName: {
      type: String,
    },
    day: {
      type: String,
    },
    time: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
// add plugin that converts mongoose to json
middayMeal.plugin(toJSON);
middayMeal.plugin(paginate);

/**
 * @typedef MiddayMeal
 */
const MiddayMeal = mongoose.model('MiddayMeal', middayMeal);
module.exports = MiddayMeal;
