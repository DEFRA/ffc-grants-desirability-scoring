const appInsights = require('../services/app-insights')
const { sendResponseToSession } = require('./application/index')
const scoreDataRepository = require('../services/score-repository')
const msgTypePrefix = 'uk.gov.ffc.grants'

// Called from messaging/process-message.js
const processCost = async (msg, costReciever) => {
  try {
    // Variables received form MessageReceiver. When message is received, these values are pulled from the message
    const { sessionId, applicationProperties } = msg
    const msgType = applicationProperties.type.replace(msgTypePrefix, '')
    let grantType = null
    if (msgType == '.fetch.cost.request' ) {
      grantType = 'Slurry Infrastructure Grant'
        
    }

    const grantData = await scoreDataRepository.getScoreData(grantType)
    console.log('[GRANT DATA RECEIVED]')
    if (grantData && grantData.data) {
      await sendResponseToSession({applicationState: 'success', data: JSON.parse(grantData.data)}, sessionId)
    } else {
      console.log('[ERROR WITH GRANT DATA - NO DATA]')
      await sendResponseToSession({applicationState: 'not_found', data: grantData}, sessionId)
    }
  } catch (err) {
    console.error('[UNABLE TO PROCESS MESSAGE. ERROR BELOW]')
    console.error(err)
    appInsights.logException(err, msg.sessionId)
    await sendResponseToSession({ applicationState: 'error', data: err }, msg.sessionId)

    await costReciever.abandonMessage(msg)
  }
}

module.exports = processCost
