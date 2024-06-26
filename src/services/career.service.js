const httpStatus = require('http-status');
const { Career } = require('../models');
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
      modifiedCareersArray.Careers.map(async (career) => {
        const schoolFound = await Career.findOne({ ID: career.ID});
        if (schoolFound) {
          dups.push(career);
        } else {
          let record = new Career(career);
          record = await record.save();
          if (record) {
            records.push(career);
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
  bulkUpload,
  createCareer,
  queryCareer,
  getCareerById,
  updateCareerById,
  deleteCareerById,
};
