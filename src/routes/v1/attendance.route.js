const express = require('express');
// const auth = require('../../middlewares/auth');
const { attendanceController } = require('../../controllers');

const router = express.Router();

router.route('/').post(attendanceController.getAttendanceByDateAndScode);
router.route('/liveattendance').post(attendanceController.CreateORUpdateAttendance);
router.route('/class-wise-count').get(attendanceController.getAllAttendanceCount);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Attendance
 *   description: APIs for managing attendance data
 */

/**
 * @swagger
 * /attendance/class-wise-count:
 *   get:
 *     summary: Get class-wise attendance count
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 classWiseAttendance:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       classSection:
 *                         type: string
 *                       totalPresent:
 *                         type: integer
 *                       totalAbsent:
 *                         type: integer
 *                       presentPercent:
 *                         type: string
 *                       absentPercent:
 *                         type: string
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /attendance:
 *   post:
 *     summary: analysis
 *     description: Only admins can create other users.
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - scode
 *             properties:
 *               scode:
 *                 type: string
 *               date:
 *                 type: date
 *               division:
 *                 type: string
 *             example:
 *               scode: 2456
 *               date: 2024-04-30
 *     responses:
 *       "201":
 *         description: Created
 */

/**
 * @swagger
 * /attendance/liveattendance:
 *   post:
 *     summary: analysis
 *     description: Only admins can create other users.
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - district
 *             properties:
 *               district:
 *                 type: string
 *               scode:
 *                 type: string
 *               date:
 *                 type: date
 *               division:
 *                 type: string
 *             example:
 *               district: AHMADNAGAR
 *               division: NASHIK
 *               scode: 2456
 *               date: 2024-04-30
 *     responses:
 *       "201":
 *         description: Created
 */
