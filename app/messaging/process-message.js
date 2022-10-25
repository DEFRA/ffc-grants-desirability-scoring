const { fetchCostRequestMsgType } = require('../config/messaging')

const processCost = require('./standardised-costs')

// Called by messaging/service.js
// If receives message from queue, run relevant function
const processCostMessage = async (message, receiver) => {
  try {
    const { applicationProperties: properties } = message
    if (properties.type === fetchCostRequestMsgType) {
      await processCost(message)
    }

    await receiver.completeMessage(message)
  } catch (err) {
    console.error('Unable to process Cost request:', err)
  }
}

module.exports = processCostMessage
