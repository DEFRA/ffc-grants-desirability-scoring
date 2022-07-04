const { grantMsgSender } = require('./senders')
const appInsights = require('../services/app-insights')
const ScoreEngine = require('../../app/calculation/score-engine')
const scoreDataRepository = require('../services/score-repository')
const msgCfg = require('../config/messaging')
const msgTypePrefix = 'uk.gov.ffc.grants'
module.exports = async function (msg, grantReciever) {
  console.log(msg.applicationProperties.type,'i am in tryyyyy LLLLLLLLLL')
  try {
    const { body, correlationId, applicationProperties } = msg
   
    const msgType = applicationProperties.type.replace(msgTypePrefix, '')
    let grantType = null
    let senderMsgType = null
    if (msgType === '.slurry.desirability.calculate') {
      senderMsgType = msgCfg.desirabilitySlurryMsgType
      grantType = 'Slurry Infrastructure Grant'
    }
    const grantData = await scoreDataRepository.getScoreData(grantType)
    if (grantData && grantData.data) {
      const scoreEngine = new ScoreEngine(body, JSON.parse(grantData.data))
      const scoreResult = scoreEngine.getScore()
      console.log('Score result:')
      console.log(JSON.stringify(scoreResult, null, 2))
      await grantMsgSender(scoreResult, correlationId, senderMsgType)

      await grantReciever.completeMessage(msg)
    } else {
      throw new Error('Unable to get valid score data from database')
    }
  } catch (err) {
    console.error('Unable to process message')
    console.error(err)
    appInsights.logException(err, msg.correlationId)
    await grantReciever.abandonMessage(msg)
  }
}
