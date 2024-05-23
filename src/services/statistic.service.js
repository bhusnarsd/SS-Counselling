/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
const { Statistic, Student, Assessment, User, Visit, Synopsis, School } = require('../models');

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
  // Count the total number of students with userId starting with 'STUD'
  const totalStudents = await Student.countDocuments();
  const totalCounsellor = await User.countDocuments({ role: 'trainer' });
  const visitsPending = await Visit.countDocuments({ status: 'pending' });
  const visitsCompleted = await Visit.countDocuments({ status: 'completed' });
  const toatalSchools = await School.countDocuments();
  // const assessmentCount = await Assessment.countDocuments({ status: 'completed' });
  const assessmentCompeletedCount = await Assessment.countDocuments({ status: 'completed' });
  const assessmentStartedCountCount = await Assessment.countDocuments({ status: 'started' });
  const totalassement = assessmentCompeletedCount + assessmentStartedCountCount;
  const pendingAssessmentCount = totalStudents - totalassement;

  return {
    totalCounsellor,
    visitsPending,
    visitsCompleted,
    toatalSchools,
    totalStudents,
    assessmentCompeletedCount,
    assessmentStartedCountCount,
    pendingAssessmentCount,
  };
};

const getStatistFlterDash = async (SchoolId) => {
  // Count the total number of students with userId starting with 'STUD'
  const totalStudents = await Student.countDocuments({ SchoolId });
  const totalCounsellor = await User.countDocuments({ role: 'trainer' });
  const visitsPending = await Visit.countDocuments({ status: 'pending', SchoolId });
  const visitsCompleted = await Visit.countDocuments({ status: 'completed', SchoolId });
  const toatalSchools = await School.countDocuments();
  // const assessmentCount = await Assessment.countDocuments({ status: 'completed' });
  const assessmentCompeletedCount = await Assessment.countDocuments({ status: 'completed', SchoolId });
  const assessmentStartedCountCount = await Assessment.countDocuments({ status: 'started', SchoolId });
  const totalassement = assessmentCompeletedCount + assessmentStartedCountCount;
  const pendingAssessmentCount = totalStudents - totalassement;

  return {
    totalCounsellor,
    visitsPending,
    visitsCompleted,
    toatalSchools,
    totalStudents,
    assessmentCompeletedCount,
    assessmentStartedCountCount,
    pendingAssessmentCount,
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

const getFilteredStatistics = async (schoolId, standard) => {
  // Convert schoolId to string for consistent comparison
  const schoolIdStr = schoolId.toString();

  // Fetch total number of students for the school
  const totalStudents = await Student.countDocuments({ schoolId: schoolIdStr, standard });

  // Fetch various counts related to visits and assessments
  const visitsCount = await Visit.countDocuments({ schoolId: schoolIdStr, standard });
  const pastSessionCount = await Visit.countDocuments({ status: 'completed', schoolId: schoolIdStr, standard });
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

module.exports = {
  getFilteredStatistics,
  createStatitic,
  getStatistics,
  getSchoolStatistics,
  getStatistFlterDash,
};
