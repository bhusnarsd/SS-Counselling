const Joi = require('joi');

const createSchools = {
  body: Joi.object().keys({
    mid: Joi.number().required(),
    name: Joi.string().required(),
    code: Joi.string().required(),
    contact_number: Joi.string(),
    address: Joi.string(),
    date: Joi.string(),
    month: Joi.number(),
    year: Joi.number(),
    logo: Joi.number(),
    udisecode: Joi.string(),
    division: Joi.string(),
    district: Joi.string(),
    block: Joi.string(),
    sansthan: Joi.string(),
    s_type: Joi.string(),
    management: Joi.string(),
    category: Joi.string(),
    status: Joi.string(),
    preprimaryavl: Joi.string(),
    initialization_year: Joi.string(),
    lang: Joi.number(),
    lat: Joi.number(),
    student: Joi.number(),
    staff: Joi.number(),
    resultlist: Joi.array().items(
      Joi.object({
        male: Joi.number(),
        female: Joi.number(),
        class: Joi.string(),
        section: Joi.string(),
        class_id: Joi.string(),
        section_id: Joi.string(),
      })
    ),
    total_student: Joi.number(),
    total_teacher: Joi.number(),
    scode: Joi.string(),
  }),
};

const getSchools = {
  query: Joi.object().keys({
    name: Joi.string(),
    district: Joi.string(),
    block: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};
const getSchoolsDistrict = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getSchool = {
  params: Joi.object().keys({
    udisecode: Joi.string(),
  }),
};

const getBlock = {
  body: Joi.object().keys({
    district: Joi.string(),
  }),
};

const getSchoolByFilter = {
  query: Joi.object().keys({
    district: Joi.string(),
    block: Joi.string(),
  }),
};

const getStatsByDivision = {
  body: Joi.object().keys({
    division: Joi.string(),
  }),
};

const updateSchools = {
  params: Joi.object().keys({
    scode: Joi.string(),
  }),
  body: Joi.object()
    .keys({
      mid: Joi.number(),
      name: Joi.string(),
      code: Joi.string(),
      contact_number: Joi.string(),
      address: Joi.string(),
      date: Joi.string(),
      month: Joi.number(),
      year: Joi.number(),
      logo: Joi.number(),
      udisecode: Joi.string(),
      division: Joi.string(),
      district: Joi.string(),
      block: Joi.string(),
      sansthan: Joi.string(),
      s_type: Joi.string(),
      management: Joi.string(),
      category: Joi.string(),
      status: Joi.string(),
      preprimaryavl: Joi.string(),
      initialization_year: Joi.string(),
      lang: Joi.number(),
      lat: Joi.number(),
      student: Joi.number(),
      staff: Joi.number(),
      resultlist: Joi.array().items(
        Joi.object({
          male: Joi.number(),
          female: Joi.number(),
          class: Joi.string(),
          section: Joi.string(),
          class_id: Joi.string(),
          section_id: Joi.string(),
        })
      ),
      total_student: Joi.number(),
      total_teacher: Joi.number(),
      scode: Joi.string(),
    })
    .min(1),
};

module.exports = {
  createSchools,
  getSchools,
  getSchool,
  getSchoolByFilter,
  getBlock,
  getSchoolsDistrict,
  getStatsByDivision,
  updateSchools,
};
