const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { synopsisService } = require('../services');

const createSynopsis = catchAsync(async (req, res) => {
  const synopsis = await synopsisService.createSynopsis(req.body);
  res.status(httpStatus.CREATED).send(synopsis);
});

const querySynopsis = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['studentId', 'schoolId']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await synopsisService.querySynopsis(filter, options);
  res.send(result);
});

const getSynopsisById = catchAsync(async (req, res) => {
  const result = await synopsisService.getSynopsisById(req.params.studentId);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Synopsis not found');
  }
  res.send(result);
});

module.exports = {
  createSynopsis,
  querySynopsis,
  getSynopsisById,
};
