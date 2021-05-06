const dbService = require('../../../../../app/services/db-service')

describe('Test dbService', () => {
  test('Should be defined', () => {
    expect(dbService).toBeDefined()
    expect(dbService.models).toBeDefined()
    expect(dbService.models.scoredatas).toBeDefined()
    expect(dbService.sequelize).toBeDefined()
  })
})
