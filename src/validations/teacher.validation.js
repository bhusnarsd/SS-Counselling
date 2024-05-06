/* eslint-disable prettier/prettier */
const Joi = require('joi');

// Joi schema for teacher creation
const createTeacherSchema = {
    body: Joi.object().keys({
  name: Joi.string().trim().required(),
  caste: Joi.string().trim(),
  gender: Joi.string(),
  age: Joi.number().integer(),
  mobNumber: Joi.number().required(),
  email: Joi.string().email().required(),
  address: Joi.string(),
  pinCode: Joi.number(),
  reservationDetails: Joi.string(),
  marks: Joi.number(),
  qualification: Joi.string(),
  yearOfPassing: Joi.number(),
  persentage: Joi.string(),
  univercityName: Joi.string(),
  subject: Joi.string(),
  collegeName: Joi.string(),
  profssionalQualification: Joi.string(),
  isVerified: Joi.boolean().default(false),
}),
}
const getAllTeacher = {
    query: Joi.object().keys({
      name: Joi.string(),
      sortBy: Joi.string(),
      limit: Joi.number(),
      page: Joi.number(),
    }),
  };
const getTeacher = {
    params: Joi.object().keys({
      id: Joi.string(),
    }),
  };
// Joi schema for teacher update
const updateTeacherSchema = {
    params: Joi.object().keys({
      id: Joi.string(),
    }),
    body: Joi.object()
      .keys({
  name: Joi.string().trim(),
  caste: Joi.string().trim(),
  gender: Joi.string(),
  age: Joi.number().integer(),
  mobNumber: Joi.number(),
  email: Joi.string().email(),
  address: Joi.string(),
  pinCode: Joi.number(),
  reservationDetails: Joi.string(),
  marks: Joi.number(),
  qualification: Joi.string(),
  yearOfPassing: Joi.number(),
  persentage: Joi.string(),
  univercityName: Joi.string(),
  subject: Joi.string(),
  collegeName: Joi.string(),
  profssionalQualification: Joi.string(),
  isVerified: Joi.boolean(),
})
.min(1),
};

module.exports = {
  createTeacherSchema,
  getAllTeacher,
  getTeacher,
  updateTeacherSchema,
};
