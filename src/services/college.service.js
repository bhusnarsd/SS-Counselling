const httpStatus = require('http-status');
const { College } = require('../models');
const ApiError = require('../utils/ApiError');

const bulkUpload = async (careerArray, csvFilePath = null) => {
    let modifiedCareersArray = careerArray;
    if (csvFilePath) {
      modifiedCareersArray = { Careers: csvFilePath };
    }
    if (!modifiedCareersArray.Careers || !modifiedCareersArray.Careers.length)
      return { error: true, message: 'missing array' };
  
    const records = [];
    const dups = [];
  
    await Promise.all(
      modifiedCareersArray.Careers.map(async (college) => {
        const schoolFound = await College.findOne({ ID: college.type_id});
        if (schoolFound) {
          dups.push(college);
        } else {
          let record = new College(college);
          record = await record.save();
          if (record) {
            records.push(college);
          }
        }
      })
    );
  
    const duplicates = {
      totalDuplicates: dups.length ? dups.length : 0,
      data: dups.length ? dups : [],
    };
    const nonduplicates = {
      totalNonDuplicates: records.length ? records.length : 0,
      data: records.length ? records : [],
    };
    return { nonduplicates, duplicates };
  };
/**
 * Create a College
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createCollege = async (reqBody) => {
  return College.create(reqBody);
};

/**
 * Query for College information
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryCollege = async (filter, options) => {
  const college = await College.paginate(filter, options);
  return college;
};

/**
 * Get College by id
 * @param {ObjectId} id
 * @returns {Promise<College>}
 */
const getCollegeById = async (id) => {
  return College.findById(id);
};


/**
 * Update College by id
 * @param {ObjectId} CollegeId
 * @param {Object} updateBody
 * @returns {Promise<College>}
 */
const updateCollegeById = async (CollegeId, updateBody) => {
  const college = await getCollegeById(CollegeId);
  if (!college) {
    throw new ApiError(httpStatus.NOT_FOUND, 'College not found');
  }
  Object.assign(College, updateBody);
  await college.save();
  return college;
};

/**
 * Delete user by id
 * @param {ObjectId} CollegeId
 * @returns {Promise<College>}
 */
const deleteCollegeById = async (CollegeId) => {
  const college = await getCollegeById(CollegeId);
  if (!college) {
    throw new ApiError(httpStatus.NOT_FOUND, 'College not found');
  }
  await college.remove();
  return college;
};

module.exports = {
  bulkUpload,
  createCollege,
  queryCollege,
  getCollegeById,
  updateCollegeById,
  deleteCollegeById,
};
