const httpStatus = require('http-status');
const { UserAnswer } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a UserAnswer
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUserAnswer = async (reqBody) => {
  return UserAnswer.create(reqBody);
};

/**
 * Query for UserAnswer information
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUserAnswer = async (filter, options) => {
  const userAnswers = await UserAnswer.paginate(filter, options);
  return userAnswers;
};

/**
 * Get UserAnswer by id
 * @param {ObjectId} id
 * @returns {Promise<UserAnswer>}
 */
const getUserAnswerById = async (id) => {
  return UserAnswer.findById(id);
};


/**
 * Update UserAnswer by id
 * @param {ObjectId} UserAnswerId
 * @param {Object} updateBody
 * @returns {Promise<UserAnswer>}
 */
const updateUserAnswerById = async (UserAnswerId, updateBody) => {
  const userAnswer = await getUserAnswerById(UserAnswerId);
  if (!userAnswer) {
    throw new ApiError(httpStatus.NOT_FOUND, 'UserAnswer not found');
  }
  Object.assign(userAnswer, updateBody);
  await userAnswer.save();
  return userAnswer;
};

/**
 * Delete user by id
 * @param {ObjectId} UserAnswerId
 * @returns {Promise<UserAnswer>}
 */
const deleteUserAnswerById = async (UserAnswerId) => {
  const userAnswer = await getUserAnswerById(UserAnswerId);
  if (!userAnswer) {
    throw new ApiError(httpStatus.NOT_FOUND, 'UserAnswer not found');
  }
  await userAnswer.remove();
  return userAnswer;
};

module.exports = {
  createUserAnswer,
  queryUserAnswer,
  getUserAnswerById,
  updateUserAnswerById,
  deleteUserAnswerById,
};
