const sharedConfig = {
  appInsights: require('applicationinsights'),
  host: process.env.SERVICE_BUS_HOST,
  password: process.env.SERVICE_BUS_PASSWORD,
  username: process.env.SERVICE_BUS_USER,
  useCredentialChain: process.env.NODE_ENV === 'production'
}

module.exports = {
  calculateScoreQueue: {
    address: process.env.CALCULATE_SCORE_QUEUE_ADDRESS,
    type: 'queue',
    ...sharedConfig
  },
  desirabilityScoreTopic: {
    address: process.env.DESIRABILITY_SCORE_TOPIC_ADDRESS,
    type: 'topic',
    ...sharedConfig
  },
  desirabilityScoreMsgType: 'uk.gov.ffc.grants.score.calculated',
  desirabilityProductivityScoreMsgType: 'uk.gov.ffc.grants.prod.score.calculated',
  desirabilityAddingValueScoreMsgType: 'uk.gov.ffc.grants.av.score.calculated',
  msgSrc: 'ffc-grants-desirability-scoring'
}
