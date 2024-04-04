const { fetchCostRequestMsgType, fetchScoreRequestMsgType, fetchWaterScoreRequestMsgType, fetchProdScoreRequestMsgType, fetchHensScoreRequestMsgType } = require('../../../../../app/config/messaging')

const processCostMessage = require('../../../../../app/messaging/process-message')

jest.mock('../../../../../app/messaging/standardised-costs')
const processCost = require('../../../../../app/messaging/standardised-costs')

jest.mock('../../../../../app/messaging/session-scoring')
const processScoring = require('../../../../../app/messaging/session-scoring')


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

    test(`${fetchScoreRequestMsgType} message calls processScoring`, async () => {
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
                type: fetchScoreRequestMsgType
            },
            sessionId
        }


        await processCostMessage(message, receiver)
        expect(processScoring).toHaveBeenCalledTimes(1)
        expect(receiver.completeMessage).toHaveBeenCalledTimes(1)
    })

    test(`${fetchWaterScoreRequestMsgType} message calls processScoring`, async () => {
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
                type: fetchWaterScoreRequestMsgType
            },
            sessionId
        }


        await processCostMessage(message, receiver)
        expect(processScoring).toHaveBeenCalledTimes(1)
        expect(receiver.completeMessage).toHaveBeenCalledTimes(1)
    })

    test(`${fetchProdScoreRequestMsgType} message calls processScoring`, async () => {
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
                type: fetchProdScoreRequestMsgType
            },
            sessionId
        }


        await processCostMessage(message, receiver)
        expect(processScoring).toHaveBeenCalledTimes(1)
        expect(receiver.completeMessage).toHaveBeenCalledTimes(1)
    })

    test(`${fetchHensScoreRequestMsgType} message calls processScoring`, async () => {
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
                type: fetchHensScoreRequestMsgType
            },
            sessionId
        }


        await processCostMessage(message, receiver)
        expect(processScoring).toHaveBeenCalledTimes(1)
        expect(receiver.completeMessage).toHaveBeenCalledTimes(1)
    })

    test(`random text message does not call processCost`, async () => {
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
                type: 'random text'
            },
            sessionId
        }


        await processCostMessage(message, receiver)
        expect(processCost).toHaveBeenCalledTimes(0)
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
