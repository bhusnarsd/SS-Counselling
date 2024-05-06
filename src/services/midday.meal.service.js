const httpStatus = require('http-status');
const { MiddayMeal } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a Meal
 * @param {Object} meal
 * @returns {Promise<MiddayMeal>}
 */
const createMeal = async (meal) => {
  return MiddayMeal.create(meal);
};

/**
 * Query for Meal
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const getAllMeals = async (filter, options) => {
  const result = await MiddayMeal.paginate(filter, options);
  return result;
};

/**
 * Get Meal by id
 * @param {ObjectId} id
 * @returns {Promise<MiddayMeal>}
 */
const getMealById = async (id) => {
  return MiddayMeal.findById(id);
};

/**
 * Update Meal by id
 * @param {ObjectId} mealId
 * @param {Object} updateBody
 * @returns {Promise<MiddayMeal>}
 */
const updateMealById = async (mealId, updateBody) => {
  const meal = await getMealById(mealId);
  if (!meal) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Meal not found');
  }
  Object.assign(meal, updateBody);
  await meal.save();
  return meal;
};

/**
 * Delete Meal by id
 * @param {ObjectId} mealId
 * @returns {Promise<MiddayMeal>}
 */
const deleteMealById = async (mealId) => {
  const meal = await getMealById(mealId);
  if (!meal) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Meal not found');
  }
  await meal.remove();
  return meal;
};

module.exports = {
  createMeal,
  getAllMeals,
  getMealById,
  updateMealById,
  deleteMealById,
};
