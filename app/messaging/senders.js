const { MessageSender } = require('ffc-messaging')
const msgCfg = require('../config/messaging')
const protectiveMonitoringServiceSendEvent = require('../services/protective-monitoring-service')

const scoreCalculatedSender = new MessageSender(msgCfg.desirabilityScoreTopic)

async function stop () {
  await scoreCalculatedSender.closeConnection()
}

process.on('SIGTERM', async () => {
  await stop()
  process.exit(0)
})

process.on('SIGINT', async () => {
  await stop()
  process.exit(0)
})

async function sendMsg (sender, msgData, msgType, correlationId) {
  const msg = {
    body: msgData,
    type: msgType,
    source: msgCfg.msgSrc,
    correlationId
  }
  console.log('Sending Message:')
  console.log(msg)
  await sender.sendMessage(msg)
}

module.exports = {
  sendScoreCalculated: async function (desirabilityScoreData, correlationId, messageType = null) {
    messageType = messageType ?? msgCfg.desirabilityScoreMsgType
    await sendMsg(scoreCalculatedSender, desirabilityScoreData, messageType, correlationId)
    await protectiveMonitoringServiceSendEvent(correlationId, 'FTF-DATA-SCORE-REQUESTED', '0703')
  }
}
