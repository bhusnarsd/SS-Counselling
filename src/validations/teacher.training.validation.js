const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createCourse = {
  body: Joi.object().keys({
    courseName: Joi.string().required(),
    courseCode: Joi.string().required(),
    courseDetails: Joi.string().required(),
    startDate: Joi.date().required(),
    courseTimeLength: Joi.string().required(),
    professorName: Joi.string().required(),
    contactNo: Joi.number().required(),
    path: Joi.string().required(),
    image: Joi.string().required(),
    enrollment: Joi.string(),
  }),
};

const getAllCourses = {
  query: Joi.object().keys({
    courseName: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getCourse = {
  params: Joi.object().keys({
    courseId: Joi.string().custom(objectId),
  }),
};

const updateCourseById = {
  params: Joi.object().keys({
    courseId: Joi.string(),
  }),
  body: Joi.object()
    .keys({
      courseName: Joi.string(),
      courseCode: Joi.string(),
      courseDetails: Joi.string(),
      startDate: Joi.date(),
      courseTimeLength: Joi.string(),
      professorName: Joi.string(),
      contactNo: Joi.number(),
      path: Joi.string(),
      image: Joi.string(),
      enrollment: Joi.string(),
    })
    .min(1),
};
const deleteCourseById = {
  params: Joi.object().keys({
    courseId: Joi.string(),
  }),
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourse,
  updateCourseById,
  deleteCourseById,
};
