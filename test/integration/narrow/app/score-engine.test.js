const { first } = require('lodash')
const scoreData = require('../../../score-data.json')
describe('Score Engine test', () => {
  afterAll(async (done) => {
    require('applicationinsights').dispose()
    done()
  }, 30000)

  test('createScoreEngine returns ScoreEngine', () => {
    const scoreEngine = require('../../../../app/calculation/score-engine')
    expect(scoreEngine).toBeDefined()
  })
})

describe('Score Engine Get Score test', () => {
  const fakeMessage = require('./grant-scheme.js')
  const ScoreEngine = require('../../../../app/calculation/score-engine')

  test('createScoreEngine returns ScoreEngine', () => {
    const scoreEngine = new ScoreEngine(fakeMessage.get(), scoreData)
    expect(scoreEngine).toBeDefined()
  })
  test('createScoreEngine Call Get Score returns ScoreResult', () => {
    const scoreEngine = new ScoreEngine(fakeMessage.get(), scoreData)
    const scoreResult = scoreEngine.getScore()
    expect(scoreResult).toBeDefined()
  })
  test('verify score for score-type dualsumweightband', () => {
    const scoreEngine = new ScoreEngine(fakeMessage.get(), scoreData)
    const scoreResult = scoreEngine.getScore()
    const rating = first(scoreResult.desirability.questions.filter(q => q.key === 'Q14')).rating
    expect(rating.score).toEqual(4)
    expect(rating.band).toBe('Strong')
  })
  test('verify score for score-type dualsumweightband Low', () => {
    const msg = fakeMessage.get()
    msg.desirability.questions.map(m => {
      m.answers.map(mi => {
        const firstInputVal = mi.input[0]
        firstInputVal.key = firstInputVal.key === 'Q14-A1' ? 'Q14-A5' : firstInputVal.key
        mi.input[0] = firstInputVal
        return mi
      })
      return m
    })
    const scoreEngine = new ScoreEngine(msg, scoreData)
    const scoreResult = scoreEngine.getScore()
    const rating = first(scoreResult.desirability.questions.filter(q => q.key === 'Q14')).rating
    expect(rating.score).toEqual(1.6)
    expect(rating.band).toBe('Weak')
  })
  test('verify score for score-type dualsumweightband Medium', () => {
    const msg = fakeMessage.get()
    msg.desirability.questions.map(m => {
      m.answers.map(mi => {
        const firstInputVal = mi.input[0]
        firstInputVal.key = firstInputVal.key === 'Q14-A1' ? 'Q14-A4' : firstInputVal.key
        mi.input[0] = firstInputVal
        return mi
      })
      return m
    })
    const scoreEngine = new ScoreEngine(msg, scoreData)
    const scoreResult = scoreEngine.getScore()
    const rating = first(scoreResult.desirability.questions.filter(q => q.key === 'Q14')).rating
    const score = Math.round(rating.score)
    expect(score).toEqual(2)
    expect(rating.band).toBe('Average')
  })
  test('verify score for score-type dualquestionhectorscore', () => {
    const scoreEngine = new ScoreEngine(fakeMessage.get(), scoreData)
    const scoreResult = scoreEngine.getScore()
    const rating = first(scoreResult.desirability.questions.filter(q => q.key === 'Q16')).rating
    expect(rating.score).toBe(6)
    expect(rating.band).toBe('Average')
  })
  test('verify score for score-type dualavgmatrix', () => {
    const scoreEngine = new ScoreEngine(fakeMessage.get(), scoreData)
    const scoreResult = scoreEngine.getScore()
    let rating = first(scoreResult.desirability.questions.filter(q => q.key === 'Q17')).rating
    expect(rating.score).toBe(50)
    expect(rating.band).toBe('Strong')
    rating = first(scoreResult.desirability.questions.filter(q => q.key === 'Q18')).rating
    expect(rating.score).toBe(30)
    expect(rating.band).toBe('Strong')
  })
  test('verify score for score-type dualsum', () => {
    const scoreEngine = new ScoreEngine(fakeMessage.get(), scoreData)
    const scoreResult = scoreEngine.getScore()
    const rating = first(scoreResult.desirability.questions.filter(q => q.key === 'Q19')).rating
    expect(rating.score).toBe(3)
    expect(rating.band).toBe('Strong')
  })
  test('verify score for score-type dualsum Medium', () => {
    const msg = fakeMessage.get()
    msg.desirability.questions.map(m => {
      m.answers.map(mi => {
        const firstInputVal = mi.input[0]
        firstInputVal.key = firstInputVal.key === 'Q19-A2' ? 'Q19-A3' : firstInputVal.key
        firstInputVal.key = firstInputVal.key === 'Q19-A2' ? 'Q19-A3' : firstInputVal.key
        mi.input[0] = firstInputVal
        return mi
      })
      return m
    })
    const scoreEngine = new ScoreEngine(msg, scoreData)
    const scoreResult = scoreEngine.getScore()
    const rating = first(scoreResult.desirability.questions.filter(q => q.key === 'Q19')).rating
    expect(rating.score).toBe(3)
    expect(rating.band).toBe('Strong')
  })
  test('verify score for score-type dualsum Low', () => {
    const msg = fakeMessage.get()
    msg.desirability.questions.map(m => {
      m.answers.map(mi => {
        const firstInputVal = mi.input[0]
        firstInputVal.key = (firstInputVal.key === 'Q19-A2' || firstInputVal.key === 'Q19-A1') ? 'Q19-A5' : firstInputVal.key
        mi.input[0] = firstInputVal
        return mi
      })
      return m
    })
    const scoreEngine = new ScoreEngine(msg, scoreData)
    const scoreResult = scoreEngine.getScore()
    const rating = first(scoreResult.desirability.questions.filter(q => q.key === 'Q19')).rating
    expect(rating.score).toBe(1.5)
    expect(rating.band).toBe('Average')
  })
  test('verify score for score-type boolweightscore', () => {
    const scoreEngine = new ScoreEngine(fakeMessage.get(), scoreData)
    const scoreResult = scoreEngine.getScore()
    const rating = first(scoreResult.desirability.questions.filter(q => q.key === 'Q20')).rating
    expect(rating.score).toBe(4)
    expect(rating.band).toBe('Strong')
  })
  test('verify score for score-type boolweightscore Low', () => {
    const msg = fakeMessage.get()
    msg.desirability.questions.map(m => {
      m.answers.map(mi => {
        const firstInputVal = mi.input[0]
        firstInputVal.key = firstInputVal.key === 'Q20-A1' ? 'Q20-A2' : firstInputVal.key
        mi.input[0] = firstInputVal
        return mi
      })
      return m
    })
    const scoreEngine = new ScoreEngine(msg, scoreData)
    const scoreResult = scoreEngine.getScore()
    const rating = first(scoreResult.desirability.questions.filter(q => q.key === 'Q20')).rating
    expect(rating.score).toBe(0)
    expect(rating.band).toBe('Weak')
  })
  test('verify score for overall Ratings', () => {
    const scoreEngine = new ScoreEngine(fakeMessage.get(), scoreData)
    const scoreResult = scoreEngine.getScore()
    expect(scoreResult.desirability.overallRating.score).toBe(97)
    expect(scoreResult.desirability.overallRating.band).toBe('Strong')
  })
  test('verify score for overall Ratings is Low', () => {
    const msg = fakeMessage.get()
    msg.desirability.questions.map(m => {
      m.answers.map(mi => {
        const ansInputs = []
        const firstInputVal = mi.input[0]
        firstInputVal.key = firstInputVal.key === 'Q14-A1' ? 'Q14-A4' : firstInputVal.key
        firstInputVal.value = (mi.key === 'Q16a' || mi.key === 'Q16b') ? 1 : firstInputVal.value
        firstInputVal.key = (mi.key === 'Q17a') ? 'Q17a-A5' : firstInputVal.key
        firstInputVal.key = (mi.key === 'Q17b') ? 'Q17b-A5' : firstInputVal.key
        ansInputs.push(firstInputVal)
        mi.input = ansInputs
        return mi
      })
      return m
    })
    const scoreEngine = new ScoreEngine(msg, scoreData)
    const scoreResult = scoreEngine.getScore()
    expect(scoreResult.desirability.overallRating.score).toBe(39)
    expect(scoreResult.desirability.overallRating.band).toBe('Weak')
  })
  test('verify score for overall Ratings is Medium', () => {
    const msg = fakeMessage.get()
    msg.desirability.questions.map(m => {
      m.answers.map(mi => {
        const ansInputs = []
        const firstInputVal = mi.input[0]
        firstInputVal.key = firstInputVal.key === 'Q14-A1' ? 'Q14-A4' : firstInputVal.key
        firstInputVal.value = (mi.key === 'Q16a') ? 1 : firstInputVal.value
        firstInputVal.value = (mi.key === 'Q16b') ? 20 : firstInputVal.value
        firstInputVal.key = (mi.key === 'Q17a') ? 'Q17a-A5' : firstInputVal.key
        firstInputVal.key = (mi.key === 'Q17b') ? 'Q17b-A1' : firstInputVal.key
        firstInputVal.key = (mi.key === 'Q18a') ? 'Q18a-A5' : firstInputVal.key
        firstInputVal.key = (mi.key === 'Q18b') ? 'Q18b-A7' : firstInputVal.key
        ansInputs.push(firstInputVal)
        mi.input = ansInputs
        return mi
      })
      return m
    })
    const scoreEngine = new ScoreEngine(msg, scoreData)
    const scoreResult = scoreEngine.getScore()
    expect(scoreResult.desirability.overallRating.score).toBe(62)
    expect(scoreResult.desirability.overallRating.band).toBe('Average')
  })
  test('verify score for overall Ratings is High with decimal score', () => {
    const msg = fakeMessage.get()
    msg.desirability.questions.map(m => {
      m.answers.map(mi => {
        const ansInputs = []
        const firstInputVal = mi.input[0]
        firstInputVal.key = firstInputVal.key === 'Q14-A1' ? 'Q14-A4' : firstInputVal.key
        firstInputVal.key = (firstInputVal.key === 'Q15-A3') ? 'Q15-A2' : firstInputVal.key
        firstInputVal.value = (mi.key === 'Q16a') ? 20 : firstInputVal.value
        firstInputVal.value = (mi.key === 'Q16b') ? 21 : firstInputVal.value
        firstInputVal.key = (mi.key === 'Q17a') ? 'Q17a-A4' : firstInputVal.key
        firstInputVal.key = (mi.key === 'Q17b') ? 'Q17b-A1' : firstInputVal.key
        firstInputVal.key = (mi.key === 'Q18a') ? 'Q18a-A5' : firstInputVal.key
        firstInputVal.key = (mi.key === 'Q18b') ? 'Q18b-A1' : firstInputVal.key
        firstInputVal.key = (mi.key === 'Q19') ? 'Q19-A3' : firstInputVal.key
        ansInputs.push(firstInputVal)
        if (mi.key === 'Q17a') {
          ansInputs.push({ key: 'Q17a-A5' })
        }
        if (mi.key === 'Q17b') {
          ansInputs.push({ key: 'Q17b-A3' })
        }
        if (mi.key === 'Q18a') {
          ansInputs.push({ key: 'Q18a-A6' })
        }
        if (mi.key === 'Q18b') {
          ansInputs.push({ key: 'Q18b-A2' })
        }
        if (mi.input[0].key === 'Q19-A1') {
          ansInputs.push({ key: 'Q19-A4' })
        }
        mi.input = ansInputs
        return mi
      })
      return m
    })
    const scoreEngine = new ScoreEngine(msg, scoreData)
    const scoreResult = scoreEngine.getScore()
    expect(scoreResult.desirability.overallRating.score).toBe(76)
    expect(scoreResult.desirability.overallRating.band).toBe('Strong')
  })
})
