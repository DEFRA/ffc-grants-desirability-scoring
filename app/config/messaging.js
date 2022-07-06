const msgTypePrefix = 'uk.gov.ffc.grants'

const sharedConfig = {
  appInsights: require('applicationinsights'),
  host: process.env.SERVICE_BUS_HOST,
  password: process.env.SERVICE_BUS_PASSWORD,
  username: process.env.SERVICE_BUS_USER,
  useCredentialChain: process.env.NODE_ENV === 'production'
}

module.exports = {
  costRequestQueue: {
    address: process.env.COST_REQUEST_QUEUE_ADDRESS + '-' + process.env.ENVIRONMENT_CODE,
    type: 'queue',
    ...sharedConfig
  },
  costResponseQueue: {
    address: process.env.COST_RESPONSE_QUEUE_ADDRESS + '-' + process.env.ENVIRONMENT_CODE,
    type: 'queue',
    ...sharedConfig
  },
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
  desirabilitySlurryMsgType: 'uk.gov.ffc.grants.si.cost',
  msgSrc: 'ffc-grants-desirability-scoring',
  fetchCostRequestMsgType: `${msgTypePrefix}.fetch.cost.request`,
  fetchCostResponseMsgType: `${msgTypePrefix}.fetch.cost.response`

}
