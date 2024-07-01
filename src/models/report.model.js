const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const  reportSchema = new mongoose.Schema(
  {
    toatalMarks: [   
        { logicalMathematical: {
        type: Number,
      },
      musical: {
        type: Number,
      },
      naturalist: {
        type: Number,
      },
      verbalLinguistic: { type: Number},
      interpersonal: { 
          type: Number,
    },
    bodilyKinesthetic: {
      type: Number,
    },
    spatialVisual: {
      type: Number,
    },
    intrapersonal: {
      type: Number,
    }}],
    userID: {
        type: String,
        required: true,
    },
    

},
  {
    timestamps: true,
  }
);

reportSchema.plugin(toJSON);
reportSchema.plugin(paginate);

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
