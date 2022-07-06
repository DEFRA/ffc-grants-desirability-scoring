const { MessageSender } = require('ffc-messaging')
const createMessage = require('./create-message')

const sendMessage = async (body, type, config, options) => {
    console.log('[CONFIG IN SEND MESSAGE]', config)
  const message = createMessage(body, type, options)
  const sender = new MessageSender(config)
  try {
      console.log('[MESSAGE SENDING STARTED]')
    await sender.sendMessage(message)
  } catch (err) {
    console.log('[ERROR THROWN]', err)

      throw err
  }

  console.log('[FINISHED SENDING]')
  await sender.closeConnection()
}

module.exports = sendMessage
