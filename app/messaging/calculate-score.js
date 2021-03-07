const { sendScoreCalculated } = require('./senders')

module.exports = async function (msg, calculateScoreReceiver) {
  try {
    const { body } = msg
    console.log('Received message:')
    console.log(body)

    await sendScoreCalculated({ test: 'Desirability score has been calculated' })

    await calculateScoreReceiver.completeMessage(msg)
  } catch (err) {
    console.error('Unable to process message')
    console.error(err)
    await calculateScoreReceiver.abandonMessage(msg)
  }
}
