const httpStatus = require('http-status');
const { Student } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a Teacher
 * @param {Object} reqBody
 * @returns {Promise<Teacher>}
 */
const createStudent = async (reqBody) => {
  return Student.create(reqBody);
};

/**
 * Query for sansthan
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryStudent = async (filter, options) => {
  const result = await Student.paginate(filter, options);
  return result;
};

const getStudentById = async (id) => {
  return Student.findById(id);
};
/**
 * Update user by id
 * @param {ObjectId} id
 * @param {Object} updateBody
 * @returns {Promise<Sansthan>}
 */
const updateStudentById = async (id, updateBody) => {
  const result = await getStudentById(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Teacher not found');
  }
  Object.assign(result, updateBody);
  await result.save();
  return result;
};

module.exports = {
  createStudent,
  queryStudent,
  getStudentById,
  updateStudentById,
};
