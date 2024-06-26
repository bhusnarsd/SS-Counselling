const httpStatus = require('http-status');
const { Career } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a career
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createCareer = async (reqBody) => {
  return Career.create(reqBody);
};

/**
 * Query for career information
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryCareer = async (filter, options) => {
  const careers = await Career.paginate(filter, options);
  return careers;
};

/**
 * Get career by id
 * @param {ObjectId} id
 * @returns {Promise<Career>}
 */
const getCareerById = async (id) => {
  return Career.findById(id);
};


/**
 * Update career by id
 * @param {ObjectId} careerId
 * @param {Object} updateBody
 * @returns {Promise<Career>}
 */
const updateCareerById = async (careerId, updateBody) => {
  const career = await getCareerById(careerId);
  if (!career) {
    throw new ApiError(httpStatus.NOT_FOUND, 'career not found');
  }
  Object.assign(career, updateBody);
  await career.save();
  return career;
};

/**
 * Delete user by id
 * @param {ObjectId} careerId
 * @returns {Promise<Career>}
 */
const deleteCareerById = async (careerId) => {
  const career = await getCareerById(careerId);
  if (!career) {
    throw new ApiError(httpStatus.NOT_FOUND, 'career not found');
  }
  await career.remove();
  return career;
};

module.exports = {
  createCareer,
  queryCareer,
  getCareerById,
  updateCareerById,
  deleteCareerById,
};
