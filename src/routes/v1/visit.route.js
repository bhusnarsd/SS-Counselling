const express = require('express');
// const auth = require('../../middlewares/auth');
const { visitController } = require('../../controllers');

const router = express.Router();

router.route('/').post(visitController.createSchedule);
// .get(studentvisitControllerController.getAllStudent);

// router.route('/genrate-token').get(studentController.generateToken);
// router
//   .route('/:id')
//   .get(auth('superadmin', 'block_officer'), studentController.getStudentById)
//   .patch(auth('superadmin', 'block_officer'), studentController.updateStudent);
module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Student
 *   description: APIs for managing sansthan data
 */

/**
 * @swagger
 * /visit:
 *   post:
 *     summary: Create a user
 *     description: Only admins can create other users.
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Visit'
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Visit'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */
/**
 * @swagger
 * /student:
 *   get:
 *     summary: Get all sansthan data
 *     tags: [Student]
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
 * /student/{id}:
 *   get:
 *     summary: Get sansthan data by ID
 *     tags: [Student]
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
 *     tags: [Student]
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
 *     Visit:
 *       type: object
 *       properties:
 *         visitDate:
 *           type: date
 *         schoolId:
 *           type: string
 *         trainer:
 *           type: string
 *       required:
 *         - visitDate
 *         - schoolId
 *         - trainer
 */
