// const httpStatus = require('http-status');
const { Statistic, Student, Assessment } = require('../models');
// const ApiError = require('../utils/ApiError');

/**
 * Create a Statistic
 * @param {Object} reqBody
 * @returns {Promise<Statistic>}
 */
const createStatitic = async (reqBody) => {
  const statitic = await Statistic.create(reqBody);
  return statitic;
};

const getStatistics = async () => {
  const totalLoginCount = await Statistic.countDocuments({ event: 'login' });
  const uniqueLoginCount = await Statistic.distinct('userId', { event: 'login' }).then((users) => users.length);
  const totalStudents = await Student.countDocuments(); // Replace with actual count if available
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

module.exports = {
  createStatitic,
  getStatistics,
};
