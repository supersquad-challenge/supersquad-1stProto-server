var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const UserChallengeSchema = new Schema({
  depositMethod: String,
  deposit: Number,
  verificationStatus: { type: Boolean, default: true },
  completeNum: Number,
  successRate: Number,
  isSuccess: Boolean,
  userInfo_id: String,
  challenge_id: String,
});

module.exports = mongoose.model('UserChallenge', UserChallengeSchema);
