const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { sansthanService } = require('../services');

const createSansthan = catchAsync(async (req, res) => {
  const sansthan = await sansthanService.createSansthan(req.body);
  res.status(httpStatus.CREATED).send(sansthan);
});

const getAllSansthan = catchAsync(async (req, res) => {
  const filter = {
    ...pick(req.query, ['sasthanName', 'userID']),
    isVerified: true,
  };
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await sansthanService.querySansthan(filter, options);
  res.send(result);
});

const getAllSansthanReq = catchAsync(async (req, res) => {
  const filter = {
    ...pick(req.query, ['sasthanName', 'userID']),
    // isVerified: false,
  };
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await sansthanService.querySansthan(filter, options);
  res.send(result);
});

const getSansthanById = catchAsync(async (req, res) => {
  const sansthan = await sansthanService.getSansthanById(req.params.sansthanId);
  if (!sansthan) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Sansthan not found');
  }
  res.send(sansthan);
});

const getSchoolBysansthan = catchAsync(async (req, res) => {
  const sansthan = await sansthanService.getSchoolBysansthan(req.query.sansthan);
  if (!sansthan) {
    throw new ApiError(httpStatus.NOT_FOUND, 'School not found');
  }
  res.send(sansthan);
});

const getSchoolCountsOfsansthan = catchAsync(async (req, res) => {
  const sansthan = await sansthanService.getSchoolCountsOfsansthan(req.query.sansthan);
  if (!sansthan) {
    throw new ApiError(httpStatus.NOT_FOUND, 'School not found');
  }
  res.send(sansthan);
});

const updateSansthan = catchAsync(async (req, res) => {
  const sanstan = await sansthanService.updateSansthanById(req.params.sansthanId, req.body);
  res.send(sanstan);
});

const verifySansthanById = catchAsync(async (req, res) => {
  const sanstan = await sansthanService.verifySansthanById(req.params.sansthanId);
  res.send(sanstan);
});

module.exports = {
  createSansthan,
  updateSansthan,
  getSansthanById,
  getAllSansthan,
  getAllSansthanReq,
  verifySansthanById,
  getSchoolBysansthan,
  getSchoolCountsOfsansthan,
};
