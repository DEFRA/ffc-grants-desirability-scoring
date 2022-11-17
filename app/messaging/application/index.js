const { sendMessage } = require('../')
const { costResponseQueue, fetchCostResponseMsgType, scoreResponseQueue, scoreWaterResponseQueue, fetchScoreResponseMsgType, fetchWaterScoreResponseMsgType } = require('./../../config/messaging') // add fetchWaterScoreResponseMsgType

async function sendResponseToSession (grantData, sessionId, msgType) {
  if (msgType === '.fetch.cost.request') {
    await sendMessage(grantData, fetchCostResponseMsgType, costResponseQueue, { sessionId })
  } else if (msgType === '.fetch.score.request') {
    await sendMessage(grantData, fetchScoreResponseMsgType, scoreResponseQueue, { sessionId })
  } else if (msgType === '.fetch.water.score.request') {
    await sendMessage(grantData, fetchWaterScoreResponseMsgType, scoreWaterResponseQueue, { sessionId })
  } else {
    await sendMessage(grantData, fetchCostResponseMsgType, costResponseQueue, { sessionId })
  }
}

module.exports = {
  sendResponseToSession
}
