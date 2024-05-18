const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const visitSchema = new mongoose.Schema(
  {
    trainer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    schoolId: {
      type: String,
      // ref: 'School',
    },
    visitDate: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
    },
    standard: {
      type: String,
    },
    content: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

visitSchema.plugin(toJSON);
visitSchema.plugin(paginate);

const Visit = mongoose.model('Visit', visitSchema);
module.exports = Visit;
