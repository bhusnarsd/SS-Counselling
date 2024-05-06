/* eslint-disable prettier/prettier */
const express = require('express');
const validate = require('../../middlewares/validate');
const { selfAssessmentValidation } = require('../../validations');
const { selfAssessmentController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .post(validate(selfAssessmentValidation.createSelfAssessment), selfAssessmentController.createSelfAssessment)
  .get(validate(selfAssessmentValidation.getAllSelfAssessments), selfAssessmentController.getSelfAssessment);

router
  .route('/:selfAssessmentId')
  .get(validate(selfAssessmentValidation.getSelfAssessment), selfAssessmentController.getSelfAssessmentById)
  .patch(validate(selfAssessmentValidation.updateSelfAssessmentById), selfAssessmentController.updateSelfAssessment)
  .delete(validate(selfAssessmentValidation.deleteSelfAssessmentById), selfAssessmentController.deleteSelfAssessment);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: SelfAssessment
 *   description: Self Assessment management and retrieval
 */

/**
 * @swagger
 * /self-assessment:
 *   post:
 *     summary: Create a self assessment
 *     description: Endpoint to create a new self assessment
 *     tags: [SelfAssessment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SelfAssessment'
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SelfAssessment'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *   get:
 *     summary: Get all self assessments
 *     description: Retrieve all self assessments
 *     tags: [SelfAssessment]
 *     parameters:
 *       - in: query
 *         name: trainingName
 *         schema:
 *           type: string
 *         description: trainingName
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
 *                 $ref: '#/components/schemas/SelfAssessment'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /self-assessment/{selfAssessmentId}:
 *   get:
 *     summary: Get a self assessment by ID
 *     description: Endpoint to retrieve a self assessment by its ID
 *     tags: [SelfAssessment]
 *     parameters:
 *       - in: path
 *         name: selfAssessmentId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the self assessment to retrieve
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SelfAssessment'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *       "500":
 *         description: Internal Server Error
 *
 *   patch:
 *     summary: Update a self assessment by ID
 *     description: Endpoint to update a self assessment by its ID
 *     tags: [SelfAssessment]
 *     parameters:
 *       - in: path
 *         name: selfAssessmentId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the self assessment to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SelfAssessment'
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SelfAssessment'
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
 *     summary: Delete a self assessment by ID
 *     description: Endpoint to delete a self assessment by its ID
 *     tags: [SelfAssessment]
 *     parameters:
 *       - in: path
 *         name: selfAssessmentId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the self assessment to delete
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
 *     SelfAssessment:
 *       type: object
 *       properties:
 *         trainingName:
 *           type: string
 *         description:
 *           type: string
 *         teacherName:
 *           type: string
 *         teacherId:
 *           type: string
 *         category:
 *           type: string
 *         block:
 *           type: string
 *         district:
 *           type: string
 *         division:
 *           type: string
 *         status:
 *           type: string
 *           enum: [pending, approve, rejected]
 *         scode:
 *           type: string
 *       required:
 *         - trainingName
 *         - description
 *         - teacherName
 *         - teacherId
 *         - category
 *         - block
 *         - district
 *         - division
 *         - scode
 *         - trainingId
 *         - schoolName
 *       example:
 *         trainingName: Sample Training
 *         description: Sample description
 *         teacherName: John Doe
 *         teacherId: abcd123456
 *         category: Sample Category
 *         block: Sample Block
 *         district: Sample District
 *         division: Sample Division
 *         status: pending
 *         scode: ABC123
 *         trainingId : 6602a29b7d3667dd06b5ea97
 *         schoolName : school name
 */
