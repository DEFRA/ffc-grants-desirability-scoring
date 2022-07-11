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
    console.log('here')
    if (msgType == '.fetch.cost.request' ) {
      grantType = 'Slurry Infrastructure Grant'
        
    }

    console.log('there now', grantType)

    const grantData = await scoreDataRepository.getScoreData(grantType)
    console.log('[GRANT DATA RECEIVED]')
    if (grantData && grantData.data) {
      console.log('how')
      await sendResponseToSession(JSON.parse(grantData.data), sessionId)
    } else {
      throw new Error('Unable to get valid grant data from database')
    }
  } catch (err) {
    console.error('Unable to process message')
    console.error(err)
    appInsights.logException(err, msg.correlationId)
    await costReciever.abandonMessage(msg)
  }
}

module.exports = processCost
