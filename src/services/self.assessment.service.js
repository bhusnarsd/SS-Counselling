const httpStatus = require('http-status');
const { SelfAssessment } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a SelfAssessment
 * @param {Object} selfAssessment
 * @returns {Promise<SelfAssessment>}
 */
const createSelfAssessment = async (selfAssessment) => {
  return SelfAssessment.create(selfAssessment);
};

/**
 * Query for SelfAssessment
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const getAllSelfAssessments = async (filter, options) => {
  const result = await SelfAssessment.paginate(filter, options);
  return result;
};

/**
 * Get SelfAssessment by id
 * @param {ObjectId} id
 * @returns {Promise<SelfAssessment>}
 */
const getSelfAssessmentById = async (id) => {
  return SelfAssessment.findById(id);
};

/**
 * Update SelfAssessment by id
 * @param {ObjectId} selfAssessmentId
 * @param {Object} updateBody
 * @returns {Promise<SelfAssessment>}
 */
const updateSelfAssessmentById = async (selfAssessmentId, updateBody) => {
  const meal = await getSelfAssessmentById(selfAssessmentId);
  if (!meal) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Course SelfAssessment not found');
  }
  Object.assign(meal, updateBody);
  await meal.save();
  return meal;
};

/**
 * Delete SelfAssessment by id
 * @param {ObjectId} selfAssessmentId
 * @returns {Promise<SelfAssessment>}
 */
const deleteSelfAssessmentById = async (selfAssessmentId) => {
  const meal = await getSelfAssessmentById(selfAssessmentId);
  if (!meal) {
    throw new ApiError(httpStatus.NOT_FOUND, 'SelfAssessment not found');
  }
  await meal.remove();
  return meal;
};

module.exports = {
  createSelfAssessment,
  getAllSelfAssessments,
  getSelfAssessmentById,
  updateSelfAssessmentById,
  deleteSelfAssessmentById,
};
