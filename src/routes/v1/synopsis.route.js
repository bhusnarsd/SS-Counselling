const express = require('express');
const auth = require('../../middlewares/auth');
const { synopsisController } = require('../../controllers');

const router = express.Router();

router.route('/').post(synopsisController.createSynopsis);
router.route('/:id').get(auth('admin', 'school', 'superadmin', 'student', 'trainer'), synopsisController.getSynopsisById);
module.exports = router;
