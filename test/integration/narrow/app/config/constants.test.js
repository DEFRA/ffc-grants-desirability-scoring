const constants = require('../../../../../app/config/constants')

describe('get constants', () => {
  test('Should get constants', async () => {
    expect(constants).toBeDefined()
    expect(constants.environments.development).toBe('development')
  })
})
