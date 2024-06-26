const Joi = require('joi');

// Define a schema for creating a Career
const createCareer = {
  body: Joi.object().keys({
    name: Joi.string().trim(),
    slug: Joi.string().trim(),
    ID: Joi.string().trim(),
    locale: Joi.string().trim(),
    careerName: Joi.string().trim(),
    clusterName: Joi.string().trim(),
    icon: Joi.string().trim().uri(),
  }),
};

// Define a schema for getting Careers (with pagination)
const getCareers = {
  query: Joi.object().keys({
    name: Joi.string().trim(),
    locale: Joi.string().trim(),
    careerName: Joi.string().trim(),
    clusterName: Joi.string().trim(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

// Define a schema for getting a Career by ID
const getCareerById = {
  params: Joi.object().keys({
    careerId: Joi.string().required(),
  }),
};

// Define a schema for updating a Career
const updateCareer = {
  params: Joi.object().keys({
    careerId: Joi.string().required(),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().trim(),
      ID: Joi.string().trim(),
      locale: Joi.string().trim(),
      careerName: Joi.string().trim(),
      clusterName: Joi.string().trim(),
      icon: Joi.string().trim().uri(),
    })
    .min(1), // Ensure that at least one field is provided for update
};

// Define a schema for deleting a Career
const deleteCareer = {
  params: Joi.object().keys({
    careerId: Joi.string().required(),
  }),
};

module.exports = {
  createCareer,
  getCareers,
  getCareerById,
  updateCareer,
  deleteCareer,
};
