const { sendScoreCalculated } = require('./senders')
const ScoreEngine = require('../../app/calculation/score-engine')
const scoreDataRepository = require('../services/score-repository')
module.exports = async function (msg, calculateScoreReceiver) {
  try {
    const { body, correlationId } = msg
    console.log('Received message:')
    console.log(body)
    const scoreData = await scoreDataRepository.getScoreData('Water Grant')
    const scoreEngine = new ScoreEngine(body, JSON.parse(scoreData.data))
    const scoreResult = scoreEngine.getScore()
    console.log(scoreResult)
    await sendScoreCalculated(scoreResult, correlationId)

    await calculateScoreReceiver.completeMessage(msg)
  } catch (err) {
    console.error('Unable to process message')
    console.error(err)
    await calculateScoreReceiver.abandonMessage(msg)
  }
}
