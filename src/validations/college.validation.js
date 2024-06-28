const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createCollege = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    type_id: Joi.number().optional(),
    city_id: Joi.number().optional(),
    weblink: Joi.string().uri().optional().allow(''),
    notes: Joi.string().optional().allow(''),
    city_name: Joi.string().required(),
    state_name: Joi.string().required(),
    state_id: Joi.number().required(),
    country_id: Joi.number().required(),
    country_name: Joi.string().required(),
    ranking: Joi.array().items(Joi.object({
      value: Joi.string().allow(''),
      by: Joi.string().allow(''),
    })),
    approved_by: Joi.array().items(Joi.string().allow('')),
    affiliated_by: Joi.array().items(Joi.string().allow('')),
    accreditation: Joi.string().optional().allow(''),
    levels: Joi.array().items(Joi.string().allow('')),
    faculties: Joi.array().items(Joi.string().allow('')),
    specializations: Joi.array().items(Joi.string().allow('')),
    super_specializations: Joi.array().items(Joi.string().allow('')),
    types: Joi.array().items(Joi.string().allow('')),
    programs: Joi.array().items(Joi.string().allow('')),
    award_in: Joi.array().items(Joi.string().allow('')),
    type: Joi.string().optional().allow(''),
    read_count: Joi.number().optional(),
    link: Joi.string().optional().allow(''),
  }),
};

const getColleges = {
  query: Joi.object().keys({
    name: Joi.string().optional(),
    type: Joi.string().optional(),
    city_name: Joi.string().optional(),
    state_name: Joi.string().optional(),
    search: Joi.string().optional(),
    country_name: Joi.string().optional(),
    sortBy: Joi.string().optional(),
    limit: Joi.number().integer().optional(),
    page: Joi.number().integer().optional(),
  }),
};

const getCollege = {
  params: Joi.object().keys({
    collegeId: Joi.string().custom(objectId),
  }),
};

const updateCollege = {
  params: Joi.object().keys({
    collegeId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    name: Joi.string().optional(),
    type_id: Joi.number().optional(),
    city_id: Joi.number().optional(),
    weblink: Joi.string().uri().optional().allow(''),
    notes: Joi.string().optional().allow(''),
    city_name: Joi.string().optional(),
    state_name: Joi.string().optional(),
    state_id: Joi.number().optional(),
    country_id: Joi.number().optional(),
    country_name: Joi.string().optional(),
    ranking: Joi.array().items(Joi.object({
      value: Joi.string().allow(''),
      by: Joi.string().allow(''),
    })),
    approved_by: Joi.array().items(Joi.string().allow('')),
    affiliated_by: Joi.array().items(Joi.string().allow('')),
    accreditation: Joi.string().optional().allow(''),
    levels: Joi.array().items(Joi.string().allow('')),
    faculties: Joi.array().items(Joi.string().allow('')),
    specializations: Joi.array().items(Joi.string().allow('')),
    super_specializations: Joi.array().items(Joi.string().allow('')),
    types: Joi.array().items(Joi.string().allow('')),
    programs: Joi.array().items(Joi.string().allow('')),
    award_in: Joi.array().items(Joi.string().allow('')),
    type: Joi.string().optional().allow(''),
    read_count: Joi.number().optional(),
    link: Joi.string().optional().allow(''),
  }).min(1),  // At least one field must be provided
};

const deleteCollege = {
  params: Joi.object().keys({
    collegeId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createCollege,
  getColleges,
  getCollege,
  updateCollege,
  deleteCollege,
};
