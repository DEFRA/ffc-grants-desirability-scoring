const { models } = require('./db-service')()

async function getScoreData (schemeType) {
  const existingscoreData =
        await models.scoreDatas.findOne(
          {
            where: { schemeType: schemeType },
            order: [['version', 'DESC']]
          })
  if (existingscoreData) {
    console.info(`Got scoreData: ${existingscoreData.scoreDataId}`)
  }
  return existingscoreData
}

module.exports = { getScoreData }
