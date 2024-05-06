const httpStatus = require('http-status');
const Section1C57Schema = require('../../models/masterModels/section1C(1.55.1 to 1.57.8).model');
const ApiError = require('../../utils/ApiError');

/**
 * Get Section1C57Schema by id
 * @param {ObjectId} id
 * @returns {Promise<Section1C57Schema>}
 */
const getSection1C57ById = async (scode) => {
  return Section1C57Schema.findOne({ scode });
};
/**
 * Create a Section1C57Schema
 * @param {Object} Section1C57SchemaBody
 * @returns {Promise<Section1C57Schema>}
 */
const createSection1C57 = async (scode, reqBody) => {
  let result = await getSection1C57ById(scode);
  if (!result) {
    // Create a new instance of Section1A10Schema if not found
    result = new Section1C57Schema(reqBody);
  } else {
    // Update existing instance with new data
    Object.assign(result, reqBody);
  }
  // Save the instance
  await result.save();
  return result;
};
/**
 * Query for Section1C57
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const getAllSection1C57 = async (filter, options) => {
  const Section1C57 = await Section1C57Schema.paginate(filter, options);
  return Section1C57;
};

/**
 * Update Section1C57Schema by id
 * @param {ObjectId} Section1C57Id
 * @param {Object} updateBody
 * @returns {Promise<Section1C57Schema>}
 */
const updateSection1C57ById = async (scode, updateBody) => {
  const typeSection1C57 = await getSection1C57ById(scode);
  if (!typeSection1C57) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Section1C57 not found');
  }
  Object.assign(typeSection1C57, updateBody);
  await typeSection1C57.save();
  return typeSection1C57;
};

/**
 * Delete Section1C57Schema by id
 * @param {ObjectId} Section1C57Id
 * @returns {Promise<Section1C57Schema>}
 */
const deleteSection1C57ById = async (scode) => {
  const Section1C57 = await getSection1C57ById(scode);
  if (!Section1C57) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Section1C57 not found');
  }
  await Section1C57.remove();
  return Section1C57;
};

module.exports = {
  createSection1C57,
  getAllSection1C57,
  getSection1C57ById,
  updateSection1C57ById,
  deleteSection1C57ById,
};
