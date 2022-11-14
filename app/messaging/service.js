const { MessageReceiver } = require('ffc-messaging')
const config = require('../config/messaging')
const processCostMessage = require('./process-message')

let costReceiver
let scoreReceiver
let waterScoreReceiver
// Listener, started by app/index.js
const start = async () => {
  const costAction = message => processCostMessage(message, costReceiver)
  costReceiver = new MessageReceiver(config.costRequestQueue, costAction)
  await costReceiver.subscribe()

  const scoreAction = message => processCostMessage(message, scoreReceiver)
  scoreReceiver = new MessageReceiver(config.scoreRequestQueue, scoreAction)
  await scoreReceiver.subscribe()

  const waterScoreAction = message => processCostMessage(message, waterScoreReceiver)
  waterScoreReceiver = new MessageReceiver(config.waterScoreRequestQueue, waterScoreAction)
  await waterScoreReceiver.subscribe()

  console.info('[READY TO RECEIVE MESSAGES]')
}

// Function to stop Listening if server is down/error occurs
const stop = async () => {
  await costReceiver.closeConnection()
  await scoreReceiver.closeConnection()
  await waterScoreReceiver.closeConnection()
}

module.exports = { start, stop }
