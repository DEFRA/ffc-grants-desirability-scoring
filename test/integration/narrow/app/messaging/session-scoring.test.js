const processScoring = require('../../../../../app/messaging/session-scoring')
jest.mock('../../../../../app/calculation/score-engine')
const ScoringEngine = require('../../../../../app/calculation/score-engine')
jest.mock()
const scoreRepository = require('../../../../../app/services/score-repository')

jest.mock('../../../../../app/messaging/application/index')
const {
  sendResponseToSession
} = require('../../../../../app/messaging/application/index')

jest.mock()
const appInsights = require('../../../../../app/services/app-insights')

const { MessageReceiver } = require('ffc-messaging')
jest.mock('ffc-messaging')

const mockAbandon = jest.fn()
MessageReceiver.prototype.abandonMessage = mockAbandon

const mockGetScore = jest.fn()
ScoringEngine.prototype.getScore = mockGetScore

const scoreReciever = new MessageReceiver()
const waterScoreReceiver = new MessageReceiver()

describe('Session scoring test', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  test('message properly processed water score', async () => {
    mockGetScore.mockImplementationOnce(() => {
      return ''
    })
    const msg = {
      sessionId: '12345',
      applicationProperties: {
        type: 'uk.gov.ffc.grants.fetch.water.score.request'
      },
      body: ''
    }

    jest
      .spyOn(scoreRepository, 'getScoreData')
      .mockResolvedValue({ data: '{"test": "helloAll"}' })

    sendResponseToSession.mockResolvedValue(true)

    await processScoring(msg, waterScoreReceiver)

    expect(scoreRepository.getScoreData).toHaveBeenCalledTimes(1)
    expect(scoreRepository.getScoreData).toHaveBeenCalledWith('Water Grant')

    expect(sendResponseToSession).toHaveBeenCalledTimes(1)
    expect(sendResponseToSession).toHaveBeenCalledWith(
      '',
      '12345',
      '.fetch.water.score.request'
    )
    expect(mockGetScore).toHaveBeenCalledTimes(1)
  })

  test('message properly processed cattle housing score', async () => {
    mockGetScore.mockImplementationOnce(() => {
      return ''
    })
    const msg = {
      sessionId: '12345',
      applicationProperties: {
        type: 'uk.gov.ffc.grants.fetch.score.request'
      },
      body: ''
    }

    jest
      .spyOn(scoreRepository, 'getScoreData')
      .mockResolvedValue({ data: '{"test": "helloAll"}' })

    sendResponseToSession.mockResolvedValue(true)

    await processScoring(msg, scoreReciever)

    expect(scoreRepository.getScoreData).toHaveBeenCalledTimes(1)
    expect(scoreRepository.getScoreData).toHaveBeenCalledWith(
      'Calf Housing Grant'
    )

    expect(sendResponseToSession).toHaveBeenCalledTimes(1)
    expect(sendResponseToSession).toHaveBeenCalledWith(
      '',
      '12345',
      '.fetch.score.request'
    )
    expect(mockGetScore).toHaveBeenCalledTimes(1)
  })

  test('message properly processed robotics score', async () => {
    mockGetScore.mockImplementationOnce(() => {
      return ''
    })
    const msg = {
      sessionId: '12345',
      applicationProperties: {
        type: 'uk.gov.ffc.grants.fetch.prod.score.request'
      },
      body: {
        grantScheme: {
          key: 'PROD02'
        }
      }
    }

    jest
      .spyOn(scoreRepository, 'getScoreData')
      .mockResolvedValue({ data: '{"test": "helloAll"}' })

    sendResponseToSession.mockResolvedValue(true)

    await processScoring(msg, scoreReciever)

    expect(scoreRepository.getScoreData).toHaveBeenCalledTimes(1)
    expect(scoreRepository.getScoreData).toHaveBeenCalledWith(
      'Prod Grant Robotics'
    )

    expect(sendResponseToSession).toHaveBeenCalledTimes(1)
    expect(sendResponseToSession).toHaveBeenCalledWith(
      '',
      '12345',
      '.fetch.prod.score.request'
    )
    expect(mockGetScore).toHaveBeenCalledTimes(1)
  })

  test('message properly processed solar score', async () => {
    mockGetScore.mockImplementationOnce(() => {
      return ''
    })
    const msg = {
      sessionId: '12345',
      applicationProperties: {
        type: 'uk.gov.ffc.grants.fetch.prod.score.request'
      },
      body: {
        grantScheme: {
          key: 'PROD01'
        }
      }
    }

    jest
      .spyOn(scoreRepository, 'getScoreData')
      .mockResolvedValue({ data: '{"test": "helloAll"}' })

    sendResponseToSession.mockResolvedValue(true)

    await processScoring(msg, scoreReciever)

    expect(scoreRepository.getScoreData).toHaveBeenCalledTimes(1)
    expect(scoreRepository.getScoreData).toHaveBeenCalledWith(
      'Prod Grant Solar'
    )

    expect(sendResponseToSession).toHaveBeenCalledTimes(1)
    expect(sendResponseToSession).toHaveBeenCalledWith(
      '',
      '12345',
      '.fetch.prod.score.request'
    )
    expect(mockGetScore).toHaveBeenCalledTimes(1)
  })

  test('message properly processed laying hens score', async () => {
    mockGetScore.mockImplementationOnce(() => {
      return ''
    })
    const msg = {
      sessionId: '12345',
      applicationProperties: {
        type: 'uk.gov.ffc.grants.fetch.layingHens.score.request'
      },
      body: {
        grantScheme: {
          key: 'LAYINGHENS01'
        }
      }
    }

    jest
      .spyOn(scoreRepository, 'getScoreData')
      .mockResolvedValue({ data: '{"test": "Ahaa Laying Hens"}' })

    sendResponseToSession.mockResolvedValue(true)

    await processScoring(msg, scoreReciever)

    expect(scoreRepository.getScoreData).toHaveBeenCalledTimes(1)
    expect(scoreRepository.getScoreData).toHaveBeenCalledWith(
      'Laying Hens Grant'
    )

    expect(sendResponseToSession).toHaveBeenCalledTimes(1)
    expect(sendResponseToSession).toHaveBeenCalledWith(
      '',
      '12345',
      '.fetch.layingHens.score.request'
    )
    expect(mockGetScore).toHaveBeenCalledTimes(1)
  })

  test('message properly processed pullets score', async () => {
    mockGetScore.mockImplementationOnce(() => {
      return ''
    })
    const msg = {
      sessionId: '12345',
      applicationProperties: {
        type: 'uk.gov.ffc.grants.fetch.layingHens.score.request'
      },
      body: {
        grantScheme: {
          key: 'LAYINGHENS02'
        }
      }
    }

    jest
      .spyOn(scoreRepository, 'getScoreData')
      .mockResolvedValue({ data: '{"test": "Ahaa Pullets"}' })

    sendResponseToSession.mockResolvedValue(true)

    await processScoring(msg, scoreReciever)

    expect(scoreRepository.getScoreData).toHaveBeenCalledTimes(1)
    expect(scoreRepository.getScoreData).toHaveBeenCalledWith(
      'Pullet Grant'
    )

    expect(sendResponseToSession).toHaveBeenCalledTimes(1)
    expect(sendResponseToSession).toHaveBeenCalledWith(
      '',
      '12345',
      '.fetch.layingHens.score.request'
    )
    expect(mockGetScore).toHaveBeenCalledTimes(1)
  })

  test('message properly processed adding value score', async () => {
    mockGetScore.mockImplementationOnce(() => {
      return ''
    })
    const msg = {
      sessionId: '12345',
      applicationProperties: {
        type: 'uk.gov.ffc.grants.fetch.addval.score.request'
      },
      body: {
        grantScheme: {
          key: 'ADDVAL01'
        }
      }
    }

    jest
      .spyOn(scoreRepository, 'getScoreData')
      .mockResolvedValue({ data: '{"test": "Ahaa add val"}' })

    sendResponseToSession.mockResolvedValue(true)

    await processScoring(msg, scoreReciever)

    expect(scoreRepository.getScoreData).toHaveBeenCalledTimes(1)
    expect(scoreRepository.getScoreData).toHaveBeenCalledWith(
      'Adding Value Grant'
    )

    expect(sendResponseToSession).toHaveBeenCalledTimes(1)
    expect(sendResponseToSession).toHaveBeenCalledWith(
      '',
      '12345',
      '.fetch.addval.score.request'
    )
    expect(mockGetScore).toHaveBeenCalledTimes(1)
  })

  test('message processed but not right type', async () => {
    const msg = {
      sessionId: '12345',
      applicationProperties: {
        type: 'uk.gov.ffc.grants.oh.no'
      }
    }

    jest.spyOn(scoreRepository, 'getScoreData').mockResolvedValue({ test: {} })

    sendResponseToSession.mockResolvedValue(true)

    await processScoring(msg, scoreReciever)

    expect(scoreRepository.getScoreData).toHaveBeenCalledTimes(1)
    expect(scoreRepository.getScoreData).toHaveBeenCalledWith(null)

    expect(sendResponseToSession).toHaveBeenCalledTimes(1)
    expect(sendResponseToSession).toHaveBeenCalledWith(
      'not_found',
      '12345',
      '.oh.no'
    )
  })

  test('message throws error when processed', async () => {
    const msg = {
      sessionId: '12345',
      applicationProperties: {
        type: 'uk.gov.ffc.grants.fetch.cost.request'
      }
    }

    jest.spyOn(scoreRepository, 'getScoreData').mockResolvedValue({
      data: {
        test: 'helloAll'
      }
    })

    jest.spyOn(appInsights, 'logException').mockReturnValue(true)

    jest
      .spyOn(MessageReceiver.prototype, 'abandonMessage')
      .mockImplementationOnce(() => Promise.resolve(true))

    sendResponseToSession.mockResolvedValue(true)

    await processScoring(msg, scoreReciever)

    expect(scoreRepository.getScoreData).toHaveBeenCalledTimes(1)
    expect(scoreRepository.getScoreData).toHaveBeenCalledWith(null)

    expect(appInsights.logException).toHaveBeenCalledTimes(1)
    expect(MessageReceiver.prototype.abandonMessage).toHaveBeenCalledTimes(1)

    expect(sendResponseToSession).toHaveBeenCalledTimes(1)
  })
})
