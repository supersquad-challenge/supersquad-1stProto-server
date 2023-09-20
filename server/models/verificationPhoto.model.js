var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const VerificationPhotoSchema = new Schema({
  verificationPhoto: String,
  uploadedAt: { type: Date, default: Date.now },
  adminCheckedAt: Date,
  adminCheckStatus: String,
  userChallenge_id: String,
});

module.exports = mongoose.model('VerificationPhoto', VerificationPhotoSchema);
