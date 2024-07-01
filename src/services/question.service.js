const httpStatus = require('http-status');
const { Question } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a Question
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createQuestion = async (reqBody) => {
  return Question.create(reqBody);
};

/**
 * Query for Question information
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryQuestion = async (filter, options) => {
  const questions = await Question.paginate(filter, options);
  return questions;
};

/**
 * Get Question by id
 * @param {ObjectId} id
 * @returns {Promise<Question>}
 */
const getQuestionById = async (id) => {
  return Question.findById(id);
};


/**
 * Update Question by id
 * @param {ObjectId} QuestionId
 * @param {Object} updateBody
 * @returns {Promise<Question>}
 */
const updateQuestionById = async (QuestionId, updateBody) => {
  const question = await getQuestionById(QuestionId);
  if (!question) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Question not found');
  }
  Object.assign(question, updateBody);
  await question.save();
  return question;
};

/**
 * Delete user by id
 * @param {ObjectId} questionId
 * @returns {Promise<Question>}
 */
const deleteQuestionById = async (questionId) => {
  const question = await getQuestionById(questionId);
  if (!question) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Question not found');
  }
  await question.remove();
  return question;
};

module.exports = {
  createQuestion,
  queryQuestion,
  getQuestionById,
  updateQuestionById,
  deleteQuestionById,
};
