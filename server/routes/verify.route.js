const express = require('express');
const router = express.Router();

const verify = require('../controllers/verify.controller');

router.post('/postPhoto', verify.postPhoto);
router.post('/verifyPhoto', verify.verifyPhoto);
router.get('/', verify.getAllPhotos);
router.get('/:verificationPhotoId', verify.getPhotoById);

module.exports = router;
