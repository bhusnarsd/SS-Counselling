const httpStatus = require('http-status');
const { Teacher } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a Teacher
 * @param {Object} reqBody
 * @returns {Promise<Teacher>}
 */
const createTeacher = async (reqBody) => {
  return Teacher.create(reqBody);
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
const queryTeacher = async (filter, options) => {
  const result = await Teacher.paginate(filter, options);
  return result;
};

const getTeacherById = async (id) => {
  return Teacher.findById(id);
};
/**
 * Update user by id
 * @param {ObjectId} id
 * @param {Object} updateBody
 * @returns {Promise<Sansthan>}
 */
const updateTeacherById = async (id, updateBody) => {
  const result = await getTeacherById(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Teacher not found');
  }
  Object.assign(result, updateBody);
  await result.save();
  return result;
};

module.exports = {
  createTeacher,
  updateTeacherById,
  getTeacherById,
  queryTeacher,
};
