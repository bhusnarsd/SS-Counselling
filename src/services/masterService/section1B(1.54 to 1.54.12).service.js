const httpStatus = require('http-status');
const Section1B54Schema = require('../../models/masterModels/section1B(1.54 to 1.54.12).model');
const ApiError = require('../../utils/ApiError');

/**
 * Get Section1B54Schema by id
 * @param {ObjectId} id
 * @returns {Promise<Section1B54Schema>}
 */
const getSection1B54ById = async (scode) => {
  return Section1B54Schema.findOne({ scode });
};
/**
 * Create a Section1B54Schema
 * @param {Object} Section1B54SchemaBody
 * @returns {Promise<Section1B54Schema>}
 */
const createSection1B54 = async (scode, reqBody) => {
  let result = await getSection1B54ById(scode);
  if (!result) {
    // Create a new instance of Section1A10Schema if not found
    result = new Section1B54Schema(reqBody);
  } else {
    // Update existing instance with new data
    Object.assign(result, reqBody);
  }
  // Save the instance
  await result.save();
  return result;
};
/**
 * Query for Section1B54
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const getAllSection1B54 = async (filter, options) => {
  const Section1B54 = await Section1B54Schema.paginate(filter, options);
  return Section1B54;
};

/**
 * Update Section1B54Schema by id
 * @param {ObjectId} Section1B54Id
 * @param {Object} updateBody
 * @returns {Promise<Section1B54Schema>}
 */
const updateSection1B54ById = async (scode, updateBody) => {
  const typeSection1B54 = await getSection1B54ById(scode);
  if (!typeSection1B54) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Section1B54 not found');
  }
  Object.assign(typeSection1B54, updateBody);
  await typeSection1B54.save();
  return typeSection1B54;
};

/**
 * Delete Section1B54Schema by id
 * @param {ObjectId} Section1B54Id
 * @returns {Promise<Section1B54Schema>}
 */
const deleteSection1B54ById = async (scode) => {
  const Section1B54 = await getSection1B54ById(scode);
  if (!Section1B54) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Section1B54 not found');
  }
  await Section1B54.remove();
  return Section1B54;
};

module.exports = {
  createSection1B54,
  getAllSection1B54,
  getSection1B54ById,
  updateSection1B54ById,
  deleteSection1B54ById,
};
