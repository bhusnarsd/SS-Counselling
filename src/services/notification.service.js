// const httpStatus = require('http-status');
const { Notification } = require('../models');
// const ApiError = require('../utils/ApiError');

const createNotification = async (notificationData) => {
  return Notification.create(notificationData);
};

const getNotificationsByUserId = async (userId) => {
  return Notification.find({ userId });
};

const markAsRead = async (userId) => {
  const result = await Notification.updateMany(
    { userId }, // Find notifications by userId
    { $set: { read: true } }, // Set the read field to true
    { new: true } // Return the updated documents
  );
  return result;
};

module.exports = {
  createNotification,
  getNotificationsByUserId,
  markAsRead,
};
