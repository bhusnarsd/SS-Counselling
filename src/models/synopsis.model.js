const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const synopsisShema = mongoose.Schema(
  {
    schoolId: {
      type: String,
    },
    studentId: {
      type: String,
    },
    trianerId: {
      type: String,
    },
    synopsis: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
// add plugin that converts mongoose to json
synopsisShema.plugin(toJSON);
synopsisShema.plugin(paginate);

/**
 * @typedef Synopsis
 */
const Synopsis = mongoose.model('Synopsis', synopsisShema);
module.exports = Synopsis;
