const httpStatus = require('http-status');
const pick = require('../utils/pick');
const { join } = require('path');
const csv = require('csvtojson');
const path = require('path');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { collegeService } = require('../services');

const staticFolder = join(__dirname, '../');
const uploadsFolder = join(staticFolder, 'uploads');

const bulkUploadFile = catchAsync(async (req, res) => {
  if (req.file) {
    const csvFilePath = join(uploadsFolder, req.file.filename);
    const csvJsonArray = await csv().fromFile(csvFilePath);
    const career = await collegeService.bulkUpload(null, csvJsonArray);
    res.status(httpStatus.CREATED).send(career);
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, 'Missing file');
  }
});

const createCollege = catchAsync(async (req, res) => {
  const career = await collegeService.createCollege(req.body);
  res.status(httpStatus.CREATED).send(College);
});


const getColleges = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'type', 'CollegeName', 'faculties', 'locale']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await collegeService.queryCollege(filter, options);
  res.send(result);
});

const getCollege = catchAsync(async (req, res) => {
  const college = await collegeService.getCollegeById(req.params.collegeId);
  if (!college) {
    throw new ApiError(httpStatus.NOT_FOUND, 'College not found');
  }
  res.send(college);
});

const updateCollege = catchAsync(async (req, res) => {
  const College = await collegeService.updateCollegeById(req.params.collegeId, req.body);
  res.send(College);
});

const deleteCollege = catchAsync(async (req, res) => {
  await collegeService.deleteCollegeById(req.params.collegeId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
    bulkUploadFile,
  createCollege,
  getColleges,
  getCollege,
  updateCollege,
  deleteCollege,
};
