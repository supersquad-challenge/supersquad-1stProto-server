const express = require('express');
const router = express.Router();

const user = require('./user.route');
const challenge = require('./challenge.route');
const tx = require('./transaction.route');
const verify = require('./verify.route');
const myCallenge = require('./myChallenge.route');
const auth = require('./auth.route');

router.use('/user', user);
router.use('/challenge', challenge);
router.use('/myChallenge', myCallenge);
router.use('/tx', tx);
router.use('/verify', verify);
router.use('/auth', auth);

module.exports = router;
