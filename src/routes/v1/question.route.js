const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { questionValidation } = require('../../validations');
const { questionController } = require('../../controllers');
const router = express.Router();

router
  .route('/')
  .post(
    auth('admin', 'school', 'superadmin', 'student', 'cluster', 'trainer', 'department'),
    validate(questionValidation.createQuestion),
    questionController.createQuestion
  )
  .get(
    auth('admin', 'school', 'superadmin', 'student', 'trainer', 'cluster', 'department'),
    validate(questionValidation.getQuestions),
    questionController.getQuestions
  );

router
  .route('/:QuestionId')
  .get(
    auth('admin', 'school', 'superadmin', 'student', 'cluster', 'trainer', 'department'),
    validate(questionValidation.getQuestionById),
    questionController.getQuestion
  )
  .patch(
    auth('admin', 'school', 'superadmin', 'student', 'cluster', 'trainer', 'department'),
    validate(questionValidation.updateQuestion),
    questionController.updateQuestion
  )
  .delete(
    auth('admin', 'school', 'superadmin', 'student', 'cluster', 'trainer', 'department'),
    validate(questionValidation.deleteQuestion),
    questionController.deleteQuestion
  );

module.exports = router;