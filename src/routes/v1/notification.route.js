const express = require('express');
const auth = require('../../middlewares/auth');
const { notificationController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .post(
    auth('admin', 'school', 'superadmin', 'student', 'trainer', 'department', 'skillTrainer'),
    notificationController.createNotification
  )
  .get(
    auth('admin', 'school', 'superadmin', 'student', 'trainer', 'department', 'skillTrainer'),
    notificationController.getNotifications
  );

router.route('/:userId/read').patch(notificationController.markNotificationAsRead);

module.exports = router;
