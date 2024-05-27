// const httpStatus = require('http-status');
const { Synopsis, Student, Visit } = require('../models');
// const ApiError = require('../utils/ApiError');

/**
 * Create a Synopsis
 * @param {Object} reqBody
 * @returns {Promise<Assessment>}
 */
const createSynopsis = async (reqBody) => {
  const synopsis = await Synopsis.create(reqBody);
  const { standard, schoolId } = reqBody;
  const totalStudents = await Student.countDocuments({ standard, schoolId });
  const totalSynopses = await Synopsis.countDocuments({ standard, schoolId });
  if (totalStudents === totalSynopses) {
    // If the number of synopses matches the number of students, update the visit status to 'completed'
    await Visit.findOneAndUpdate(
      { schoolId, standard, status: { $ne: 'completed' } },
      { status: 'completed' },
      { new: true }
    );
  } else {
    // If a visit is assigned to a trainer for the given school and standard, update the visit status to 'progress'
    await Visit.findOneAndUpdate(
      { schoolId, standard, status: { $ne: 'completed' } },
      { status: 'progress' },
      { new: true }
    );
  }

  return synopsis;
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
const querySynopsis = async (filter, options) => {
  const result = await Synopsis.paginate(filter, options);
  return result;
};

const getSynopsisById = async (studentId) => {
  return Synopsis.findOne({ studentId });
};
// /**
//  * Update user by id
//  * @param {ObjectId} id
//  * @param {Object} updateBody
//  * @returns {Promise<Sansthan>}
//  */
// const updateSynopsisById = async (id, updateBody) => {
//   const result = await getAssessmentById(id);
//   if (!result) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Assessment not found');
//   }
//   Object.assign(result, updateBody);
//   await result.save();
//   return result;
// };

module.exports = {
  createSynopsis,
  querySynopsis,
  getSynopsisById,
  //   updateAssessmentById,
};
