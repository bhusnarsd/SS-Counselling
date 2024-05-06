const httpStatus = require('http-status');
const { TeacherTraining } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a Course
 * @param {Object} course
 * @returns {Promise<TeacherTraining>}
 */
const createCourse = async (course) => {
  return TeacherTraining.create(course);
};

/**
 * Query for Course
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const getAllCourses = async (filter, options) => {
  const result = await TeacherTraining.paginate(filter, options);
  return result;
};

/**
 * Get Course by id
 * @param {ObjectId} id
 * @returns {Promise<TeacherTraining>}
 */
const getCourseById = async (id) => {
  return TeacherTraining.findById(id);
};

/**
 * Update Course by id
 * @param {ObjectId} courseId
 * @param {Object} updateBody
 * @returns {Promise<TeacherTraining>}
 */
const updateCourseById = async (courseId, updateBody) => {
  const course = await getCourseById(courseId);
  if (!course) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Course not found');
  }
  Object.assign(course, updateBody);
  await course.save();
  return course;
};

/**
 * Delete Course by id
 * @param {ObjectId} courseId
 * @returns {Promise<TeacherTraining>}
 */
const deleteCourseById = async (courseId) => {
  const course = await getCourseById(courseId);
  if (!course) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Course not found');
  }
  await course.remove();
  return course;
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourseById,
  deleteCourseById,
};
