const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    questionID: {
      type: String,
      required: true,
      // ref: 'User',
    },
    answer: {
      type: Boolean,
      default: false,
    },
    options: [{ type: String}],
    questionType: { 
        type: String,
  },
},
  {
    timestamps: true,
  }
);

questionSchema.plugin(toJSON);
questionSchema.plugin(paginate);

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
