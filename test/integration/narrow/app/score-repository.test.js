
describe('Score Repository test', () => {
  const scoreDataRepository = require('../../../../app/services/score-repository')
  const dbHelper = require('../../../db-helper')
  beforeAll(async () => {
    dbHelper.createSchema()
    await dbHelper.truncate()
    await dbHelper.createScoreRecords(
      [{
        schemeType: 'Water Grant',
        data: '',
        version: '01.00.00',
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 'Admin',
        updatedBy: 'Admin'
      }]
    )
  })

  afterAll(async (done) => {
    await dbHelper.truncate()
    await dbHelper.close()
    done()
  }, 30000)
  test('test connection with db', async () => {
    expect(async () => await dbHelper.sequelize.authenticate()).not.toThrow()
  })
  test('getScoreData returns ScoreData', async () => {
    const scoreData = await scoreDataRepository.getScoreData('Water Grant')
    expect(scoreData).toBeDefined()
  })
})
