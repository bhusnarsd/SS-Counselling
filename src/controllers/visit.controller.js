const httpStatus = require('http-status');
// const pick = require('../utils/pick');
// const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { visitService } = require('../services');

const sendNotification = (deviceToken, title, body) => {
  const message = {
    notification: {
      title,
      body,
    },
    token: deviceToken,
  };
};

const createSchedule = catchAsync(async (req, res) => {
  const { trainer, schoolId, visitDate, time, standard } = req.body;
  const { deviceToken } = req.user;
  const visit = await visitService.scheduleVisit(trainer, schoolId, visitDate, time, standard);
  const body = `You have assined visit for${schoolId} date ${visitDate}`;
  const title = 'Visits';
  await sendNotification(deviceToken, title, body);
  res.status(httpStatus.CREATED).send(visit);
});

const getTrainerVisits = catchAsync(async (req, res) => {
  const { trainerId, status } = req.query;
  const visit = await visitService.getTrainerVisits(trainerId, status);
  res.status(httpStatus.CREATED).send(visit);
});

const updateVisitById = catchAsync(async (req, res) => {
  const { schoolId, standard, trainerId } = req.query;
  const updateData = {};
  if (req.files.file) updateData.file = req.files.file[0].path;
  if (req.files.file1) updateData.file1 = req.files.file1[0].path;
  if (req.files.file2) updateData.file2 = req.files.file2[0].path;
  const result = await visitService.updateVisitById(schoolId, standard, trainerId, updateData);
  res.status(httpStatus.CREATED).send(result);
});

const addInOutTIme = catchAsync(async (req, res) => {
  const { schoolId, standard, trainerId } = req.query;
  const result = await visitService.updateVisitById(schoolId, standard, trainerId, req.body);
  res.status(httpStatus.CREATED).send(result);
});

const getVisitsBySchoolId = catchAsync(async (req, res) => {
  const { schoolId } = req.params;
  const visit = await visitService.getVisitsBySchoolId(schoolId);
  res.status(httpStatus.CREATED).send(visit);
});

const getSchoolIdsAndStudentCount = catchAsync(async (req, res) => {
  const { trainerId } = req.query;
  const visit = await visitService.getSchoolIdsAndStudentCount(trainerId);
  res.status(httpStatus.CREATED).send(visit);
});
const updateTeacher = catchAsync(async (req, res) => {
  const result = await teacherService.updateTeacherById(req.params.id, req.body);
  res.send(result);
});

module.exports = {
  createSchedule,
  getTrainerVisits,
  getVisitsBySchoolId,
  getSchoolIdsAndStudentCount,
  updateVisitById,
  addInOutTIme,
};
