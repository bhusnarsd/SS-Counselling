const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { teacherValidation } = require('../../validations');
const { teacherController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .post(validate(teacherValidation.createTeacherSchema), teacherController.createTeacher)
  .get(
    auth('superadmin', 'district_officer', 'division_officer', 'state_officer', 'block_officer'),
    validate(teacherValidation.getAllTeacher),
    teacherController.getAllTeacher
  );
router
  .route('/get-requests/teacher')
  .get(
    auth('superadmin', 'district_officer', 'division_officer', 'state_officer', 'block_officer'),
    validate(teacherValidation.getAllTeacher),
    teacherController.getAllTeacherReq
  );
router
  .route('/:id')
  .get(
    auth('superadmin', 'district_officer', 'division_officer', 'state_officer', 'block_officer'),
    validate(teacherValidation.getTeacher),
    teacherController.getTeacherById
  )
  .patch(
    auth('superadmin', 'district_officer', 'division_officer', 'state_officer', 'block_officer'),
    validate(teacherValidation.updateTeacherSchema),
    teacherController.updateTeacher
  );
module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Teacher
 *   description: APIs for managing sansthan data
 */

/**
 * @swagger
 * /teacher:
 *   post:
 *     summary: Create a user
 *     description: Only admins can create other users.
 *     tags: [Teacher]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Teacher'
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Teacher'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */
/**
 * @swagger
 * /teacher:
 *   get:
 *     summary: Get all sansthan data
 *     tags: [Teacher]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: name
 *         in: query
 *         description: Name of the sansthan (optional)
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   sansthanName:
 *                     type: string
 *                   registrationDist:
 *                     type: string
 *                   state:
 *                     type: string
 *                   mobNumber:
 *                     type: number
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 */
/**
 * @swagger
 * /teacher/get-requests/teacher:
 *   get:
 *     summary: Get all requested sansrhan
 *     tags: [Teacher]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: name
 *         in: query
 *         description: Name of the sansthan (optional)
 *         schema:
 *           type: string
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
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   sansthanName:
 *                     type: string
 *                   registrationDist:
 *                     type: string
 *                   state:
 *                     type: string
 *                   mobNumber:
 *                     type: number
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 */

/**
 * @swagger
 * /teacher/{id}:
 *   get:
 *     summary: Get sansthan data by ID
 *     tags: [Teacher]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the sansthan
 *         schema:
 *           type: string
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
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sansthanName:
 *                   type: string
 *                 registrationDist:
 *                   type: string
 *                 state:
 *                   type: string
 *                 mobNumber:
 *                   type: number
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update sansthan data by ID
 *     tags: [Teacher]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/Teacher'
 *     responses:
 *       "200":
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sansthanName:
 *                   type: string
 *                 registrationDist:
 *                   type: string
 *                 state:
 *                   type: string
 *                 mobNumber:
 *                   type: number
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *       "500":
 *         $ref: '#/components/responses/InternalServer'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Teacher:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         caste:
 *           type: string
 *         gender:
 *           type: string
 *         age:
 *           type: integer
 *         mobNumber:
 *           type: integer
 *         email:
 *           type: string
 *           format: email
 *         address:
 *           type: string
 *         pinCode:
 *           type: integer
 *         reservationDetails:
 *           type: string
 *         marks:
 *           type: integer
 *         qualification:
 *           type: string
 *         yearOfPassing:
 *           type: integer
 *         persentage:
 *           type: string
 *         univercityName:
 *           type: string
 *         subject:
 *           type: string
 *         collegeName:
 *           type: string
 *         profssionalQualification:
 *           type: string
 *         isVerified:
 *           type: boolean
 *       required:
 *         - name
 *         - mobNumber
 *         - email
 */
