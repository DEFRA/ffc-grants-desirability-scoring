const { sendResponseToSession } = require('../../../../../../app/messaging/application')
const { costResponseQueue, fetchCostResponseMsgType, fetchScoreResponseMsgType, scoreResponseQueue } = require('../../../../../../app/config/messaging.js')

jest.mock('../../../../../../app/messaging')
const { sendMessage } = require('../../../../../../app/messaging')

describe('application messaging tests', () => {
  const sessionId = 'a-session-id'

  beforeEach(() => {
    jest.resetAllMocks()
  })

  test('getApplication sends and receives message', async () => {

    await sendResponseToSession({}, sessionId, '.fetch.cost.request')

    expect(sendMessage).toHaveBeenCalledTimes(1)
    expect(sendMessage).toHaveBeenCalledWith({}, fetchCostResponseMsgType, costResponseQueue, { sessionId })
  })

  test('getApplication sends and receives message with different msgType', async () => {

    await sendResponseToSession({}, sessionId, '.fetch.score.request')

    expect(sendMessage).toHaveBeenCalledTimes(1)
    expect(sendMessage).toHaveBeenCalledWith({}, fetchScoreResponseMsgType, scoreResponseQueue, { sessionId })
  })

  
})
