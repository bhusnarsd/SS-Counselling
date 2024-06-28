const mongoose = require('mongoose');
const { paginate, toJSON } = require('./plugins');

const dateSchema = new mongoose.Schema({
  scholarship_detail_id: { type: Number,},
  from_date: { type: String,},
  to_date: { type: String, default: null },
  title: { type: String,},
  sms: { type: String, default: null },
  advance_sms: { type: String, default: null },
  email: { type: String, default: null },
  email_subject: { type: String, default: null },
  advance_email: { type: String, default: null },
  advance_email_subject: { type: String, default: null },
  is_automatic: { type: Boolean,},
}, { _id: false });

const detailSchema = new mongoose.Schema({
  id: { type: Number,},
  scholarship_id: { type: Number,},
  academic_year_id: { type: Number,},
  is_notification_released: { type: Boolean,},
  notification_release_date: { type: String,},
  last_date: { type: String,},
  general_information: { type: String,},
  awards: { type: String,},
  eligibility: { type: String,},
  application_fees: { type: String, default: null },
  application_procedure: { type: String,},
  selection_process: { type: String,},
  other_information: { type: String, default: null },
  academic_year: { type: String,},
  academic_year_is_latest: { type: Boolean,},
  academic_year_priority: { type: Number,},
  notification_type: [{ type: String,}],
  notification_status: { type: Number,},
  dates: [dateSchema]
}, { _id: false });

const careerSchema = new mongoose.Schema({
  id: { type: Number,},
  name: { type: String,},
  type_id: { type: Number,}
}, { _id: false });

const scholarshipSchema = new mongoose.Schema({
  scholarship_types: [{ type: String,}],
  detail: [detailSchema],
  id: { type: Number,},
  name: { type: String,},
  slug: { type: String,},
  scholarship_type_id: { type: Number, default: null },
  funding_type: { type: Number,},
  status: { type: Number,},
  funding: { type: String,},
  region_name: { type: String,},
  careers: [careerSchema],
  last_date: { type: String,},
  notification_type: [{ type: String,}],
  notification_status: { type: Number,},
  academic_year_priority: { type: Number,}
}, {
  timestamps: true,
});

// add plugin that converts mongoose to json
scholarshipSchema.plugin(toJSON);
scholarshipSchema.plugin(paginate);

// Creating and exporting the model
const Scholarship = mongoose.model('Scholarship', scholarshipSchema);
module.exports = Scholarship;
