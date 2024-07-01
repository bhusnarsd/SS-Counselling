const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { questionService } = require('../services');


const createQuestion = catchAsync(async (req, res) => {
  const Question = await questionService.createQuestion(req.body);
  res.status(httpStatus.CREATED).send(Question);
});


const getQuestions = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'ID', 'careerName', 'clusterName', 'locale']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await questionService.queryQuestion(filter, options);
  res.send(result);
});

const getQuestion = catchAsync(async (req, res) => {
  const Question = await questionService.getQuestionById(req.params.QuestionId);
  if (!Question) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Question not found');
  }
  res.send(Question);
});

const updateQuestion = catchAsync(async (req, res) => {
  const Question = await questionService.updateQuestionById(req.params.QuestionId, req.body);
  res.send(Question);
});

const deleteQuestion = catchAsync(async (req, res) => {
  await questionService.deleteQuestionById(req.params.QuestionId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createQuestion,
  getQuestions,
  getQuestion,
  updateQuestion,
  deleteQuestion,
};
