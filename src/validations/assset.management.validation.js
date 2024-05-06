const Joi = require('joi');

const getSection1a1to10ByScode = {
  params: Joi.object().keys({
    scode: Joi.string().required(),
  }),
};

module.exports = {
  getSection1a1to10ByScode,
};
