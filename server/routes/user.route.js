const express = require('express');
const router = express.Router();

const user = require('../controllers/user.controller');

router.post('/nickname', user.registerUserName);
router.post('/address', user.registerAddress);
router.get('/detail/:userInfoId', user.getUserInfo);
router.post('/create', user.createUser);
router.get('/all', user.getAllUsers);

module.exports = router;
