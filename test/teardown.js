
afterEach(async (done) => {
  require('applicationinsights').dispose()
  done()
}, 30000)
