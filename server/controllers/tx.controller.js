const UserChallenge = require('../models/userChallenge.model');
const ChallengeInfo = require('../models/challengeInfo.model');

module.exports = {
  receiveDeposit: async (req, res) => {
    try {
      const txInfo = req.body;

      const userChallenge = await UserChallenge.findById(txInfo.userChallengeId);
      //console.log(userChallenge);

      if (!userChallenge) {
        return res.status(404).json({
          error: 'User Challenge not found',
        });
      }

      const challengeInfo = await ChallengeInfo.findById(userChallenge.challenge_id);

      const updatedUserChallenge = await UserChallenge.findByIdAndUpdate(
        txInfo.userChallengeId,
        {
          $set: {
            depositMethod: txInfo.depositMethod,
            deposit: userChallenge.deposit + txInfo.deposit,
          },
        },
        { new: true }
      );

      if (txInfo.depositMethod === 'cash') {
        const updatedChallengeInfo = await ChallengeInfo.findByIdAndUpdate(
          userChallenge.challenge_id,
          {
            $set: {
              challengeTotalDeposit: challengeInfo.challengeTotalDeposit + txInfo.deposit,
              challengeCashDeposit: challengeInfo.challengeCashDeposit + txInfo.deposit,
              cashSuccessPool: challengeInfo.cashSuccessPool + txInfo.deposit,
              challengeParticipantsCount: challengeInfo.challengeParticipantsCount + 1,
            },
          },
          { new: true }
        );

        res.status(200).json({
          message: 'Cash deposit received',
          depositInfo: {
            challengeTotalDeposit: updatedChallengeInfo.challengeTotalDeposit,
            challengeCashDeposit: updatedChallengeInfo.challengeCashDeposit,
            challengeParticipantsCount: updatedChallengeInfo.challengeParticipantsCount,
            deposit: updatedUserChallenge.deposit,
          },
        });
      } else if (txInfo.depositMethod === 'crypto') {
        const updatedChallengeInfo = await ChallengeInfo.findByIdAndUpdate(
          userChallenge.challenge_id,
          {
            $set: {
              challengeTotalDeposit: challengeInfo.challengeTotalDeposit + txInfo.deposit,
              challengeCryptoDeposit:
                challengeInfo.challengeCryptoDeposit + txInfo.deposit,
              cryptoSuccessPool: challengeInfo.cryptoSuccessPool + txInfo.deposit,
              challengeParticipantsCount: challengeInfo.challengeParticipantsCount + 1,
            },
          },
          { new: true }
        );

        res.status(200).json({
          message: 'Crypto deposit received',
          depositInfo: {
            challengeTotalDeposit: updatedChallengeInfo.challengeTotalDeposit,
            challengeCryptoDeposit: updatedChallengeInfo.challengeCryptoDeposit,
            challengeParticipantsCount: updatedChallengeInfo.challengeParticipantsCount,
            deposit: updatedUserChallenge.deposit,
          },
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  },
  providePayback: async (req, res) => {
    try {
      const claimInfo = req.body;

      const userChallenge = await UserChallenge.findById(claimInfo.userChallengeId);

      if (!userChallenge) {
        return res.status(404).json({
          error: 'User Challenge not found',
        });
      }

      if (userChallenge.successRate >= 80) {
        userChallenge.isSuccess = true;
      }

      const updatedUserChallenge = await UserChallenge.findByIdAndUpdate(
        claimInfo.userChallengeId,
        {
          $set: {
            isSuccess: userChallenge.isSuccess,
          },
        },
        { new: true }
      );

      res.status(200).json({
        message: 'Payback provided',
        paybackInfo: {
          successRate: updatedUserChallenge.successRate,
          isSuccess: updatedUserChallenge.isSuccess,
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
