/* eslint-disable no-shadow */
const httpStatus = require('http-status');
const path = require('path');
const { createObjectCsvWriter } = require('csv-writer');
const { School, User, Student, Assessment } = require('../models');
const ApiError = require('../utils/ApiError');
const userService = require('./user.service');

const bulkUpload = async (schoolArray, csvFilePath = null) => {
  let modifiedSchoolsArray = schoolArray;
  if (csvFilePath) {
    modifiedSchoolsArray = { schools: csvFilePath };
  }
  if (!modifiedSchoolsArray.schools || !modifiedSchoolsArray.schools.length)
    return { error: true, message: 'missing array' };

  const records = [];
  const dups = [];

  await Promise.all(
    modifiedSchoolsArray.schools.map(async (school) => {
      const schoolFound = await School.findOne({ udisecode: school.udisecode });
      if (schoolFound) {
        dups.push(school);
      } else {
        // eslint-disable-next-line no-inner-declarations
        function generateSchoolId() {
          const randomNumber = Math.floor(Math.random() * 900000) + 100000;
          return `SCH${randomNumber}`;
        }
        const schoolId = generateSchoolId();
        let record = new School({ ...school, schoolId });
        record = await record.save();
        if (record) {
          records.push(school);
          await User.create({
            firstName: school.firstname,
            lastName: school.lastname,
            mobNumber: school.mobNumber,
            username: schoolId,
            password: 'admin@123',
            role: 'school',
          });
        }
      }
    })
  );

  const duplicates = {
    totalDuplicates: dups.length ? dups.length : 0,
    data: dups.length ? dups : [],
  };
  const nonduplicates = {
    totalNonDuplicates: records.length ? records.length : 0,
    data: records.length ? records : [],
  };
  return { nonduplicates, duplicates };
};

function generateSchoolId() {
  const randomNumber = Math.floor(Math.random() * 900000) + 100000;
  return `SCH${randomNumber}`;
}
/**
 * Create a school
 * @param {Object} reqBody
 * @returns {Promise<User>}
 */
const createSchool = async (reqBody) => {
  const schoolId = generateSchoolId();
  const data = {
    firtstName: reqBody.firstName,
    lastName: reqBody.lastName,
    username: schoolId,
    password: 'admin@123',
    role: 'school',
    // asssignedTo,
  };
  await userService.createUser(data);
  return School.create({ ...reqBody, schoolId });
};

/**
 * Query for school
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const querySchool = async (filter, options) => {
  const school = await School.paginateWithStudentAndVisitCount(filter, options);
  return school;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<School>}
 */
const getSchoolById = async (schoolId) => {
  return School.findById(schoolId);
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<School>}
 */
const getSchoolByScoolId = async (schoolId) => {
  return School.findOne({ schoolId });
};
/**
 * Get block names
 * @param {string}
 * @returns {Promise<School>}
 */
const getBlockList = async () => {
  const blocks = await School.aggregate([
    {
      $group: {
        _id: {
          block: '$block',
          blockCode: '$blockCode',
        },
      },
    },
    {
      $project: {
        _id: 0,
        block: '$_id.block',
        blockCode: '$_id.blockCode',
      },
    },
  ]);

  return blocks;
};
const getClusterList = async () => {
  const clusters = await School.aggregate([
    {
      $group: {
        _id: {
          cluster: '$cluster',
          clusterCode: '$clusterCode',
        },
      },
    },
    {
      $project: {
        _id: 0,
        cluster: '$_id.cluster',
        clusterCode: '$_id.clusterCode',
      },
    },
  ]);

  return clusters;
};

const getDistrictList = async () => {
  const districts = await School.aggregate([
    {
      $group: {
        _id: {
          district: '$district',
          districtCode: '$districtCode',
        },
      },
    },
    {
      $project: {
        _id: 0,
        district: '$_id.district',
        districtCode: '$_id.districtCode',
      },
    },
  ]);

  return districts;
};

/**
 * Get block names
 * @param {string} block
 * @returns {Promise<School>}
 */
const getSchoolList = async (block) => {
  const schools = await School.find({ block }, { name: 1, code: 1 });
  return schools;
};

/**
 * Get DASHBOARD reporting
 * @param {string} block
 * @returns {Promise<School>}
 */
const getSchoolStats = async () => {
  const [schools, students, assessmentCount, assessmentStartedCount] = await Promise.all([
    School.countDocuments(),
    Student.countDocuments(),
    Assessment.countDocuments(),
    Assessment.distinct('schoolId').then((result) => result.length),
  ]);

  return { schools, students, assessmentCount, assessmentStartedCount };
};

const getSchoolstatsBySchoolID = async (schoolId) => {
  const [schools, students, assessmentCount] = await Promise.all([
    School.countDocuments({ schoolId }),
    Student.countDocuments({ schoolId }),
    Assessment.countDocuments({ schoolId }),
  ]);
  return { schools, students, assessmentCount };
};

// // const trainerId = "SCH636454";
// getSchoolstatsBySchoolID(trainerId)
//   .then(async(result) => {

//     console.log('Trainer visits:', result);
//   })
//   .catch((error) => {
//     console.error('Error getting trainer visits:', error);
//   });
/**
 * Update school by id
 * @param {ObjectId} scode
 * @param {Object} updateBody
 * @returns {Promise<School>}
 */
const updateSchoolByScode = async (schoolId, updateBody) => {
  const result = await getSchoolById(schoolId);
  const user = await User.findOne({ username: result.schoolId });
  if (!result && !user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'SChool not found');
  }
  Object.assign(result, updateBody);
  Object.assign(user, updateBody);
  user.save();
  await result.save();
  return result;
};

/**
 * Delete user by id
 * @param {ObjectId} schoolId
 * @returns {Promise<School>}
 */
const deleteSchoolById = async (schoolId) => {
  const school = await getSchoolById(schoolId);
  if (!school) {
    throw new ApiError(httpStatus.NOT_FOUND, 'School not found');
  }

  const user = await User.findOne({ username: school.schoolId });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.remove();
  await school.remove();
  return school;
};

async function getSchoolData() {
  const uniqueSchoolIds = await School.distinct('schoolId');

  // Fetch the details of the schools with those unique schoolIds
  const schools = await School.find(
    { schoolId: { $in: uniqueSchoolIds } },
    'tenantId name schoolId district schoolType locationType'
  );

  const mergedData = schools.map((school) => ({
    tenantId: school.tenantId,
    name: school.name,
    schoolId: school.schoolId,
    district: school.district,
    schoolType: school.schoolType,
    locationType: school.locationType,
    // password: userMap.get(student.studentId),
  }));

  return mergedData;
}

async function writeCSV(data) {
  const uploadPath = path.join(__dirname, '../uploads');
  const csvWriter = createObjectCsvWriter({
    path: path.join(uploadPath, 'school.csv'), // Ensure this path points to the uploads folder
    header: [
      { id: 'tenantId', title: 'Tenant ID' },
      { id: 'name', title: 'School Name' },
      { id: 'schoolId', title: 'School Code' },
      { id: 'district', title: 'District' },
      { id: 'schoolType', title: 'School Type' },
      { id: 'locationType', title: 'Location Type' },
    ],
  });

  await csvWriter.writeRecords(data);
}

module.exports = {
  createSchool,
  querySchool,
  getSchoolList,
  getSchoolStats,
  getSchoolstatsBySchoolID,
  getBlockList,
  bulkUpload,
  getSchoolById,
  updateSchoolByScode,
  deleteSchoolById,
  getSchoolData,
  writeCSV,
  getClusterList,
  getSchoolByScoolId,
  getDistrictList,
};
