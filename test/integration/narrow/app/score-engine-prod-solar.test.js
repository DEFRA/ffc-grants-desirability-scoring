const scoreData = require('../../../score-data-prod-solar.json')
describe('Score Engine test', () => {
  afterAll(async (done) => {
    require('applicationinsights').dispose()
    done()
  }, 30000)

  test('Prod Slurry - createScoreEngine returns ScoreEngine', () => {
    const scoreEngine = require('../../../../app/calculation/score-engine')
    expect(scoreEngine).toBeDefined()
  })
})

describe('Prod Slurry - Score Engine Get Score test', () => {
  const fakeMessage = require('./grant-scheme-prod-solar-average.js')
  const fakeMessageHigh = require('./grant-scheme-prod-solar-strong.js')
  const fakeMessageLow = require('./grant-scheme-prod-solar-weak.js')
  const ScoreEngine = require('../../../../app/calculation/score-engine')

  test('Prod Slurry - createScoreEngine returns ScoreEngine', () => {
    const scoreEngine = new ScoreEngine(fakeMessage.get(), scoreData)
    expect(scoreEngine).toBeDefined()
  })
  test('Prod Slurry - createScoreEngine Call Get Score returns ScoreResult Average', () => {
    const scoreEngine = new ScoreEngine(fakeMessage.get(), scoreData)
    const scoreResult = scoreEngine.getScore()
    expect(scoreResult).toBeDefined()
    expect(scoreResult.desirability.overallRating.score).toBe(74.19)
    expect(scoreResult.desirability.overallRating.band).toBe('Average')
  })
  test('Prod Slurry - createScoreEngine Call Get Score returns ScoreResult High', () => {
    const scoreEngine = new ScoreEngine(fakeMessageHigh.get(), scoreData)
    const scoreResult = scoreEngine.getScore()
    expect(scoreResult).toBeDefined()
    expect(scoreResult.desirability.overallRating.score).toBe(81)
    expect(scoreResult.desirability.overallRating.band).toBe('Strong')
  })

  test('Prod Slurry - createScoreEngine Call Get Score returns ScoreResult Low', () => {
    const scoreEngine = new ScoreEngine(fakeMessageLow.get(), scoreData)
    const scoreResult = scoreEngine.getScore()
    expect(scoreResult).toBeDefined()
    expect(scoreResult.desirability.overallRating.score).toBe(4)
    expect(scoreResult.desirability.overallRating.band).toBe('Weak')
  })
})
