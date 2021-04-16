const { models } = require('../app/services/db-service')()

async function truncate () {
  await models.scoreDatas.destroy({ truncate: { cascade: true } })
}

async function createScoreRecords (scoreDatas) {
  await models.scoreDatas.bulkCreate(scoreDatas)
}

async function close () {
  await models.sequelize.close()
}

module.exports = {
  close,
  createScoreRecords,
  truncate
}
