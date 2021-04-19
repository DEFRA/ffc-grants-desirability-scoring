const { models, sequelize } = require('../app/services/db-service')()

async function createSchema () {
  const queryInterface = sequelize.getQueryInterface()
  queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
  sequelize.sync()
}

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
  truncate,
  createSchema,
  sequelize
}
