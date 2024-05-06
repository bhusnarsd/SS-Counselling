const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { selfAssessmentService } = require('../services');

const createSelfAssessment = catchAsync(async (req, res) => {
  const saral = await selfAssessmentService.createSelfAssessment(req.body);
  res.status(httpStatus.CREATED).send(saral);
});

const getSelfAssessment = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['trainingName']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const allSaral = await selfAssessmentService.getAllSelfAssessments(filter, options);
  res.send(allSaral);
});

const getSelfAssessmentById = catchAsync(async (req, res) => {
  const meal = await selfAssessmentService.getSelfAssessmentById(req.params.selfAssessmentId);
  if (!meal) {
    throw new ApiError(httpStatus.NOT_FOUND, 'SelfAssessment not found');
  }
  res.send(meal);
});

const updateSelfAssessment = catchAsync(async (req, res) => {
  const meal = await selfAssessmentService.updateSelfAssessmentById(req.params.selfAssessmentId, req.body);
  res.send(meal);
});

const deleteSelfAssessment = catchAsync(async (req, res) => {
  const meal = await selfAssessmentService.deleteSelfAssessmentById(req.params.selfAssessmentId);
  res.status(httpStatus.NO_CONTENT).send(meal);
});

module.exports = {
  createSelfAssessment,
  getSelfAssessment,
  getSelfAssessmentById,
  updateSelfAssessment,
  deleteSelfAssessment,
};
