const scoreDataRepository = require('../../../../app/services/score-repository')
const dbHelper = require('../../../db-helper')
describe('Score Repository test', () => {
  beforeAll(async () => {
    await dbHelper.createSchema()
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

  afterAll(async () => {
    await dbHelper.truncate()
    await dbHelper.close()
  }, 30000)
  test('test connection with db', async () => {
    expect(async () => await dbHelper.sequelize.authenticate()).not.toThrow()
  })
  test('getScoreData returns ScoreData', async () => {
    const scoreData = await scoreDataRepository.getScoreData('Water Grant')
    expect(scoreData).toBeDefined()
  })
})
