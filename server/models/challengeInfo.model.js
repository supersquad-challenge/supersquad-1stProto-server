var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ChallengeInfoSchema = new Schema({
  challengeName: String,
  joinChallengeStartsAt: Date,
  joinChallengeEndsAt: Date,
  challengeStartsAt: Date,
  challengeEndsAt: Date,
  challengeStatus: String,
  challengeVerificationFrequency: String,
  challengeRequiredCompleteNum: Number,
  challengeMaxParticipants: Number,
  challengeParticipantsCount: Number,
  challengeVerificationMethod: String,
  challengeCashDeposit: Number,
  challengeCryptoDeposit: Number,
  challengeTotalDeposit: Number,
  defiPool: String,
  cryptoYield: Number,
  description: String,
  challengeThumbnail: String,
});

module.exports = mongoose.model('ChallengeInfo', ChallengeInfoSchema);
