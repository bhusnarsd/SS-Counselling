/* eslint-disable no-param-reassign */
// const httpStatus = require('http-status');
const { Statistic, Student, Assessment, User, Visit } = require('../models');
// const ApiError = require('../utils/ApiError');

/**
 * Create a Statistic
 * @param {Object} reqBody
 * @returns {Promise<Statistic>}
 */
const createStatitic = async (reqBody) => {
  const student = await Student.findOne({ studentId: reqBody.userId });
  if (student) {
    // eslint-disable-next-line no-param-reassign
    reqBody.standard = student.standard;
    reqBody.schoolId = student.schoolId;
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
  const totalCounsellor = await User.countDocuments({ role: 'trainer' });
  const visitsCount = await Visit.countDocuments();
  // Calculate login percentage
  const loginPercentage = (uniqueLoginCount / totalStudents) * 100;
  const assessmentCount = await Assessment.countDocuments({ status: 'completed' });

  const assessmentCompeletedCount = await Assessment.countDocuments({ status: 'completed' });
  const assessmentStartedCountCount = await Assessment.countDocuments({ status: 'started' });
  const totalassement = assessmentCompeletedCount + assessmentStartedCountCount;
  const pendingAssessmentCount = totalStudents - totalassement;
  // const totalCareerClicked = await Statistic.countDocuments({ event: 'click', elementType: 'careers' });
  // const uniqueCareerClickCount = await Statistic.distinct('userId', { event: 'click', elementType: 'careers' }).then(
  //   (users) => users.length
  // );
  // const averageCareerClicked = totalCareerClicked / totalStudents;

  // const totalCollegeClicked = await Statistic.countDocuments({ event: 'click', elementType: 'colleges' });
  // const uniqueCollegeClickCount = await Statistic.distinct('userId', { event: 'click', elementType: 'colleges' }).then(
  //   (users) => users.length
  // );
  // const averageCollegeClicked = totalCollegeClicked / totalStudents;

  // const totalExamClicked = await Statistic.countDocuments({ event: 'click', elementType: 'exams' });
  // const uniqueExamClickCount = await Statistic.distinct('userId', { event: 'click', elementType: 'exams' }).then(
  //   (users) => users.length
  // );
  // const averageExamClicked = totalExamClicked / totalStudents;

  // const totalScholarshipClicked = await Statistic.countDocuments({ event: 'click', elementType: 'scholarships' });
  // const uniqueScholarshipClickCount = await Statistic.distinct('userId', {
  //   event: 'click',
  //   elementType: 'scholarships',
  // }).then((users) => users.length);
  // const averageScholarshipClicked = totalScholarshipClicked / totalStudents;

  return {
    totalCounsellor,
    visitsCount,
    totalStudents,
    assessmentCount,
    totalLoginCount,
    uniqueLoginCount,
    loginPercentage,
    assessmentCompeletedCount,
    assessmentStartedCountCount,
    pendingAssessmentCount,
    // totalCareerClicked,
    // uniqueCareerClickCount,
    // averageCareerClicked,
    // totalCollegeClicked,
    // uniqueCollegeClickCount,
    // averageCollegeClicked,
    // totalExamClicked,
    // uniqueExamClickCount,
    // averageExamClicked,
    // totalScholarshipClicked,
    // uniqueScholarshipClickCount,
    // averageScholarshipClicked,
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
  const totalCounsellor = await User.countDocuments({ role: 'trainer' });
  const visitsCount = await Visit.countDocuments({ schoolId });
  const loginPercentage = (uniqueLoginCount / totalStudents) * 100;

  const assessmentCompeletedCount = await Assessment.countDocuments({ status: 'completed', schoolId });
  const assessmentStartedCountCount = await Assessment.countDocuments({ status: 'started', schoolId });
  const totalassement = assessmentCompeletedCount + assessmentStartedCountCount;
  const pendingAssessmentCount = totalStudents - totalassement;
  // const totalCareerClicked = await Statistic.countDocuments({ event: 'click', elementType: 'careers', schoolId });

  // const uniqueCareerClickCount = await Statistic.distinct('userId', {
  //   event: 'click',
  //   elementType: 'careers',
  //   schoolId,
  // }).then((users) => users.length);

  // const averageCareerClicked = totalCareerClicked / totalStudents;

  // const totalCollegeClicked = await Statistic.countDocuments({ event: 'click', elementType: 'colleges', schoolId });

  // const uniqueCollegeClickCount = await Statistic.distinct('userId', {
  //   event: 'click',
  //   elementType: 'colleges',
  //   schoolId,
  // }).then((users) => users.length);

  // const averageCollegeClicked = totalCollegeClicked / totalStudents;

  // const totalExamClicked = await Statistic.countDocuments({ event: 'click', elementType: 'exams', schoolId });

  // const uniqueExamClickCount = await Statistic.distinct('userId', { event: 'click', elementType: 'exams', schoolId }).then(
  //   (users) => users.length
  // );

  // const averageExamClicked = totalExamClicked / totalStudents;

  // const totalScholarshipClicked = await Statistic.countDocuments({ event: 'click', elementType: 'scholarships', schoolId });

  // const uniqueScholarshipClickCount = await Statistic.distinct('userId', {
  //   event: 'click',
  //   elementType: 'scholarships',
  //   schoolId,
  // }).then((users) => users.length);

  // const averageScholarshipClicked = totalScholarshipClicked / totalStudents;

  return {
    totalStudents,
    visitsCount,
    totalCounsellor,
    assessmentCompeletedCount,
    assessmentStartedCountCount,
    pendingAssessmentCount,
    totalLoginCount,
    uniqueLoginCount,
    loginPercentage,
    // totalCareerClicked,
    // uniqueCareerClickCount,
    // averageCareerClicked,
    // totalCollegeClicked,
    // uniqueCollegeClickCount,
    // averageCollegeClicked,
    // totalExamClicked,
    // uniqueExamClickCount,
    // averageExamClicked,
    // totalScholarshipClicked,
    // uniqueScholarshipClickCount,
    // averageScholarshipClicked,
  };
};

const getFilteredStatistics = async ({ standard, schoolId }) => {
  const filter = {};

  if (standard) {
    filter.standard = standard;
  }

  if (schoolId) {
    filter.schoolId = schoolId;
  }

  const totalStudents = await Student.countDocuments({ schoolId, standard: standard || { $exists: true } });
  const totalCounsellor = await User.countDocuments({ role: 'trainer' });
  const visitsCount = await Visit.countDocuments({ schoolId });

  const totalLoginCount = await Statistic.countDocuments({ event: 'login', userId: { $regex: '^STUD' }, ...filter });

  const uniqueLoginCount = await Statistic.distinct('userId', {
    event: 'login',
    userId: { $regex: '^STUD' },
    ...filter,
  }).then((users) => users.length);
  const loginPercentage = (uniqueLoginCount / totalStudents) * 100;

  const assessmentCompletedCount = await Assessment.countDocuments({ status: 'completed', ...filter });
  const assessmentStartedCount = await Assessment.countDocuments({ status: 'started', ...filter });
  const totalAssessment = assessmentCompletedCount + assessmentStartedCount;
  const pendingAssessmentCount = totalStudents - totalAssessment;

  // const totalCareerClicked = await Statistic.countDocuments({ event: 'click', elementType: 'careers', ...filter });
  // const uniqueCareerClickCount = await Statistic.distinct('userId', {
  //   event: 'click',
  //   elementType: 'careers',
  //   ...filter,
  // }).then((users) => users.length);
  // const averageCareerClicked = totalCareerClicked / totalStudents;

  // const totalCollegeClicked = await Statistic.countDocuments({ event: 'click', elementType: 'colleges', ...filter });
  // const uniqueCollegeClickCount = await Statistic.distinct('userId', {
  //   event: 'click',
  //   elementType: 'colleges',
  //   ...filter,
  // }).then((users) => users.length);
  // const averageCollegeClicked = totalCollegeClicked / totalStudents;

  // const totalExamClicked = await Statistic.countDocuments({ event: 'click', elementType: 'exams', ...filter });
  // const uniqueExamClickCount = await Statistic.distinct('userId', { event: 'click', elementType: 'exams', ...filter }).then(
  //   (users) => users.length
  // );
  // const averageExamClicked = totalExamClicked / totalStudents;

  // const totalScholarshipClicked = await Statistic.countDocuments({ event: 'click', elementType: 'scholarships', ...filter });
  // const uniqueScholarshipClickCount = await Statistic.distinct('userId', {
  //   event: 'click',
  //   elementType: 'scholarships',
  //   ...filter,
  // }).then((users) => users.length);
  // const averageScholarshipClicked = totalScholarshipClicked / totalStudents;

  return {
    totalCounsellor,
    visitsCount,
    totalStudents,
    assessmentCompeletedCount,
    assessmentStartedCountCount,
    pendingAssessmentCount,
    totalLoginCount,
    uniqueLoginCount,
    loginPercentage,
    // totalCareerClicked,
    // uniqueCareerClickCount,
    // averageCareerClicked,
    // totalCollegeClicked,
    // uniqueCollegeClickCount,
    // averageCollegeClicked,
    // totalExamClicked,
    // uniqueExamClickCount,
    // averageExamClicked,
    // totalScholarshipClicked,
    // uniqueScholarshipClickCount,
    // averageScholarshipClicked,
  };
};

// const schoolId = 'SCH660028'
// getFilteredStatistics({schoolId})
//   .then(async(result) => {

//     console.log('Trainer visits:', result);
//   })
//   .catch((error) => {
//     console.error('Error getting trainer visits:', error);
//   });
module.exports = {
  getFilteredStatistics,
  createStatitic,
  getStatistics,
  getSchoolStatistics,
};
