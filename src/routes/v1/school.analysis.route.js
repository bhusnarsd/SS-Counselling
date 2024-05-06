/* eslint-disable prettier/prettier */
const express = require('express');
const { schoolAnalysisController } = require('../../controllers');

const router = express.Router();

router
  .route('/data-analysis-states')
  .get(schoolAnalysisController.getSchoolCategoryCounts)

  router
  .route('/data-analysis-states/district-wise')
  .post(schoolAnalysisController.getSchoolCategoryCountsDistrict)
router
  .route('/data-analysis-states/mgmt')
  .get(schoolAnalysisController.geDataAnalysisCounts)
router
  .route('/data-analysis-states/mgmt/district-wise')
  .post(schoolAnalysisController.geDataAnalysisMgmCountsDistrict)
router
  .route('/data-analysis-states/infra')
  .get(schoolAnalysisController.geDataAnalysisCounts3)
  router
  .route('/data-analysis-states/infra/disrtict-wise')
  .post(schoolAnalysisController.geDataAnalysisCounts3District)
router
  .route('/data-analysis/teacher')
  .get(schoolAnalysisController.geDataAnalysisCounts4)

router
  .route('/data-analysis/teacher/district-wise')
  .post(schoolAnalysisController.geDataAnalysisCounts4District)
  
module.exports = router;

/**
 * @swagger
 * tags:
 *   name: SchoolAnalysis
 *   description: APIs for managing School Analysis  data
 */

/**
 * @swagger
 * /school-analysis/data-analysis-states:
 *   get:
 *     summary: Get counts of schools for each school category
 *     tags: [SchoolAnalysis]
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: School category ID
 *                   count:
 *                     type: number
 *                     description: Count of schools for the category
 *       "500":
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * @swagger
 * /school-analysis/data-analysis-states/district-wise:
 *   post:
 *     summary: analysis
 *     description: Only admins can create other users.
 *     tags: [SchoolAnalysis]
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
 *             example:
 *               district: AHMADNAGAR
 *     responses:
 *       "201":
 *         description: Created
 */

/**
 * @swagger
 * /school-analysis/data-analysis-states/mgmt:
 *   get:
 *     summary: Get counts of schools for each school category
 *     tags: [SchoolAnalysis]
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: School category ID
 *                   count:
 *                     type: number
 *                     description: Count of schools for the category
 *       "500":
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * @swagger
 * /school-analysis/data-analysis-states/mgmt/district-wise:
 *   post:
 *     summary: analysis
 *     description: Only admins can create other users.
 *     tags: [SchoolAnalysis]
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
 *             example:
 *               district: AHMADNAGAR
 *     responses:
 *       "201":
 *         description: Created
 */
/**
 * @swagger
 * /school-analysis/data-analysis-states/infra:
 *   get:
 *     summary: Get counts of schools for each school category
 *     tags: [SchoolAnalysis]
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: School category ID
 *                   count:
 *                     type: number
 *                     description: Count of schools for the category
 *       "500":
 *         $ref: '#/components/responses/InternalServerError'
 */


/**
 * @swagger
 * /school-analysis/data-analysis-states/infra/disrtict-wise:
 *   post:
 *     summary: analysis
 *     description: Only admins can create other users.
 *     tags: [SchoolAnalysis]
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
 *             example:
 *               district: AHMADNAGAR
 *     responses:
 *       "201":
 *         description: Created
 */
/**
 * @swagger
 * /school-analysis/data-analysis/teacher:
 *   get:
 *     summary: Get counts of schools for each school category
 *     tags: [SchoolAnalysis]
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: School category ID
 *                   count:
 *                     type: number
 *                     description: Count of schools for the category
 *       "500":
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * @swagger
 * /school-analysis/data-analysis/teacher/district-wise:
 *   get:
 *     summary: Get counts of schools for each school category
 *     tags: [SchoolAnalysis]
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: School category ID
 *                   count:
 *                     type: number
 *                     description: Count of schools for the category
 *       "500":
 *         $ref: '#/components/responses/InternalServerError'
 */


/**
 * @swagger
 * /school-analysis/data-analysis/teacher/district-wise:
 *   post:
 *     summary: analysis
 *     description: Only admins can create other users.
 *     tags: [SchoolAnalysis]
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
 *             example:
 *               district: AHMADNAGAR
 *     responses:
 *       "201":
 *         description: Created
 */