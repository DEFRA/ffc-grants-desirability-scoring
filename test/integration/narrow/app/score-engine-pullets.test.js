const scoreData = require('../../../score-data-pullets.json')
describe('Score Engine test', () => {
  test('Pullets - createScoreEngine returns ScoreEngine', () => {
    const scoreEngine = require('../../../../app/calculation/score-engine')
    expect(scoreEngine).toBeDefined()
  })
})

describe('Pullets - Score Engine Get Score test', () => {
  const fakeMessage = require('./grant-scheme-pullets-average.js')
  const fakeMessageHigh = require('./grant-scheme-pullets-strong.js')
  const fakeMessageLow = require('./grant-scheme-pullets-weak.js')
  const ScoreEngine = require('../../../../app/calculation/score-engine')

  test('Pullets - createScoreEngine returns ScoreEngine', () => {
    const scoreEngine = new ScoreEngine(fakeMessage.get(), scoreData)
    expect(scoreEngine).toBeDefined()
  })
  test('Pullets - createScoreEngine Call Get Score returns ScoreResult Average', () => {
    const scoreEngine = new ScoreEngine(fakeMessage.get(), scoreData)
    const scoreResult = scoreEngine.getScore()
    expect(scoreResult).toBeDefined()
    expect(scoreResult.desirability.overallRating.score).toBe(37.62)
    expect(scoreResult.desirability.overallRating.band).toBe('Average')
  })
  test('Pullets - createScoreEngine Call Get Score returns ScoreResult High', () => {
    const scoreEngine = new ScoreEngine(fakeMessageHigh.get(), scoreData)
    const scoreResult = scoreEngine.getScore()
    expect(scoreResult).toBeDefined()
    expect(scoreResult.desirability.overallRating.score).toBe(48.18)
    expect(scoreResult.desirability.overallRating.band).toBe('Strong')
  })

  test('Pullets - createScoreEngine Call Get Score returns ScoreResult Low', () => {
    const scoreEngine = new ScoreEngine(fakeMessageLow.get(), scoreData)
    const scoreResult = scoreEngine.getScore()
    expect(scoreResult).toBeDefined()
    expect(scoreResult.desirability.overallRating.score).toBe(29.37)
    expect(scoreResult.desirability.overallRating.band).toBe('Weak')
  })
})
