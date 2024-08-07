const { fetchCostRequestMsgType, fetchScoreRequestMsgType, fetchWaterScoreRequestMsgType, fetchProdScoreRequestMsgType, fetchHensScoreRequestMsgType, fetchAdultCattleHousingScoreRequestMsgType, fetchAddValScoreRequestMsgType } = require('../config/messaging')

const processCost = require('./standardised-costs')
const processScoring = require('./session-scoring')

// Called by messaging/service.js
// If receives message from queue, run relevant function
const processCostMessage = async (message, receiver) => {
  try {
    const { applicationProperties: properties } = message
    if (properties.type === fetchCostRequestMsgType) {
      await processCost(message)
    }

    if (properties.type === fetchScoreRequestMsgType) {
      console.log(message.body, '[BODY of SCORE MESSAGE]')
      await processScoring(message)
    }

    if (properties.type === fetchWaterScoreRequestMsgType) {
      console.log(message.body, '[SCORING SCRIPT FOR WATER]')
      await processScoring(message)
    }

    if (properties.type === fetchProdScoreRequestMsgType) {
      console.log(message.body, '[BODY OF SCORING FOR PROD]')
      await processScoring(message)
    }

    if (properties.type === fetchHensScoreRequestMsgType) {
      console.log(message.body, '[BODY OF SCORING FOR HENS]')
      await processScoring(message)
    }

    if (properties.type === fetchAdultCattleHousingScoreRequestMsgType) {
      console.log(message.body, '[BODY OF SCORING FOR ADULT CATTLE HOUSING]')
      await processScoring(message)
    }

    if (properties.type === fetchAddValScoreRequestMsgType) {
      console.log(message.body, '[BODY OF SCORING FOR AddVal]')
      await processScoring(message)
    }

    await receiver.completeMessage(message)
  } catch (err) {
    console.error('Unable to process request:', err)
  }
}

module.exports = processCostMessage
