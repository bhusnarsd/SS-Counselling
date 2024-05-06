const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { assetManagementService } = require('../services');

const getSection1a1to10ByScode = catchAsync(async (req, res) => {
  const data = await assetManagementService.getSection1a1to10ByScode(req.params.scode);
  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Section1a1to10 not found');
  }
  res.send(data);
});
const getSection1A20ByScode = catchAsync(async (req, res) => {
  const data = await assetManagementService.getSection1A20ByScode(req.params.scode);
  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Section1A20 not found');
  }
  res.send(data);
});
const getSection1A30ByScode = catchAsync(async (req, res) => {
  const data = await assetManagementService.getSection1A30ByScode(req.params.scode);
  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Section1A30 not found');
  }
  res.send(data);
});
const getSection1A40ByScode = catchAsync(async (req, res) => {
  const data = await assetManagementService.getSection1A40ByScode(req.params.scode);
  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Section1A40 not found');
  }
  res.send(data);
});
const getSection1A50ByScode = catchAsync(async (req, res) => {
  const data = await assetManagementService.getSection1A50ByScode(req.params.scode);
  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Section1A50 not found');
  }
  res.send(data);
});
const getSection1A53ByScode = catchAsync(async (req, res) => {
  const data = await assetManagementService.getSection1A53ByScode(req.params.scode);
  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Section1A53 not found');
  }
  res.send(data);
});
const getSection1A54ByScode = catchAsync(async (req, res) => {
  const data = await assetManagementService.getSection1A54ByScode(req.params.scode);
  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Section1A54 not found');
  }
  res.send(data);
});
const getSection1A57ByScode = catchAsync(async (req, res) => {
  const data = await assetManagementService.getSection1A57ByScode(req.params.scode);
  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Section1A57 not found');
  }
  res.send(data);
});
const getSection1D60ByScode = catchAsync(async (req, res) => {
  const data = await assetManagementService.getSection1D60ByScode(req.params.scode);
  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Section1D60 not found');
  }
  res.send(data);
});
const getSection1E62ByScode = catchAsync(async (req, res) => {
  const data = await assetManagementService.getSection1E62ByScode(req.params.scode);
  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Section1E62 not found');
  }
  res.send(data);
});
const getSection2A21ByScode = catchAsync(async (req, res) => {
  const data = await assetManagementService.getSection2A21ByScode(req.params.scode);
  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Section2A21 not found');
  }
  res.send(data);
});
const getSection2B27ByScode = catchAsync(async (req, res) => {
  const data = await assetManagementService.getSection2B27ByScode(req.params.scode);
  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Section2B27 not found');
  }
  res.send(data);
});

const getSection3AByScode = catchAsync(async (req, res) => {
  const data = await assetManagementService.getSection3AByScode(req.params.scode);
  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Section3A not found');
  }
  res.send(data);
});

module.exports = {
  getSection1a1to10ByScode,
  getSection1A20ByScode,
  getSection1A30ByScode,
  getSection1A40ByScode,
  getSection1A50ByScode,
  getSection1A53ByScode,
  getSection1A54ByScode,
  getSection1A57ByScode,
  getSection1D60ByScode,
  getSection1E62ByScode,
  getSection2A21ByScode,
  getSection2B27ByScode,
  getSection3AByScode,
};
