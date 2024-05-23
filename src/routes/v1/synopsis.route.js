const express = require('express');
const auth = require('../../middlewares/auth');
const { synopsisController } = require('../../controllers');

const router = express.Router();

router.route('/').post(auth('admin', 'trainer'), synopsisController.createSynopsis);
router
  .route('/:studentId')
  .get(auth('admin', 'school', 'superadmin', 'student', 'trainer'), synopsisController.getSynopsisById);
module.exports = router;
