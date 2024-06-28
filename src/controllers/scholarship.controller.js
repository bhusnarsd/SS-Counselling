const httpStatus = require('http-status');
const pick = require('../utils/pick');
const { join } = require('path');
const csv = require('csvtojson');
const path = require('path');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { schollershiopService } = require('../services');

const staticFolder = join(__dirname, '../');
const uploadsFolder = join(staticFolder, 'uploads');

const bulkUploadFile = catchAsync(async (req, res) => {
  if (req.file) {
    const csvFilePath = join(uploadsFolder, req.file.filename);
    const csvJsonArray = await csv().fromFile(csvFilePath);
    const career = await schollershiopService.bulkUpload(null, csvJsonArray);
    res.status(httpStatus.CREATED).send(career);
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, 'Missing file');
  }
});

const createScholarship = catchAsync(async (req, res) => {
  const Scholarship = await schollershiopService.createScholarship(req.body);
  res.status(httpStatus.CREATED).send(Scholarship);
});


const getScholarships = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'type', 'ScholarshipName', 'faculties', 'locale']);
  const options = pick(req.query, ['search','sortBy', 'limit', 'page']);
  const result = await schollershiopService.queryScholarship(filter, options);
  res.send(result);
});

const getScholarship = catchAsync(async (req, res) => {
  const Scholarship = await schollershiopService.getScholarshipById(req.params.scholarshipId);
  if (!Scholarship) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Scholarship not found');
  }
  res.send(Scholarship);
});

const updateScholarship = catchAsync(async (req, res) => {
  const scholarship = await schollershiopService.updateScholarshipById(req.params.scholarshipId, req.body);
  res.send(scholarship);
});

const deleteScholarship = catchAsync(async (req, res) => {
  await schollershiopService.deleteScholarshipById(req.params.scholarshipId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
    bulkUploadFile,
  createScholarship,
  getScholarships,
  getScholarship,
  updateScholarship,
  deleteScholarship,
};
