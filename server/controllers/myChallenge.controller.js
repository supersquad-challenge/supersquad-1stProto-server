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
        depositMethod: '',
        deposit: 0,
        completeNum: 14,
        successRate: 100,
        isSuccess: false,
        totalPayback: 0,
        cashPayback: 0,
        cryptoPayback: 0,
        profit: 0,
        challengeReward: 0,
        receivedYieldAmount: 0,
        cryptoYieldBoost: 0,
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
          successRate: userChallengeInfo.successRate,
          deposit: userChallengeInfo.deposit,
          challengeStatus: challengeInfo.challengeStatus,
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

      const cryptoYieldBoostAmount =
        challengeInfo.challengeCryptoDeposit * challengeInfo.cryptoYield * 0.01;
      const totalStatus = {
        challengeId: challengeInfo._id,
        challengeTotalDeposit: challengeInfo.challengeTotalDeposit,
        cryptoYieldBoost: cryptoYieldBoostAmount,
        cashSuccessPool: challengeInfo.cashSuccessPool,
        cashFailPool: challengeInfo.cashFailPool,
        challengeCryptoDeposit: challengeInfo.challengeCryptoDeposit,
        cryptoSuccessPool: challengeInfo.cryptoSuccessPool,
        cryptoFailPool: challengeInfo.cryptoFailPool,
      };

      res.status(200).json({
        message: 'Total status found',
        totalStatus,
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
