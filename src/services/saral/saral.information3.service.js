const httpStatus = require('http-status');
const SaralInformation3 = require('../../models/saral/saral.information3.model');
const ApiError = require('../../utils/ApiError');

// /**
//  * Create a Saral Information3
//  * @param {Object} saralInfo3
//  * @returns {Promise<SaralInformation3>}
//  */
// const createSaralInfo3 = async (saralInfo3) => {
//   return SaralInformation3.create(saralInfo3);
// };
/**
 * Get SaralInformation1 by scode
 * @param {ObjectId} scode
 * @returns {Promise<SaralInformation3>}
 */
const getsection1A10ByScode = async (scode) => {
  return SaralInformation3.findOne({ scode });
};
/**
 * Create a SaralInformation1Schema
 * @param {Object} Section1A10SchemaBody
 * @returns {Promise<SaralInformation3>}
 */
const createSaralInfo3 = async (scode, reqBody) => {
  let saralInfo1 = await getsection1A10ByScode(scode);
  if (!saralInfo1) {
    // Create a new instance of SaralInformation1Schema if not found
    saralInfo1 = new SaralInformation3(reqBody);
  } else {
    // Update existing instance with new data
    Object.assign(saralInfo1, reqBody);
  }
  // Save the instance
  await saralInfo1.save();
  return saralInfo1;
};

/**
 * Query for Saral information3
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const getAllSaralInfo3s = async (filter, options) => {
  const result = await SaralInformation3.paginate(filter, options);
  return result;
};

/**
 * Get Saral information3 by id
 * @param {ObjectId} id
 * @returns {Promise<SaralInformation3>}
 */
const getSaralInfo3ById = async (id) => {
  return SaralInformation3.findById(id);
};

/**
 * Get Saral Information1 by saralId
 * @param {string} saralId - The ID of the Saral Information1.
 * @returns {Promise<SaralInformation3>}
 */
const getSaralInfo1BySaralId = async (scode) => {
  return SaralInformation3.findOne({ scode });
};
/**
 * Update Saral Information3 by id
 * @param {ObjectId} saralInfo3Id
 * @param {Object} updateBody
 * @returns {Promise<SaralInformation3>}
 */
const updateSaralInfo3ById = async (saralInfo3Id, updateBody) => {
  const saral = await getSaralInfo3ById(saralInfo3Id);
  if (!saral) {
    throw new ApiError(httpStatus.NOT_FOUND, 'saral Information3 not found');
  }
  Object.assign(saral, updateBody);
  await saral.save();
  return saral;
};

/**
 * Delete Saral Information3 by id
 * @param {ObjectId} saralInfo3Id
 * @returns {Promise<SaralInformation3>}
 */
const deleteSaralInfo3ById = async (saralInfo3Id) => {
  const saral = await getSaralInfo3ById(saralInfo3Id);
  if (!saral) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Saral Information3 not found');
  }
  await saral.remove();
  return saral;
};

module.exports = {
  createSaralInfo3,
  getAllSaralInfo3s,
  getSaralInfo3ById,
  updateSaralInfo3ById,
  deleteSaralInfo3ById,
  getSaralInfo1BySaralId,
};
