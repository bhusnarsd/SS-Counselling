const httpStatus = require('http-status');
const { School, Attendance } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a school
 * @param {Object} reqBody
 * @returns {Promise<User>}
 */
const createSchool = async (reqBody) => {
  return School.create(reqBody);
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
  const school = await School.paginate(filter, options);
  return school;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<School>}
 */
const getSchoolByScode = async (code) => {
  return School.findOne({ code });
};

/**
 * Get user by udisecode
 * @param {string} udisecode
 * @returns {Promise<School>}
 */
const getSchoolByUdisecode = async (udisecode) => {
  return School.findOne({ udisecode });
};

/**
 * Get user by udisecode
 * @param {string} udisecode
 * @returns {Promise<School>}
 */
const getSchoolStatAll = async (filter) => {
  const result = await School.aggregate([
    {
      $match: filter,
    },
    {
      $group: {
        _id: null,
        totalStudents: { $sum: '$student' },
        totalStaff: { $sum: '$staff' },
      },
    },
  ]);
  const totalSchool = await School.countDocuments(filter);
  const { totalStudents, totalStaff } = result[0];

  return {
    totalSchool,
    totalStudents,
    totalStaff,
  };
};

/**
 * Get user by udisecode
 * @param {string} udisecode
 * @returns {Promise<School>}
 */
const getSchoolCountDistrict = async () => {
  const result = await School.aggregate([
    {
      $group: {
        _id: '$district',
        totalSchools: { $sum: 1 },
      },
    },
  ]);

  return result;
};

/**
 * Get user by udisecode
 * @param {string} udisecode
 * @returns {Promise<School>}
 */
const getSchoolCountByBlock = async (district) => {
  const result = await School.aggregate([
    {
      $match: { district },
    },
    {
      $group: {
        _id: '$block',
        totalSchools: { $sum: 1 },
      },
    },
  ]);

  return result;
};
/**
 * Get user by udisecode
 * @param {string} district
 * @returns {Promise<School>}
 */
const getSchoolByFilter = async (district, block) => {
  const filters = {};
  if (district) filters.district = district;
  if (block) filters.block = block;
  return School.find(filters);
};

/**
 * Get division names
 * @returns {Promise<School>}
 */
const getDivisionList = async () => {
  const division = await School.find({}, { division: 1 }).distinct('division');
  return division;
};

const getDivisionStats = async (division) => {
  const now = new Date();
  // now.setDate(now.getDate() - 1); // Subtract one day
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  const date = new Date(`${year}-${month}-${day}T00:00:00.000+00:00`);
  const uniqueDistricts = await School.distinct('district', { division });
  const districtBlockCounts = await Promise.all(
    uniqueDistricts.map(async (district) => {
      const uniqueBlocks = await School.distinct('district', { division, district });
      const schoolCount = await School.countDocuments({ division, district });
      const result = await Attendance.aggregate([
        { $match: { division, district, date } },
        {
          $group: {
            _id: null,
            totalPresent: { $sum: '$allPresent' },
            totalAbsent: { $sum: '$allAbsent'},
          },
        },
      ]);
      const studentCount = await School.aggregate([
        { $match: { division, district} },
        {
          $group: {
            _id: null,
            totalStudents: { $sum: '$total_student' },
          },
        },
      ]);
      const attendanceCountOfSchool = await Attendance.countDocuments({division, district, date });
      return {
        district,
        blockCount: uniqueBlocks.length,
        schoolCount,
        totalStudents: studentCount[0]?.totalStudents || 0,
        totalPresent: result[0]?.totalPresent || 0,
        totalAbsent: result[0]?.totalAbsent || 0,
        attendanceCountOfSchool,
      };
    })
  );

  return { division, districtBlockCounts };
};

// getDivisionStats('Nashik Division').then( result => {
//   console.log(result) 
// }).catch(err => {
//   console.log(err)
// })


const getDivisionStatsDistrictWise = async (district) => {
  const now = new Date();
  // now.setDate(now.getDate() - 1); // Subtract one day
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  const date = new Date(`${year}-${month}-${day}T00:00:00.000+00:00`);
  const uniqueDistricts = await School.distinct('block', { district });
  const districtBlockCounts = await Promise.all(
    uniqueDistricts.map(async (block) => {
      const uniqueBlocks = await School.distinct('block', { district, block });
      const schoolCount = await School.countDocuments({ district, block  });
      const result = await Attendance.aggregate([
        { $match: { district, block , date } },
        {
          $group: {
            _id: null,
            totalStudents: { $sum: '$allStudent' },
            totalPresent: { $sum: '$allPresent' },
            totalAbsent: { $sum: '$allAbsent'},
          },
        },
      ]);
      const studentCount = await School.aggregate([
        { $match: {  district, block } },
        {
          $group: {
            _id: null,
            totalStudents: { $sum: '$total_student' },
          },
        },
      ]);
      const attendanceCountOfSchool = await Attendance.countDocuments({district, block ,date });
      return {
        block,
        blockCount: uniqueBlocks.length,
        schoolCount,
        totalStudents: studentCount[0]?.totalStudents || 0,
        totalPresent: result[0]?.totalPresent || 0,
        totalAbsent: result[0]?.totalAbsent || 0,
        attendanceCountOfSchool
      };

    })
  );

  return { district, districtBlockCounts };
};

// getDivisionStatsDistrictWise('AHMADNAGAR').then( result => {
//   console.log(result) 
// }).catch(err => {
//   console.log(err)
// })
const getDivisionStatsBlockWise = async (block) => {
  const now = new Date();
  // now.setDate(now.getDate() - 1); // Subtract one day
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  const date = new Date(`${year}-${month}-${day}T00:00:00.000+00:00`);
  const result = await Attendance.find({date, block}, { allPresent: 1, allAbsent:1, schoolname: 1});
  const studentCount = await School.aggregate([
    { $match: { block } },
    {
      $group: {
        _id: null,
        totalStudents: { $sum: '$total_student' },
      },
    },
  ]);
  const attendanceCountOfSchool = await Attendance.countDocuments({ block, date })
 return { result, attendanceCountOfSchool, studentCount:  studentCount[0]?.totalStudents || 0, };
};

// getDivisionStatsBlockWise('225-Ahmednagar City').then( result => {
//   console.log(result) 
// }).catch(err => {
//   console.log(err)
// })
/**
 * Get district names
 * @returns {Promise<School>}
 */
const getDistrictList = async () => {
  const district = await School.find({}, { district: 1 }).distinct('district');
  return district;
};

/**
 * Get block names
 * @param {string} district
 * @returns {Promise<School>}
 */
const getBlockList = async (district) => {
  const block = await School.find({ district }, { block: 1 }).distinct('block');
  return block;
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
Retrieves the count of male and female students by state and class.
// @param {string} - The district to filter the schools by.
@returns {Promise<Array>} - A promise that resolves to an array of objects containing the state, class, male count, and female count.
*/
const getStudentClassWiseCount = async (filter) => {
  const result = await School.aggregate([
    { $match: filter },
    { $unwind: '$resultlist' },
    {
      $group: {
        _id: '$resultlist.class',
        maleCount: { $sum: '$resultlist.male' },
        femaleCount: { $sum: '$resultlist.female' },
      },
    },
  ]);
  return result;
};

/**
 * Get user by udisecode
 * @param {string} udisecode
 * @returns {Promise<School>}
 */
const getSchoolStat = async (filter, role) => {
  const result = await School.aggregate([
    { $match: filter },
    {
      $group: {
        _id: `$${role}`,
        total_student: { $sum: '$total_student' },
        total_teacher: { $sum: '$total_teacher' },
      },
    },
  ]);
  const totalSchool = await School.countDocuments(filter);
  return { result, totalSchool };
};

/**
Function to get school division wise data
@param {string} division - The division to filter the schools
@returns {Object} - An object containing the result and total number of schools
*/
const getSchoolDivisionWise = async (division) => {
  const result = await School.aggregate([
    { $match: { division } },
    {
      $group: {
        _id: `$district`,
        total_student: { $sum: '$total_student' },
        total_teacher: { $sum: '$total_teacher' },
      },
    },
  ]);
  const totalSchool = await School.countDocuments({ division });
  return { result, totalSchool };
};

const getSchoolDistrictWise = async (district) => {
  const result = await School.aggregate([
    { $match: { district } },
    {
      $group: {
        _id: `$block`,
        total_student: { $sum: '$total_student' },
        total_teacher: { $sum: '$total_teacher' },
      },
    },
  ]);
  const totalSchool = await School.countDocuments({ district });
  return { result, totalSchool };
};

const getSchoolBlockWise = async (block) => {
  const result = await School.aggregate([
    { $match: { block } },
    {
      $group: {
        _id: `$name`,
        total_student: { $sum: '$total_student' },
        total_teacher: { $sum: '$total_teacher' },
      },
    },
  ]);
  const totalSchool = await School.countDocuments({ block });
  return { result, totalSchool };
};

/**
 * Get teacher student count by managment wise
 * @returns {Promise<School>}
 */
const getMnagmentWiseTeacherStudent = async () => {
  const managementCounts = await School.aggregate([
    {
      $group: {
        _id: '$management',
        total_student: { $sum: '$total_student' },
        total_teacher: { $sum: '$total_teacher' },
      }
    }
  ]);
  return managementCounts;
};

const getCategoryWiseTeacherStudent = async () => {
  const categoryCounts = await School.aggregate([
    {
      $unwind: "$resultlist"
    },
    {
      $group: {
        _id: {
          category: "$category", 
        },
        total_teacher: {$sum: "$total_teacher"},
        maleCount: { $sum: "$resultlist.male" },
        femaleCount: { $sum: "$resultlist.female" }
      }
    },
  ]);

  return categoryCounts;
};
// getCategoryWiseTeacherStudent().then( result => {
//   console.log(result)
// }).catch(err => {
//   console.log(err)
// })

/**
 * Get user by udisecode
 * @param {string} udisecode
 * @returns {Promise<School>}
 */
const getSchoolByudiseArray = async (udisecodeArray) => {
  const result =  await School.find({ udisecode: { $in: udisecodeArray } });
  return result
};
/**
 * Update school by id
 * @param {ObjectId} scode
 * @param {Object} updateBody
 * @returns {Promise<School>}
 */
const updateSchoolByScode = async (scode, updateBody) => {
  const result = await getSchoolByScode(scode);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'SChool not found');
  }
  Object.assign(result, updateBody);
  await result.save();
  return result;
};



module.exports = {
  createSchool,
  querySchool,
  getSchoolStat,
  getSchoolList,
  getSchoolCountDistrict,
  getSchoolCountByBlock,
  getSchoolByUdisecode,
  getSchoolByFilter,
  getDistrictList,
  getBlockList,
  getSchoolStatAll,
  getStudentClassWiseCount,
  getSchoolDivisionWise,
  getSchoolDistrictWise,
  getSchoolBlockWise,
  updateSchoolByScode,
  getDivisionStats,
  getDivisionList,
  getMnagmentWiseTeacherStudent,
  getDivisionStatsDistrictWise,
  getDivisionStatsBlockWise,
  getSchoolByudiseArray,
};
