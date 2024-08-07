const { sendMessage } = require('../')
const { costResponseQueue, fetchCostResponseMsgType, scoreResponseQueue, fetchScoreResponseMsgType, fetchWaterScoreResponseMsgType, fetchProdScoreResponseMsgType, fetchHensScoreResponseMsgType, fetchAdultCattleHousingScoreResponseMsgType, fetchAddValScoreResponseMsgType } = require('./../../config/messaging')

async function sendResponseToSession (grantData, sessionId, msgType) {
  if (msgType === '.fetch.cost.request') {
    await sendMessage(grantData, fetchCostResponseMsgType, costResponseQueue, { sessionId })
  } else if (msgType === '.fetch.score.request') {
    await sendMessage(grantData, fetchScoreResponseMsgType, scoreResponseQueue, { sessionId })
  } else if (msgType === '.fetch.water.score.request') {
    await sendMessage(grantData, fetchWaterScoreResponseMsgType, scoreResponseQueue, { sessionId })
  } else if (msgType === '.fetch.prod.score.request') {
    await sendMessage(grantData, fetchProdScoreResponseMsgType, scoreResponseQueue, { sessionId })
  } else if (msgType === '.fetch.layingHens.score.request') {
    await sendMessage(grantData, fetchHensScoreResponseMsgType, scoreResponseQueue, { sessionId })
  } else if (msgType === '.fetch.addval.score.request') {
    await sendMessage(grantData, fetchAddValScoreResponseMsgType, scoreResponseQueue, { sessionId })
  } else if (msgType === '.fetch.adultCattleHousing.score.request') {
    await sendMessage(grantData, fetchAdultCattleHousingScoreResponseMsgType, scoreResponseQueue, { sessionId })
  } else {
    await sendMessage(grantData, fetchCostResponseMsgType, costResponseQueue, { sessionId })
  }
}

module.exports = {
  sendResponseToSession
}
