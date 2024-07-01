const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { userAnswerValidation } = require('../../validations');
const { userAnswerController } = require('../../controllers');
const router = express.Router();

router
  .route('/')
  .post(
    auth('admin', 'school', 'superadmin', 'student', 'cluster', 'trainer', 'department'),
    validate(userAnswerValidation.createUserAnswer),
    userAnswerController.createUserAnswer
  )
  .get(
    auth('admin', 'school', 'superadmin', 'student', 'trainer', 'cluster', 'department'),
    validate(userAnswerValidation.getUserAnswers),
    userAnswerController.getUserAnswers
  );

router
  .route('/:UserAnswerId')
  .get(
    auth('admin', 'school', 'superadmin', 'student', 'cluster', 'trainer', 'department'),
    validate(userAnswerValidation.getUserAnswerById),
    userAnswerController.getUserAnswer
  )
  .patch(
    auth('admin', 'school', 'superadmin', 'student', 'cluster', 'trainer', 'department'),
    validate(userAnswerValidation.updateUserAnswer),
    userAnswerController.updateUserAnswer
  )
  .delete(
    auth('admin', 'school', 'superadmin', 'student', 'cluster', 'trainer', 'department'),
    validate(userAnswerValidation.deleteUserAnswer),
    userAnswerController.deleteUserAnswer
  );

module.exports = router;