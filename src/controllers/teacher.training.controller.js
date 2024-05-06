const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { teacherTrainingService } = require('../services');

const createCourse = catchAsync(async (req, res) => {
  const saral = await teacherTrainingService.createCourse(req.body);
  res.status(httpStatus.CREATED).send(saral);
});

const getCourse = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['courseName']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const allSaral = await teacherTrainingService.getAllCourses(filter, options);
  res.send(allSaral);
});

const getCourseById = catchAsync(async (req, res) => {
  const course = await teacherTrainingService.getCourseById(req.params.courseId);
  if (!course) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Course not found');
  }
  res.send(course);
});

const updateCourse = catchAsync(async (req, res) => {
  const course = await teacherTrainingService.updateCourseById(req.params.courseId, req.body);
  res.send(course);
});

const deleteCourse = catchAsync(async (req, res) => {
  const course = await teacherTrainingService.deleteCourseById(req.params.courseId);
  res.status(httpStatus.NO_CONTENT).send(course);
});

module.exports = {
  createCourse,
  getCourse,
  getCourseById,
  updateCourse,
  deleteCourse,
};
