const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');
const schoolRoute = require('./school.route');
const residentialschoolRouter = require('./masterRoutes/residential_schoool.router');
const managmentGroupSchoolRoute = require('./masterRoutes/managment.groupschool.route');
const managmentCodeSchoolRoute = require('./masterRoutes/managment.codeofSchool.route');
const managementAdministrationTypeRoute = require('./masterRoutes/management.administration.type.route');
const respondentRoute = require('./masterRoutes/respondent.route');
const schooleBuildingRout = require('./masterRoutes/school.building.route');
const schoolLocationRoute = require('./masterRoutes/school-location.route');
const inChargeTypeRoute = require('./masterRoutes/head.of.school.route');
const schoolcategoryRoute = require('./masterRoutes/school.category.route');
const districtRoute = require('./masterRoutes/distict.route');
const safetyAndSecurityRoute = require('./masterRoutes/safety.and.security.route');
const languageRoute = require('./masterRoutes/language.route');
const typeresidentialschoolRouter = require('./masterRoutes/type_residential_school.route');
const Boardresidentialschool = require('./masterRoutes/boarding_residential_school.route');
const MinorityManageSchool = require('./masterRoutes/minority_manage_school.route');
const BoundaryWall = require('./masterRoutes/boundarywall.route');
const ClassroomAvailableRouter = require('./masterRoutes/classromm_available.route');
const internetTypeRoute = require('./masterRoutes/type.of.internet.route');
const specialEducatorRoute = require('./masterRoutes/special.educator.route');
const laboratoryRoute = require('./masterRoutes/laboratories.route');
const academicsRoute = require('./masterRoutes/academics.route');
const studentStatusRoute = require('./masterRoutes/student.status.route');
const admitRoute = require('./masterRoutes/admitted.routes');
const resultTypeRoute = require('./masterRoutes/results.route');
const ictRoute = require('./masterRoutes/ICTGovSchool.route');
const studentAdmissionRoute = require('./masterRoutes/student.admission.type.route');
const studentSocialRoute = require('./masterRoutes/student.social.category.route');
const studenttypeRoute = require('./masterRoutes/student.type.route');
const typeOfictRoute = require('./masterRoutes/typeOfICT.route');
const Section1A10Route = require('./masterRoutes/section1A(1.1 to 1.10).route');
const AppliedForPlacementRoute = require('./masterRoutes/applied_for_placement.route');
const AppliedForApprenticeshipRoute = require('./masterRoutes/applied_for_apprenticeship.route');
const UdiseblockRoute = require('./masterRoutes/udiseblock.route');
const Section1A20Route = require('./masterRoutes/section1A(1.1 to 1.20).route');
const Section1A30Route = require('./masterRoutes/section1A(1.21 to 1.30).route');
const Section1A40Route = require('./masterRoutes/section1A(1.31 to 1.40).route');
const StudentMinorityGroupRoute = require('./masterRoutes/student.Minority.group.route');
const SectorRoute = require('./masterRoutes/sector.route');
const Section1A50Route = require('./masterRoutes/section1A(1.41 to 1.50).route');
const Section1A53Route = require('./masterRoutes/section1A(1.51 to 1.53).route');
const Section1B54Route = require('./masterRoutes/section1B(1.54 to 1.54.12).route');
const Section1C57Route = require('./masterRoutes/section1C(1.55 to 1.57.8).route');
const Section1D60Route = require('./masterRoutes/section1D(1.58.1 to 1.60.3).route');
const Section1E62Route = require('./masterRoutes/section1E(1.62 to 1.62).route');
const Section2A21Route = require('./masterRoutes/section2A(2.1 to 2.21).route');
const Section2B27Route = require('./masterRoutes/section2B(2.22 to 1.27).route');
const Section3ARoute = require('./masterRoutes/section3A(3.1 to 3.4).route');
const stateRoute = require('./masterRoutes/state.route');
const AssessmentItemRoute = require('./masterRoutes/assessmentItem.route');
const specialRoute = require('./masterRoutes/special.school.CWSN.route');
const hostelRoute = require('./masterRoutes/type.of.hostel.route');
const specialTraningRoute = require('./masterRoutes/school.special.training.route');
const staffDesignationRoute = require('./masterRoutes/staff.designation.route');
const staffDisabilityRoute = require('./masterRoutes/staff.type.of.disability.route');
const staffQualificationRoute = require('./masterRoutes/staff.professional.qualification.route');
const teacherTypeRoute = require('./masterRoutes/type.of.teacher.route');
const traningRoute = require('./masterRoutes/staff.training.route');
const appointedRoute = require('./masterRoutes/appointed.level.route');
const assectMasterRoute = require('./masterRoutes/assetMaster.route');
const sansthanRoute = require('./sansthan.route');
const assetManagementRoute = require('./asset.management.route');
const saralInformation1Route = require('./saral/saral.information1.route');
const saralInformation2Route = require('./saral/saral.information2.route');
const saralInformation3Route = require('./saral/saral.information3.route');
const saralInformation4Route = require('./saral/saral.information4.route');
const teacherTrainingRoute = require('./teacher.training.route');
const teacherRoute = require('./teacher.route');
const middayMealRoute = require('./midday.meal.route');
const courseEnrollmentRoute = require('./course.enrollment.route');
const selfAssessmentRoute = require('./self.assessment.route');
const attendanceRoute = require('./attendance.route');
const schoolAnalysisRoute = require('./school.analysis.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/school-analysis',
    route: schoolAnalysisRoute,
  },
  {
    path: '/self-assessment',
    route: selfAssessmentRoute,
  },
  {
    path: '/course-enrollment',
    route: courseEnrollmentRoute,
  },
  {
    path: '/midday-meal',
    route: middayMealRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/schools',
    route: schoolRoute,
  },
  {
    path: '/asset-management',
    route: assetManagementRoute,
  },
  {
    path: '/residentialschool',
    route: residentialschoolRouter,
  },
  {
    path: '/managgroupschool',
    route: managmentGroupSchoolRoute,
  },
  {
    path: '/managCodeschool',
    route: managmentCodeSchoolRoute,
  },
  {
    path: '/assessmentitem',
    route: AssessmentItemRoute,
  },
  {
    path: '/managAdministrationType',
    route: managementAdministrationTypeRoute,
  },
  {
    path: '/RespondentType',
    route: respondentRoute,
  },
  {
    path: '/schoolBuilding',
    route: schooleBuildingRout,
  },
  {
    path: '/studentAdmissionGroup',
    route: studentAdmissionRoute,
  },
  {
    path: '/schoollocationtype',
    route: schoolLocationRoute,
  },
  {
    path: '/studentType',
    route: studenttypeRoute,
  },
  {
    path: '/socialCategory',
    route: studentSocialRoute,
  },
  {
    path: '/inchargetype',
    route: inChargeTypeRoute,
  },
  {
    path: '/schoolcategorytype',
    route: schoolcategoryRoute,
  },
  {
    path: '/district',
    route: districtRoute,
  },
  {
    path: '/safetyandsecurity',
    route: safetyAndSecurityRoute,
  },
  {
    path: '/language',
    route: languageRoute,
  },
  {
    path: '/typeresidentialschool',
    route: typeresidentialschoolRouter,
  },
  {
    path: '/boardresidentialschool',
    route: Boardresidentialschool,
  },
  {
    path: '/minoritymanageschool',
    route: MinorityManageSchool,
  },
  {
    path: '/boundarywall',
    route: BoundaryWall,
  },
  {
    path: '/internetType',
    route: internetTypeRoute,
  },
  {
    path: '/ICTgovschool',
    route: ictRoute,
  },
  {
    path: '/TypeOfICTgovschool',
    route: typeOfictRoute,
  },
  {
    path: '/classroomavailable',
    route: ClassroomAvailableRouter,
  },
  {
    path: '/specialEducator',
    route: specialEducatorRoute,
  },
  {
    path: '/laboratory',
    route: laboratoryRoute,
  },
  {
    path: '/academics',
    route: academicsRoute,
  },
  {
    path: '/studentStatus',
    route: studentStatusRoute,
  },
  {
    path: '/udiseblock',
    route: UdiseblockRoute,
  },
  {
    path: '/admit',
    route: admitRoute,
  },
  {
    path: '/resultType',
    route: resultTypeRoute,
  },
  {
    path: '/section1A10',
    route: Section1A10Route,
  },
  {
    path: '/appliedforplacement',
    route: AppliedForPlacementRoute,
  },
  {
    path: '/appliedforapprenticeship',
    route: AppliedForApprenticeshipRoute,
  },
  {
    path: '/section1A20',
    route: Section1A20Route,
  },
  {
    path: '/section1A30',
    route: Section1A30Route,
  },
  {
    path: '/section1A40',
    route: Section1A40Route,
  },
  {
    path: '/studentMinorityGroup',
    route: StudentMinorityGroupRoute,
  },
  {
    path: '/sector',
    route: SectorRoute,
  },
  {
    path: '/section1A50',
    route: Section1A50Route,
  },
  {
    path: '/section1A53',
    route: Section1A53Route,
  },
  {
    path: '/section1B54',
    route: Section1B54Route,
  },
  {
    path: '/section1C57',
    route: Section1C57Route,
  },
  {
    path: '/section1D60',
    route: Section1D60Route,
  },
  {
    path: '/section1E62',
    route: Section1E62Route,
  },
  {
    path: '/section2A21',
    route: Section2A21Route,
  },
  {
    path: '/section2B27',
    route: Section2B27Route,
  },
  {
    path: '/section3A',
    route: Section3ARoute,
  },
  {
    path: '/state',
    route: stateRoute,
  },
  {
    path: '/specialschool',
    route: specialRoute,
  },
  {
    path: '/typeofhostel',
    route: hostelRoute,
  },
  {
    path: '/specialtraning',
    route: specialTraningRoute,
  },
  {
    path: '/staffdesignation',
    route: staffDesignationRoute,
  },
  {
    path: '/teacher-training',
    route: teacherTrainingRoute,
  },
  {
    path: '/staffdisability',
    route: staffDisabilityRoute,
  },
  {
    path: '/staffqualification',
    route: staffQualificationRoute,
  },
  {
    path: '/teachertype',
    route: teacherTypeRoute,
  },
  {
    path: '/stafftranning',
    route: traningRoute,
  },
  {
    path: '/appointed',
    route: appointedRoute,
  },
  {
    path: '/assetMaster',
    route: assectMasterRoute,
  },
  {
    path: '/sansthan',
    route: sansthanRoute,
  },
  {
    path: '/saralInformation1',
    route: saralInformation1Route,
  },
  {
    path: '/saralInformation2',
    route: saralInformation2Route,
  },
  {
    path: '/saralInformation3',
    route: saralInformation3Route,
  },
  {
    path: '/saralInformation4',
    route: saralInformation4Route,
  },
  {
    path: '/teacher',
    route: teacherRoute,
  },
  {
    path: '/attendance',
    route: attendanceRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
