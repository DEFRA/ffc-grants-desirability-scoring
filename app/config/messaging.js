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
    address: process.env.COST_REQUEST_QUEUE_ADDRESS,
    type: 'queue',
    ...sharedConfig
  },
  costResponseQueue: {
    address: process.env.COST_RESPONSE_QUEUE_ADDRESS,
    type: 'queue',
    ...sharedConfig
  },
  scoreRequestQueue: {
    address: process.env.SCORE_REQUEST_QUEUE_ADDRESS,
    type: 'queue',
    ...sharedConfig
  },
  scoreResponseQueue: {
    address: process.env.SCORE_RESPONSE_QUEUE_ADDRESS,
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
  fetchCostResponseMsgType: `${msgTypePrefix}.fetch.cost.response`,
  fetchScoreRequestMsgType: `${msgTypePrefix}.fetch.score.request`,
  fetchScoreResponseMsgType: `${msgTypePrefix}.fetch.score.response`,
  fetchWaterScoreRequestMsgType: `${msgTypePrefix}.fetch.water.score.request`,
  fetchWaterScoreResponseMsgType: `${msgTypePrefix}.fetch.water.score.response`,
  fetchProdScoreRequestMsgType: `${msgTypePrefix}.fetch.prod.score.request`,
  fetchProdScoreResponseMsgType: `${msgTypePrefix}.fetch.prod.score.response`,
  fetchHensScoreRequestMsgType: `${msgTypePrefix}.fetch.layingHens.score.request`,
  fetchHensScoreResponseMsgType: `${msgTypePrefix}.fetch.layingHens.score.response`,
  fetchAdultCattleHousingScoreRequestMsgType: `${msgTypePrefix}.fetch.adultCattleHousing.score.request`,
  fetchAdultCattleHousingScoreResponseMsgType: `${msgTypePrefix}.fetch.adultCattleHousing.score.response`,
  fetchAddValScoreRequestMsgType: `${msgTypePrefix}.fetch.addval.score.request`,
  fetchAddValScoreResponseMsgType: `${msgTypePrefix}.fetch.addval.score.response`

}
