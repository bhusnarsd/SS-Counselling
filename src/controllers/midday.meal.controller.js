const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { middayMealService } = require('../services');

const createMeal = catchAsync(async (req, res) => {
  const saral = await middayMealService.createMeal(req.body);
  res.status(httpStatus.CREATED).send(saral);
});

const getMeal = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['receipeName']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const allSaral = await middayMealService.getAllMeals(filter, options);
  res.send(allSaral);
});

const getMealById = catchAsync(async (req, res) => {
  const meal = await middayMealService.getMealById(req.params.mealId);
  if (!meal) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Meal not found');
  }
  res.send(meal);
});

const updateMeal = catchAsync(async (req, res) => {
  const meal = await middayMealService.updateMealById(req.params.mealId, req.body);
  res.send(meal);
});

const deleteMeal = catchAsync(async (req, res) => {
  const meal = await middayMealService.deleteMealById(req.params.mealId);
  res.status(httpStatus.NO_CONTENT).send(meal);
});

module.exports = {
  createMeal,
  getMeal,
  getMealById,
  updateMeal,
  deleteMeal,
};
