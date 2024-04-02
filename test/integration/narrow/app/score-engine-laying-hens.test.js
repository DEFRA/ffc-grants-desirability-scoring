const scoreData = require('../../../score-data-prod-solar.json')
describe('Score Engine test', () => {
  test('Laying Hens - createScoreEngine returns ScoreEngine', () => {
    const scoreEngine = require('../../../../app/calculation/score-engine')
    expect(scoreEngine).toBeDefined()
  })
})

describe('Laying Hens - Score Engine Get Score test', () => {
  const fakeMessage = require('./grant-scheme-laying-hens-average.js')
  const fakeMessageHigh = require('./grant-scheme-laying-hens-strong.js')
  const fakeMessageLow = require('./grant-scheme-laying-hens-weak.js')
  const ScoreEngine = require('../../../../app/calculation/score-engine')

  test('Laying Hens - createScoreEngine returns ScoreEngine', () => {
    const scoreEngine = new ScoreEngine(fakeMessage.get(), scoreData)
    expect(scoreEngine).toBeDefined()
  })
  test('Laying Hens - createScoreEngine Call Get Score returns ScoreResult Average', () => {
    const scoreEngine = new ScoreEngine(fakeMessage.get(), scoreData)
    const scoreResult = scoreEngine.getScore()
    expect(scoreResult).toBeDefined()
    expect(scoreResult.desirability.overallRating.score).toBe(74.19)
    expect(scoreResult.desirability.overallRating.band).toBe('Average')
  })
  test('Laying Hens - createScoreEngine Call Get Score returns ScoreResult High', () => {
    const scoreEngine = new ScoreEngine(fakeMessageHigh.get(), scoreData)
    const scoreResult = scoreEngine.getScore()
    expect(scoreResult).toBeDefined()
    expect(scoreResult.desirability.overallRating.score).toBe(81)
    expect(scoreResult.desirability.overallRating.band).toBe('Strong')
  })

  test('Laying Hens - createScoreEngine Call Get Score returns ScoreResult Low', () => {
    const scoreEngine = new ScoreEngine(fakeMessageLow.get(), scoreData)
    const scoreResult = scoreEngine.getScore()
    expect(scoreResult).toBeDefined()
    expect(scoreResult.desirability.overallRating.score).toBe(4)
    expect(scoreResult.desirability.overallRating.band).toBe('Weak')
  })
})
