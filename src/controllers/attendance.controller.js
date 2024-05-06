const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { attendanceService } = require('../services');

const getAllAttendanceCount = catchAsync(async (req, res) => {
  const result = await attendanceService.getAllAttendanceCount();
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Attendance not found');
  }
  res.send(result);
});

const getAttendanceByDateAndScode = catchAsync(async (req, res) => {
  const { scode, date } = req.body;
  const result = await attendanceService.getAttendanceByDate(scode, date);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Attendance not found');
  }
  res.send(result);
});

const CreateORUpdateAttendance = catchAsync(async (req, res) => {
  const { scode, date } = req.body;
  const user = await attendanceService.CreateORUpdateAttendance(scode, date, req.body);
  res.status(httpStatus.CREATED).send(user);
});
module.exports = {
  getAllAttendanceCount,
  getAttendanceByDateAndScode,
  CreateORUpdateAttendance,
};
