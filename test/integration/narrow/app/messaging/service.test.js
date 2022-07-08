
const { MessageReceiver } = require('ffc-messaging')
const service = require('../../../../../app/messaging/service')

jest.mock('ffc-messaging')

const mocksubscribe = jest.fn()
MessageReceiver.prototype.subscribe = mocksubscribe

describe(('Fetch application tests'), () => {
    test('successfully fetched application', async () => {
        await service.start()
        expect(mocksubscribe).toHaveBeenCalledTimes(1)
    })
})
