describe('Calculate Score test', () => {
  afterAll(async (done) => {
    require('applicationinsights').dispose()
    done()
  }, 30000)

  jest.mock('../../../../../app/messaging/senders')
  jest.mock('../../../../../app/calculation/score-engine')
  jest.mock('../../../../../app/services/score-repository')
  jest.mock('ffc-messaging')
  const scoreData = require('../../../../score-data.json')
  const scoreDataRepository = require('../../../../../app/services/score-repository')
  const sender = require('../../../../../app/messaging/senders')
  sender.sendScoreCalculated = jest.fn(async (scroreResult, correlationId) => { return null })
  scoreDataRepository.getScoreData = jest.fn(async (schemeType) => {
    console.log(schemeType)
    return { data: JSON.stringify(scoreData) }
  })
  const ScoreEngine = require('../../../../../app/calculation/score-engine')
  const scoreEngine = new ScoreEngine('', '')
  scoreEngine.getScore = jest.fn()

  const msg = {
    body: '',
    correlationId: '1234567890'
  }
  const calculateScoreReceiver = {
    completeMessage: jest.fn(async (message) => { return null }),
    abandonMessage: jest.fn(async (message) => { return null })
  }
  test('createScoreEngine returns calScore', () => {
    const calScore = require('../../../../../app/messaging/calculate-score')
    expect(calScore).toBeDefined()
  })
  test('createScoreEngine returns no error', () => {
    const calScore = require('../../../../../app/messaging/calculate-score')
    expect(calScore(msg, calculateScoreReceiver)).toBeDefined()
  })
  test('createScoreEngine Invalid score-data returns error n handle', () => {
    scoreDataRepository.getScoreData = jest.fn(async (schemeType) => {
      console.log(schemeType)
      return { data: scoreData } // Just to make error passing object in place of string.
    })
    const calScore = require('../../../../../app/messaging/calculate-score')
    expect(calScore(msg, calculateScoreReceiver)).toBeDefined()
  })
  test('createScoreEngine NULL score-data returns error n handle', () => {
    scoreDataRepository.getScoreData = jest.fn(async (schemeType) => {
      console.log(schemeType)
      return { data: null } // Just to make error passing object in place of string.
    })
    const calScore = require('../../../../../app/messaging/calculate-score')
    expect(calScore(msg, calculateScoreReceiver)).toBeDefined()
  })
})
