const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createSelfAssessment = {
  body: Joi.object().keys({
    trainingName: Joi.string().required(),
    description: Joi.string().required(),
    scode: Joi.string().required(),
    teacherName: Joi.string().required(),
    teacherId: Joi.string().required(),
    category: Joi.string().required(),
    block: Joi.string().required(),
    district: Joi.string().required(),
    division: Joi.string().required(),
    status: Joi.string().required().valid('pending', 'approve', 'rejected').default('pending'),
    schoolName: Joi.string().required(),
    trainingId: Joi.string().required(),
  }),
};

const getAllSelfAssessments = {
  query: Joi.object().keys({
    trainingName: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getSelfAssessment = {
  params: Joi.object().keys({
    selfAssessmentId: Joi.string().custom(objectId),
  }),
};

const updateSelfAssessmentById = {
  params: Joi.object().keys({
    selfAssessmentId: Joi.string(),
  }),
  body: Joi.object()
    .keys({
      trainingName: Joi.string(),
      description: Joi.string(),
      teacherName: Joi.string(),
      teacherId: Joi.string(),
      category: Joi.string(),
      block: Joi.string(),
      district: Joi.string(),
      division: Joi.string(),
      status: Joi.string().valid('pending', 'approve', 'rejected'),
      schoolName: Joi.string(),
      trainingId: Joi.string(),
    })
    .min(1),
};
const deleteSelfAssessmentById = {
  params: Joi.object().keys({
    selfAssessmentId: Joi.string(),
  }),
};

module.exports = {
  createSelfAssessment,
  getAllSelfAssessments,
  getSelfAssessment,
  updateSelfAssessmentById,
  deleteSelfAssessmentById,
};
