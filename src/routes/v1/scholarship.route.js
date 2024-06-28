const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { collegeValidation } = require('../../validations');
const { schollershiopController } = require('../../controllers');
// const path = require('../../uploads');
// /home/oem/new work/ss-counselling/backend/src/uploads
const router = express.Router();

// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
  const uploads = multer({ storage });
  
  router.route('/bulkupload').post(uploads.single('file'), schollershiopController.bulkUploadFile);
  
router
  .route('/')
  .post(
    auth('admin', 'school', 'superadmin', 'student', 'cluster', 'trainer', 'department'),
    // validate(collegeValidation.createCollege),
    schollershiopController.createScholarship
  )
  .get(
    auth('admin', 'school', 'superadmin', 'student', 'trainer', 'cluster', 'department'),
    // validate(collegeValidation.getColleges),
    schollershiopController.getScholarships
  );

router
  .route('/:scholarshipId')
  .get(
    auth('admin', 'school', 'superadmin', 'student', 'cluster', 'trainer', 'department'),
    // validate(collegeValidation.getCollege),
    schollershiopController.getScholarship
  )
  .patch(
    auth('admin', 'school', 'superadmin', 'student', 'cluster', 'trainer', 'department'),
    // validate(collegeValidation.updateCollege),
    schollershiopController.updateScholarship
  )
  .delete(
    auth('admin', 'school', 'superadmin', 'student', 'cluster', 'trainer', 'department'),
    // validate(collegeValidation.deleteCollege),
    schollershiopController.deleteScholarship
  );

module.exports = router;