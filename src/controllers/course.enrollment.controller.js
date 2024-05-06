const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { courseEnrollmentService } = require('../services');

const createEnrollment = catchAsync(async (req, res) => {
  const saral = await courseEnrollmentService.createEnrollement(req.body);
  res.status(httpStatus.CREATED).send(saral);
});

const getEnrollment = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['courseName']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const allSaral = await courseEnrollmentService.getAllEnrollements(filter, options);
  res.send(allSaral);
});

const getEnrollmentById = catchAsync(async (req, res) => {
  const meal = await courseEnrollmentService.getEnrollementById(req.params.enrollmentId);
  if (!meal) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Enrollment not found');
  }
  res.send(meal);
});

const updateEnrollment = catchAsync(async (req, res) => {
  const meal = await courseEnrollmentService.updateEnrollementById(req.params.enrollmentId, req.body);
  res.send(meal);
});

const deleteEnrollment = catchAsync(async (req, res) => {
  const meal = await courseEnrollmentService.deleteEnrollementById(req.params.enrollmentId);
  res.status(httpStatus.NO_CONTENT).send(meal);
});

module.exports = {
  createEnrollment,
  getEnrollment,
  getEnrollmentById,
  updateEnrollment,
  deleteEnrollment,
};
