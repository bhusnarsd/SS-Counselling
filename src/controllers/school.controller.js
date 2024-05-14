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
  let filter = {};
  const { role } = req.user;
  const assignedTo = req.user.asssignedTo;

  if (role === 'district_officer') {
    filter = { district: assignedTo };
  } else if (role === 'block_officer') {
    filter = { block: assignedTo };
  } else if (role === 'state_officer') {
    // No specific filtering needed for state officer
  }

  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await schoolService.querySchool(filter, options);
  res.send(result);
});

const getSchool = catchAsync(async (req, res) => {
  const school = await schoolService.getSchoolByUdisecode(req.params.udisecode);
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


const getSchoolList = catchAsync(async (req, res) => {
  const result = await schoolService.getSchoolList(req.body.block);
  res.send(result);
});


const updateSchool = catchAsync(async (req, res) => {
  const school = await schoolService.updateSchoolByScode(req.params.scode, req.body);
  res.send(school);
});
module.exports = {
  bulkUploadFile,
  createSchool,
  getSchools,
  getSchool,
  getSchoolList,
  getDistrictList,
  getBlockList,
  updateSchool,
};
