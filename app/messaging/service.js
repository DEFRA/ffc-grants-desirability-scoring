const { MessageReceiver } = require('ffc-messaging')
const config = require('../config/messaging')
const processCostMessage = require('./process-message')

let costReceiver

// Listener, started by app/index.js
const start = async () => {
  const costAction = message => processCostMessage(message, costReceiver)
  costReceiver = new MessageReceiver(config.costRequestQueue, costAction)
  await costReceiver.subscribe()

  console.info('Ready to receive messages')
}

// Function to stop Listening if server is down/error occurs
const stop = async () => {
  await MessageReceiver.closeConnection()
}

module.exports = { start, stop }
