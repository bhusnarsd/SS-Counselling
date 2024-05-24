const express = require('express');
const auth = require('../../middlewares/auth');
const { visitController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .post(
    auth('admin', 'school', 'superadmin', 'student', 'trainer', 'department', 'skillTrainer'),
    visitController.createSchedule
  );
router.route('/get-dashboard-counts').get(visitController.getSchoolIdsAndStudentCount);

router
  .route('/:trainerId')
  .get(
    auth('admin', 'school', 'superadmin', 'student', 'trainer', 'department', 'skillTrainer'),
    visitController.getTrainerVisits
  );

router.route('/get-trainer-details/:schoolId').get(visitController.getVisitsBySchoolId);
module.exports = router;
