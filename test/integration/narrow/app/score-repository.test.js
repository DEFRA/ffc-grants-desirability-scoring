
describe('Score Repository test', () => {
  const scoreDataRepository = require('../../../../app/services/score-repository')
  const dbHelper = require('../../../db-helper')
  beforeAll(async () => {
    await dbHelper.truncate()
    await dbHelper.createScoreRecords(
      [{
        scheme_type: 'Water Grant',
        data: '',
        version: '01.00.00',
        created_at: new Date(),
        updated_at: new Date(),
        created_by: 'Admin',
        updated_by: 'Admin'
      }]
    )
  }, 30000)

  afterAll(async (done) => {
    await dbHelper.truncate()
    await dbHelper.close()
    done()
  }, 30000)

  test('test connection with db', async () => {
    expect(await (() => dbHelper.sequelize.authenticate())).not.toThrow()
  })

  test('getScoreData returns ScoreData', async () => {
    const scoreData = await scoreDataRepository.getScoreData('Water Grant')
    expect(scoreData).toBeDefined()
  })
})
