const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const schoolSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: 'text',
  },
  contact_number: {
    type: String,
  },
  address: {
    type: String,
  },
  udisecode: {
    type: String,
    unique: true,
  },
  district: {
    type: String,
  },
  block: {
    type: String,
  },
});

// Add plugins
schoolSchema.plugin(toJSON);
schoolSchema.plugin(paginate);

const School = mongoose.model('School', schoolSchema);

module.exports = School;
