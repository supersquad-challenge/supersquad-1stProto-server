var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const UserInfoSchema = new Schema({
  email: {
    type: String,
    unique: true,
  },
  googleId: String,
  name: String,
  picture: String,
  locale: String,
  isCookieAllowed: Boolean,
  role: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('UserInfo', UserInfoSchema);
