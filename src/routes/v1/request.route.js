const express = require('express');
const auth = require('../../middlewares/auth');
// const validate = require('../../middlewares/validate');
// const { teacherValidation } = require('../../validations');
const { requestController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .post(auth('superadmin', 'school', 'department'), requestController.createRequest)
  .get(auth('superadmin', 'school', 'department'), requestController.queryRequest);
router.route('/:id').get(auth('superadmin', 'school', 'department'), requestController.getRequestById);
//   .patch(
//     auth('superadmin', 'district_officer', 'division_officer', 'state_officer', 'block_officer'),
//     requestController.updateTeacher
//   );
module.exports = router;
