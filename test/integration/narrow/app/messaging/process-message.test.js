const { fetchCostRequestMsgType } = require('../../../../../app/config/messaging')

const processCostMessage = require('../../../../../app/messaging/process-message')

jest.mock('../../../../../app/messaging/standardised-costs')
const processCost = require('../../../../../app/messaging/standardised-costs')


// jest.mock('../../../../app/messaging/fetch-application')
// jest.mock('../../../../app/messaging/fetch-claim')
// jest.mock('../../../../app/messaging/process-vet-visit')
// jest.mock('../../../../app/messaging/submit-claim')

describe('Process Message test', () => {
    const sessionId = '8e5b5789-dad5-4f16-b4dc-bf6db90ce090'
    const receiver = {
        completeMessage: jest.fn(),
        abandonMessage: jest.fn()
    }

    afterEach(async () => {
        jest.clearAllMocks()
    })

    test(`${fetchCostRequestMsgType} message calls processCost`, async () => {
        const message = {
            body: {
                cattle: 'yes',
                pigs: 'yes',
                organisation: {
                    name: 'test-org',
                    email: 'test-email'
                }
            },
            applicationProperties: {
                type: fetchCostRequestMsgType
            },
            sessionId
        }


        await processCostMessage(message, receiver)
        expect(processCost).toHaveBeenCalledTimes(1)
        expect(receiver.completeMessage).toHaveBeenCalledTimes(1)
    })

    test(`${fetchCostRequestMsgType} throws error`, async () => {
        const message = {
            body: {
                cattle: 'yes',
                pigs: 'yes',
                organisation: {
                    name: 'test-org',
                    email: 'test-email'
                }
            },
            applicationProperties: {
                type: fetchCostRequestMsgType
            },
            sessionId
        }

        processCost.mockImplementationOnce(() => {throw new Error('errors')})

        await processCostMessage(message, receiver)

        expect(processCost).toHaveBeenCalledTimes(1)
        expect(receiver.completeMessage).toHaveBeenCalledTimes(0)
        
    })

})
