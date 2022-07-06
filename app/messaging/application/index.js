const { sendMessage } = require('../')
const { costResponseQueue, fetchCostResponseMsgType } = require('./../../config/messaging')


async function sendResponseToSession(grantData, sessionId) {
  console.log('[MADE IT TO MESSAGE]', sessionId)
  
  await sendMessage(grantData, fetchCostResponseMsgType, costResponseQueue, { sessionId })

}

module.exports = {
    sendResponseToSession
}