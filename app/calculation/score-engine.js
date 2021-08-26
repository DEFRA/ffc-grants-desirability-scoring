
const { first } = require('lodash')
const bandHigh = 'Strong'
const bandLow = 'Weak'
const bandMedium = 'Average'

class ScoreEngine {
  constructor (desirabilityAssessment, scoreData) {
    this.scoringData = scoreData
    this.desirabilityAssessment = desirabilityAssessment
  }

  getScore () {
    // calculate each question result
    this.desirabilityAssessment.desirability.questions
      .map((qanswer, index, allQanswers) => calculate(qanswer, this.scoringData.desirability, allQanswers))
    const maxScore =
      this.scoringData.desirability.questions
        .reduce((total, question) => question.maxScore + total, 0)
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
    actualScore = Math.round(actualScore)
    this.desirabilityAssessment.desirability.overallRating.score = actualScore
    const bandScore = (actualScore / maxScore * 100)

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
    .filter(x => x.name === bandLow).length > 0 && bandScore <
    first(
      sectionScoringData.overallRatingScoreData
        .filter(x => x.name === bandLow)).value) {
    return bandLow
  }
  return bandMedium
}

function calculate (qanswer, sectionScoringData, allQanswers) {
  // get question
  const question = first(
    sectionScoringData.questions
      .filter(q => q.key === qanswer.key))
  const dependentQuestionRatingScore = []
  if (question.dependentQuestions) {
    const answers = allQanswers.filter(x => question.dependentQuestions.some(d => d === x.key))
    answers.forEach(dqa => {
      dependentQuestionRatingScore.push(dqa.rating.score)
    })
  }
  qanswer.rating = calculateQScore(question, qanswer.answers, dependentQuestionRatingScore)
  return qanswer
}

function calculateQScore (question, answers, dependentQuestionRatingScore) {
  let result = new ScoreResult('', '')
  switch (String(question.scoreType).toLowerCase()) {
    case 'dualsumweightband':
      result = dualSumWeightBand(question, answers)
      break

    case 'answervalnoband':
      result = answerValNoBand(question, answers)
      break

    case 'dualquestionhectorscore':
      result = dualQuestionHectorScore(question, answers, dependentQuestionRatingScore)
      break

    case 'dualavgmatrix':
      result = dualAvgMatrix(question, answers)
      break

    case 'dualsum':
      result = dualSum(question, answers)
      break
    case 'boolweightscore':
      result = boolWeightScore(question, answers)
      break
    case 'dualsumweightavgband':
      result = dualSumWeightAvgBand(question, answers)
      break
  }
  return result
}

function dualSumWeightAvgBand (question, answers) {
  let score = question.answer
    .filter(itemX =>
      first(answers).input.some(itemY => itemY.key === itemX.key))
    .reduce((total, answer) => answer.weight + total, 0) * question.weight
  score = score / answers.length
  const scoreBand = score

  let band = bandMedium
  if (scoreBand <= first(
    question.scoreData.scoreBand
      .filter(x => x.name === bandLow)).value) { band = bandLow }
  if (scoreBand >= first(
    question.scoreData.scoreBand
      .filter(x => x.name === bandHigh)).value) { band = bandHigh }

  return new ScoreResult(score, band)
}
// Q14
function dualSumWeightBand (question, answers) {
  const score = question.answer
    .filter(itemX =>
      first(answers).input.some(itemY => itemY.key === itemX.key))
    .reduce((total, answer) => answer.weight + total, 0) * question.weight

  const scoreBand = score / question.maxScore

  let band = bandMedium
  if (scoreBand <= first(
    question.scoreData.scoreBand
      .filter(x => x.name === bandLow)).value) { band = bandLow }
  if (scoreBand >= first(
    question.scoreData.scoreBand
      .filter(x => x.name === bandHigh)).value) { band = bandHigh }

  return new ScoreResult(score, band)
}

// Q15
function answerValNoBand (question, answers) {
  const score = first(question.answer
    .filter(x =>
      first(answers).input.some(y => y.key === x.key)
    )).weight
  return new ScoreResult(score, null)
}

// Q16
function dualQuestionHectorScore (question, answers, dependentQuestionRatingScore) {
  const q15Score = first(dependentQuestionRatingScore)
  const q16bAnsVal = first(
    first(answers.filter(x => x.key === `${question.key}b`)).input).value

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
function boolWeightScore (question, answers) {
  const score = first(
    question.answer
      .filter(x =>
        first(answers).input
          .some(y => y.key === x.key))).weight * question.weight
  let band = ''
  if (question.scoreData.scoreBand && question.scoreData.scoreBand.length > 0) {
    band = bandHigh
    if (score <= first(
      question.scoreData.scoreBand
        .filter(r => r.name === bandLow)).value) { band = bandLow }
  }
  return new ScoreResult(score, band)
}

// Q18/17
function dualAvgMatrix (question, answers) {
  const asIsAnswers =
    question.answer
      .filter(x => first(
        answers
          .filter(z => z.key === `${question.key}a`)).input
        .some(y => y.key === x.key))
  const toBeAnswers =
  question.answer.filter(x => first(
    answers.filter(z => z.key === `${question.key}b`)).input
    .some(y => y.key === x.key))

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

// Q19
function dualSum (question, answers) {
  const score =
  question.answer
    .filter(itemX => first(answers).input
      .some(itemY => itemY.key === itemX.key))
    .reduce((total, answer) => answer.weight + total, 0) * question.weight

  const scoreBand = score / question.maxScore

  let band = bandMedium
  if (scoreBand <= first(
    question.scoreData.scoreBand
      .filter(r => r.name === bandLow)).value) { band = bandLow }
  if (scoreBand >= first(
    question.scoreData.scoreBand
      .filter(r => r.name === bandHigh)).value) { band = bandHigh }

  return new ScoreResult(score, band)
}

class ScoreResult {
  constructor (score, band, importance = null) {
    this.score = score
    this.band = band
    this.importance = importance
  }
}

module.exports = ScoreEngine
