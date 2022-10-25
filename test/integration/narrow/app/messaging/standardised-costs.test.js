const processCost = require('../../../../../app/messaging/standardised-costs')

jest.mock()
const scoreRepository = require('../../../../../app/services/score-repository')

jest.mock('../../../../../app/messaging/application/index')
const {sendResponseToSession} = require('../../../../../app/messaging/application/index')

jest.mock()
const appInsights = require('../../../../../app/services/app-insights')

const { MessageReceiver } = require('ffc-messaging')
jest.mock('ffc-messaging')

const mockAbandon = jest.fn()
MessageReceiver.prototype.abandonMessage = mockAbandon

const costReceiver = new MessageReceiver()

describe('Standardised Cost test', () => {
    beforeEach(() => {
        jest.resetAllMocks()
    })
    test('message properly processed cost', async () => {

        const msg = {
            sessionId: '12345', applicationProperties: {
                type: 'uk.gov.ffc.grants.fetch.cost.request'
            }
        }

        jest.spyOn(scoreRepository, 'getScoreData').mockResolvedValue({data: `{"test": "helloAll"}`})

        sendResponseToSession.mockResolvedValue(true)

        await processCost(msg, costReceiver)

        expect(scoreRepository.getScoreData).toHaveBeenCalledTimes(1)
        expect(scoreRepository.getScoreData).toHaveBeenCalledWith('Slurry Infrastructure Grant')

        expect(sendResponseToSession).toHaveBeenCalledTimes(1)
        expect(sendResponseToSession).toHaveBeenCalledWith({costData: 'success', data: {
            test: 'helloAll'
        }
        }, '12345', ".fetch.cost.request")

    })

    test('message properly processed score', async () => {

        const msg = {
            sessionId: '12345', applicationProperties: {
                type: 'uk.gov.ffc.grants.fetch.score.request'
            }
        }

        jest.spyOn(scoreRepository, 'getScoreData').mockResolvedValue({ data: `{"test": "helloAll"}` })

        sendResponseToSession.mockResolvedValue(true)

        await processCost(msg, costReceiver)

        expect(scoreRepository.getScoreData).toHaveBeenCalledTimes(1)
        expect(scoreRepository.getScoreData).toHaveBeenCalledWith('Slurry Infrastructure Grant')

        expect(sendResponseToSession).toHaveBeenCalledTimes(1)
        expect(sendResponseToSession).toHaveBeenCalledWith({
            costData: 'success', data: {
                test: 'helloAll'
            }
        }, '12345', ".fetch.score.request")

    })

    test('message processed but not right type', async () => {

        const msg = {
            sessionId: '12345', applicationProperties: {
                type: 'uk.gov.ffc.grants.oh.no'
            }
        }

        jest.spyOn(scoreRepository, 'getScoreData').mockResolvedValue({test:{}})

        sendResponseToSession.mockResolvedValue(true)

        await processCost(msg, costReceiver)

        expect(scoreRepository.getScoreData).toHaveBeenCalledTimes(1)
        expect(scoreRepository.getScoreData).toHaveBeenCalledWith(null)

        expect(sendResponseToSession).toHaveBeenCalledTimes(1)
        expect(sendResponseToSession).toHaveBeenCalledWith({
            costData: 'not_found', data: { test: {} }
        }, '12345', ".oh.no")


    })

    test('message throws error when processed', async () => {

        const msg = {
            sessionId: '12345', applicationProperties: {
                type: 'uk.gov.ffc.grants.fetch.cost.request'
            }
        }

        jest.spyOn(scoreRepository, 'getScoreData').mockResolvedValue({
            data: {
                test: 'helloAll'
            }
        })

        jest.spyOn(appInsights, 'logException').mockReturnValue(true)

        jest.spyOn(MessageReceiver.prototype, 'abandonMessage').mockImplementationOnce(() => Promise.resolve(true))

        sendResponseToSession.mockResolvedValue(true)

        await processCost(msg, costReceiver)

        expect(scoreRepository.getScoreData).toHaveBeenCalledTimes(1)
        expect(scoreRepository.getScoreData).toHaveBeenCalledWith('Slurry Infrastructure Grant')

        expect(appInsights.logException).toHaveBeenCalledTimes(1)
        expect(MessageReceiver.prototype.abandonMessage).toHaveBeenCalledTimes(1)

        expect(sendResponseToSession).toHaveBeenCalledTimes(1)

    })
   
})
