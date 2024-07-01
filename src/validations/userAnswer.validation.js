const Joi = require('joi');
const { objectId } = require('./custom.validation');

// Validation schema for creating a new UserAnswer
const createUserAnswer = {
  body: Joi.object().keys({
    questionID: Joi.string().required(),
    answer: Joi.boolean().default(false),
    questionType: Joi.string().required(),
    userId: Joi.string().custom(objectId).required(),
    testType: Joi.string().required(),
  }),
};

// Validation schema for updating an existing UserAnswer
const updateUserAnswer = {
  params: Joi.object().keys({
    userAnswerId: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object().keys({
    questionID: Joi.string(),
    answer: Joi.boolean(),
    questionType: Joi.string(),
    userId: Joi.string().custom(objectId),
    testType: Joi.string(),
  }).min(1),
};

// Validation schema for getting all UserAnswers
const getUserAnswers = {
  query: Joi.object().keys({
    questionID: Joi.string(),
    answer: Joi.boolean(),
    questionType: Joi.string(),
    userId: Joi.string().custom(objectId),
    testType: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

// Validation schema for getting a specific UserAnswer by ID
const getUserAnswer = {
  params: Joi.object().keys({
    userAnswerId: Joi.string().custom(objectId).required(),
  }),
};

// Validation schema for deleting a UserAnswer by ID
const deleteUserAnswer = {
  params: Joi.object().keys({
    userAnswerId: Joi.string().custom(objectId).required(),
  }),
};

module.exports = {
  createUserAnswer,
  updateUserAnswer,
  getUserAnswers,
  getUserAnswer,
  deleteUserAnswer,
};
