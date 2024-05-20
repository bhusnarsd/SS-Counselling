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