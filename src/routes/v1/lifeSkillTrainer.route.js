const express = require('express');
const auth = require('../../middlewares/auth');
const { lifeSkillController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .post(
    auth('admin', 'school', 'superadmin', 'student', 'trainer', 'department', 'skillTrainer'),
    lifeSkillController.createSchedule
  );
router.route('/get-dashboard-counts').get(lifeSkillController.getSchoolIdsAndStudentCount);

router
  .route('/:trainerId')
  .get(
    auth('admin', 'school', 'superadmin', 'student', 'trainer', 'department', 'skillTrainer'),
    lifeSkillController.getTrainerVisits
  );

router.route('/get-trainer-details/:schoolId').get(lifeSkillController.getVisitsBySchoolId);
module.exports = router;
