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

async function sendMsg (sender, msgData, msgType) {
  const msg = {
    body: msgData,
    type: msgType,
    source: msgCfg.msgSrc
  }

  console.log('sending message', msg)

  await sender.sendMessage(msg)
}

module.exports = {
  sendScoreCalculated: async function (desirabilityScoreData) {
    await sendMsg(scoreCalculatedSender, desirabilityScoreData, msgCfg.desirabilityScoreMsgType)
  }
}
