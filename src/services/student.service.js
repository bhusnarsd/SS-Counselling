const httpStatus = require('http-status');
const { Student, User } = require('../models');
const ApiError = require('../utils/ApiError');

const bulkUpload = async (studentArray, csvFilePath = null) => {
  let modifiedStudentsArray = studentArray;
  if (csvFilePath) {
    modifiedStudentsArray = { students: csvFilePath };
  }
  if (!modifiedStudentsArray.students || !modifiedStudentsArray.students.length)
    return { error: true, message: 'missing array' };

  const records = [];
  const dups = [];

  await Promise.all(
    modifiedStudentsArray.students.map(async (student) => {
      const schoolFound = await Student.findOne({ mobNumber: student.mobNumber });
      if (schoolFound) {
        dups.push(student);
      } else {
        // eslint-disable-next-line no-inner-declarations
        function generateStudentIds() {
          const randomNumber = Math.floor(Math.random() * 900000) + 100000;
          return `STUD${randomNumber}`;
        }
        const studentId = generateStudentIds();
        let record = new Student({ ...student, studentId });
        record = await record.save();
        if (record) {
          records.push(student);

          // Create the student user
          await User.create({
            firstName: student.firstname,
            lastName: student.lastname,
            mobNumber: student.mobNumber,
            username: studentId,
            password: 'admin@123',
            role: 'student',
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

function generateStudentId() {
  const randomNumber = Math.floor(Math.random() * 900000) + 100000;
  return `STUD${randomNumber}`;
}
/**
 * Create a Teacher
 * @param {Object} reqBody
 * @returns {Promise<Teacher>}
 */
const createStudent = async (reqBody) => {
  const studentId = generateStudentId();
  const data = {
    firtstName: reqBody.firstName,
    lastName: reqBody.lastName,
    username: studentId,
    password: 'student@123',
    role: 'student',
    // asssignedTo,
  };
  const record = new Student(data);
  await record.save();
  return Student.create({ ...reqBody, studentId });
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
  bulkUpload,
  createStudent,
  queryStudent,
  getStudentById,
  updateStudentById,
};
