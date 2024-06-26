const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');
const schoolRoute = require('./school.route');
const sansthanRoute = require('./sansthan.route');
const teacherRoute = require('./teacher.route');
const studentRoute = require('./student.route');
const visitRoute = require('./visit.route');
const assessmentRoute = require('./assessment.route');
const statisticRoute = require('./statistics.route');
const requestRoute = require('./request.route');
const synopsisRoute = require('./synopsis.route');
const skillTrainerRoute = require('./lifeSkillTrainer.route');
const reqLifeTrainerRoute = require('./reqLifeTrainer.route');
const notificationRoute = require('./notification.route');
const clusterRoute = require('./cluster.route');
const newsletterRoute = require('./newsletter.route');
const careerRoute = require('./career.route');
const collegeRoute = require('./college.route');
const scholarshipRoute = require('./scholarship.route');
const questionRoute = require('./question.route');
const userAnswerRoute = require('./userAnswer.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
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
    path: '/sansthan',
    route: sansthanRoute,
  },
  {
    path: '/teacher',
    route: teacherRoute,
  },
  {
    path: '/student',
    route: studentRoute,
  },
  {
    path: '/visit',
    route: visitRoute,
  },
  {
    path: '/assessment',
    route: assessmentRoute,
  },
  {
    path: '/statistics',
    route: statisticRoute,
  },
  {
    path: '/requests',
    route: requestRoute,
  },
  {
    path: '/synopsis',
    route: synopsisRoute,
  },
  {
    path: '/skill-trainer',
    route: skillTrainerRoute,
  },
  {
    path: '/request-life-trainer',
    route: reqLifeTrainerRoute,
  },
  {
    path: '/notification',
    route: notificationRoute,
  },
  {
    path: '/cluster',
    route: clusterRoute,
  },
  {
    path: '/news-letter',
    route: newsletterRoute,
  },
  {
    path: '/career',
    route: careerRoute,
  },
  {
    path: '/college',
    route: collegeRoute,
  },
  {
    path: '/scholarship',
    route: scholarshipRoute,
  },
  {
    path: '/question',
    route: questionRoute,
  },
  {
    path: '/user-answer',
    route: userAnswerRoute,
  }
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
// Add Socket.io to request object
router.use((req, res, next) => {
  req.io = req.app.get('socketio');
  next();
});

module.exports = router;
