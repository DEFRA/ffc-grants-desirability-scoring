const scoreData = require('../../../score-data-av.json')
describe('Score Engine test', () => {
  afterAll(async (done) => {
    require('applicationinsights').dispose()
    done()
  }, 30000)

  test('Adding Value - createScoreEngine returns ScoreEngine', () => {
    const scoreEngine = require('../../../../app/calculation/score-engine')
    expect(scoreEngine).toBeDefined()
  })
})

describe('Adding Value - Score Engine Get Score test', () => {
  const fakeMessage = require('./grant-scheme-av-average.js')
  const fakeMessageWeak = require('./grant-scheme-av-weak.js')
  const fakeMessageHigh = require('./grant-scheme-av-strong.js')
  const ScoreEngine = require('../../../../app/calculation/score-engine')

  test('Adding Value - createScoreEngine returns ScoreEngine', () => {
    const scoreEngine = new ScoreEngine(fakeMessage.get(), scoreData)
    expect(scoreEngine).toBeDefined()
  })
  test('Adding Value - createScoreEngine Call Get Score returns ScoreResult Average', () => {
    const scoreEngine = new ScoreEngine(fakeMessage.get(), scoreData)
    const scoreResult = scoreEngine.getScore()
    console.log(scoreResult, 'scoreResult')
    expect(scoreResult).toBeDefined()
    expect(scoreResult.desirability.overallRating.score).toBe(69)
    expect(scoreResult.desirability.overallRating.band).toBe('Average')
  })
  test('Adding Value - createScoreEngine Call Get Score returns ScoreResult Strong', () => {
    const scoreEngine = new ScoreEngine(fakeMessageHigh.get(), scoreData)
    const scoreResult = scoreEngine.getScore()
    console.log(scoreResult, 'scoreResult')
    expect(scoreResult).toBeDefined()
    expect(scoreResult.desirability.overallRating.score).toBe(100)
    expect(scoreResult.desirability.overallRating.band).toBe('Strong')
  })
  test('Adding Value - createScoreEngine Call Get Score returns ScoreResult Weak', () => {
    const scoreEngine = new ScoreEngine(fakeMessageWeak.get(), scoreData)
    const scoreResult = scoreEngine.getScore()
    console.log(scoreResult, 'scoreResult')
    expect(scoreResult).toBeDefined()
    expect(scoreResult.desirability.overallRating.score).toBe(27)
    expect(scoreResult.desirability.overallRating.band).toBe('Weak')
  })
})
