// const mongoose = require('mongoose');
// const { toJSON, paginate } = require('./plugins');

// const reportSchema = mongoose.Schema(
//   {
//     long: {
//       type: String,
//       required: true,
//     },
//     short: {
//       type: String,
//       required: true,
//     },
//     preview: {
//       type: String,
//       required: true,
//     },
//   },
//   { _id: false }
// );

// const assessmentSchema = mongoose.Schema(
//   {
//     score: {
//       type: Map,
//       of: Number,
//       required: true,
//     },
//     status: {
//       type: String,
//       enum: ['not-started', 'started', 'completed'],
//       required: true,
//     },
//     isReportGenerated: {
//       type: Boolean,
//       required: true,
//     },
//     reports: {
//       type: reportSchema,
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// // Add plugins
// assessmentSchema.plugin(toJSON);
// assessmentSchema.plugin(paginate);

// const Assessment = mongoose.model('Assessment', assessmentSchema);

// module.exports = Assessment;
