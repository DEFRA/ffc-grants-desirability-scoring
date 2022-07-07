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
    console.info(`[Got data for ${schemeType} scheme]: ${existingscoreData.score_data_id}`)
  }
  return existingscoreData
}

module.exports = { getScoreData }
