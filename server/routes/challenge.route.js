const express = require('express');
const router = express.Router();

const challenge = require('../controllers/challenge.controller');

router.get('/', challenge.getChallengeAll);
router.get('/:challengeId', challenge.getChallengeById);
router.post('/create', challenge.createChallenge);

module.exports = router;
