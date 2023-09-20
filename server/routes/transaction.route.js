const express = require('express');
const router = express.Router();

const challenge = require('../controllers/challenge.controller');

router.get('/', challenge.getChallengeAll);

module.exports = router;
