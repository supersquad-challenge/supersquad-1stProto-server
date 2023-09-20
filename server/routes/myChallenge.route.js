const express = require('express');
const router = express.Router();

const myChallenge = require('../controllers/myChallenge.controller');

router.post('/register', myChallenge.registerMyChallenge);
router.get('/myStatus/:userChallengeId', myChallenge.getMyStatus);
router.get('/totalStatus/:userChallengeId', myChallenge.getTotalStatus);
router.get('/payback/:userChallengeId', myChallenge.getPayback);

module.exports = router;
