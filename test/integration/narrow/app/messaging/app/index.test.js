const { sendResponseToSession } = require('../../../../../../app/messaging/application')
const { costResponseQueue, fetchCostResponseMsgType, fetchScoreResponseMsgType, scoreResponseQueue, fetchWaterScoreResponseMsgType, fetchProdScoreResponseMsgType, fetchHensScoreResponseMsgType, fetchAddValScoreResponseMsgType } = require('../../../../../../app/config/messaging.js')

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

  test('getApplication sends and receives message with scoring msgType', async () => {

    await sendResponseToSession({}, sessionId, '.fetch.score.request')

    expect(sendMessage).toHaveBeenCalledTimes(1)
    expect(sendMessage).toHaveBeenCalledWith({}, fetchScoreResponseMsgType, scoreResponseQueue, { sessionId })
  })

  test('getApplication sends and receives message with water msgType', async () => {

    await sendResponseToSession({}, sessionId, '.fetch.water.score.request') 

    expect(sendMessage).toHaveBeenCalledTimes(1)
    expect(sendMessage).toHaveBeenCalledWith({}, fetchWaterScoreResponseMsgType, scoreResponseQueue, { sessionId })
  })

  test('getApplication sends and receives message with prod msgType', async () => {

    await sendResponseToSession({}, sessionId, '.fetch.prod.score.request') 

    expect(sendMessage).toHaveBeenCalledTimes(1)
    expect(sendMessage).toHaveBeenCalledWith({}, fetchProdScoreResponseMsgType, scoreResponseQueue, { sessionId })
  })

  test('getApplication sends and receives message with hens msgType', async () => {

    await sendResponseToSession({}, sessionId, '.fetch.layingHens.score.request') 

    expect(sendMessage).toHaveBeenCalledTimes(1)
    expect(sendMessage).toHaveBeenCalledWith({}, fetchHensScoreResponseMsgType, scoreResponseQueue, { sessionId })
  })

  test('getApplication sends and receives message with add val msgType', async () => {

    await sendResponseToSession({}, sessionId, '.fetch.addval.score.request') 

    expect(sendMessage).toHaveBeenCalledTimes(1)
    expect(sendMessage).toHaveBeenCalledWith({}, fetchAddValScoreResponseMsgType, scoreResponseQueue, { sessionId })
  })

  test('get application send and receives messages with default or no message type', async () => {

    await sendResponseToSession({}, sessionId, 'hello world!')

    expect(sendMessage).toHaveBeenCalledTimes(1)
    expect(sendMessage).toHaveBeenCalledWith({}, fetchCostResponseMsgType, costResponseQueue, { sessionId })
  })
})
