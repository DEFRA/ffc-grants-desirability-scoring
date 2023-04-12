const { MessageSender } = require('ffc-messaging')
const createMessage = require('./create-message')

const sendMessage = async (body, type, config, options) => {
  const message = createMessage(body, type, options)
  const sender = new MessageSender(config)
  try {
    await sender.sendMessage(message)
  } catch (err) {
    console.log('[ERROR THROWN]', err)
    throw err
  }

  console.log(JSON.stringify(body), '[SUCCESSFULLY SENT STANDARDISED COST]')
  await sender.closeConnection()
}

module.exports = sendMessage
