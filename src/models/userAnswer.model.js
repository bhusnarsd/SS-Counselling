const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const userAnswerSchema = new mongoose.Schema(
  {
    questionID: {
      type: String,
      required: true,
    },
    answer: {
      type: Boolean,
      default: false,
    },
    questionType: { 
        type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  testType: {
    type: String,
  },
},
  {
    timestamps: true,
  }
);

userAnswerSchema.plugin(toJSON);
userAnswerSchema.plugin(paginate);

const UserAnswer = mongoose.model('userAnswer', userAnswerSchema);

module.exports = UserAnswer;
