const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const collegeShema = new mongoose.Schema({
  name: { type: String, required: true },
  type_id: { type: Number,},
  city_id: { type: Number,},
  weblink: { type: String, default: "" },
  notes: { type: String, default: "" },
  city_name: { type: String, required: true },
  state_name: { type: String, required: true },
  state_id: { type: Number, required: true },
  country_id: { type: Number, required: true },
  country_name: { type: String, required: true },
  ranking: [
    {
      value: { type: String, default: "" },
      by: { type: String, default: "" },
    }
  ],
  approved_by: [{ type: String, default: "" }],
  affiliated_by: [{ type: String, default: "" }],
  accreditation: { type: String, default: "" },
  levels: [{ type: String, default: "" }],
  faculties: [{ type: String, default: "" }],
  specializations: [{ type: String, default: "" }],
  super_specializations: [{ type: String, default: "" }],
  types: [{ type: String, default: "" }],
  programs: [{ type: String, default: "" }],
  award_in: [{ type: String, default: "" }],
  type: { type: String, default: "" },
  read_count: { type: Number, default: 0 },
  link: { type: String, default: "" }
},
{
    timestamps: true,
  
});
collegeShema.index({ name: 'text', description: 'text' });

// add plugin that converts mongoose to json
collegeShema.plugin(toJSON);
collegeShema.plugin(paginate);

/**
 * @typedef College
 */
const College = mongoose.model('College', collegeShema);
module.exports = College;
