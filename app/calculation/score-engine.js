
const { first } = require('lodash')
const bandHigh = 'Strong'
const bandLow = 'Weak'
const bandMedium = 'Average'

const UNSUSTAINABLE_WATER_SOURCE_ID = ['WS4', 'WS5']

class ScoreEngine {
  constructor (desirabilityAssessment, scoreData) {
    this.scoringData = scoreData
    this.desirabilityAssessment = desirabilityAssessment
  }

  getScore() {
    // calculate each question result
    this.desirabilityAssessment.desirability.questions
      .map((qanswer, index, allQanswers) => calculate(qanswer, this.scoringData.desirability, allQanswers))
    const maxScore =
      this.scoringData.desirability.questions
        .reduce((total, question) => {
          if (!question?.countMax) {
            return question.maxScore + total
          }
          return total
        }, 0)

    const noShowResultQuestions =
      this.scoringData.desirability.questions
        .filter(question => question.showResult === false)
    let actualScore = this.desirabilityAssessment.desirability.questions
      .filter(question =>
        noShowResultQuestions
          .every(noShow => noShow.key !== question.key))
      .reduce(
        (total, question) =>
          question.rating.score + total, 0)
    actualScore = Math.floor(actualScore * 100) / 100 // only shows upto 2 decimal when needed
    this.desirabilityAssessment.desirability.overallRating.score = actualScore
    let bandScore = actualScore
    const overallRating = this.scoringData.desirability.overallRatingCalcType ?? 'percentile'
    if (overallRating.toLowerCase() === 'percentile') {
      bandScore = (actualScore / maxScore * 100)
      this.desirabilityAssessment.desirability.overallRating.score = Math.floor(bandScore * 100) / 100 // only shows upto 2 decimal when needed
    }

    // remove noShowResult questions
    this.desirabilityAssessment.desirability.questions = this.desirabilityAssessment.desirability.questions.filter(question => noShowResultQuestions.every(noShow => noShow.key !== question.key))
    // get overall rating band
    this.desirabilityAssessment.desirability.overallRating.band = getOverAllRatingBand(bandScore, this.scoringData.desirability)
    return this.desirabilityAssessment
  }
}

function getOverAllRatingBand (bandScore, sectionScoringData) {
  if (bandScore >=
    first(
      sectionScoringData.overallRatingScoreData
        .filter(x => x.name === bandHigh)).value) {
    return bandHigh
  }
  if (sectionScoringData.overallRatingScoreData
    .filter(x => x.name === bandLow).length > 0 && bandScore <=
    first(
      sectionScoringData.overallRatingScoreData
        .filter(x => x.name === bandLow)).value) {
    return bandLow
  }
  return bandMedium
}

function calculate (qanswer, sectionScoringData, allQanswers) {
  const dependentQuestionRatingScore = []
  let dependantQuestionAnswers
  // get question

  // console.log('checking this bit', qanswer.key, 'now this bit', sectionScoringData.questions)
  const question = first(
    sectionScoringData.questions
      .filter(q => q.key === qanswer.key))

  if (question?.dependentValueQuestions) {
    dependantQuestionAnswers = allQanswers.filter(qAnswer => question.dependentValueQuestions.some(dQues => dQues === qAnswer.key))
  }

  if (question?.dependentQuestions) {
    const answers = allQanswers.filter(answer => question.dependentQuestions.some(dependantQues => dependantQues === answer.key))
    answers.forEach(dqa => {
      dependentQuestionRatingScore.push(dqa.rating.score)
    })
  }
  qanswer.rating = calculateQScore(question, qanswer.answers, dependentQuestionRatingScore, dependantQuestionAnswers, allQanswers, sectionScoringData)
  return qanswer
}

function calculateQScore (question, answers, dependentQuestionRatingScore, dependantQuestionAnswers, allQanswers, sectionScoringData) {
  //
  let result = new ScoreResult('', '')
  // console.log('I am here', question)
  switch (String(question.scoreType).toLowerCase()) {
    case 'answervalnoband':
      result = answerValNoBand(question, answers)
      break

    case 'dualquestionhectorscore':
      result = dualQuestionHectorScore(question, answers, dependentQuestionRatingScore)
      break

    case 'dualavgmatrix':
      result = dualAvgMatrix(question, answers)
      break

    case 'multiavgmatrix':
      result = multiAvgMatrix(question, answers, dependantQuestionAnswers)
      break

    case 'dualsum':
      result = dualSum(question, answers)
      break
    case 'dualsumconditional':
      result = dualSumConditional(question, answers, allQanswers)
      break
    case 'dualsumcap':
      result = dualSumCap(question, answers)
      break
    case 'boolweightscore':
      result = boolWeightScore(question, answers)
      break
    case 'dualsumweightavgband':
      result = dualSumWeightAvgBand(question, answers)
      break
    case 'weightedmatrixscore':
      result = SingleValueWeightedMatrixScore(question, answers, allQanswers, sectionScoringData)
      break
    case 'userinput':
      result = inputQuestion(question, answers)
      break
    case 'multiselectsumthenweight':
      result = multiSelectSumThenWeight(question, answers)
      break
    case 'boolvalueweightscore':
      result = boolValueWeightScore(question, answers)
      break
    case 'dualsumnopercentband':
      result = dualSumNoPercentBand(question, answers)
      break
    case 'multiinputitemcount':
      result = multiInputItemCount(question, answers)
      break
  }
  return result
}

function dualSumWeightAvgBand (question, answers) {
  let score = question.answer
    .filter(itemX =>
      first(answers).input.some(itemY => itemY.key === itemX.key))
    .reduce((total, answer) => answer.weight + total, 0) * question.weight
  score = score / first(answers).input.length
  const scoreBand = score / question.maxScore // to calculate banding we have to divide by max score

  let band = bandMedium
  if (question.scoreData.scoreBand
    .filter(r => r.name === bandLow).length > 0) {
    if (scoreBand <= first(
      question.scoreData.scoreBand
        .filter(x => x.name === bandLow)).value) { band = bandLow }
  }
  if (scoreBand >= first(
    question.scoreData.scoreBand
      .filter(x => x.name === bandHigh)).value) { band = bandHigh }

  return new ScoreResult(score, band)
}

// water source scoring
function answerValNoBand (question, answers) {
  const score = first(question.answer
    .filter(x =>
      first(answers).input.some(y => y.key === x.key)
    ))?.weight
  return new ScoreResult(score, null)
}

// AHW living space scoring
function inputQuestion (question, answers) {
  const livingSpaceAnswer = answers.filter(x => x.key === question.key)[0].input

  const clavesNumber = Number(livingSpaceAnswer[0].value)
  const clavesPageKey = Number(livingSpaceAnswer[0].key)
  let score = (((clavesNumber - clavesPageKey) * 100) / clavesPageKey) * 10

  if (score >= question.maxScore) {
    score = question.maxScore
  }

  let band = bandMedium
  const scoreBand = score / question.maxScore

  if (scoreBand <= first(
    question.scoreData.scoreBand
      .filter(r => r.name === bandLow)).value) { band = bandLow }
  if (scoreBand >= first(
    question.scoreData.scoreBand
      .filter(r => r.name === bandHigh)).value) { band = bandHigh }
  return new ScoreResult(score, band)
}
// AHW - Sum answers for band, then multiply by weight for overall score
function multiSelectSumThenWeight (question, answers) {
  const answerList = question.answer.filter(answer => first(
    answers
      .filter(selectedAnswer => selectedAnswer.key === question.key)).input
    .some(givenAnswer => givenAnswer.key === answer.key))
  let score = answerList.reduce((total, answerList) => answerList.weight + total, 0) * question.maxScore

  let band = bandMedium
  const scoreBand = score / question.maxScore

  if (scoreBand <= first(
    question.scoreData.scoreBand
      .filter(r => r.name === bandLow)).value) { band = bandLow }
  if (scoreBand >= first(
    question.scoreData.scoreBand
      .filter(r => r.name === bandHigh)).value) { band = bandHigh }

  score = score * question.weight

  return new ScoreResult(score, band)
}

// AHW - value of answer for band, then multiply by weight for overall score
function boolValueWeightScore(question, answers) {
  const answerList = question.answer.filter(answer => first(
    answers
      .filter(selectedAnswer => selectedAnswer.key === question.key)).input
    .some(givenAnswer => givenAnswer.key === answer.key))

  const score = answerList.reduce((total, answerList) => answerList.weight + total, 0) * question.weight

  let band
  if (score === first(
    question.scoreData.scoreBand
      .filter(r => r.name === bandLow)).value) { band = bandLow } else {
    band = bandHigh
  }

  return new ScoreResult(score, band)
}

// producitivity robotics eligibility criteria
function multiInputItemCount (question, allAnswers) {
  const answerListLength = allAnswers.length
  let total = 0
  // for (answerObject in allAnswers)
  allAnswers.forEach((answerObject) => {
    const answersList = question.answer.filter(answer => first(
      answerObject.answers
        .filter(selectedAnswer => selectedAnswer.key === question.key)).input
      .some(givenAnswer => givenAnswer.key === answer.key))

    const answerScore = answersList.reduce((total, answersList) => answersList.weight + total, 0)
    const lengthTotal = question.scoreData.scorePerItemCount.filter(itemScore => itemScore.key === answerScore)
    total = total + lengthTotal[0].value
  })
  const score = (answerListLength > 0 ? total / answerListLength : 100) * question.weight
  let band = bandMedium
  const scoreBand = score / question.maxScore

  if (scoreBand <= first(
    question.scoreData.scoreBand
      .filter(r => r.name === bandLow)).value) { band = bandLow }
  if (scoreBand >= first(
    question.scoreData.scoreBand
      .filter(r => r.name === bandHigh)).value) { band = bandHigh }

  return new ScoreResult(score, band)
}

// Q16
function dualQuestionHectorScore (question, answers, dependentQuestionRatingScore) {
  const q15Score = first(dependentQuestionRatingScore)
  const q16bAnsVal = first(
    first(answers.filter(answer => answer.key === `${question.key}-b`)).input).value

  const hector = q16bAnsVal
  const bandBoundary = first(question.scoreData.scoreMatrix.filter(e => e.crop === q15Score))
  let band = bandMedium

  if (hector <= bandBoundary.low) { band = bandLow }
  if (hector >= bandBoundary.high) { band = bandHigh }

  const score = first(
    question.scoreData.scoreBand
      .filter(x => x.name === band)).value * question.weight
  return new ScoreResult(score, band)
}

// Q20
function boolWeightScore(question, answers) {
  const score = first(question.answer
    .filter(answer =>
      first(answers).input
        .some(selectedAnswer => selectedAnswer.key === answer.key))).weight * question.weight

  const questionBand = getBand(question, score)

  return new ScoreResult(score, questionBand)
}

const bandLimit = (question, scoreBand) => {
  return first(question.scoreData.scoreBand.filter(band => band.name === scoreBand))?.value
}

const getBand = (question, score) => {
  const hasBandHigh = (question.scoreData.scoreBand.filter(band => band.name === bandHigh).length > 0)
  const hasBandLow = (question.scoreData.scoreBand.filter(band => band.name === bandLow).length > 0)
  const typeElseBand = first(question.scoreData.scoreBand.filter(band => band.type === 'else'))?.name
  let questionBand = question.scoreData.scoreBand.length === 1 ? bandHigh : typeElseBand

  if (hasBandHigh && score >= bandLimit(question, bandHigh)) { questionBand = bandHigh }
  if (hasBandLow && score <= bandLimit(question, bandLow)) { questionBand = bandLow }
  return questionBand
}

const getMatrixValue = (scoreMatrix, matrixId, matrixValue) => {
  return +first(
    scoreMatrix
      .filter(scoreMatrix => scoreMatrix.id === String(matrixId)))[String(matrixValue)]
}

const getTotalAvg = (matrixScoreArray, unSustainableStop, maxScore) => {
  let totalAverage = Math.round(matrixScoreArray.reduce((a, b) => a + b) / matrixScoreArray.length)
  if (unSustainableStop.length > 0) {
    const avgPercentIncrease = (unSustainableStop.reduce((a, b) => a + b) / unSustainableStop.length)
    totalAverage = (totalAverage * avgPercentIncrease) + totalAverage
    totalAverage = totalAverage > maxScore ? maxScore : totalAverage
  }
  return totalAverage
}

function multiAvgMatrix (question, answers, dependantQuestionAnswers = []) {
  const asIsAnswers =
    question.answer
      .filter(answer => first(
        answers
          .filter(selectedAnswer => selectedAnswer.key === `${question.key}-a`)).input
        .some(asIsAnswer => asIsAnswer.key === answer.key))

  const toBeAnswers =
    question.answer.filter(qAnswer => first(
      answers.filter(selectedAnswer => selectedAnswer.key === `${question.key}-b`)).input
      .some(toBeAnswer => toBeAnswer.key === qAnswer.key))

  const matrixScoreArray = []
  const unSustainableStop = []
  // checking if stoping unsustainable option
  if (asIsAnswers.length > 0) {
    const unSustainableAnswers = asIsAnswers.filter(ansIsanswer => UNSUSTAINABLE_WATER_SOURCE_ID.includes(ansIsanswer.wsId))
    unSustainableAnswers.forEach(unSustainableAnswer => {
      if (!toBeAnswers.find(toBeanswer => toBeanswer.wsId === unSustainableAnswer.wsId)) {
        unSustainableStop.push(getMatrixValue(question.scoreData.scoreMatrix, 'stop', unSustainableAnswer.wsId))
      }
    })
  }

  toBeAnswers.forEach(toBeAnswer => {
    let maintainOrStart = asIsAnswers.find(ansIsanswer => ansIsanswer.wsId === toBeAnswer.wsId) ? 'nochange' : 'start'
    // if unsustainable option is a decrease
    if (UNSUSTAINABLE_WATER_SOURCE_ID.includes(toBeAnswer.wsId) && maintainOrStart === 'nochange') {
      maintainOrStart = dependantQuestionAnswers[0].answers.find(dqa => dqa.title === toBeAnswer.desc).input[0].value.toLowerCase().replace(' ', '')
    }

    const matrixVal = getMatrixValue(question.scoreData.scoreMatrix, maintainOrStart, toBeAnswer.wsId)
    matrixScoreArray.push(matrixVal)
    console.log(matrixVal, 'Mat val')
  })
  const totalAverage = getTotalAvg(matrixScoreArray, unSustainableStop, question.maxScore)
  const score = totalAverage * question.weight
  const scoreBand = (score / question.maxScore).toFixed(2)

  let band = bandMedium
  if (scoreBand <= first(
    question.scoreData.scoreBand
      .filter(r => r.name === bandLow)).value) { band = bandLow }
  if (scoreBand >= first(
    question.scoreData.scoreBand
      .filter(r => r.name === bandHigh)).value) { band = bandHigh }
  return new ScoreResult(score, band)
}

// Q18/17
function dualAvgMatrix (question, answers) {
  const asIsAnswers =
    question.answer
      .filter(answer => first(
        answers
          .filter(selectedAnswer => selectedAnswer.key === `${question.key}-a`)).input
        .some(asIsAnswer => asIsAnswer.key === answer.key))
  const toBeAnswers =
    question.answer.filter(qAnswer => first(
      answers.filter(selectedAnswer => selectedAnswer.key === `${question.key}-b`)).input
      .some(toBeAnswer => toBeAnswer.key === qAnswer.key))

  const asIsAverage = Math.round(
    asIsAnswers.reduce((total, next) => total + next.weight, 0) / asIsAnswers.length)
  const tobeAverage = Math.round(
    toBeAnswers.reduce((total, next) => total + next.weight, 0) / toBeAnswers.length)

  const matrixVal = first(
    question.scoreData.scoreMatrix
      .filter(r => r.id === String(asIsAverage)))[String(tobeAverage)]

  const score = matrixVal * question.weight
  const scoreBand = matrixVal / question.maxScore

  let band = bandMedium
  if (scoreBand <= first(
    question.scoreData.scoreBand
      .filter(r => r.name === bandLow)).value) { band = bandLow }
  if (scoreBand >= first(
    question.scoreData.scoreBand
      .filter(r => r.name === bandHigh)).value) { band = bandHigh }

  return new ScoreResult(score, band)
}

function checkConditions (dependentQuestions, scoreCondition, allQanswers) {
  let score = false
  const dependantQuestionAnswers = allQanswers.filter(qAnswer => dependentQuestions.some(dQues => dQues === qAnswer.key))
  scoreCondition.forEach(condition => {
    const hasConditionAnswer = dependantQuestionAnswers.some(dependantQuestAns => dependantQuestAns.answers[0].input.some((answer) => answer.key === condition.key))
    const hasStandAloneAdditionalAnswer = dependantQuestionAnswers[0].answers[0].input.length === 1 && dependantQuestionAnswers[0].answers[0].input.some((answer) => answer.key === condition?.standAloneAdditionalAnswer)
    console.log(hasConditionAnswer, 'PPPP for this', condition)
    switch (condition.condition) {
      case 'ONLY':
        if (dependantQuestionAnswers[0].answers[0].input.length === 1 && hasConditionAnswer) {
          score = Number(condition.weight)
        }
        break
      case 'NOT_INCLUDES':
        if (!hasConditionAnswer && !hasStandAloneAdditionalAnswer) {
          score = Number(condition.weight)
        }
        break
      case 'INCLUDES':
        if (hasConditionAnswer) {
          score = Number(condition.weight)
        }
        break
    }
  })
  return score
}

function dualSumConditional (question, answers, allQanswers) {
  let score = checkConditions(question.dependentQuestions, question.scoreData.scoreCondition, allQanswers)
  if (score === false) {
    return dualSum(question, answers)
  }
  score = score * question.weight
  const band = getScoreBand(score, question)
  return new ScoreResult(score, band)
}

function getScoreBand (score, question) {
  const scoreBand = score / question.maxScore
  let band = bandMedium
  if (scoreBand <= first(
    question.scoreData?.scoreBand
      .filter(r => r.name === bandLow)).value) { band = bandLow }
  if (scoreBand >= first(
    question.scoreData.scoreBand
      .filter(r => r.name === bandHigh)).value) { band = bandHigh }
  return band
}

// Q19
function dualSum (question, answers) {
  const score =
    question.answer
      .filter(itemX => first(answers).input
        .some(itemY => itemY.key === itemX.key))
      .reduce((total, answer) => answer.weight + total, 0) * question.weight

  const band = getScoreBand(score, question)

  return new ScoreResult(score, band)
}

function dualSumCap (question, answers) {
  const hasGraceScore = question.scoreData?.graceScore
  let score =
    question.answer
      .filter(itemX => first(answers).input
        .some(itemY => itemY.key === itemX.key))
      .reduce((total, answer) => answer.weight + total, 0) * question.weight
  if (hasGraceScore && score > 0) {
    score = score + hasGraceScore - 2
  }
  if (score > question.maxScore) {
    score = question.maxScore
  }
  const band = getScoreBand(score, question)

  return new ScoreResult(score, band)
}

function dualSumNoPercentBand (question, answers) {
  const score =
    question.answer
      .filter(itemX => first(answers).input
        .some(itemY => itemY.key === itemX.key))
      .reduce((total, answer) => answer.weight + total, 0) * question.weight

  const scoreBand = score

  let band = bandMedium
  if (scoreBand <= first(
    question.scoreData.scoreBand
      .filter(r => r.name === bandLow)).value) { band = bandLow }
  if (scoreBand >= first(
    question.scoreData.scoreBand
      .filter(r => r.name === bandHigh)).value) { band = bandHigh }

  return new ScoreResult(score, band)
}

function SingleValueWeightedMatrixScore (question, answers, allQanswers, sectionScoringData) {
  const metrixXWeight = question.answer
    .filter(metrixX => first(answers).input
      .some(answerX => answerX.key === metrixX.key))[0].weight

  const metrixYquestion = first(
    sectionScoringData.questions
      .filter(scoringQues => question.key === question.matrixAxis.filter(axis => axis !== scoringQues.key)[0]))

  const matrixYanswers = allQanswers.filter(x => metrixYquestion.key === x.key)[0]
  const metrixYquestionScoreResult = calculateQScore(metrixYquestion, matrixYanswers.answers, null, allQanswers, sectionScoringData)
  const rowIndex = question.key === question.matrixAxis[0] ? metrixXWeight : metrixYquestionScoreResult.score
  const columnIndex = question.key === question.matrixAxis[1] ? metrixXWeight : metrixYquestionScoreResult.score
  const score = question.scoreData.scoreMatrix.filter(x => x.id === String(rowIndex))[0][String(columnIndex)] * question.weight
  const questionBand = getBand(question, score)
  return new ScoreResult(score, questionBand)
}
function ScoreResult (score, band, importance = null) {
  this.score = score
  this.band = band
  this.importance = importance
}

module.exports = ScoreEngine
