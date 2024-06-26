const { first } = require('lodash')
const scoreData = require('../../../score-data.json')
const ahwScoreData = require('../../../score-data-prod-calf-housing.json')
const solarScoreData = require('../../../score-data-prod-solar.json')
const roboticsScoreData = require('../../../score-data-prod-robotics.json')

describe('Score Engine test', () => {

  test('createScoreEngine returns ScoreEngine', () => {
    const scoreEngine = require('../../../../app/calculation/score-engine')
    expect(scoreEngine).toBeDefined()
  })
})

describe('Score Engine Get Score test', () => {
  const fakeMessage = require('./grant-scheme.js')
  const fakeAHWmsg = require('./ahw-scheme.js')
  const fakeSolarmsg = require('./grant-scheme-prod-solar-strong.js')
  const fakeRoboticsmsg = require('./grant-scheme-prod-robotics-strong.js')
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
  test('verify score for score-type dualsumweightband HIGH', () => {
    const scoreEngine = new ScoreEngine(fakeMessage.get(), scoreData)
    const scoreResult = scoreEngine.getScore()
    const rating = first(scoreResult.desirability.questions.filter(q => q.key === 'productivity')).rating
    expect(rating.score).toEqual(3)
    expect(rating.band).toBe('Strong')
  })

  test('verify score for score-type dualsumweightband LOW', () => {
    const msg = fakeMessage.get()
    msg.desirability.questions.map(m => {
      m.answers.map(mi => {
        const ansInputs = []
        const firstInputVal = mi.input[0]
        firstInputVal.key = firstInputVal.key === 'productivity-A1' ? 'productivity-A5' : firstInputVal.key
        ansInputs.push(firstInputVal)
        mi.input = ansInputs
        return mi
      })
      return m
    })
    const scoreEngine = new ScoreEngine(msg, scoreData)
    const scoreResult = scoreEngine.getScore()
    const rating = first(scoreResult.desirability.questions.filter(q => q.key === 'productivity')).rating
    expect(rating.score).toEqual(0)
    expect(rating.band).toBe('Weak')
  })

  test('verify score for score-type dualsumweightband MEDIUM', () => {
    const msg = fakeMessage.get()
    msg.desirability.questions.map(m => {
      m.answers.map(mi => {
        const firstInputVal = mi.input[0]
        firstInputVal.key = firstInputVal.key === 'productivity-A1' ? 'productivity-A4' : firstInputVal.key
        mi.input[0] = firstInputVal
        return mi
      })
      return m
    })
    const scoreEngine = new ScoreEngine(msg, scoreData)
    const scoreResult = scoreEngine.getScore()

    const rating = first(scoreResult.desirability.questions.filter(q => q.key === 'productivity')).rating
    const score = Math.round(rating.score)
    expect(score).toEqual(2)
    expect(rating.band).toBe('Average')
  })
  test('verify score for score-type dualquestionhectorscore', () => {
    const scoreEngine = new ScoreEngine(fakeMessage.get(), scoreData)
    const scoreResult = scoreEngine.getScore()
    const rating = first(scoreResult.desirability.questions.filter(q => q.key === 'irrigated-land')).rating
    expect(rating.score).toBe(6)
    expect(rating.band).toBe('Average')
  })
  test('verify score for score-type dualavgmatrix', () => {
    const scoreEngine = new ScoreEngine(fakeMessage.get(), scoreData)
    const scoreResult = scoreEngine.getScore()
    let rating = first(scoreResult.desirability.questions.filter(q => q.key === 'water-source')).rating
    expect(rating.score).toBe(50)
    expect(rating.band).toBe('Strong')
    rating = first(scoreResult.desirability.questions.filter(q => q.key === 'irrigation-system')).rating
    expect(rating.score).toBe(30)
    expect(rating.band).toBe('Strong')
  })

  test('verify score for score-type multiSelectSumThenWeight - Average', () => {
    const msg = fakeAHWmsg.get()
    const scoreEngine = new ScoreEngine(msg, ahwScoreData)
    const scoreResult = scoreEngine.getScore()
    let sickPenQ = first(scoreResult.desirability.questions.filter(q => q.key === 'permanent-sick-pen'))
    expect(sickPenQ.rating.band).toBe('Average')
  });

  test('verify score for score-type multiSelectSumThenWeight - Strong', () => {
    const fakeInput = [
      { "key": "permanent-sick-pen-A1", "value": "A permanent sick pen" },
      { "key": "permanent-sick-pen-A2", "value": "A separate air space" },
      { "key": "permanent-sick-pen-A3", "value": "A permanent heat source" },
    ];
    const msg = fakeAHWmsg.get()
    msg.desirability.questions.map(m => {
      if (m.key === 'permanent-sick-pen') {
        m.answers[ 0 ].input = fakeInput;
      }
      return m
    })
    const scoreEngine = new ScoreEngine(msg, ahwScoreData)
    const scoreResult = scoreEngine.getScore()
    let sickPenQ = first(scoreResult.desirability.questions.filter(q => q.key === 'permanent-sick-pen'))
    expect(sickPenQ.rating.band).toBe('Strong')
  });

  test('verify score for score-type multiSelectSumThenWeight - Weak', () => {
    const msg = fakeAHWmsg.get()
    msg.desirability.questions.map(m => {
      m.answers.map(mi => {
        const firstInputVal = mi.input[ 0 ]
        firstInputVal.key = firstInputVal.key === 'permanent-sick-pen-A1' ? 'permanent-sick-pen-A4' : firstInputVal.key
        mi.input[ 0 ] = firstInputVal
        return mi
      })
      return m
    })
    const scoreEngine = new ScoreEngine(msg, ahwScoreData)
    const scoreResult = scoreEngine.getScore()
    let sickPenQ = first(scoreResult.desirability.questions.filter(q => q.key === 'permanent-sick-pen'))
    expect(sickPenQ.rating.band).toBe('Weak')
  });

  test('verify score for score-type boolvalueweightscore - Strong', () => {
    const fakeInput = [
      { "key": "housing-A1", "value": "Yes" }
    ];
    const msg = fakeAHWmsg.get()
    msg.desirability.questions.map(m => {
      if (m.key === 'housing') {
        m.answers[ 0 ].input = fakeInput;
      }
      return m
    })
    const scoreEngine = new ScoreEngine(msg, ahwScoreData)
    const scoreResult = scoreEngine.getScore()
    let housingQ = first(scoreResult.desirability.questions.filter(q => q.key === 'housing'))
    expect(housingQ.rating.band).toBe('Strong')
  });

  test('verify score for score-type boolvalueweightscore - Weak', () => {
    const fakeInput = [
      { "key": "housing-A2", "value": "No" }
    ];
    const msg = fakeAHWmsg.get()
    msg.desirability.questions.map(m => {
      if (m.key === 'housing') {
        m.answers[ 0 ].input = fakeInput;
      }
      return m
    })
    const scoreEngine = new ScoreEngine(msg, ahwScoreData)
    const scoreResult = scoreEngine.getScore()
    let housingQ = first(scoreResult.desirability.questions.filter(q => q.key === 'housing'))
    expect(housingQ.rating.band).toBe('Strong')
  });

  test('verify score for score-type userInput - Strong', () => {
    const msg = fakeAHWmsg.get()
    const scoreEngine = new ScoreEngine(msg, ahwScoreData)
    const scoreResult = scoreEngine.getScore()
    let floorQ = first(scoreResult.desirability.questions.filter(q => q.key === 'floor-space'))
    expect(floorQ.rating.band).toBe('Strong')
  });

  test('verify score for score-type userInput - Weak', () => {
    const fakeInput = [
      { "key": "3", "value": "3" },
    ];
    const msg = fakeAHWmsg.get()
    msg.desirability.questions.map(m => {
      if (m.key === 'floor-space') {
        m.answers[ 0 ].input = fakeInput;
      }
      return m
    })
    const scoreEngine = new ScoreEngine(msg, ahwScoreData)
    const scoreResult = scoreEngine.getScore()
    let floorQ = first(scoreResult.desirability.questions.filter(q => q.key === 'floor-space'))
    expect(floorQ.rating.band).toBe('Weak')
  });

  test('verify score for score-type userInput - Average', () => {
    const fakeInput = [
      { "key": "3", "value": "3.3" },
    ];
    const msg = fakeAHWmsg.get()
    msg.desirability.questions.map(m => {
      if (m.key === 'floor-space') {
        m.answers[ 0 ].input = fakeInput;
      }
      return m
    })
    const scoreEngine = new ScoreEngine(msg, ahwScoreData)
    const scoreResult = scoreEngine.getScore()
    let floorQ = first(scoreResult.desirability.questions.filter(q => q.key === 'floor-space'))
    expect(floorQ.rating.band).toBe('Average')
  });

  test('verify score for score-type dualsum', () => {
    const scoreEngine = new ScoreEngine(fakeMessage.get(), scoreData)
    const scoreResult = scoreEngine.getScore()
    const rating = first(scoreResult.desirability.questions.filter(q => q.key === 'productivity')).rating
    expect(rating.score).toBe(3)
    expect(rating.band).toBe('Strong')
  })
  test('verify score for score-type dualsum Medium', () => {
    const msg = fakeMessage.get()
    msg.desirability.questions.map(m => {
      m.answers.map(mi => {
        const firstInputVal = mi.input[0]
        firstInputVal.key = firstInputVal.key === 'productivity-A2' ? 'productivity-A3' : firstInputVal.key
        firstInputVal.key = firstInputVal.key === 'productivity-A2' ? 'productivity-A3' : firstInputVal.key
        mi.input[0] = firstInputVal
        return mi
      })
      return m
    })
    const scoreEngine = new ScoreEngine(msg, scoreData)
    const scoreResult = scoreEngine.getScore()
    const rating = first(scoreResult.desirability.questions.filter(q => q.key === 'productivity')).rating
    expect(rating.score).toBe(3)
    expect(rating.band).toBe('Strong')
  })
  test('verify score for score-type dualsum Low', () => {
    const msg = fakeMessage.get()
    msg.desirability.questions.map(m => {
      m.answers.map(mi => {
        const firstInputVal = mi.input[0]
        firstInputVal.key = (firstInputVal.key === 'productivity-A2' || firstInputVal.key === 'productivity-A1') ? 'productivity-A5' : firstInputVal.key
        mi.input[0] = firstInputVal
        return mi
      })
      return m
    })
    const scoreEngine = new ScoreEngine(msg, scoreData)
    const scoreResult = scoreEngine.getScore()
    const rating = first(scoreResult.desirability.questions.filter(q => q.key === 'productivity')).rating
    expect(rating.score).toBe(1.5)
    expect(rating.band).toBe('Average')
  })

  test('verify score for score-type dualsumcap', () => {
    solarScoreData.desirability.questions[1].answer[0].weight = 1000

    const scoreEngine = new ScoreEngine(fakeSolarmsg.get(), solarScoreData)
    const scoreResult = scoreEngine.getScore()
    const rating = first(scoreResult.desirability.questions.filter(q => q.key === 'solar-technologies')).rating
    expect(rating.score).toBe(30)
    expect(rating.band).toBe('Strong')
  })
  test('verify score for score-type dualsumcap Medium', () => {
    const msg = fakeSolarmsg.get()
 
    solarScoreData.desirability.questions[1].answer[0].weight = 1

    const scoreEngine = new ScoreEngine(msg, solarScoreData)
    const scoreResult = scoreEngine.getScore()
    const rating = first(scoreResult.desirability.questions.filter(q => q.key === 'solar-technologies')).rating
    expect(rating.score).toBe(30)
    expect(rating.band).toBe('Strong')
  })
  test('verify score for score-type dualsumcap Low', () => {
    const msg = fakeSolarmsg.get()

    solarScoreData.desirability.questions[1].answer[0].weight = 0.03
    const scoreEngine = new ScoreEngine(msg, solarScoreData)
    const scoreResult = scoreEngine.getScore()
    const rating = first(scoreResult.desirability.questions.filter(q => q.key === 'solar-technologies')).rating
    expect(rating.score).toBe(30)
    expect(rating.band).toBe('Strong')
  })

  test('verify score for score-type multiInputItemCount', () => {
    const scoreEngine = new ScoreEngine(fakeRoboticsmsg.get(), roboticsScoreData)
    const scoreResult = scoreEngine.getScore()
    const rating = first(scoreResult.desirability.questions.filter(q => q.key === 'eligibility-criteria')).rating
    expect(rating.score).toBe(20)
    expect(rating.band).toBe('Strong')
  })
  test('verify score for score-type multiInputItemCount Medium', () => {
    const msg = fakeRoboticsmsg.get()
    roboticsScoreData.desirability.questions[5].answer[0].weight = 0

    const scoreEngine = new ScoreEngine(msg, roboticsScoreData)
    const scoreResult = scoreEngine.getScore()
    const rating = first(scoreResult.desirability.questions.filter(q => q.key === 'eligibility-criteria')).rating
    expect(rating.score).toBe(13.4)
    expect(rating.band).toBe('Average')
  })
  test('verify score for score-type multiInputItemCount Low', () => {
    const msg = fakeRoboticsmsg.get()

    roboticsScoreData.desirability.questions[5].answer[0].weight = 0
    roboticsScoreData.desirability.questions[5].answer[1].weight = 0

    const scoreEngine = new ScoreEngine(msg, roboticsScoreData)
    const scoreResult = scoreEngine.getScore()
    const rating = first(scoreResult.desirability.questions.filter(q => q.key === 'eligibility-criteria')).rating
    expect(rating.score).toBe(6.800000000000001)
    expect(rating.band).toBe('Weak')
  })

  
  test('verify score for score-type boolweightscore', () => {
    const scoreEngine = new ScoreEngine(fakeMessage.get(), scoreData)
    const scoreResult = scoreEngine.getScore()
    const rating = first(scoreResult.desirability.questions.filter(q => q.key === 'collaboration')).rating
    expect(rating.score).toBe(4)
    expect(rating.band).toBe('Strong')
  })
  test('verify score for score-type boolweightscore Low', () => {
    const msg = fakeMessage.get()
    msg.desirability.questions.map(m => {
      m.answers.map(mi => {
        const firstInputVal = mi.input[0]
        firstInputVal.key = firstInputVal.key === 'collaboration-A1' ? 'collaboration-A2' : firstInputVal.key
        mi.input[0] = firstInputVal
        return mi
      })
      return m
    })
    const scoreEngine = new ScoreEngine(msg, scoreData)
    const scoreResult = scoreEngine.getScore()
    const rating = first(scoreResult.desirability.questions.filter(q => q.key === 'collaboration')).rating
    expect(rating.score).toBe(0)
    expect(rating.band).toBe('Weak')
  })
  test('verify score for overall Ratings', () => {
    const scoreEngine = new ScoreEngine(fakeMessage.get(), scoreData)
    const scoreResult = scoreEngine.getScore()
    expect(scoreResult.desirability.overallRating.score).toBe(93)
    expect(scoreResult.desirability.overallRating.band).toBe('Strong')
  })
  test('verify score for overall Ratings is Low', () => {
    const msg = fakeMessage.get()
    msg.desirability.questions.map(m => {
      m.answers.map(mi => {
        const ansInputs = []
        const firstInputVal = mi.input[0]
        // firstInputVal.key = firstInputVal.key === 'Q14-A1' ? 'Q14-A4' : firstInputVal.key
        firstInputVal.value = (mi.key === 'irrigated-land-a' || mi.key === 'irrigated-land-b') ? 1 : firstInputVal.value
        firstInputVal.key = (mi.key === 'water-source-a') ? 'water-source-a-A5' : firstInputVal.key
        firstInputVal.key = (mi.key === 'water-source-b') ? 'water-source-b-A5' : firstInputVal.key
        ansInputs.push(firstInputVal)
        mi.input = ansInputs
        return mi
      })
      return m
    })
    const scoreEngine = new ScoreEngine(msg, scoreData)
    const scoreResult = scoreEngine.getScore()
    expect(scoreResult.desirability.overallRating.score).toBe(38.5)
    expect(scoreResult.desirability.overallRating.band).toBe('Weak')
  })

  const getMediumMessage = () => {
    const msg = fakeMessage.get()
    msg.desirability.questions.map(m => {
      m.answers.map(mi => {
        const ansInputs = []
        const firstInputVal = mi.input[0]
        // firstInputVal.key = firstInputVal.key === 'Q14-A1' ? 'Q14-A4' : firstInputVal.key
        firstInputVal.value = (mi.key === 'irrigated-land-a') ? 1 : firstInputVal.value
        firstInputVal.value = (mi.key === 'irrigated-land-b') ? 20 : firstInputVal.value
        firstInputVal.key = (mi.key === 'water-source-a') ? 'water-source-a-A3' : firstInputVal.key
        firstInputVal.key = (mi.key === 'water-source-b') ? 'water-source-b-A1' : firstInputVal.key
        firstInputVal.key = (mi.key === 'irrigation-system-a') ? 'irrigation-system-a-A5' : firstInputVal.key
        firstInputVal.key = (mi.key === 'irrigation-system-b') ? 'irrigation-system-b-A7' : firstInputVal.key
        ansInputs.push(firstInputVal)
        mi.input = ansInputs
        return mi
      })
      return m
    })
    return msg
  }
  test('verify score for overall Ratings is Medium', () => {
    const msg = getMediumMessage()
    const scoreEngine = new ScoreEngine(msg, scoreData)
    const scoreResult = scoreEngine.getScore()
    expect(scoreResult.desirability.overallRating.score).toBe(61.5)
    expect(scoreResult.desirability.overallRating.band).toBe('Average')
  })

  const getHighMessage = () => {
    const msg = fakeMessage.get()
    msg.desirability.questions.map(m => {
      m.answers.map(mi => {
        const ansInputs = []
        const firstInputVal = mi.input[0]
        // firstInputVal.key = firstInputVal.key === 'Q14-A1' ? 'Q14-A4' : firstInputVal.key
        firstInputVal.key = (firstInputVal.key === 'irrigated-crops-A3') ? 'irrigated-crops-A2' : firstInputVal.key
        firstInputVal.value = (mi.key === 'irrigated-land-a') ? 20 : firstInputVal.value
        firstInputVal.value = (mi.key === 'irrigated-land-b') ? 21 : firstInputVal.value
        firstInputVal.key = (mi.key === 'water-source-a') ? 'water-source-a-A2' : firstInputVal.key
        firstInputVal.key = (mi.key === 'water-source-b') ? 'water-source-b-A1' : firstInputVal.key
        firstInputVal.key = (mi.key === 'irrigation-system-a') ? 'irrigation-system-a-A5' : firstInputVal.key
        firstInputVal.key = (mi.key === 'irrigation-system-b') ? 'irrigation-system-b-A7' : firstInputVal.key
        firstInputVal.key = (mi.key === 'productivity') ? 'productivity-A1' : firstInputVal.key
        firstInputVal.key = (mi.key === 'collaboration') ? 'collaboration-A1' : firstInputVal.key

        ansInputs.push(firstInputVal)
        if (mi.key === 'water-source-a') {
          ansInputs.push({ key: 'water-source-a-A3' })
        }
        if (mi.key === 'irrigation-system-a') {
          ansInputs.push({ key: 'irrigation-system-a-A6' })
        }
        if (mi.key === 'irrigation-system-b') {
          ansInputs.push({ key: 'irrigation-system-b-A2' })
        }
        if (mi.input[0].key === 'productivity-A1') {
          ansInputs.push({ key: 'productivity-A4' })
        }
        mi.input = ansInputs
        return mi
      })
      return m
    })
    return msg
  }
  test('verify score for overall Ratings is High with decimal score', () => {
    const msg = getHighMessage()
    const scoreEngine = new ScoreEngine(msg, scoreData)
    const scoreResult = scoreEngine.getScore()
    expect(scoreResult.desirability.overallRating.score).toBe(85)
    expect(scoreResult.desirability.overallRating.band).toBe('Strong')
  })
})
