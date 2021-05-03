const { sendScoreCalculated } = require('./senders')
const appInsights = require('applicationinsights')
const ScoreEngine = require('../../app/calculation/score-engine')
const scoreDataRepository = require('../services/score-repository')
module.exports = async function (msg, calculateScoreReceiver) {
  try {
    const { body, correlationId } = msg
    console.log('Received message:')
    console.log(JSON.stringify(body, null, 2))
    const scoreData = await scoreDataRepository.getScoreData('Water Grant')
    if (scoreData && scoreData.data) {
      const scoreEngine = new ScoreEngine(body, JSON.parse(scoreData.data))
      const scoreResult = scoreEngine.getScore()
      console.log('Score result:')
      console.log(JSON.stringify(scoreResult, null, 2))
      await sendScoreCalculated(scoreResult, correlationId)

      await calculateScoreReceiver.completeMessage(msg)
    } else {
      throw new Error('Unable to get valid score data from database')
    }
  } catch (err) {
    console.error('Unable to process message')
    console.error(err)
    appInsights.trackException(err)
    await calculateScoreReceiver.abandonMessage(msg)
  }
}
