const { models, sequelize } = require('../app/services/db-service')()

async function truncate () {
  await models.scoredatas.destroy({ truncate: { cascade: true } })
}

async function createScoreRecords (scoreDatas) {
  await models.scoredatas.bulkCreate(scoreDatas)
}

async function close () {
  await sequelize.close()
}

module.exports = {
  close,
  createScoreRecords,
  truncate,
  sequelize
}
