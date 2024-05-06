const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { teacherService } = require('../services');

const createTeacher = catchAsync(async (req, res) => {
  const teacher = await teacherService.createTeacher(req.body);
  res.status(httpStatus.CREATED).send(teacher);
});

const getAllTeacher = catchAsync(async (req, res) => {
  const filter = {
    ...pick(req.query, ['name']),
    isVerified: true,
  };
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await teacherService.queryTeacher(filter, options);
  res.send(result);
});

const getAllTeacherReq = catchAsync(async (req, res) => {
  const filter = {
    ...pick(req.query, ['name']),
    isVerified: false,
  };
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await teacherService.queryTeacher(filter, options);
  res.send(result);
});

const getTeacherById = catchAsync(async (req, res) => {
  const result = await teacherService.getTeacherById(req.params.id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Teacher not found');
  }
  res.send(result);
});

const updateTeacher = catchAsync(async (req, res) => {
  const result = await teacherService.updateTeacherById(req.params.id, req.body);
  res.send(result);
});

module.exports = {
  createTeacher,
  updateTeacher,
  getTeacherById,
  getAllTeacher,
  getAllTeacherReq,
};
