const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const lifeSkillVisitSchema = new mongoose.Schema(
  {
    skillTrainer: {
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
    status: {
      type: String,
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

lifeSkillVisitSchema.plugin(toJSON);
lifeSkillVisitSchema.plugin(paginate);

const LifeTainer = mongoose.model('LifeTainer', lifeSkillVisitSchema);
module.exports = LifeTainer;
