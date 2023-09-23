const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const UserInfo = require('../models/userInfo.model');

require('dotenv').config();

const googleClientID = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

const googleStrategyConfig = new GoogleStrategy(
  {
    clientID: googleClientID,
    clientSecret: googleClientSecret,
    callbackURL: '/auth/google/callback',
    accessType: 'offline',
    prompt: 'consent',
    scope: ['profile', 'email'],
  },
  async (accessToken, refreshToken, id_token, profile, done) => {
    try {
      const existingUser = await UserInfo.findOne({ googleId: profile.id });

      console.log(id_token);
      if (existingUser) {
        return done(null, existingUser);
      }
      const newUser = new UserInfo({
        email: profile.emails[0].value,
        googleID: profile.id,
        name: profile.displayName,
        picture: profile.photos[0].value,
        locale: profile._json.locale,
        isCookieAllowed: true,
        role: 'user',
        address: '',
      });
      const user = await newUser.save();
      done(null, user);
    } catch (err) {
      done(err);
    }
  }
);

passport.use('google', googleStrategyConfig);
