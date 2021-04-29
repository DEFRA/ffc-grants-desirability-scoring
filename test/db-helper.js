const { models, sequelize } = require('../app/services/db-service')()

async function truncate () {
  await models.scoredatas.destroy({ truncate: { cascade: true } })
}

async function createScoreRecords (scoreDatas) {
  await models.scoredatas.bulkCreate(scoreDatas)
}
async function createScoreRecord (scoreData) {
  await models.scoredatas.create(scoreData)
}
async function close () {
  await sequelize.close()
}

module.exports = {
  close,
  createScoreRecord,
  createScoreRecords,
  truncate,
  sequelize
}
