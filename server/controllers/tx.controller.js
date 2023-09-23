const UserChallenge = require('../models/userChallenge.model');

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

      const updatedUserChallenge = await UserChallenge.findByIdAndUpdate(
        txInfo.userChallengeId,
        {
          $set: {
            depositMethod: txInfo.depositMethod,
            deposit: txInfo.deposit,
          },
        },
        { new: true }
      );

      res.status(200).json({
        message: 'Deposit received',
        depositInfo: {
          depositMethod: updatedUserChallenge.depositMethod,
          deposit: updatedUserChallenge.deposit,
        },
      });
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

      // if (userChallenge.depositMethod === 'cash') {
      // } else if (userChallenge.depositMethod === 'crypto') {
      //   const recievedYield =
      //     (claimInfo.recievedYieldAmount / userChallenge.deposit) * 100;
      //   const successPrize = 20;
      // }

      // const updatedUserChallenge = await UserChallenge.findByIdAndUpdate(
      //   claimInfo.userChallengeId,
      //   {
      //     $set: {
      //       deposit: 0,
      //       cashPayback: claimInfo.recievedYieldAmount,
      //     },
      //   },
      //   { new: true }
      // );

      res.status(200).json({
        message: 'Payback provided',
        paybackInfo: {
          cashPayback: 105,
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
