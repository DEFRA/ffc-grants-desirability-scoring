// const { sendMessage } = require('./index')
const appInsights = require('../services/app-insights')
const {sendResponseToSession} = require('./application/index')// const ScoreEngine = require('../../app/calculation/score-engine')
const scoreDataRepository = require('../services/score-repository')
const msgCfg = require('../config/messaging')
const msgTypePrefix = 'uk.gov.ffc.grants'

// Called from messaging/process-message.js
const processCost = async (msg) => {
  console.log(msg.applicationProperties.type,'i am in tryyyyy LLLLLLLLLL')

  try {
    // Variables received form MessageReceiver. When message is received, these values are pulled from the message
    const { sessionId, applicationProperties } = msg
   
    const msgType = applicationProperties.type.replace(msgTypePrefix, '')
    let grantType = null
    let senderMsgType = null
    if (msgType === '.fetch.cost.request') {
      senderMsgType = msgCfg.fetchCostResponseMsgType
      grantType = 'Slurry Infrastructure Grant'
    }

     const grantData = await scoreDataRepository.getScoreData(grantType)
     console.log('[GRANT DATA RECEIVED]:', grantData)

    if (grantData && grantData.data) {
      console.log('Score result:')
      

      // await grantReciever.completeMessage(msg)

      // await sendMessage(grantData, msgCfg.fetchCostResponseMsgType, msgCfg.costResponseQueue, { sessionId })
      
      await sendResponseToSession({ }, sessionId)


    } else {
      throw new Error('Unable to get valid score data from database')
    }
  } catch (err) {
    console.error('Unable to process message')
    console.error(err)
    appInsights.logException(err, msg.correlationId)
    // await grantReciever.abandonMessage(msg)
  }
}

module.exports = processCost
