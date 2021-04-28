const { MessageSender } = require('ffc-messaging')
const msgCfg = require('../config/messaging')

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
  sendScoreCalculated: async function (desirabilityScoreData, correlationId) {
    await sendMsg(scoreCalculatedSender, desirabilityScoreData, msgCfg.desirabilityScoreMsgType, correlationId)
  }
}
