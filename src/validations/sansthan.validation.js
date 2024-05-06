const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createSansthan = {
  body: Joi.object().keys({
    registrationDist: Joi.string(),
    state: Joi.string(),
    mobNumber: Joi.number(),
    sansthanName: Joi.string(),
    userName: Joi.string(),
    password: Joi.string(),
    applyedFrom: Joi.string(),
    udiseNumbers: Joi.array().items(Joi.string()),
  }),
};

const getAllSansthan = {
  query: Joi.object().keys({
    name: Joi.string(),
    email: Joi.string(),
    sansthanName: Joi.string(),
    address: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number(),
    page: Joi.number(),
  }),
};

const getSansthan = {
  params: Joi.object().keys({
    sansthanId: Joi.string().custom(objectId),
  }),
};

const updateSansthan = {
  params: Joi.object().keys({
    sansthanId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      registrationDist: Joi.string(),
      state: Joi.string(),
      mobNumber: Joi.number(),
      sansthanName: Joi.string(),
      address: Joi.string(),
      udiseNumbers: Joi.array().items(Joi.string()),
    })
    .min(1),
};

const verifySansthan = {
  params: Joi.object().keys({
    sansthanId: Joi.required().custom(objectId),
  }),
};

module.exports = {
  getAllSansthan,
  getSansthan,
  updateSansthan,
  createSansthan,
  verifySansthan,
};
