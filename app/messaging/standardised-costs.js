const appInsights = require('../services/app-insights')
const { sendResponseToSession } = require('./application/index')
const scoreDataRepository = require('../services/score-repository')
const msgTypePrefix = 'uk.gov.ffc.grants'

// Called from messaging/process-message.js
const processCost = async (msg, costReciever) => {
  let msgType
  try {
    // Variables received form MessageReceiver. When message is received, these values are pulled from the message
    const { sessionId, applicationProperties } = msg
    msgType = applicationProperties.type.replace(msgTypePrefix, '')
    let grantType = null
    if (msgType === '.fetch.cost.request') {
      grantType = 'Slurry Infrastructure Grant'
    }
    if (msgType === '.fetch.score.request') {
      grantType = 'Slurry Infrastructure Grant' 
    }
    if (msgType === '.fetch.water.score.request') {
      grantType = 'Slurry Infrastructure Grant' // change this when applying scoring engine
    }

    const grantData = await scoreDataRepository.getScoreData(grantType)
    console.log(grantData.data, '[GRANT DATA RECEIVED]')
    if (grantData && grantData.data) {
      await sendResponseToSession({ costData: 'success', data: JSON.parse(grantData.data) }, sessionId, msgType)
    } else {
      console.log('[ERROR WITH GRANT DATA - NO DATA]')
      await sendResponseToSession({ costData: 'not_found', data: grantData }, sessionId, msgType)
    }
  } catch (err) {
    console.error('[UNABLE TO PROCESS MESSAGE. ERROR BELOW]')
    console.error(err)
    appInsights.logException(err, msg.sessionId)
    await sendResponseToSession({ costData: 'error', data: err }, msg.sessionId, msgType) // make sure to fix this so it send the correct msgtype here

    await costReciever.abandonMessage(msg)
  }
}

module.exports = processCost
