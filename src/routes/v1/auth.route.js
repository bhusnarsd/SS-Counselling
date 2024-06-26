const express = require('express');
const validate = require('../../middlewares/validate');
const authValidation = require('../../validations/auth.validation');
const authController = require('../../controllers/auth.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('/register', validate(authValidation.register), authController.register);
router.post('/login', validate(authValidation.login), authController.login);
router.post('/logout', validate(authValidation.logout), authController.logout);
router.post('/refresh-tokens', validate(authValidation.refreshTokens), authController.refreshTokens);
router.post('/forgot-password', validate(authValidation.forgotPassword), authController.forgotPassword);
router.post('/otp-send', validate(authValidation.sendOtp), authController.initiatePasswordReset);
router.post('/reset-password', validate(authValidation.resetPassword), authController.resetPassword);
router.post(
  '/reset-password-with-username',
  validate(authValidation.resetPasswordWithUserName),
  authController.resetPasswordWithUserName
);
router.post('/send-verification-email', auth(), authController.sendVerificationEmail);
router.post('/verify-email', validate(authValidation.verifyEmail), authController.verifyEmail);

// router.post('/sansthan-register', validate(authValidation.sansthanRegister), authController.sansthanRegister);
// router.post('/verify-number', validate(authValidation.verifyMobNumber), authController.verifyNumber);
// router.post('/verify-userId', validate(authValidation.checkUserIdExist), authController.checkUserIdExist);
// router.post('/sansthan-login', validate(authValidation.sansthanLogin), authController.loginSansthan);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register as user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - username
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               username:
 *                 type: string
 *                 format: username
 *                 description: must be unique
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: At least one number and one letter
 *             example:
 *               name: fake name
 *               username: fake@example.com
 *               password: password1
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 tokens:
 *                   $ref: '#/components/schemas/AuthTokens'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 format: username
 *               password:
 *                 type: string
 *                 format: password
 *             example:
 *               username: fake@example.com
 *               password: password1
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 tokens:
 *                   $ref: '#/components/schemas/AuthTokens'
 *       "401":
 *         description: Invalid username or password
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               code: 401
 *               message: Invalid username or password
 */

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *             example:
 *               refreshToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWJhYzUzNDk1NGI1NDEzOTgwNmMxMTIiLCJpYXQiOjE1ODkyOTg0ODQsImV4cCI6MTU4OTMwMDI4NH0.m1U63blB0MLej_WfB7yC2FTMnCziif9X8yzwDEfJXAg
 *     responses:
 *       "204":
 *         description: No content
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /auth/refresh-tokens:
 *   post:
 *     summary: Refresh auth tokens
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *             example:
 *               refreshToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWJhYzUzNDk1NGI1NDEzOTgwNmMxMTIiLCJpYXQiOjE1ODkyOTg0ODQsImV4cCI6MTU4OTMwMDI4NH0.m1U63blB0MLej_WfB7yC2FTMnCziif9X8yzwDEfJXAg
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthTokens'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Forgot password
 *     description: An username will be sent to reset password.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *             properties:
 *               username:
 *                 type: string
 *                 format: username
 *             example:
 *               username: fake@example.com
 *     responses:
 *       "204":
 *         description: No content
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Reset password
 *     tags: [Auth]
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: The reset password token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: At least one number and one letter
 *             example:
 *               password: password1
 *     responses:
 *       "204":
 *         description: No content
 *       "401":
 *         description: Password reset failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               code: 401
 *               message: Password reset failed
 */

/**
 * @swagger
 * /auth/send-verification-username:
 *   post:
 *     summary: Send verification username
 *     description: An username will be sent to verify username.
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "204":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /auth/verify-username:
 *   post:
 *     summary: verify username
 *     tags: [Auth]
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: The verify username token
 *     responses:
 *       "204":
 *         description: No content
 *       "401":
 *         description: verify username failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               code: 401
 *               message: verify username failed
 */

// /**
//  * @swagger
//  * /auth/sansthan-register:
//  *   post:
//  *     summary: Register as sansthan
//  *     tags: [Auth]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - sansthanName
//  *               - userID
//  *               - password
//  *               - mobNumber
//  *               - registrationDist
//  *               - state
//  *               - otp
//  *             properties:
//  *               sansthanName:
//  *                 type: string
//  *               userID:
//  *                 type: string
//  *                 format: email
//  *                 description: must be unique
//  *               password:
//  *                 type: string
//  *                 format: password
//  *                 minLength: 8
//  *                 description: At least one number and one letter
//  *               mobNumber:
//  *                 type: number
//  *               state:
//  *                 type: string
//  *               registrationDist:
//  *                 type: string
//  *               otp:
//  *                 type: number
//  *             example:
//  *               sansthanName: fake name
//  *               userID: 13435y6
//  *               mobNumber: 9823354657
//  *               registrationDist: fake district
//  *               state: maharashta
//  *               otp: 786879
//  *               password: password1
//  *     responses:
//  *       "201":
//  *         description: Created
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 sansthan:
//  *                   $ref: '#/components/schemas/Sansthan'
//  *       "400":
//  *         $ref: '#/components/responses/DuplicateEmail'
//  */
// /**
//  * @swagger
//  * /auth/sansthan-login:
//  *   post:
//  *     summary: Login
//  *     tags: [Auth]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - userID
//  *               - password
//  *             properties:
//  *               userID:
//  *                 type: string
//  *               password:
//  *                 type: string
//  *                 format: password
//  *             example:
//  *               userID: fake UserID
//  *               password: password1
//  *     responses:
//  *       "200":
//  *         description: Successful operation
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 sansthanName:
//  *                   type: string
//  *                 registrationDist:
//  *                   type: string
//  *                 state:
//  *                   type: string
//  *                 userID:
//  *                   type: string
//  *                 mobNumber:
//  *                   type: number
//  *                 tokens:
//  *                   $ref: '#/components/schemas/AuthTokens'
//  *       "401":
//  *         description: Invalid email or password
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Error'
//  *             example:
//  *               code: 401
//  *               message: Invalid email or password
//  */
// /**
//  * @swagger
//  * /auth/verify-userId:
//  *   post:
//  *     summary: Verify userId number
//  *     tags: [Auth]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - userID
//  *             properties:
//  *               userID:
//  *                 type: string
//  *             example:
//  *               userID: "12356594679"
//  *     responses:
//  *       "204":
//  *         description: No content
//  *       "401":
//  *         description: Verify userID failed
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Error'
//  *             example:
//  *               code: 401
//  *               message: Verify userID failed
//  */
// /**
//  * @swagger
//  * /auth/verify-number:
//  *   post:
//  *     summary: Verify user number
//  *     tags: [Auth]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - mobNumber
//  *             properties:
//  *               mobNumber:
//  *                 type: string
//  *             example:
//  *               mobNumber: "44563767"
//  *     responses:
//  *       "204":
//  *         description: No content
//  *       "401":
//  *         description: Verify mobalie number failed
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Error'
//  *             example:
//  *               code: 401
//  *               message: Verify userID failed
//  */
