const msgCfg = require('../config/messaging')
const { MessageReceiver } = require('ffc-messaging')

let calculateScoreReceiver

async function stop () {
  await calculateScoreReceiver.closeConnection()
}

process.on('SIGTERM', async () => {
  await stop()
  process.exit(0)
})

process.on('SIGINT', async () => {
  await stop()
  process.exit(0)
})

module.exports = {
  startCalculateScoreReceiver: async function (calculateScoreReceived) {
    const updateAction = msg => calculateScoreReceived(msg, calculateScoreReceiver)
    calculateScoreReceiver = new MessageReceiver(msgCfg.calculateScoreQueue, updateAction)
    await calculateScoreReceiver.subscribe()
  }
}
