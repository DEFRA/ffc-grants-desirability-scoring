const { sendMessage } = require('../')
const { costResponseQueue, fetchCostResponseMsgType, scoreResponseQueue, fetchScoreResponseMsgType } = require('./../../config/messaging')

async function sendResponseToSession (grantData, sessionId, msgType) {
  if (msgType === '.fetch.cost.request') {
    await sendMessage(grantData, fetchCostResponseMsgType, costResponseQueue, { sessionId })
  } else {
    await sendMessage(grantData, fetchScoreResponseMsgType, scoreResponseQueue, { sessionId })
  }
}

module.exports = {
  sendResponseToSession
}
