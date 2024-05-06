const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createMeal = {
  body: Joi.object().keys({
    receipeName: Joi.string().required(),
    day: Joi.string().required(),
    time: Joi.string().required(),
  }),
};

const getAllMeals = {
  query: Joi.object().keys({
    receipeName: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getMeal = {
  params: Joi.object().keys({
    mealId: Joi.string().custom(objectId),
  }),
};

const updateMealById = {
  params: Joi.object().keys({
    mealId: Joi.string(),
  }),
  body: Joi.object()
    .keys({
      receipeName: Joi.string(),
      day: Joi.string(),
      time: Joi.string(),
    })
    .min(1),
};
const deleteMealById = {
  params: Joi.object().keys({
    mealId: Joi.string(),
  }),
};

module.exports = {
  createMeal,
  getAllMeals,
  getMeal,
  updateMealById,
  deleteMealById,
};
