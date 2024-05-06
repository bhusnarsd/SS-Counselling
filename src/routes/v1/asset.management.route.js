const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { assetManagementValidation } = require('../../validations');
const { assetManagementController } = require('../../controllers');

const router = express.Router();

router
  .route('/section1a1to10/general-information/:scode')
  .get(
    auth('user', 'admin', 'superadmin', 'district_officer', 'division_officer', 'state_officer', 'block_officer'),
    validate(assetManagementValidation.getSection1a1to10ByScode),
    assetManagementController.getSection1a1to10ByScode
  );
router
  .route('/section1A20/:scode')
  .get(
    auth('user', 'admin', 'superadmin', 'district_officer', 'division_officer', 'state_officer', 'block_officer'),
    validate(assetManagementValidation.getSection1a1to10ByScode),
    assetManagementController.getSection1A20ByScode
  );
router
  .route('/section1A30/hostel/:scode')
  .get(
    auth('user', 'admin', 'superadmin', 'district_officer', 'division_officer', 'state_officer', 'block_officer'),
    validate(assetManagementValidation.getSection1a1to10ByScode),
    assetManagementController.getSection1A30ByScode
  );
router
  .route('/section1A40/:scode')
  .get(
    auth('user', 'admin', 'superadmin', 'district_officer', 'division_officer', 'state_officer', 'block_officer'),
    validate(assetManagementValidation.getSection1a1to10ByScode),
    assetManagementController.getSection1A40ByScode
  );
router
  .route('/section1A50/:scode')
  .get(
    auth('user', 'admin', 'superadmin', 'district_officer', 'division_officer', 'state_officer', 'block_officer'),
    validate(assetManagementValidation.getSection1a1to10ByScode),
    assetManagementController.getSection1A50ByScode
  );
router
  .route('/section1A53/:scode')
  .get(
    auth('user', 'admin', 'superadmin', 'district_officer', 'division_officer', 'state_officer', 'block_officer'),
    validate(assetManagementValidation.getSection1a1to10ByScode),
    assetManagementController.getSection1A53ByScode
  );
router
  .route('/section1B54/:scode')
  .get(
    auth('user', 'admin', 'superadmin', 'district_officer', 'division_officer', 'state_officer', 'block_officer'),
    validate(assetManagementValidation.getSection1a1to10ByScode),
    assetManagementController.getSection1A54ByScode
  );
router
  .route('/section1C57/:scode')
  .get(
    auth('user', 'admin', 'superadmin', 'district_officer', 'division_officer', 'state_officer', 'block_officer'),
    validate(assetManagementValidation.getSection1a1to10ByScode),
    assetManagementController.getSection1A57ByScode
  );
router
  .route('/section1D60/:scode')
  .get(
    auth('user', 'admin', 'superadmin', 'district_officer', 'division_officer', 'state_officer', 'block_officer'),
    validate(assetManagementValidation.getSection1a1to10ByScode),
    assetManagementController.getSection1D60ByScode
  );
router
  .route('/section1E62/:scode')
  .get(
    auth('user', 'admin', 'superadmin', 'district_officer', 'division_officer', 'state_officer', 'block_officer'),
    validate(assetManagementValidation.getSection1a1to10ByScode),
    assetManagementController.getSection1E62ByScode
  );
router
  .route('/section2A21/land/building/drinkingwater/toilet/solarpanel/:scode')
  .get(
    auth('user', 'admin', 'superadmin', 'district_officer', 'division_officer', 'state_officer', 'block_officer'),
    validate(assetManagementValidation.getSection1a1to10ByScode),
    assetManagementController.getSection2A21ByScode
  );
router
  .route('/section2B27/digital-equipment/ictlab/:scode')
  .get(
    auth('user', 'admin', 'superadmin', 'district_officer', 'division_officer', 'state_officer', 'block_officer'),
    validate(assetManagementValidation.getSection1a1to10ByScode),
    assetManagementController.getSection2B27ByScode
  );
router
  .route('/section3A/:scode')
  .get(
    auth('user', 'admin', 'superadmin', 'district_officer', 'division_officer', 'state_officer', 'block_officer'),
    validate(assetManagementValidation.getSection1a1to10ByScode),
    assetManagementController.getSection3AByScode
  );

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: AssetManagement
 *   description: APIs for managing AssetManagement data
 */

/**
 * @swagger
 * /asset-management/section1a1to10/general-information/{scode}:
 *   get:
 *     summary: Get Section1a1to10 data by scode
 *     tags: [AssetManagement]
 *     parameters:
 *       - name: scode
 *         in: path
 *         description: scode of the school
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Section1A10Schema'
 *       "404":
 *         description: Section1a1to10 not found
 *         content:
 *           application/json:
 *             example:
 *               error: Section1a1to10 not found
 *       "500":
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */

/**
 * @swagger
 * /asset-management/section1A20/{scode}:
 *   get:
 *     summary: Get section1A20 data by scode
 *     tags: [AssetManagement]
 *     parameters:
 *       - name: scode
 *         in: path
 *         description: scode of the school
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Section1A10Schema'
 *       "404":
 *         description: Section1a1to10 not found
 *         content:
 *           application/json:
 *             example:
 *               error: Section1a1to10 not found
 *       "500":
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */

/**
 * @swagger
 * /asset-management/section1A30/hostel/{scode}:
 *   get:
 *     summary: Get section1A30 data by scode
 *     tags: [AssetManagement]
 *     parameters:
 *       - name: scode
 *         in: path
 *         description: scode of the school
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Section1A10Schema'
 *       "404":
 *         description: Section1a1to10 not found
 *         content:
 *           application/json:
 *             example:
 *               error: Section1a1to10 not found
 *       "500":
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */

/**
 * @swagger
 * /asset-management/section1A40/{scode}:
 *   get:
 *     summary: Get section1A40 data by scode
 *     tags: [AssetManagement]
 *     parameters:
 *       - name: scode
 *         in: path
 *         description: scode of the school
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Section1A10Schema'
 *       "404":
 *         description: Section1a1to10 not found
 *         content:
 *           application/json:
 *             example:
 *               error: Section1a1to10 not found
 *       "500":
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */

/**
 * @swagger
 * /asset-management/section1A50/{scode}:
 *   get:
 *     summary: Get section1A50 data by scode
 *     tags: [AssetManagement]
 *     parameters:
 *       - name: scode
 *         in: path
 *         description: scode of the school
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Section1A10Schema'
 *       "404":
 *         description: Section1a1to10 not found
 *         content:
 *           application/json:
 *             example:
 *               error: Section1a1to10 not found
 *       "500":
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */

/**
 * @swagger
 * /asset-management/section1A53/{scode}:
 *   get:
 *     summary: Get section1A53 data by scode
 *     tags: [AssetManagement]
 *     parameters:
 *       - name: scode
 *         in: path
 *         description: scode of the school
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Section1A10Schema'
 *       "404":
 *         description: Section1a1to10 not found
 *         content:
 *           application/json:
 *             example:
 *               error: Section1a1to10 not found
 *       "500":
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */

/**
 * @swagger
 * /asset-management/section1B54/{scode}:
 *   get:
 *     summary: Get section1A54 data by scode
 *     tags: [AssetManagement]
 *     parameters:
 *       - name: scode
 *         in: path
 *         description: scode of the school
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Section1A10Schema'
 *       "404":
 *         description: Section1a1to10 not found
 *         content:
 *           application/json:
 *             example:
 *               error: Section1a1to10 not found
 *       "500":
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */

/**
 * @swagger
 * /asset-management/section1C57/{scode}:
 *   get:
 *     summary: Get section1C57 data by scode
 *     tags: [AssetManagement]
 *     parameters:
 *       - name: scode
 *         in: path
 *         description: scode of the school
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Section1A10Schema'
 *       "404":
 *         description: Section1a1to10 not found
 *         content:
 *           application/json:
 *             example:
 *               error: Section1a1to10 not found
 *       "500":
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */
/**
 * @swagger
 * /asset-management/section1D60/{scode}:
 *   get:
 *     summary: Get section1D60 data by scode
 *     tags: [AssetManagement]
 *     parameters:
 *       - name: scode
 *         in: path
 *         description: scode of the school
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Section1A10Schema'
 *       "404":
 *         description: Section1a1to10 not found
 *         content:
 *           application/json:
 *             example:
 *               error: Section1a1to10 not found
 *       "500":
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */
/**
 * @swagger
 * /asset-management/section1E62/{scode}:
 *   get:
 *     summary: Get section1E62 data by scode
 *     tags: [AssetManagement]
 *     parameters:
 *       - name: scode
 *         in: path
 *         description: scode of the school
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Section1A10Schema'
 *       "404":
 *         description: Section1a1to10 not found
 *         content:
 *           application/json:
 *             example:
 *               error: Section1a1to10 not found
 *       "500":
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */

/**
 * @swagger
 * /asset-management/section2A21/land/building/drinkingwater/toilet/solarpanel/{scode}:
 *   get:
 *     summary: Get section2A21 land data by scode
 *     tags: [AssetManagement]
 *     parameters:
 *       - name: scode
 *         in: path
 *         description: scode of the school
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Section1A10Schema'
 *       "404":
 *         description: Section1a1to10 not found
 *         content:
 *           application/json:
 *             example:
 *               error: Section1a1to10 not found
 *       "500":
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */

/**
 * @swagger
 * /asset-management/section2B27/digital-equipment/ictlab/{scode}:
 *   get:
 *     summary: Get section2B27 data by scode
 *     tags: [AssetManagement]
 *     parameters:
 *       - name: scode
 *         in: path
 *         description: scode of the school
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Section1A10Schema'
 *       "404":
 *         description: Section1a1to10 not found
 *         content:
 *           application/json:
 *             example:
 *               error: Section1a1to10 not found
 *       "500":
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */

/**
 * @swagger
 * /asset-management/section3A/{scode}:
 *   get:
 *     summary: Get section3A data by scode
 *     tags: [AssetManagement]
 *     parameters:
 *       - name: scode
 *         in: path
 *         description: scode of the school
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Section1A10Schema'
 *       "404":
 *         description: Section1a1to10 not found
 *         content:
 *           application/json:
 *             example:
 *               error: Section1a1to10 not found
 *       "500":
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */
