describe('Healthy test', () => {
  jest.mock('../../../../app/services/db-service')
  const server = require('../../../../app/server')
  const { sequelize } = require('../../../../app/services/db-service')
  sequelize.authenticate = jest.fn()
  jest.mock('../../../../app/messaging/calculate-score')
  jest.mock('../../../../app/messaging/senders')

  test('GET /healthy returns 200', async () => {
    const options = {
      method: 'GET',
      url: '/healthy'
    }
    sequelize.authenticate.mockReturnValue(true)

    const response = await server.inject(options)

    expect(response.statusCode).toBe(200)
  })

  test('GET /healthy returns 503 and error message if database check throws an error', async () => {
    const options = {
      method: 'GET',
      url: '/healthy'
    }

    const errorMessage = 'database connection timeout'
    sequelize.authenticate.mockImplementation(() => { throw new Error(errorMessage) })

    const response = await server.inject(options)

    expect(response.statusCode).toBe(503)
    expect(response.payload).toBe(`Error running healthy check: ${errorMessage}`)
  })

  afterEach(async () => {
    await server.stop()
    jest.clearAllMocks()
  })

  afterAll(async () => {
    await server.stop()
    jest.resetAllMocks()
  })
})
