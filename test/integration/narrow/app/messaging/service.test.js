
const { MessageReceiver } = require('ffc-messaging')
const service = require('../../../../../app/messaging/service')

jest.mock('ffc-messaging')

const mocksubscribe = jest.fn()
const mockCloseConnection = jest.fn()

MessageReceiver.prototype.subscribe = mocksubscribe

MessageReceiver.prototype.closeConnection = mockCloseConnection

describe(('Fetch application tests'), () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
    test('successfully fetched application', async () => {
        await service.start()
        expect(mocksubscribe).toHaveBeenCalledTimes(2)
    })

    test('successfully stopped application', async () => {

        
        await service.stop()
        expect(mockCloseConnection).toHaveBeenCalledTimes(2)
    })
})
