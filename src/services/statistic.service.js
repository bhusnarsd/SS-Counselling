// const httpStatus = require('http-status');
const { Statistic, Student, Assessment } = require('../models');
// const ApiError = require('../utils/ApiError');

/**
 * Create a Statistic
 * @param {Object} reqBody
 * @returns {Promise<Statistic>}
 */
const createStatitic = async (reqBody) => {
  const schoolId = await Student.findOne({ studentId: reqBody.userId });
  if (schoolId) {
    // eslint-disable-next-line no-param-reassign
    reqBody.schoolId = schoolId;
  }
  const statitic = await Statistic.create(reqBody);
  return statitic;
};

const getStatistics = async () => {
  const totalLoginCount = await Statistic.countDocuments({ event: 'login', userId: { $regex: '^STUD' } });
  // Get the distinct count of user IDs starting with 'STUD' that have login events
  const uniqueLoginCount = await Statistic.distinct('userId', { event: 'login', userId: { $regex: '^STUD' } }).then(
    (users) => users.length
  );
  // Count the total number of students with userId starting with 'STUD'
  const totalStudents = await Student.countDocuments();
  // Calculate login percentage
  const loginPercentage = (uniqueLoginCount / totalStudents) * 100;
  const assessmentCount = await Assessment.countDocuments({ status: 'completed' });
  const totalCareerClicked = await Statistic.countDocuments({ event: 'click', elementType: 'careers' });
  const uniqueCareerClickCount = await Statistic.distinct('userId', { event: 'click', elementType: 'careers' }).then(
    (users) => users.length
  );
  const averageCareerClicked = totalCareerClicked / totalStudents;

  const totalCollegeClicked = await Statistic.countDocuments({ event: 'click', elementType: 'colleges' });
  const uniqueCollegeClickCount = await Statistic.distinct('userId', { event: 'click', elementType: 'colleges' }).then(
    (users) => users.length
  );
  const averageCollegeClicked = totalCollegeClicked / totalStudents;

  const totalExamClicked = await Statistic.countDocuments({ event: 'click', elementType: 'exams' });
  const uniqueExamClickCount = await Statistic.distinct('userId', { event: 'click', elementType: 'exams' }).then(
    (users) => users.length
  );
  const averageExamClicked = totalExamClicked / totalStudents;

  const totalScholarshipClicked = await Statistic.countDocuments({ event: 'click', elementType: 'scholarships' });
  const uniqueScholarshipClickCount = await Statistic.distinct('userId', {
    event: 'click',
    elementType: 'scholarships',
  }).then((users) => users.length);
  const averageScholarshipClicked = totalScholarshipClicked / totalStudents;

  return {
    assessmentCount,
    totalLoginCount,
    uniqueLoginCount,
    loginPercentage,
    totalCareerClicked,
    uniqueCareerClickCount,
    averageCareerClicked,
    totalCollegeClicked,
    uniqueCollegeClickCount,
    averageCollegeClicked,
    totalExamClicked,
    uniqueExamClickCount,
    averageExamClicked,
    totalScholarshipClicked,
    uniqueScholarshipClickCount,
    averageScholarshipClicked,
  };
};

const getSchoolStatistics = async (schoolId) => {
  const totalLoginCount = await Statistic.countDocuments({ event: 'login', userId: { $regex: '^STUD' }, schoolId });

  const uniqueLoginCount = await Statistic.distinct('userId', {
    event: 'login',
    userId: { $regex: '^STUD' },
    schoolId,
  }).then((users) => users.length);

  const totalStudents = await Student.countDocuments({ schoolId });

  const loginPercentage = (uniqueLoginCount / totalStudents) * 100;

  const assessmentCount = await Assessment.countDocuments({ status: 'completed', schoolId });

  const totalCareerClicked = await Statistic.countDocuments({ event: 'click', elementType: 'careers', schoolId });

  const uniqueCareerClickCount = await Statistic.distinct('userId', {
    event: 'click',
    elementType: 'careers',
    schoolId,
  }).then((users) => users.length);

  const averageCareerClicked = totalCareerClicked / totalStudents;

  const totalCollegeClicked = await Statistic.countDocuments({ event: 'click', elementType: 'colleges', schoolId });

  const uniqueCollegeClickCount = await Statistic.distinct('userId', {
    event: 'click',
    elementType: 'colleges',
    schoolId,
  }).then((users) => users.length);

  const averageCollegeClicked = totalCollegeClicked / totalStudents;

  const totalExamClicked = await Statistic.countDocuments({ event: 'click', elementType: 'exams', schoolId });

  const uniqueExamClickCount = await Statistic.distinct('userId', { event: 'click', elementType: 'exams', schoolId }).then(
    (users) => users.length
  );

  const averageExamClicked = totalExamClicked / totalStudents;

  const totalScholarshipClicked = await Statistic.countDocuments({ event: 'click', elementType: 'scholarships', schoolId });

  const uniqueScholarshipClickCount = await Statistic.distinct('userId', {
    event: 'click',
    elementType: 'scholarships',
    schoolId,
  }).then((users) => users.length);

  const averageScholarshipClicked = totalScholarshipClicked / totalStudents;

  return {
    assessmentCount,
    totalLoginCount,
    uniqueLoginCount,
    loginPercentage,
    totalCareerClicked,
    uniqueCareerClickCount,
    averageCareerClicked,
    totalCollegeClicked,
    uniqueCollegeClickCount,
    averageCollegeClicked,
    totalExamClicked,
    uniqueExamClickCount,
    averageExamClicked,
    totalScholarshipClicked,
    uniqueScholarshipClickCount,
    averageScholarshipClicked,
  };
};

module.exports = {
  createStatitic,
  getStatistics,
  getSchoolStatistics,
};
