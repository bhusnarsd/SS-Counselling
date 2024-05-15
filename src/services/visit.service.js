const httpStatus = require('http-status');
const mongoose = require('mongoose');
const { Student, User, Visit } = require('../models');
const ApiError = require('../utils/ApiError');

const scheduleVisit = async (trainerId, schoolId, visitDate) => {
  const visit = new Visit({
    trainer: trainerId,
    schoolId,
    visitDate,
  });
  await visit.save();
  // Update trainer's visits
  const trainer = await User.findById(trainerId);
  if (!trainer) {
    throw new Error('Trainer not found');
  }
  trainer.visits.push(visit._id);
  await trainer.save();

  return visit; // Return the saved visit
};
// Replace with the desired visit date

// scheduleVisit(trainerId, schoolId, visitDate)
//   .then((result) => {
//     console.log('Visit scheduled:', result);
//   })
//   .catch((error) => {
//     console.error('Error scheduling visit:', error);
//   });

const getTrainerVisits = async (trainerId) => {
  const visits = await Visit.aggregate([
    {
      $match: { trainer: mongoose.Types.ObjectId(trainerId) },
    },
    {
      $lookup: {
        from: 'schools', // Assuming the name of the schools collection is "schools"
        localField: 'schoolId',
        foreignField: '_id',
        as: 'school',
      },
    },
    {
      $unwind: '$school',
    },
    {
      $project: {
        _id: 1,
        visitDate: 1,
        school: '$school',
      },
    },
  ]);
  return visits;
};

// const trainerIds = '664450b063614b7566e8b6aa';
// getTrainerVisits(trainerIds)
//   .then((result) => {
//     console.log('Trainer visits:', result);
//   })
//   .catch((error) => {
//     console.error('Error getting trainer visits:', error);
//   });

/**
 * Query for sansthan
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryStudent = async (filter, options) => {
  const result = await Student.paginate(filter, options);
  return result;
};

const getStudentById = async (id) => {
  return Student.findById(id);
};
/**
 * Update user by id
 * @param {ObjectId} id
 * @param {Object} updateBody
 * @returns {Promise<Sansthan>}
 */
const updateStudentById = async (id, updateBody) => {
  const result = await getStudentById(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Teacher not found');
  }
  Object.assign(result, updateBody);
  await result.save();
  return result;
};

module.exports = {
  queryStudent,
  getStudentById,
  getTrainerVisits,
  updateStudentById,
  scheduleVisit,
};
