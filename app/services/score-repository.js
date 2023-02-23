const { models } = require('./db-service')

async function getScoreData (schemeType) {
  const existingscoreData =
        await models.scoredatas.findOne(
          {
            attributes: ['score_data_id', 'data'],
            where: { scheme_type: schemeType },
            order: [['version', 'DESC']]
          })
  if (existingscoreData) {
    console.info(`[Got scoring data for ${schemeType} scheme from DB]`)
  }
  return existingscoreData
}

module.exports = { getScoreData }
