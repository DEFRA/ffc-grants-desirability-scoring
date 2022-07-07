const { fetchCostRequestMsgType } = require('../config/messaging')

const processCost = require('./standardised-costs')

// Called by messaging/service.js
// If receives message from queue, run relevant function
const processCostMessage = async (message, receiver) => {
  try {
    const { applicationProperties: properties } = message
    switch (properties.type) {
      case fetchCostRequestMsgType:
        await processCost(message)
        break
    }

    await receiver.completeMessage(message)
  } catch (err) {
    console.error('Unable to process Cost request:', err)
  }
}

module.exports = processCostMessage
