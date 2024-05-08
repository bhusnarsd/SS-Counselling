const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { studentService } = require('../services');

const createStudent = catchAsync(async (req, res) => {
  const teacher = await studentService.createStudent(req.body);
  res.status(httpStatus.CREATED).send(teacher);
});

const getAllStudent = catchAsync(async (req, res) => {
  const filter = {
    ...pick(req.query, ['name']),
    // isVerified: true,
  };
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await studentService.queryStudent(filter, options);
  res.send(result);
});

const getStudentById = catchAsync(async (req, res) => {
  const result = await studentService.getStudentById(req.params.id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Teacher not found');
  }
  res.send(result);
});

const updateStudent = catchAsync(async (req, res) => {
  const result = await studentService.updateStudentById(req.params.id, req.body);
  res.send(result);
});

module.exports = {
  createStudent,
  getAllStudent,
  getStudentById,
  updateStudent,
};
