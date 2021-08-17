const { sendScoreCalculated } = require('./senders')
const appInsights = require('../services/app-insights')
const ScoreEngine = require('../../app/calculation/score-engine')
const scoreDataRepository = require('../services/score-repository')
const msgCfg = require('../config/messaging')
const msgTypePrefix = 'uk.gov.ffc.grants'
module.exports = async function (msg, calculateScoreReceiver) {
  try {
    const { body, correlationId, applicationProperties } = msg
    console.log('Received message of type:', applicationProperties)
    console.log(JSON.stringify(body, null, 2))
    const scoreMsgType = applicationProperties.type.replace(msgTypePrefix, '')
    let scoreDataType = null
    let senderMsgType = null
    switch (scoreMsgType) {
      case '.productivity.desirability.calculate':
        senderMsgType = msgCfg.desirabilityProductivityScoreMsgType
        scoreDataType = 'Productivity Grant'
        break
      case 'xyz.desirability.calculate':
        senderMsgType = msgCfg.desirabilityProductivityScoreMsgType
        scoreDataType = 'XYZ Grant'
        break
      default:
        senderMsgType = msgCfg.desirabilityScoreMsgType
        scoreDataType = 'Water Grant'
        break
    }
    const scoreData = await scoreDataRepository.getScoreData(scoreDataType)
    if (scoreData && scoreData.data) {
      const scoreEngine = new ScoreEngine(body, JSON.parse(scoreData.data))
      const scoreResult = scoreEngine.getScore()
      console.log('Score result:')
      console.log(JSON.stringify(scoreResult, null, 2))
      await sendScoreCalculated(scoreResult, correlationId, senderMsgType)

      await calculateScoreReceiver.completeMessage(msg)
    } else {
      throw new Error('Unable to get valid score data from database')
    }
  } catch (err) {
    console.error('Unable to process message')
    console.error(err)
    appInsights.logException(err, msg.correlationId)
    await calculateScoreReceiver.abandonMessage(msg)
  }
}
