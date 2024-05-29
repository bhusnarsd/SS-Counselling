// const httpStatus = require('http-status');
const { Notification } = require('../models');
// const ApiError = require('../utils/ApiError');

const createNotification = async (notificationData) => {
  return Notification.create(notificationData);
};

const getNotificationsByUserId = async (userId) => {
  return Notification.find({ userId });
};

const markAsRead = async (notificationId) => {
  return Notification.findByIdAndUpdate(notificationId, { read: true }, { new: true });
};

module.exports = {
  createNotification,
  getNotificationsByUserId,
  markAsRead,
};
