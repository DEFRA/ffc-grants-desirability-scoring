const { sendResponseToSession } = require('../../../../../../app/messaging/application')
const { costResponseQueue, fetchCostResponseMsgType } = require('../../../../../../app/config/messaging.js')

jest.mock('../../../../../../app/messaging')
const { sendMessage } = require('../../../../../../app/messaging')

describe('application messaging tests', () => {
  const sessionId = 'a-session-id'

  beforeEach(() => {
    jest.resetAllMocks()
  })

  test('getApplication sends and receives message', async () => {

    await sendResponseToSession({}, sessionId)

    expect(sendMessage).toHaveBeenCalledTimes(1)
    expect(sendMessage).toHaveBeenCalledWith({}, fetchCostResponseMsgType, costResponseQueue, { sessionId })
  })
})
