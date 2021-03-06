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
  startCalculateRequestReceived: async function (calculateRequestReceived) {
    const updateAction = msg => calculateRequestReceived(msg, calculateScoreReceiver)
    calculateScoreReceiver = new MessageReceiver(msgCfg.calculateScoreQueue, updateAction)
    await calculateScoreReceiver.subscribe()
  }
}
