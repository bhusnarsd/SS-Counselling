/* eslint-disable prettier/prettier */
const express = require('express');
const validate = require('../../middlewares/validate');
const { teacherTrainingValidation } = require('../../validations');
const { teacherTrainingController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .post(validate(teacherTrainingValidation.createCourse), teacherTrainingController.createCourse)
  .get(validate(teacherTrainingValidation.getAllCourses), teacherTrainingController.getCourse);

router
  .route('/:courseId')
  .get(validate(teacherTrainingValidation.getCourse), teacherTrainingController.getCourseById)
  .patch(validate(teacherTrainingValidation.updateCourseById), teacherTrainingController.updateCourse)
  .delete(validate(teacherTrainingValidation.deleteCourseById), teacherTrainingController.deleteCourse);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: TeacherTraining
 *   description: Teacher Training management and retrieval
 */

/**
 * @swagger
 * /teacher-training:
 *   post:
 *     summary: Create a teacher training course
 *     description: Endpoint to create a new teacher training course
 *     tags: [TeacherTraining]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TeacherTraining'
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TeacherTraining'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *   get:
 *     summary: Get all teacher training courses
 *     description: Retrieve all teacher training courses
 *     tags: [TeacherTraining]
 *     parameters:
 *       - in: query
 *         name: courseName
 *         schema:
 *           type: string
 *         description: courseName
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
 *                 $ref: '#/components/schemas/TeacherTraining'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /teacher-training/{courseId}:
 *   get:
 *     summary: Get a teacher training course by ID
 *     description: Endpoint to retrieve a teacher training course by its ID
 *     tags: [TeacherTraining]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the teacher training course to retrieve
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TeacherTraining'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *       "500":
 *         description: Internal Server Error
 *
 *   patch:
 *     summary: Update a teacher training course by ID
 *     description: Endpoint to update a teacher training course by its ID
 *     tags: [TeacherTraining]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the teacher training course to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TeacherTraining'
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TeacherTraining'
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
 *     summary: Delete a teacher training course by ID
 *     description: Endpoint to delete a teacher training course by its ID
 *     tags: [TeacherTraining]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the teacher training course to delete
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
 *     TeacherTraining:
 *       type: object
 *       properties:
 *         courseName:
 *           type: string
 *         courseCode:
 *           type: string
 *         courseDetails:
 *           type: string
 *         startDate:
 *           type: string
 *           format: date-time
 *         courseTimeLength:
 *           type: string
 *         professorName:
 *           type: string
 *         contactNo:
 *           type: integer
 *         path:
 *           type: string
 *         image:
 *           type: string
 *         enrollment:
 *           type: string
 *       required:
 *         - courseName
 *         - courseCode
 *         - courseDetails
 *         - startDate
 *         - courseTimeLength
 *         - professorName
 *         - contactNo
 *         - path
 *         - image
 *         - enrollment
 */


