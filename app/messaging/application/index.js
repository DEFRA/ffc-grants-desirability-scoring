const { sendMessage } = require('../')
const { costResponseQueue, fetchCostResponseMsgType } = require('./../../config/messaging')

async function sendResponseToSession (grantData, sessionId) {
  await sendMessage(grantData, fetchCostResponseMsgType, costResponseQueue, { sessionId })
}

module.exports = {
  sendResponseToSession
}
