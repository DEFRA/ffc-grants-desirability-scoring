const mockSendMessage = jest.fn()
const mockCloseConnection = jest.fn()
jest.mock('ffc-messaging', () => {
    return {
        MessageSender: jest.fn().mockImplementation(() => {
            return { sendMessage: mockSendMessage, closeConnection: mockCloseConnection }
        })
    }
})

const sendSessionMessage = require('../../../../../app/messaging/send-message')

describe('application messaging tests', () => {  
    afterEach(() => {
      jest.clearAllMocks()
    })

    test('sendMessage sends a message', async () => {

        const body = { applicationReference: '12345'}
        const type = { type: 'mock'}
        const config = { queue: 'yes'}
        const sessionId = {id: 1}

        await sendSessionMessage(body, type, config, sessionId)

        expect(mockSendMessage).toHaveBeenCalledTimes(1)
        expect(mockCloseConnection).toHaveBeenCalledTimes(1)

        
    })
})