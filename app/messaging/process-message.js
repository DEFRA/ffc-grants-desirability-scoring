const { fetchCostRequestMsgType, fetchScoreRequestMsgType, fetchWaterScoreRequestMsgType } = require('../config/messaging')

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
      console.log(message.body, '[BODY of SCORE MESSAGE FOR WATER]')
      await processScoring(message)
    }

    await receiver.completeMessage(message)
  } catch (err) {
    console.error('Unable to process Cost request:', err)
  }
}

module.exports = processCostMessage
