const express = require('express');
const auth = require('../../middlewares/auth');
const { notificationController } = require('../../controllers');

const router = express.Router();

router.route('/').post(notificationController.createNotification).get(notificationController.getNotifications);

router.route('/:notificationId/read').patch(notificationController.markNotificationAsRead);

module.exports = router;
