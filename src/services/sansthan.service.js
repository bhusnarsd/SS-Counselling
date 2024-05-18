/* eslint-disable no-param-reassign */
const httpStatus = require('http-status');
const { Sansthan, User, School } = require('../models');
const ApiError = require('../utils/ApiError');
const userService = require('./user.service');
// const otpService = require('./otp.service');

/**
 * Create a sansthan
 * @param {Object} sansthanBody
 * @returns {Promise<Sansthan>}
 */
const createSansthan = async (sansthanBody) => {
  const { userName } = sansthanBody;
  if ((await Sansthan.isUserNameTaken(userName)) && (await User.isEmailTaken(userName))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'userName  already taken');
  }
  // await otpService.verifyOtp(mobNumber, otp);
  return Sansthan.create(sansthanBody);
};

// TO check userID alredy exist or not
const checkUserIdExist = async (userID) => {
  if (await Sansthan.isUserIDTaken(userID)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'UserID  already taken');
  }
};

/**
 * Query for sansthan
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const querySansthan = async (filter, options) => {
  const sansthans = await Sansthan.paginate(filter, options);
  return sansthans;
};

const getSansthanById = async (id) => {
  return Sansthan.findById(id);
};

const getSansthanByUserID = async (userID) => {
  return Sansthan.findOne({ userID });
};

const getSchoolBysansthan = async (sansthan) => {
  return School.find({ sansthan });
};

const getSchoolCountsOfsansthan = async (sansthan) => {
  const schoolCount = await School.countDocuments({ sansthan });
  const result = await School.aggregate([
    { $match: { sansthan } },
    {
      $group: {
        _id: null,
        totalStudents: { $sum: '$total_student' },
        totoalTeacher: { $sum: '$total_teacher' },
      },
    },
  ]);
  return { schoolCount, result };
};

/**
 * Update user by id
 * @param {ObjectId} sansthanId
 * @param {Object} updateBody
 * @returns {Promise<Sansthan>}
 */
const updateSansthanById = async (sansthanId, updateBody) => {
  const sansthan = await getSansthanById(sansthanId);
  if (!sansthan) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Sansthan not found');
  }
  Object.assign(sansthan, updateBody);
  await sansthan.save();
  return sansthan;
};

const assignSchoolTOsansthan = async (udisecodeArray, userName) => {
  // Find schools by udisecodeArray
  const schools = await School.find({ udisecode: { $in: udisecodeArray } });

  // Update sansthan field for each school
  const updatedSchools = await Promise.all(
    schools.map(async (schoolData) => {
      schoolData.sansthan = userName;
      await schoolData.save(); // Save the updated school
      return schoolData;
    })
  );

  return updatedSchools;
};

const verifySansthanById = async (sansthanId) => {
  const sansthan = await getSansthanById(sansthanId);
  if (!sansthan) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Sansthan not found');
  }
  const updatebody = {
    isVerified: true,
  };
  const body = {
    username: sansthan.userName,
    name: sansthan.sansthanName,
    password: sansthan.password,
    role: 'sansthan',
    asssignedTo: sansthan.userName,
  };
  await userService.createUser(body);
  Object.assign(sansthan, updatebody);
  assignSchoolTOsansthan(sansthan.udiseNumbers, sansthan.userName);
  await sansthan.save();
  return sansthan;
};

module.exports = {
  createSansthan,
  updateSansthanById,
  getSansthanById,
  querySansthan,
  getSansthanByUserID,
  checkUserIdExist,
  verifySansthanById,
  getSchoolBysansthan,
  getSchoolCountsOfsansthan,
};
