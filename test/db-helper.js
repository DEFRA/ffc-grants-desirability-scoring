const { models, sequelize } = require('../app/services/db-service')()

async function createSchema () {
  const queryInterface = sequelize.getQueryInterface()
  queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
  await sequelize.sync()
}

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
  createSchema,
  sequelize
}
