const ChallengeInfo = require('../models/challengeInfo.model');
const UserChallenge = require('../models/userChallenge.model');

module.exports = {
  registerMyChallenge: async (req, res) => {
    try {
      const userChallengeInfo = req.body;

      const userChallenge = await UserChallenge.findOne({
        challenge_id: userChallengeInfo.challengeId,
      });

      if (userChallenge) {
        return res.status(409).json({
          error: 'Challenge already registered',
        });
      }

      const userRegisterData = {
        userInfo_id: userChallengeInfo.userInfoId,
        challenge_id: userChallengeInfo.challengeId,
        depositMethod: userChallengeInfo.depositMethod,
        deposit: userChallengeInfo.deposit,
      };

      const userChallengeData = await UserChallenge.create(userRegisterData);

      res.status(200).json({
        message: 'My challenge registered',
        userChallengeId: userChallengeData._id,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  },
  getMyStatus: async (req, res) => {
    try {
      const userChallengeInfo = await UserChallenge.findById(req.params.userChallengeId);
      const challengeInfo = await ChallengeInfo.findById(userChallengeInfo.challenge_id);

      console.log(userChallengeInfo);
      console.log(challengeInfo);

      res.status(200).json({
        message: 'My status found',
        MyStatus: {
          challengeId: challengeInfo._id,
          challengeName: challengeInfo.challengeName,
          challengeThumbnail: challengeInfo.challengeThumbnail,
          challengeParticipantsCount: challengeInfo.challengeParticipantsCount,
          challengeTotalDeposit: challengeInfo.challengeTotalDeposit,
          successRate: userChallengeInfo.successRate,
          deposit: userChallengeInfo.deposit,
          completeNum: userChallengeInfo.completeNum,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  },
  getTotalStatus: async (req, res) => {
    try {
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  },
  getPayback: async (req, res) => {
    try {
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  },
};
