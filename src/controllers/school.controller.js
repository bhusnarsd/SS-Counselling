const httpStatus = require('http-status');
const { join } = require('path');
const csv = require('csvtojson');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { schoolService } = require('../services');

const staticFolder = join(__dirname, '../../');
const uploadsFolder = join(staticFolder, 'uploads');

const bulkUploadFile = catchAsync(async (req, res) => {
  if (req.file) {
    const csvFilePath = join(uploadsFolder, req.file.filename);
    const csvJsonArray = await csv().fromFile(csvFilePath);
    const staff = await schoolService.bulkUpload(null, csvJsonArray);
    res.status(httpStatus.CREATED).send(staff);
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, 'Missing file');
  }
});

const createSchool = catchAsync(async (req, res) => {
  const school = await schoolService.createSchool(req.body);
  res.status(httpStatus.CREATED).send(school);
});

const getSchools = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'schoolId']);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'reverse']);
  const result = await schoolService.querySchool(filter, options);
  res.send(result);
});

const getSchool = catchAsync(async (req, res) => {
  const school = await schoolService.getSchoolById(req.params.schoolId);
  if (!school) {
    throw new ApiError(httpStatus.NOT_FOUND, 'school not found');
  }
  res.send(school);
});

const getDistrictList = catchAsync(async (req, res) => {
  const districtList = await schoolService.getDistrictList();
  res.send(districtList);
});

const getBlockList = catchAsync(async (req, res) => {
  const districtList = await schoolService.getBlockList();
  res.send(districtList);
});

const getSchoolStats = catchAsync(async (req, res) => {
  const stats = await schoolService.getSchoolStats();
  res.send(stats);
});

const getSchoolstatsBySchoolID = catchAsync(async (req, res) => {
  const { schoolId } = req.query;
  const stats = await schoolService.getSchoolstatsBySchoolID(schoolId);
  res.send(stats);
});

const getSchoolList = catchAsync(async (req, res) => {
  const result = await schoolService.getSchoolList(req.body.block);
  res.send(result);
});

const updateSchool = catchAsync(async (req, res) => {
  const school = await schoolService.updateSchoolByScode(req.params.schoolId, req.body);
  res.send(school);
});

const deleteSchoolById = catchAsync(async (req, res) => {
  const school = await schoolService.deleteSchoolById(req.params.schoolId);
  res.send(school);
});
module.exports = {
  bulkUploadFile,
  createSchool,
  getSchools,
  getSchool,
  getSchoolList,
  getDistrictList,
  getSchoolStats,
  getSchoolstatsBySchoolID,
  getBlockList,
  updateSchool,
  deleteSchoolById,
};
