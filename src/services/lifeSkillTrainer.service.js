const httpStatus = require('http-status');
const mongoose = require('mongoose');
const { Student, User, Visit, LifeTrainerVisit, Synopsis } = require('../models');
const ApiError = require('../utils/ApiError');

const scheduleVisit = async (trainerId, schoolId, visitDate, time) => {
  // Check for duplicate visit
  const existingVisit = await LifeTrainerVisit.findOne({
    trainer: mongoose.Types.ObjectId(trainerId),
    schoolId,
    visitDate,
    time,
  });

  if (existingVisit) {
    throw new ApiError(httpStatus.CONFLICT, 'Visit scheduled already found');
  }

  // Create new visit
  const visit = new LifeTrainerVisit({
    trainer: trainerId,
    schoolId,
    visitDate,
    time,
  });
  await visit.save();

  // Update trainer's visits
  const trainer = await User.findById(trainerId);
  if (!trainer) {
    // throw new ApiError(httpStatus.CONFLICT, 'Visit scheduled already found');
    throw new ApiError(httpStatus.NOT_FOUND, 'Trainer not found');
  }
  trainer.visits.push(visit._id);
  await trainer.save();

  return visit; // Return the saved visit
};

// const scheduleVisit = async (trainerId, schoolId, visitDate, time, standard) => {
//   const visit = new Visit({
//     trainer: trainerId,
//     schoolId,
//     visitDate,
//     time,
//     standard,
//   });
//   await visit.save();
//   // Update trainer's visits
//   const trainer = await User.findById(trainerId);
//   if (!trainer) {
//     throw new Error('Trainer not found');
//   }
//   trainer.visits.push(visit._id);
//   await trainer.save();

//   return visit; // Return the saved visit
// };

const getTrainerVisits = async (trainerId) => {
  const visits = await LifeTrainerVisit.aggregate([
    {
      $match: { trainer: mongoose.Types.ObjectId(trainerId) },
    },
    {
      $lookup: {
        from: 'schools',
        localField: 'schoolId',
        foreignField: 'schoolId',
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
        time: 1,
        createdAt: 1,
        school: '$school',
      },
    },
  ]);
  return visits;
};

const getVisitsBySchoolId = async (schoolId) => {
  const visits = await LifeTrainerVisit.find({ schoolId });
  if (!visits || visits.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Visits not found');
  }
  const populatedVisits = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const visit of visits) {
    const { createdAt } = visit;
    // eslint-disable-next-line no-await-in-loop
    const counselor = await User.findOne({ _id: visit.trainer, role: 'skillTrainer' }).select(
      'firstName lastName mobNumber'
    );
    populatedVisits.push({ visit, counselor, createdAt });
  }

  return populatedVisits;
};

// const trainerId = "6645ec9ac3deb1833d210467";
// getTrainerVisits(trainerId)
//   .then(async(result) => {

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

const getSchoolIdsAndStudentCount = async (trainerId) => {
  const visits = await Visit.find({ trainer: mongoose.Types.ObjectId(trainerId) }).select('schoolId standard');
  const schoolStandardPairs = visits.map((visit) => ({ schoolId: visit.schoolId, standard: visit.standard }));

  const studentCounts = await Student.aggregate([
    {
      $match: {
        $or: schoolStandardPairs.map((pair) => ({
          schoolId: pair.schoolId,
          standard: pair.standard,
        })),
      },
    },
    {
      $group: {
        _id: { schoolId: '$schoolId', standard: '$standard' },
        studentCount: { $sum: 1 },
      },
    },
  ]);
  const schoolCount = new Set(schoolStandardPairs.map((pair) => pair.schoolId)).size;
  const startedSchools = await Synopsis.distinct('schoolId').then((schoolIds) => schoolIds.length);
  const counsellingCount = await Synopsis.countDocuments();
  return {
    studentCounts: studentCounts.reduce((acc, curr) => acc + curr.studentCount, 0),
    schoolCount,
    startedSchools,
    counsellingCount,
  };
};

// module.exports = getSchoolIdsAndStudentCount;

// Example usage
// const trainerId = '6645ec9ac3deb1833d210467'; // Replace with actual trainer ID
// getSchoolIdsAndStudentCount(trainerId)
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.error('Error:', error);
//   });

// module.exports = getSchoolIdsAndStudentCount;

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
  getSchoolIdsAndStudentCount,
  getTrainerVisits,
  getVisitsBySchoolId,
  updateStudentById,
  scheduleVisit,
};
