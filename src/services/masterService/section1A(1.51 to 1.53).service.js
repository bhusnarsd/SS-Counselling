const httpStatus = require('http-status');
const Section1A53Schema = require('../../models/masterModels/section1A(1.51 to 1.53).model');
const ApiError = require('../../utils/ApiError');

/**
 * Get Section1A53Schema by id
 * @param {ObjectId} id
 * @returns {Promise<Section1A53Schema>}
 */
const getSection1A53ById = async (scode) => {
  return Section1A53Schema.findOne({ scode });
};
/**
 * Create a Section1A53Schema
 * @param {Object} Section1A53SchemaBody
 * @returns {Promise<Section1A53Schema>}
 */

const createSection1A53 = async (scode, reqBody) => {
  let result = await getSection1A53ById(scode);
  if (!result) {
    // Create a new instance of Section1A10Schema if not found
    result = new Section1A53Schema(reqBody);
  } else {
    // Update existing instance with new data
    Object.assign(result, reqBody);
  }
  // Save the instance
  await result.save();
  return result;
};
/**
 * Query for Section1A53
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const getAllSection1A53 = async (filter, options) => {
  const Section1A53 = await Section1A53Schema.paginate(filter, options);
  return Section1A53;
};

/**
 * Update Section1A53Schema by id
 * @param {ObjectId} Section1A53Id
 * @param {Object} updateBody
 * @returns {Promise<Section1A53Schema>}
 */
const updateSection1A53ById = async (scode, updateBody) => {
  const typeSection1A53 = await getSection1A53ById(scode);
  if (!typeSection1A53) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Section1A53 not found');
  }
  Object.assign(typeSection1A53, updateBody);
  await typeSection1A53.save();
  return typeSection1A53;
};

/**
 * Delete Section1A53Schema by id
 * @param {ObjectId} Section1A53Id
 * @returns {Promise<Section1A53Schema>}
 */
const deleteSection1A53ById = async (scode) => {
  const Section1A53 = await getSection1A53ById(scode);
  if (!Section1A53) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Section1A53 not found');
  }
  await Section1A53.remove();
  return Section1A53;
};

module.exports = {
  createSection1A53,
  getAllSection1A53,
  getSection1A53ById,
  updateSection1A53ById,
  deleteSection1A53ById,
};
