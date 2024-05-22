/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
// const httpStatus = require('http-status');
const { Statistic, Student, Assessment, User, Visit, Synopsis } = require('../models');
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
  // Convert schoolId to string for consistent comparison
  const schoolIdStr = schoolId.toString();

  // Fetch total number of students for the school
  const totalStudents = await Student.countDocuments({ schoolId: schoolIdStr });

  // Fetch various counts related to visits and assessments
  const visitsCount = await Visit.countDocuments({ schoolId: schoolIdStr });
  const pastSessionCount = await Visit.countDocuments({ status: 'completed', schoolId: schoolIdStr });
  const assessmentCompletedCount = await Assessment.countDocuments({ status: 'completed', schoolId: schoolIdStr });
  const assessmentStartedCount = await Assessment.countDocuments({ status: 'started', schoolId: schoolIdStr });
  const totalAssessment = assessmentCompletedCount + assessmentStartedCount;
  const pendingAssessmentCount = totalStudents - totalAssessment;

  // Fetch completed assessments for the school
  const assessments = await Assessment.find({ schoolId: schoolIdStr, status: 'completed' });
  let totalStudentScore = 0;
  assessments.forEach((assessment) => {
    for (const [key, value] of assessment.score.entries()) {
      totalStudentScore += value;
    }
  });
  const overallAverageScore = totalStudentScore / totalStudents;

  // console.log("Overall Average Score:",totalStudentScore,totalStudents,  overallAverageScore);
  // Aggregate visits by standard and count visits per standard
  const visitsByStandard = await Visit.aggregate([
    { $match: { schoolId: schoolIdStr } }, // Match documents by schoolId
    {
      $group: {
        _id: '$standard', // Group by standard
        visitCount: { $sum: 1 }, // Count the number of visits per standard
      },
    },
  ]);

  // Fetch the synopsis count for the school
  const synopsisCount = await Synopsis.countDocuments({ schoolId: schoolIdStr });

  // Return the consolidated statistics
  return {
    totalStudents,
    visitsCount,
    pastSessionCount,
    visitsByStandard,
    synopsisCount,
    assessmentCompletedCount,
    assessmentStartedCount,
    pendingAssessmentCount,
    overallAverageScore,
  };
};

// Example usage
// (async () => {
//   const schoolId = 'SCH660028'; // Replace with actual school ID
//   try {
//     const statistics = await getSchoolStatistics(schoolId);
//     console.log('School Statistics:', statistics);
//   } catch (error) {
//     console.error('Error:', error.message);
//   }
// })();

const getSchoolStatisticsBYStandard = async (schoolId, standard) => {
  // Convert schoolId to string for consistent comparison
  const schoolIdStr = schoolId.toString();

  // Fetch total number of students for the school
  const totalStudents = await Student.countDocuments({ schoolId: schoolIdStr, standard });

  // Fetch various counts related to visits and assessments
  const visitsCount = await Visit.countDocuments({ schoolId: schoolIdStr, standard });
  const pastSessionCount = await Visit.countDocuments({ status: 'completed', schoolId: schoolIdStr , standard });
  const assessmentCompletedCount = await Assessment.countDocuments({ status: 'completed', schoolId: schoolIdStr, standard });
  const assessmentStartedCount = await Assessment.countDocuments({ status: 'started', schoolId: schoolIdStr, standard });
  const totalAssessment = assessmentCompletedCount + assessmentStartedCount;
  const pendingAssessmentCount = totalStudents - totalAssessment;

  // Fetch completed assessments for the school
  const assessments = await Assessment.find({ schoolId: schoolIdStr, status: 'completed', standard });
  let totalStudentScore = 0;
  assessments.forEach((assessment) => {
    for (const [key, value] of assessment.score.entries()) {
      totalStudentScore += value;
    }
  });
  const overallAverageScore = totalStudentScore / totalStudents;

  // Aggregate visits by standard and count visits per standard
  const visitsByStandard = await Visit.aggregate([
    { $match: { schoolId: schoolIdStr, standard } }, // Match documents by schoolId and standard
    {
      $group: {
        _id: { standard: '$standard', schoolId: '$schoolId' }, // Group by standard and schoolId
        visitCount: { $sum: 1 }, // Count the number of visits per standard and schoolId
      },
    },
  ]);

  // Fetch the synopsis count for the school
  const synopsisCount = await Synopsis.countDocuments({ schoolId: schoolIdStr, standard });

  // Return the consolidated statistics
  return {
    totalStudents,
    visitsCount,
    pastSessionCount,
    visitsByStandard,
    synopsisCount,
    assessmentCompletedCount,
    assessmentStartedCount,
    pendingAssessmentCount,
    overallAverageScore,
  };
};


// const getFilteredStatistics = async ({ standard, schoolId }) => {
//   const filter = {};

//   if (standard) {
//     filter.standard = standard;
//   }

//   if (schoolId) {
//     filter.schoolId = schoolId;
//   }

//   const totalStudents = await Student.countDocuments({ schoolId, standard: standard || { $exists: true } });
//   const totalCounsellor = await User.countDocuments({ role: 'trainer' });
//   const visitsCount = await Visit.countDocuments({ schoolId });

//   const totalLoginCount = await Statistic.countDocuments({ event: 'login', userId: { $regex: '^STUD' }, ...filter });

//   const uniqueLoginCount = await Statistic.distinct('userId', {
//     event: 'login',
//     userId: { $regex: '^STUD' },
//     ...filter,
//   }).then((users) => users.length);
//   const loginPercentage = (uniqueLoginCount / totalStudents) * 100;

//   const assessmentCompletedCount = await Assessment.countDocuments({ status: 'completed', ...filter });
//   const assessmentStartedCount = await Assessment.countDocuments({ status: 'started', ...filter });
//   const totalAssessment = assessmentCompletedCount + assessmentStartedCount;
//   const pendingAssessmentCount = totalStudents - totalAssessment;

//   // const totalCareerClicked = await Statistic.countDocuments({ event: 'click', elementType: 'careers', ...filter });
//   // const uniqueCareerClickCount = await Statistic.distinct('userId', {
//   //   event: 'click',
//   //   elementType: 'careers',
//   //   ...filter,
//   // }).then((users) => users.length);
//   // const averageCareerClicked = totalCareerClicked / totalStudents;

//   // const totalCollegeClicked = await Statistic.countDocuments({ event: 'click', elementType: 'colleges', ...filter });
//   // const uniqueCollegeClickCount = await Statistic.distinct('userId', {
//   //   event: 'click',
//   //   elementType: 'colleges',
//   //   ...filter,
//   // }).then((users) => users.length);
//   // const averageCollegeClicked = totalCollegeClicked / totalStudents;

//   // const totalExamClicked = await Statistic.countDocuments({ event: 'click', elementType: 'exams', ...filter });
//   // const uniqueExamClickCount = await Statistic.distinct('userId', { event: 'click', elementType: 'exams', ...filter }).then(
//   //   (users) => users.length
//   // );
//   // const averageExamClicked = totalExamClicked / totalStudents;

//   // const totalScholarshipClicked = await Statistic.countDocuments({ event: 'click', elementType: 'scholarships', ...filter });
//   // const uniqueScholarshipClickCount = await Statistic.distinct('userId', {
//   //   event: 'click',
//   //   elementType: 'scholarships',
//   //   ...filter,
//   // }).then((users) => users.length);
//   // const averageScholarshipClicked = totalScholarshipClicked / totalStudents;

//   return {
//     totalCounsellor,
//     visitsCount,
//     totalStudents,
//     assessmentCompeletedCount,
//     assessmentStartedCountCount,
//     pendingAssessmentCount,
//     totalLoginCount,
//     uniqueLoginCount,
//     loginPercentage,
//     // totalCareerClicked,
//     // uniqueCareerClickCount,
//     // averageCareerClicked,
//     // totalCollegeClicked,
//     // uniqueCollegeClickCount,
//     // averageCollegeClicked,
//     // totalExamClicked,
//     // uniqueExamClickCount,
//     // averageExamClicked,
//     // totalScholarshipClicked,
//     // uniqueScholarshipClickCount,
//     // averageScholarshipClicked,
//   };
// };

module.exports = {
  // getFilteredStatistics,
  createStatitic,
  getStatistics,
  getSchoolStatistics,
};
