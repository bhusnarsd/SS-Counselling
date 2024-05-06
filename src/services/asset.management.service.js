const {
  Section1A10Schema,
  Section1A20Schema,
  Section1A30Schema,
  Section1A40Schema,
  Section1A50Schema,
  Section1A53Schema,
  Section1B54Schema,
  Section1C57Schema,
  Section1D60Schema,
  Section1E62Schema,
  Section2A21Schema,
  Section2B27Schema,
  Section3ASchema,
} = require('../models');

/**
 * Get Section1A10Schema by scode
 * @param {String} scode
 * @returns {Promise<Section1A10Schema>}
 */

const getSection1a1to10ByScode = async (scode) => {
  const sectionData = await Section1A10Schema.findOne({ scode });
  return sectionData;
};

/**
 * Get Section1A20Schema by scode
 * @param {String} scode
 * @returns {Promise<Section1A20Schema>}
 */

const getSection1A20ByScode = async (scode) => {
  const sectionData = await Section1A20Schema.findOne({ scode });
  return sectionData;
};

/**
 * Get Section1A20Schema by scode
 * @param {String} scode
 * @returns {Promise<Section1A30Schema>}
 */

const getSection1A30ByScode = async (scode) => {
  const sectionData = await Section1A30Schema.findOne({ scode });
  return sectionData;
};

/**
 * Get Section1A20Schema by scode
 * @param {String} scode
 * @returns {Promise<Section1A40Schema>}
 */

const getSection1A40ByScode = async (scode) => {
  const sectionData = await Section1A40Schema.findOne({ scode });
  return sectionData;
};

/**
 * Get Section1A20Schema by scode
 * @param {String} scode
 * @returns {Promise<Section1A50Schema>}
 */

const getSection1A50ByScode = async (scode) => {
  const sectionData = await Section1A50Schema.findOne({ scode });
  return sectionData;
};

/**
 * Get Section1A20Schema by scode
 * @param {String} scode
 * @returns {Promise<Section1A53Schema>}
 */

const getSection1A53ByScode = async (scode) => {
  const sectionData = await Section1A53Schema.findOne({ scode });
  return sectionData;
};

/**
 * Get Section1A20Schema by scode
 * @param {String} scode
 * @returns {Promise<Section1B54Schema>}
 */

const getSection1A54ByScode = async (scode) => {
  const sectionData = await Section1B54Schema.findOne({ scode });
  return sectionData;
};
/**
 * Get Section1A20Schema by scode
 * @param {String} scode
 * @returns {Promise<Section1C57Schema>}
 */

const getSection1A57ByScode = async (scode) => {
  const sectionData = await Section1C57Schema.findOne({ scode });
  return sectionData;
};

/**
 * Get Section1A20Schema by scode
 * @param {String} scode
 * @returns {Promise<Section1D60Schema>}
 */

const getSection1D60ByScode = async (scode) => {
  const sectionData = await Section1D60Schema.findOne({ scode });
  return sectionData;
};
/**
 * Get Section1A20Schema by scode
 * @param {String} scode
 * @returns {Promise<Section1E62Schema>}
 */

const getSection1E62ByScode = async (scode) => {
  const sectionData = await Section1E62Schema.findOne({ scode });
  return sectionData;
};

/**
 * Get Section1A20Schema by scode
 * @param {String} scode
 * @returns {Promise<Section2A21Schema>}
 */

const getSection2A21ByScode = async (scode) => {
  const sectionData = await Section2A21Schema.findOne({ scode });
  return sectionData;
};

/**
 * Get Section1A20Schema by scode
 * @param {String} scode
 * @returns {Promise<Section2B27Schema>}
 */

const getSection2B27ByScode = async (scode) => {
  const sectionData = await Section2B27Schema.findOne({ scode });
  return sectionData;
};

/**
 * Get Section1A20Schema by scode
 * @param {String} scode
 * @returns {Promise<Section3ASchema>}
 */

const getSection3AByScode = async (scode) => {
  const sectionData = await Section3ASchema.findOne({ scode });
  return sectionData;
};

module.exports = {
  getSection1a1to10ByScode,
  getSection1A20ByScode,
  getSection1A30ByScode,
  getSection1A40ByScode,
  getSection1A50ByScode,
  getSection1A53ByScode,
  getSection1A54ByScode,
  getSection1A57ByScode,
  getSection1D60ByScode,
  getSection1E62ByScode,
  getSection2A21ByScode,
  getSection2B27ByScode,
  getSection3AByScode,
};
