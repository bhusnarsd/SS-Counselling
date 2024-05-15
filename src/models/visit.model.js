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
      required: true,
    },
    visitDate: {
      type: Date,
      required: true,
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
