describe('Config Messaging', () => {
  const messageConfig = require('../../../../../app/config/messaging')
  test('check queue n subscription topic is defined.', () => {
    expect(messageConfig).toBeDefined()
    expect(messageConfig.calculateScoreQueue).toBeDefined()
    expect(messageConfig.desirabilityScoreTopic).toBeDefined()
    expect(messageConfig.desirabilityScoreMsgType).toBe('uk.gov.ffc.grants.score.calculated')
    expect(messageConfig.msgSrc).toBe('ffc-grants-desirability-scoring')
  })
})
