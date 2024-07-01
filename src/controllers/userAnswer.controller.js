const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userAnswerService } = require('../services');


const createUserAnswer = catchAsync(async (req, res) => {
  const UserAnswer = await userAnswerService.createUserAnswer(req.body);
  res.status(httpStatus.CREATED).send(UserAnswer);
});


const getUserAnswers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'ID', 'careerName', 'clusterName', 'locale']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userAnswerService.queryUserAnswer(filter, options);
  res.send(result);
});

const getUserAnswer = catchAsync(async (req, res) => {
  const UserAnswer = await userAnswerService.getUserAnswerById(req.params.UserAnswerId);
  if (!UserAnswer) {
    throw new ApiError(httpStatus.NOT_FOUND, 'UserAnswer not found');
  }
  res.send(UserAnswer);
});

const updateUserAnswer = catchAsync(async (req, res) => {
  const UserAnswer = await userAnswerService.updateUserAnswerById(req.params.UserAnswerId, req.body);
  res.send(UserAnswer);
});

const deleteUserAnswer = catchAsync(async (req, res) => {
  await userAnswerService.deleteUserAnswerById(req.params.UserAnswerId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createUserAnswer,
  getUserAnswers,
  getUserAnswer,
  updateUserAnswer,
  deleteUserAnswer,
};
