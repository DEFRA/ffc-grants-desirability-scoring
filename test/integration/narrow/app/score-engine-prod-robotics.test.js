const scoreData = require('../../../score-data-prod-robotics.json')
describe('Score Engine test', () => {
  afterAll(async (done) => {
    require('applicationinsights').dispose()
    done()
  }, 30000)

  test('Prod Robotics - createScoreEngine returns ScoreEngine', () => {
    const scoreEngine = require('../../../../app/calculation/score-engine')
    expect(scoreEngine).toBeDefined()
  })
})

describe('Prod Robotics - Score Engine Get Score test', () => {
  const fakeMessage = require('./grant-scheme-prod-robotics-average.js')
  const fakeMessageLow = require('./grant-scheme-prod-robotics-low.js')
  const fakeMessageStrong = require('./grant-scheme-prod-robotics-strong.js')
  const ScoreEngine = require('../../../../app/calculation/score-engine')

  test('Prod Robotics - createScoreEngine returns ScoreEngine', () => {
    const scoreEngine = new ScoreEngine(fakeMessage.get(), scoreData)
    expect(scoreEngine).toBeDefined()
  })
  test('Prod Robotics - createScoreEngine Call Get Score returns ScoreResult Average', () => {
    const scoreEngine = new ScoreEngine(fakeMessage.get(), scoreData)
    const scoreResult = scoreEngine.getScore()
    expect(scoreResult).toBeDefined()
    expect(scoreResult.desirability.overallRating.score).toBe(71)
    expect(scoreResult.desirability.overallRating.band).toBe('Average')
  })
  test('Prod Robotics - createScoreEngine Call Get Score returns ScoreResult High', () => {
    const scoreEngine = new ScoreEngine(fakeMessageStrong.get(), scoreData)
    const scoreResult = scoreEngine.getScore()
    expect(scoreResult).toBeDefined()
    expect(scoreResult.desirability.overallRating.score).toBe(90)
    expect(scoreResult.desirability.overallRating.band).toBe('Strong')
  })
  test('Prod Robotics - createScoreEngine Call Get Score returns ScoreResult Low', () => {
    const scoreEngine = new ScoreEngine(fakeMessageLow.get(), scoreData)
    const scoreResult = scoreEngine.getScore()
    expect(scoreResult).toBeDefined()
    expect(scoreResult.desirability.overallRating.score).toBe(48)
    expect(scoreResult.desirability.overallRating.band).toBe('Weak')
  })
})
