/* eslint-disable prettier/prettier */
const express = require('express');
const validate = require('../../middlewares/validate');
const { courseEnrollmentValidation } = require('../../validations');
const { courseEntrollmentController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .post(validate(courseEnrollmentValidation.createEnrollment), courseEntrollmentController.createEnrollment)
  .get(validate(courseEnrollmentValidation.getAllEnrollments), courseEntrollmentController.getEnrollment);

router
  .route('/:enrollmentId')
  .get(validate(courseEnrollmentValidation.getEnrollment), courseEntrollmentController.getEnrollmentById)
  .patch(validate(courseEnrollmentValidation.updateEnrollmentById), courseEntrollmentController.updateEnrollment)
  .delete(validate(courseEnrollmentValidation.deleteEnrollmentById), courseEntrollmentController.deleteEnrollment);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: CourseEnrollment
 *   description: Course Enrollment management and retrieval
 */

/**
 * @swagger
 * /course-enrollment:
 *   post:
 *     summary: Enroll in a course
 *     description: Endpoint to enroll in a course
 *     tags: [CourseEnrollment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CourseEnrollment'
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CourseEnrollment'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *   get:
 *     summary: Get all enrollments
 *     description: Retrieve all enrollments
 *     tags: [CourseEnrollment]
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
 *                 $ref: '#/components/schemas/CourseEnrollment'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /course-enrollment/{enrollmentId}:
 *   get:
 *     summary: Get a enrollment by ID
 *     description: Endpoint to retrieve an enrollment by its ID
 *     tags: [CourseEnrollment]
 *     parameters:
 *       - in: path
 *         name: enrollmentId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the enrollment to retrieve
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CourseEnrollment'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *       "500":
 *         description: Internal Server Error
 *
 *   patch:
 *     summary: Update an enrollment by ID
 *     description: Endpoint to update an enrollment by its ID
 *     tags: [CourseEnrollment]
 *     parameters:
 *       - in: path
 *         name: enrollmentId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the enrollment to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CourseEnrollment'
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CourseEnrollment'
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
 *     summary: Delete an enrollment by ID
 *     description: Endpoint to delete an enrollment by its ID
 *     tags: [CourseEnrollment]
 *     parameters:
 *       - in: path
 *         name: enrollmentId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the enrollment to delete
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
 *     CourseEnrollment:
 *       type: object
 *       properties:
 *         courseName:
 *           type: string
 *         courseObjectId:
 *           type: string
 *         teacherName:
 *           type: string
 *         teacherId:
 *           type: string
 *         scode:
 *           type: string
 *         feedback:
 *           type: string
 *         schoolName:
 *           type: string
 *         status:
 *           type: string
 *         contactNo:
 *           type: number
 *       required:
 *         - courseName
 *         - courseObjectId
 *         - teacherName
 *         - teacherId
 *         - scode
 *         - contactNo
 *         - feedback
 *         - schoolName 
 *         - status 
 * 
 */
