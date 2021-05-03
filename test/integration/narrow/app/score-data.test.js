const appInsight = require('../../../../app/services/app-insights')

describe('get appInsight setup defined', () => {
  test('Should be defined', () => {
    expect(appInsight).toBeDefined()
  })
  test('With now key Should not to throw', () => {
    expect(appInsight.setup()).toBe(undefined)
  })
})
