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
        depositMethod: userChallengeInfo.depositMethod,
        deposit: userChallengeInfo.deposit,
        cashPayback: userChallengeInfo.cashPayback,
        cryptoPayback: userChallengeInfo.cryptoPayback,
        verificationStatus: userChallengeInfo.verificationStatus,
        completeNum: userChallengeInfo.completeNum,
        successRate: userChallengeInfo.successRate,
        isSuccess: userChallengeInfo.isSuccess,
        totalPayback: userChallengeInfo.totalPayback,
        profit: userChallengeInfo.profit,
        challengeReward: userChallengeInfo.challengeReward,
        cryptoYieldBoost: userChallengeInfo.cryptoYieldBoost,
        userInfo_id: userChallengeInfo.userInfoId,
        challenge_id: userChallengeInfo.challengeId,
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

      if (!userChallengeInfo) {
        return res.status(404).json({
          error: 'User Challenge not found',
        });
      }

      const challengeInfo = await ChallengeInfo.findById(userChallengeInfo.challenge_id);

      //console.log(userChallengeInfo);
      //console.log(challengeInfo);

      res.status(200).json({
        message: 'My status found',
        myStatus: {
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
      const userChallengeInfo = await UserChallenge.findById(req.params.userChallengeId);

      if (!userChallengeInfo) {
        return res.status(404).json({
          error: 'User Challenge not found',
        });
      }

      const challengeInfo = await ChallengeInfo.findById(userChallengeInfo.challenge_id);

      res.status(200).json({
        message: 'Total status found',
        totalStatus: {
          challengeId: challengeInfo._id,
          challengeName: challengeInfo.challengeName,
          challengeThumbnail: challengeInfo.challengeThumbnail,
          challengeParticipantsCount: challengeInfo.challengeParticipantsCount,
          challengeTotalDeposit: challengeInfo.challengeTotalDeposit,
          cashSuccessPool: 1000,
          cashFailPool: 500,
          challengeCryptoDeposit: challengeInfo.challengeCryptoDeposit,
          cryptoSuccessPool: 40,
          cryptoFailPool: 5,
          cryptoYield: challengeInfo.cryptoYield,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  },
  getPayback: async (req, res) => {
    try {
      const userChallengeInfo = await UserChallenge.findById(req.params.userChallengeId);

      if (!userChallengeInfo) {
        return res.status(404).json({
          error: 'User Challenge not found',
        });
      }
      res.status(200).json({
        message: 'Payback found',
        payback: {
          totalPayback: userChallengeInfo.totalPayback,
          profit: userChallengeInfo.profit,
          challengeReward: userChallengeInfo.challengeReward,
          cryptoYieldBoost: userChallengeInfo.cryptoYieldBoost,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  },
};
