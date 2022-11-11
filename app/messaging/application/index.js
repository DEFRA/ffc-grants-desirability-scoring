const { sendMessage } = require('../')
const { costResponseQueue, fetchCostResponseMsgType, scoreResponseQueue, fetchScoreResponseMsgType, fetchWaterScoreResponseMsgType, waterScoreResponseQueue } = require('./../../config/messaging')

async function sendResponseToSession (grantData, sessionId, msgType) {
  if (msgType === '.fetch.cost.request') {
    await sendMessage(grantData, fetchCostResponseMsgType, costResponseQueue, { sessionId })
  } else if (msgType === '.fetch.water.score.request') {
    await sendMessage(grantData, fetchWaterScoreResponseMsgType, waterScoreResponseQueue, { sessionId })
  } else {
    await sendMessage(grantData, fetchScoreResponseMsgType, scoreResponseQueue, { sessionId })
  }
}

module.exports = {
  sendResponseToSession
}
