const httpStatus = require('http-status');
const pick = require('../utils/pick');
const { join } = require('path');
const csv = require('csvtojson');
const path = require('path');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { careerService } = require('../services');

const staticFolder = join(__dirname, '../');
const uploadsFolder = join(staticFolder, 'uploads');

const bulkUploadFile = catchAsync(async (req, res) => {
  if (req.file) {
    const csvFilePath = join(uploadsFolder, req.file.filename);
    const csvJsonArray = await csv().fromFile(csvFilePath);
    const career = await careerService.bulkUpload(null, csvJsonArray);
    res.status(httpStatus.CREATED).send(career);
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, 'Missing file');
  }
});

const createCareer = catchAsync(async (req, res) => {
  const career = await careerService.createCareer(req.body);
  res.status(httpStatus.CREATED).send(career);
});


const getCareers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'ID', 'careerName', 'clusterName', 'locale']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await careerService.queryCareer(filter, options);
  res.send(result);
});

const getCareer = catchAsync(async (req, res) => {
  const career = await careerService.getCareerById(req.params.careerId);
  if (!career) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Career not found');
  }
  res.send(career);
});

const updateCareer = catchAsync(async (req, res) => {
  const career = await careerService.updateCareerById(req.params.careerId, req.body);
  res.send(career);
});

const deleteCareer = catchAsync(async (req, res) => {
  await careerService.deleteCareerById(req.params.careerId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
    bulkUploadFile,
  createCareer,
  getCareers,
  getCareer,
  updateCareer,
  deleteCareer,
};
