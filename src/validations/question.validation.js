const Joi = require('joi');

// Define a schema for creating a Question
const createQuestion = {
  body: Joi.object().keys({
    question: Joi.string(),
    questionID: Joi.string(),
    answer: Joi.string(),
    options: Joi.string(),
    questionType: Joi.string(),
  }),
};

// Define a schema for getting Questions (with pagination)
const getQuestions = {
  query: Joi.object().keys({
    question: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

// Define a schema for getting a Question by ID
const getQuestionById = {
  params: Joi.object().keys({
    QuestionId: Joi.string().required(),
  }),
};

// Define a schema for updating a Question
const updateQuestion = {
  params: Joi.object().keys({
    QuestionId: Joi.string().required(),
  }),
  body: Joi.object()
    .keys({
        question: Joi.string(),
        questionID: Joi.string(),
        answer: Joi.string(),
        options: Joi.string(),
        questionType: Joi.string(),
    })
    .min(1), // Ensure that at least one field is provided for update
};

// Define a schema for deleting a Question
const deleteQuestion = {
  params: Joi.object().keys({
    QuestionId: Joi.string().required(),
  }),
};

module.exports = {
  createQuestion,
  getQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
};
