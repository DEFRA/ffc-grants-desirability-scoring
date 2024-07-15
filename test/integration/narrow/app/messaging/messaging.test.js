jest.mock('ffc-messaging')
const ffcMessaging = require('ffc-messaging')
ffcMessaging.MessageSender = jest.fn().mockImplementation(() => {
  return {
    closeConnection: jest.fn(),
    sendMessage: jest.fn(async (message) => {})
  }
})
ffcMessaging.MessageReceiver = jest.fn().mockImplementation((queue, updateAction) => {
  return {
    closeConnection: jest.fn(),
    subscribe: jest.fn()
  }
})
const mockSendEvent = jest.fn()
jest.mock('ffc-protective-monitoring', () => {
  return {
    PublishEvent: jest.fn().mockImplementation(() => {
      return { sendEvent: mockSendEvent }
    })
  }
})
describe('messaging tests', () => {
  test('Senders Should be defined', () => {
    const senders = require('../../../../../app/messaging/senders')
    expect(senders).toBeDefined()
  })
  test('Senders sendScoreCalculated Should not throw error', async () => {
    const senders = require('../../../../../app/messaging/senders')
    await expect(senders.sendScoreCalculated('', '')).resolves.not.toThrow()
    expect(mockSendEvent).toHaveBeenCalledTimes(1)
  })
})
