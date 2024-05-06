const httpStatus = require('http-status');
const Section2B27Schema = require('../../models/masterModels/section2B(2.2 to 2.27).model');
const ApiError = require('../../utils/ApiError');

/**
 * Get Section2B27Schema by id
 * @param {ObjectId} id
 * @returns {Promise<Section2B27Schema>}
 */
const getSection2B27ById = async (scode) => {
  return Section2B27Schema.findOne({ scode });
};

/**
 * Create a Section2B27Schema
 * @param {Object} Section2B27SchemaBody
 * @returns {Promise<Section2B27Schema>}
 */
const createSection2B27 = async (scode, reqBody) => {
  let result = await getSection2B27ById(scode);
  if (!result) {
    result = new Section2B27Schema(reqBody);
  } else {
    Object.assign(result, reqBody);
  }
  await result.save();
  return result;
};

/**
 * Query for Section2B27
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const getAllSection2B27 = async (filter, options) => {
  const Section2B27 = await Section2B27Schema.paginate(filter, options);
  return Section2B27;
};

/**
 * Update Section2B27Schema by id
 * @param {ObjectId} Section2B27Id
 * @param {Object} updateBody
 * @returns {Promise<Section2B27Schema>}
 */
const updateSection2B27ById = async (scode, updateBody) => {
  const typeSection2B27 = await getSection2B27ById(scode);
  if (!typeSection2B27) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Section2B27 not found');
  }
  Object.assign(typeSection2B27, updateBody);
  await typeSection2B27.save();
  return typeSection2B27;
};

/**
 * Delete Section2B27Schema by id
 * @param {ObjectId} Section2B27Id
 * @returns {Promise<Section2B27Schema>}
 */
const deleteSection2B27ById = async (scode) => {
  const Section2B27 = await getSection2B27ById(scode);
  if (!Section2B27) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Section2B27 not found');
  }
  await Section2B27.remove();
  return Section2B27;
};

module.exports = {
  createSection2B27,
  getAllSection2B27,
  getSection2B27ById,
  updateSection2B27ById,
  deleteSection2B27ById,
};
