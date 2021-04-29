const { sendScoreCalculated } = require('./senders')
const ScoreEngine = require('../../app/calculation/score-engine')
const scoreDataRepository = require('../services/score-repository')
module.exports = async function (msg, calculateScoreReceiver) {
  try {
    const { body, correlationId } = msg
    console.log('Received message:')
    console.log(JSON.stringify(body, null, 2))
    const scoreData = await scoreDataRepository.getScoreData('Water Grant')
    const scoreEngine = new ScoreEngine(body, JSON.parse(scoreData.data))
    const scoreResult = scoreEngine.getScore()
    console.log('Score result:')
    console.log(JSON.stringify(scoreResult, null, 2))
    await sendScoreCalculated(scoreResult, correlationId)

    await calculateScoreReceiver.completeMessage(msg)
  } catch (err) {
    console.error('Unable to process message')
    console.error(err)
    await calculateScoreReceiver.abandonMessage(msg)
  }
}
