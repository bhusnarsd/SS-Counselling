const httpStatus = require('http-status');
const { Assessment, Student } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a Assessment
 * @param {Object} reqBody
 * @returns {Promise<Assessment>}
 */
const createAssessment = async (reqBody) => {
  // Try to find an assessment for the given studentId
  let assessment = await Assessment.findOne({ studentId: reqBody.studentId });
  const school = await Student.findOne({ studentId: reqBody.studentId }).select('schoolId');
  // If assessment found, update it with the new data
  reqBody.SchoolId = school.SchoolId;
  if (assessment) {
    assessment = await Assessment.findOneAndUpdate(
      { studentId: reqBody.studentId },
      reqBody,
      { new: true } // Return the updated document
    );
  } else {
    // If assessment not found, create a new one
    assessment = await Assessment.create(reqBody);
  }

  return assessment;
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
const queryAssessment = async (filter, options) => {
  const result = await Assessment.paginate(filter, options);
  return result;
};

const getAssessmentById = async (id) => {
  return Assessment.findById(id);
};
/**
 * Update user by id
 * @param {ObjectId} id
 * @param {Object} updateBody
 * @returns {Promise<Sansthan>}
 */
const updateAssessmentById = async (id, updateBody) => {
  const result = await getAssessmentById(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Assessment not found');
  }
  Object.assign(result, updateBody);
  await result.save();
  return result;
};

module.exports = {
  createAssessment,
  queryAssessment,
  getAssessmentById,
  updateAssessmentById,
};
