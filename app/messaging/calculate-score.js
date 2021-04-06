const { sendScoreCalculated } = require('./senders')
const ScoreEngine = require('../../app/calculation/score-engine')
module.exports = async function (msg, calculateScoreReceiver) {
  try {
    const { body, correlationId } = msg
    console.log('Received message:')
    console.log(body)

    const scoreEngine = new ScoreEngine(body)
    const scoreResult = scoreEngine.getScore()

    await sendScoreCalculated(scoreResult, correlationId)

    await calculateScoreReceiver.completeMessage(msg)
  } catch (err) {
    console.error('Unable to process message')
    console.error(err)
    await calculateScoreReceiver.abandonMessage(msg)
  }
}
