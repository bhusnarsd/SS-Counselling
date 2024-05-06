const mongoose = require('mongoose');
const { toJSON, paginate } = require('../plugins');

const section1A30Schema = mongoose.Schema(
  {
    primaryclass: {
      type: String,
      trim: true,
    },
    upperprimary: {
      type: String,
      trim: true,
    },
    Secondary: {
      type: String,
      trim: true,
    },
    languageId: {
      type: String,
      trim: true,
    },
    cwsnschool: {
      type: String,
      trim: true,
    },
    cwsnschooltype: {
      type: String,
      trim: true,
    },
    shiftschool: {
      type: String,
      trim: true,
    },
    trainingcenterschool: {
      type: String,
      trim: true,
    },
    residentialschool: {
      type: String,
      trim: true,
    },
    residentialschooltype: {
      type: String,
      trim: true,
    },
    hosteltype: {
      type: String,
      trim: true,
    },
    kgbvclass6boys: {
      type: String,
      trim: true,
    },
    kgbvclass7boys: {
      type: String,
      trim: true,
    },
    kgbvclass8boys: {
      type: String,
      trim: true,
    },
    kgbvclass9boys: {
      type: String,
      trim: true,
    },
    kgbvclass10boys: {
      type: String,
      trim: true,
    },
    kgbvclass11boys: {
      type: String,
      trim: true,
    },
    kgbvclass12boys: {
      type: String,
      trim: true,
    },
    kgbvclass6girls: {
      type: String,
      trim: true,
    },
    kgbvclass7girls: {
      type: String,
      trim: true,
    },
    kgbvclass8girls: {
      type: String,
      trim: true,
    },
    kgbvclass9girls: {
      type: String,
      trim: true,
    },
    kgbvclass10girls: {
      type: String,
      trim: true,
    },
    kgbvclass11girls: {
      type: String,
      trim: true,
    },
    kgbvclass12girls: {
      type: String,
      trim: true,
    },
    schoolhosteltype: {
      type: String,
      trim: true,
    },
    hoprimary: {
      type: String,
      trim: true,
    },
    hoprimaryboys: {
      type: String,
      trim: true,
    },
    hoprimarygirls: {
      type: String,
      trim: true,
    },
    houpperprimary: {
      type: String,
    },
    houpperprimaryboys: {
      type: String,
    },
    houpperprimarygirls: {
      type: String,
    },
    hosecondary: {
      type: String,
    },
    hosecondaryboys: {
      type: String,
    },
    hosecondarygirls: {
      type: String,
    },
    hohighersecondary: {
      type: String,
    },
    hohighersecondaryboys: {
      type: String,
    },
    hohighersecondarygirls: {
      type: String,
    },
    minorityschool: {
      type: String,
    },
    minoritytype: {
      type: String,
    },
    mothertongue: {
      type: String,
    },
    medium1: {
      type: String,
    },
    medium2: {
      type: String,
    },
    medium3: {
      type: String,
    },
    medium4: {
      type: String,
    },
    othermedium: {
      type: String,
    },
    languagetaught1: {
      type: String,
    },
    classtaught1: {
      type: String,
    },
    langtatboys1: {
      type: String,
    },
    langtatgirls1: {
      type: String,
    },
    langtattrans1: {
      type: String,
    },
    languagetaught2: {
      type: String,
    },
    classtaught2: {
      type: String,
    },
    langtatboys2: {
      type: String,
    },
    langtatgirls2: {
      type: String,
    },
    langtattrans2: {
      type: String,
    },
    languagetaught3: {
      type: String,
    },
    classtaught3: {
      type: String,
    },
    langtatboys3: {
      type: String,
    },
    langtatgirls3: {
      type: String,
    },
    langtattrans3: {
      type: String,
    },
    languagetaught4: {
      type: String,
    },
    classtaught4: {
      type: String,
    },
    langtatboys4: {
      type: String,
    },
    langtatgirls4: {
      type: String,
    },
    langtattrans4: {
      type: String,
    },
    languagetaught5: {
      type: String,
    },
    classtaught5: {
      type: String,
    },
    langtatboys5: {
      type: String,
    },
    langtatgirls5: {
      type: String,
    },
    langtattrans5: {
      type: String,
    },
    prevocational: {
      type: String,
    },
    scode: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
section1A30Schema.plugin(toJSON);
section1A30Schema.plugin(paginate);

const Section1A30Schema = mongoose.model('section1A30Schema', section1A30Schema);

module.exports = Section1A30Schema;
