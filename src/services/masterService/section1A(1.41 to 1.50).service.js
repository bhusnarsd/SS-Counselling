const httpStatus = require('http-status');
const Section1A50Schema = require('../../models/masterModels/section1A(1.41 to 1.50).model');
const ApiError = require('../../utils/ApiError');

/**
 * Get Section1A50Schema by id
 * @param {ObjectId} id
 * @returns {Promise<Section1A50Schema>}
 */
const getSection1A50ById = async (scode) => {
  return Section1A50Schema.findOne({ scode });
};

/**
 * Create a Section1A50Schema
 * @param {Object} Section1A50SchemaBody
 * @returns {Promise<Section1A50Schema>}
 */
const createSection1A50 = async (scode, reqBody) => {
  let result = await getSection1A50ById(scode);
  if (!result) {
    // Create a new instance of Section1A10Schema if not found
    result = new Section1A50Schema(reqBody);
  } else {
    // Update existing instance with new data
    Object.assign(result, reqBody);
  }
  // Save the instance
  await result.save();
  return result;
};
/**
 * Query for Section1A50
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const getAllSection1A50 = async (filter, options) => {
  const Section1A50 = await Section1A50Schema.paginate(filter, options);
  return Section1A50;
};

/**
 * Update Section1A50Schema by id
 * @param {ObjectId} Section1A50Id
 * @param {Object} updateBody
 * @returns {Promise<Section1A50Schema>}
 */
const updateSection1A50ById = async (scode, updateBody) => {
  const typeSection1A50 = await getSection1A50ById(scode);
  if (!typeSection1A50) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Section1A50 not found');
  }
  Object.assign(typeSection1A50, updateBody);
  await typeSection1A50.save();
  return typeSection1A50;
};

/**
 * Delete Section1A50Schema by id
 * @param {ObjectId} Section1A50Id
 * @returns {Promise<Section1A50Schema>}
 */
const deleteSection1A50ById = async (scode) => {
  const Section1A50 = await getSection1A50ById(scode);
  if (!Section1A50) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Section1A50 not found');
  }
  await Section1A50.remove();
  return Section1A50;
};

module.exports = {
  createSection1A50,
  getAllSection1A50,
  getSection1A50ById,
  updateSection1A50ById,
  deleteSection1A50ById,
};
