const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');

const careerShema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    slug:{
        type: String,
        trim: true,
    },
    ID: {
      type: String,
      unique: true,
    },
    locale: {
      type: String,
    },
    careerName: {
      type: String,
    },
    clusterName: {
      type: String,
    },
    icon: {
        type: String,
      },
  },
  {
    timestamps: true,
  }
);
// add plugin that converts mongoose to json
careerShema.plugin(toJSON);
careerShema.plugin(paginate);

/**
 * @typedef Career
 */
const Career = mongoose.model('Career', careerShema);
module.exports = Career;
