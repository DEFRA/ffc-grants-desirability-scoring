const appInsights = require('../services/app-insights')
const ScoreEngine = require('../../app/calculation/score-engine')
const { sendResponseToSession } = require('./application/index')
const scoreDataRepository = require('../services/score-repository')
const msgTypePrefix = 'uk.gov.ffc.grants'

// Called from messaging/process-message.js
const processScoring = async (msg, scoreReciever) => {
    let msgType
    try {
        // Variables received form MessageReceiver. When message is received, these values are pulled from the message
        const { body, sessionId, applicationProperties } = msg
        msgType = applicationProperties.type.replace(msgTypePrefix, '')
        let grantType = null
        
        if (msgType === '.fetch.score.request') {
            grantType = 'Upgrade Cattle Housing' // change this when applying scoring engine
        } else if (msgType === '.fetch.water.score.request') {
            grantType = 'Water Grant' // change this when applying scoring engine
        }

        const scoreData = await scoreDataRepository.getScoreData(grantType)
        console.log(scoreData.data, '[SCORE DATA RECEIVED]')
        if (scoreData && scoreData.data) {
            const scoreEngine = new ScoreEngine(body, JSON.parse(scoreData.data))
            const scoreResult = scoreEngine.getScore()
            await sendResponseToSession(scoreResult,  sessionId, msgType)
        } else {
            console.log('[ERROR WITH GRANT DATA - NO DATA]')
            await sendResponseToSession('not_found', sessionId, msgType)
        }
    } catch (err) {
        console.error('[UNABLE TO PROCESS MESSAGE. ERROR BELOW]')
        console.error(err)
        appInsights.logException(err, msg.sessionId)
        await sendResponseToSession('error', msg.sessionId, msgType) // make sure to fix this so it send the correct msgtype here

        await scoreReciever.abandonMessage(msg)
    }
}

module.exports = processScoring