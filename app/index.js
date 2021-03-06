const server = require('./server')

const init = async () => {
  const calculateScoreAction = require('./messaging/calculate-score')
  require('./messaging/receivers').startCalculateRequestReceived(calculateScoreAction)

  await server.start()
  console.log('Server running on %s', server.info.uri)
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

init()
