const { setup } = require('../../../../app/services/app-insights')
jest.mock('../../../../app/services/app-insights')

describe('Server test', () => {
  test('createServer returns server', () => {
    const server = require('../../../../app/server')
    expect(server).toBeDefined()
    expect(setup).toHaveBeenCalledTimes(1)
  })
})
