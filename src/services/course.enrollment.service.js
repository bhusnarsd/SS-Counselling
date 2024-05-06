const httpStatus = require('http-status');
const { CourseEnrollement } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a Enrollement
 * @param {Object} enrollment
 * @returns {Promise<CourseEnrollement>}
 */
const createEnrollement = async (enrollment) => {
  return CourseEnrollement.create(enrollment);
};

/**
 * Query for Enrollement
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const getAllEnrollements = async (filter, options) => {
  const result = await CourseEnrollement.paginate(filter, options);
  return result;
};

/**
 * Get Enrollement by id
 * @param {ObjectId} id
 * @returns {Promise<CourseEnrollement>}
 */
const getEnrollementById = async (id) => {
  return CourseEnrollement.findById(id);
};

/**
 * Update Enrollement by id
 * @param {ObjectId} enrollmentId
 * @param {Object} updateBody
 * @returns {Promise<CourseEnrollement>}
 */
const updateEnrollementById = async (enrollmentId, updateBody) => {
  const meal = await getEnrollementById(enrollmentId);
  if (!meal) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Course Enrollement not found');
  }
  Object.assign(meal, updateBody);
  await meal.save();
  return meal;
};

/**
 * Delete Enrollement by id
 * @param {ObjectId} enrollmentId
 * @returns {Promise<CourseEnrollement>}
 */
const deleteEnrollementById = async (enrollmentId) => {
  const meal = await getEnrollementById(enrollmentId);
  if (!meal) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Enrollement not found');
  }
  await meal.remove();
  return meal;
};

module.exports = {
  createEnrollement,
  getAllEnrollements,
  getEnrollementById,
  updateEnrollementById,
  deleteEnrollementById,
};
