const { first } = require('lodash')

describe('Score Engine test', () => {
  test('createScoreEngine returns ScoreEngine', () => {
    const scoreEngine = require('../../../../app/calculation/score-engine')
    expect(scoreEngine).toBeDefined()
  })
})

describe('Score Engine Get Score test', () => {
  const fakeMessage = require('./grant-scheme.json')
  const ScoreEngine = require('../../../../app/calculation/score-engine')
  test('createScoreEngine returns ScoreEngine', () => {
    const scoreEngine = new ScoreEngine(fakeMessage)
    expect(scoreEngine).toBeDefined()
  })
  test('createScoreEngine Call Get Score returns ScoreResult', () => {
    const scoreEngine = new ScoreEngine(fakeMessage)
    const scoreResult = scoreEngine.getScore()
    expect(scoreResult).toBeDefined()
  })
  test('verify score for score-type dualsumweightband', () => {
    const scoreEngine = new ScoreEngine(fakeMessage)
    const scoreResult = scoreEngine.getScore()
    const rating = first(scoreResult.desirability.questions.filter(q => q.key === 'Q14')).rating
    expect(rating.score).toEqual(4)
    expect(rating.band).toBe('High')
  })
  test('verify score for score-type dualquestionhectorscore', () => {
    const scoreEngine = new ScoreEngine(fakeMessage)
    const scoreResult = scoreEngine.getScore()
    const rating = first(scoreResult.desirability.questions.filter(q => q.key === 'Q16')).rating
    expect(rating.score).toBe(6)
    expect(rating.band).toBe('Medium')
  })
  test('verify score for score-type dualavgmatrix', () => {
    const scoreEngine = new ScoreEngine(fakeMessage)
    const scoreResult = scoreEngine.getScore()
    let rating = first(scoreResult.desirability.questions.filter(q => q.key === 'Q17')).rating
    expect(rating.score).toBe(50)
    expect(rating.band).toBe('High')
    rating = first(scoreResult.desirability.questions.filter(q => q.key === 'Q18')).rating
    expect(rating.score).toBe(30)
    expect(rating.band).toBe('High')
  })
  test('verify score for score-type dualsum', () => {
    const scoreEngine = new ScoreEngine(fakeMessage)
    const scoreResult = scoreEngine.getScore()
    const rating = first(scoreResult.desirability.questions.filter(q => q.key === 'Q19')).rating
    expect(rating.score).toBe(3)
    expect(rating.band).toBe('High')
  })
  test('verify score for score-type boolweightscore', () => {
    const scoreEngine = new ScoreEngine(fakeMessage)
    const scoreResult = scoreEngine.getScore()
    const rating = first(scoreResult.desirability.questions.filter(q => q.key === 'Q20')).rating
    expect(rating.score).toBe(4)
    expect(rating.band).toBe('High')
  })
  test('verify score for overall Ratings', () => {
    const scoreEngine = new ScoreEngine(fakeMessage)
    const scoreResult = scoreEngine.getScore()
    expect(scoreResult.desirability.overallRating.score).toBe(97)
    expect(scoreResult.desirability.overallRating.band).toBe('High')
  })
})
