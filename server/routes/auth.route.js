const express = require('express');
const router = express.Router();
const passport = require('passport');

require('../controllers/auth.controller');

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'], session: false })
);
router.get(
  '/google/callback',
  passport.authenticate('google', {
    successReturnToOrRedirect: '/challenge',
    failureRedirect: '/',
    session: false,
  })
);

module.exports = router;
