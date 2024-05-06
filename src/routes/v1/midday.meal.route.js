/* eslint-disable prettier/prettier */
const express = require('express');
const validate = require('../../middlewares/validate');
const { middayMealValidation } = require('../../validations');
const { middayMealController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .post(validate(middayMealValidation.createMeal), middayMealController.createMeal)
  .get(validate(middayMealValidation.getAllMeals), middayMealController.getMeal);

router
  .route('/:mealId')
  .get(validate(middayMealValidation.getMeal), middayMealController.getMealById)
  .patch(validate(middayMealValidation.updateMealById), middayMealController.updateMeal)
  .delete(validate(middayMealValidation.deleteMealById), middayMealController.deleteMeal);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: MiddayMeal
 *   description: Midday Meal management and retrieval
 */

/**
 * @swagger
 * /midday-meal:
 *   post:
 *     summary: Create a midday meal
 *     description: Endpoint to create a new midday meal
 *     tags: [MiddayMeal]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MiddayMeal'
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MiddayMeal'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *   get:
 *     summary: Get all midday meals
 *     description: Retrieve all midday meals
 *     tags: [MiddayMeal]
 *     parameters:
 *       - in: query
 *         name: receipeName
 *         schema:
 *           type: string
 *         description: receipeName
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of users
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MiddayMeal'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /midday-meal/{mealId}:
 *   get:
 *     summary: Get a midday meal by ID
 *     description: Endpoint to retrieve a midday meal by its ID
 *     tags: [MiddayMeal]
 *     parameters:
 *       - in: path
 *         name: mealId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the midday meal to retrieve
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MiddayMeal'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *       "500":
 *         description: Internal Server Error
 *
 *   patch:
 *     summary: Update a midday meal by ID
 *     description: Endpoint to update a midday meal by its ID
 *     tags: [MiddayMeal]
 *     parameters:
 *       - in: path
 *         name: mealId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the midday meal to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MiddayMeal'
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MiddayMeal'
 *       "400":
 *         description: Bad request. Invalid input data.
 *       "401":
 *         $ref: '#/responses/Unauthorized'
 *       "404":
 *         $ref: '#/responses/NotFound'
 *       "500":
 *         description: Internal Server Error
 *
 *   delete:
 *     summary: Delete a midday meal by ID
 *     description: Endpoint to delete a midday meal by its ID
 *     tags: [MiddayMeal]
 *     parameters:
 *       - in: path
 *         name: mealId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the midday meal to delete
 *     responses:
 *       "204":
 *         description: No Content
 *       "401":
 *         $ref: '#/responses/Unauthorized'
 *       "404":
 *         $ref: '#/responses/NotFound'
 *       "500":
 *         description: Internal Server Error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     MiddayMeal:
 *       type: object
 *       properties:
 *         receipeName:
 *           type: string
 *         day:
 *           type: string
 *         time:
 *           type: string
 *       required:
 *         - receipeName
 *         - day
 *         - time
 */
