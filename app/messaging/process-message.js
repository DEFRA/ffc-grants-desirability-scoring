const { fetchCostRequestMsgType } = require('../config/messaging')

const processCost = require('./standardised-costs')

// Called by messaging/service.js
// If receives message from queue, run relevant function
const processCostMessage = async (message, receiver) => {
  console.log(message,'LLLLLLLLLLLLLLLLLL')
  try {
    const { applicationProperties: properties } = message
    console.log('[YAY IT WOKRED]')
    if (properties.type) {
      await processCost(message)
      
    }
    // switch (properties.type) {
    //   case fetchCostRequestMsgType:
    //     await processCost(message)
    //     break
    // }
    await receiver.completeMessage(message)
    console.log('[SUCESS CONNECTED TO COST RECEIVER MSG]')
  } catch (err) {
    console.error('Unable to process Cost request:', err)
  }
}

module.exports = processCostMessage
