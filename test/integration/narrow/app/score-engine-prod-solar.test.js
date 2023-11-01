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
  const ScoreEngine = require('../../../../app/calculation/score-engine')

  test('Prod Slurry - createScoreEngine returns ScoreEngine', () => {
    const scoreEngine = new ScoreEngine(fakeMessage.get(), scoreData)
    expect(scoreEngine).toBeDefined()
  })
  test('Prod Slurry - createScoreEngine Call Get Score returns ScoreResult Average', () => {
    const scoreEngine = new ScoreEngine(fakeMessage.get(), scoreData)
    const scoreResult = scoreEngine.getScore()
    expect(scoreResult).toBeDefined()
    expect(scoreResult.desirability.overallRating.score).toBe(80)
    expect(scoreResult.desirability.overallRating.band).toBe('Strong')
  })
  test('Prod Slurry - createScoreEngine Call Get Score returns ScoreResult High', () => {
    const scoreEngine = new ScoreEngine(fakeMessageHigh.get(), scoreData)
    const scoreResult = scoreEngine.getScore()
    expect(scoreResult).toBeDefined()
    expect(scoreResult.desirability.overallRating.score).toBe(100)
    expect(scoreResult.desirability.overallRating.band).toBe('Strong')
  })
})